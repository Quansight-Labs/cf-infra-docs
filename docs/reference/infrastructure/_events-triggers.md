# Package building

<!-- TODO: Discuss infrasture elements first and link to them from the user/life-cycle document -->

1. Initial submission to `staged-recipes`
2. Feedstock changes:
   - A. Repository initialization
   - B. Automated maintenance updates
   - C. PRs submitted by users
3. Package building
4. Package validation and publication
5. Post-publication:
   - A. Repodata patch
   - B. Mark a package as broken
6. Feedstock operations
   - Archive a feedstock
   - Regenerate tokens

## 1. Initial submission to staged-recipes

The `conda-forge/staged-recipes` repository uses several pieces of infrastructure.

On pull requests:

- Package building pipelines. These are slightly different than the ones running in feedstocks (they are not automatically generated by `conda-smithy`, but they do use the same underlying components).
- The linter provided by `conda-smithy recipe-lint`, run by `@conda-forge-linter`.
- Auto-labeling logic, run by Github Actions workflows.

On pushes to `main`:

- Create and initialize the new feedstocks.

Authenticated services involved:

- Github, with permissions for:
  - Repository creation
- Azure Pipelines
- Travis CI
- Other CI providers?

## 2. Feedstock changes

A feedstock can receive changes for several reasons.

Pushes to `main` or other branches:

- The automated initialization commits following the approval in `staged-recipes`. These are generated by `conda-smithy`.
- Automated maintenance commits triggered from `admin-migrations`.
- Rerender requests handled by instances of `conda-forge/webservices-dispatch-action` and triggered by the admin web service.

Automatic pull requests can be opened by...

- `@conda-forge-linter`, responding to some issues with titlesman like `@conda-forge-admin, please...`.
- `@regro-cf-autotick-bot`, handling migrations and new versions being available.

...and closed by:

- `conda-forge/automerge-action`, if labeled adequately.

On an open pull request:

- The building pipelines (more [below](#package-building)).
- The linter provided by `conda-smithy recipe-lint`, run by `@conda-forge-linter`.
- The `@conda-forge-admin, please...` command comments, answered by `@conda-forge-linter`.

On issues:

- `@conda-forge-admin, please...` command issues, handled by `@conda-forge-linter`.

:::tip
See [Addendum below](#operations-on-feedstocks) for more information about operations on feedstocks.
These include operations on feedstock metadata and/or contents.
:::

## 3. Package building {#package-building}

The pipelines that build conda packages are used for both pull requests and push events in `main` and other branches. The only difference is that the packages built during a pull request are not uploaded to the staging channel. Maintaining these up-to-date across all feedstocks involves a number of repositories:

- `conda-smithy` is in charge of generating the CI pipelines themselves, together with the supporting scripts and configuration files. These pipelines and scripts can rely on code and data defined in the repositories below.
- `conda-forge-ci-setup-feedstock` provides the code needed to prepare and homogeneize the CI runners across providers. It also does some checks before the artifacts are uploaded to `cf-staging`.
- `conda-forge-pinning-feedstock` defines which versions are supported for a number of runtimes and libraries, as well as the compilers used for certain languages and platforms.
- `docker-images` builds the standardized container images for Linux runners.
  This repository has additional authentication needs for Docker Hub, Quay.io.

The pipelines can run on a number of CI providers supported by `conda-smithy`, including:

- Azure DevOps Pipelines
- Drone.io
- Travis CI
- Circle CI

Registration of hooks and triggers is also done by the `conda-smithy` app.

:::tip
`conda-smithy` supports more CI providers. Check [the repo][conda-smithy] for more details.
:::

Authenticated services involved:

- Anaconda.org uploads to `cf-staging`

## 4. Package validation and publication

Once built on `main` (or other branches), the conda packages are uploaded to an intermediary channel named `cf-staging`.
From there, the packages are downloaded by the validation server and, if successful, copied over to `conda-forge` itself.

- The validation logic is defined at `conda-forge/artifact-validation`
- If problematic, the results of the validation are posted as issues in the same repo.
- This logic runs at `conda-forge/conda-forge-webservices`.
  This webapp also copies the artifacts from `cf-staging` to `conda-forge`.
- Part of the validation includes checking for cross-package clobbering.
  The list of authorized feedstocks per package name is maintained at `conda-forge/feedstock-outputs`.
- Some further analysis might be performed _after_ publication.

Authenticated services involved:

- Anaconda.org uploads to `conda-forge`
- The `conda-forge-webservices` app deployment itself (currently at Heroku)
- (?) Post new issues to `conda-forge/artifact-validation`

## 5. Post-publication

Once uploaded to anaconda.org/conda-forge, packages are not immediately available to CLI clients.
They have to be replicated in the Content Distribution Network (CDN).
This step usually takes less than 15 minutes.

After CDN replication, most packages available on anaconda.org/conda-forge won't suffer any further modifications.
However, in some cases, maintainers might need to perform some actions on the published packages:

- A. Patching their repodata
- B. Marking them as broken

### 5A. Repodata patch

The metadata for `conda` packages is initially contained in each package archive (under `info/`).
`conda index` iterates over the published `conda` packages, extracts the metadata and consolidates all the found JSON blobs into a single JSON file: `repodata.json`.
This is the metadata file that the CLI clients download initially to _solve_ the environment.

Since the metadata is external to the files, some details can be modified without rebuilding packages,
which simplifies some maintenance tasks notably.

<!-- FIXME: Confirm accuracy of this paragraph -->

Repodata patches are created in `conda-forge/conda-forge-repodata-patches-feedstock`,
which generates (and uploads) a regular `conda` package as the result:
[`conda-forge-repodata-patches`](https://anaconda.org/conda-forge/conda-forge-repodata-patches/files).
Each of these timestamped packages contains the patch instructions for each channel subdir on conda-forge.
The Anaconda infrastructure takes the JSON files from these packages and applies them on top of the vanilla `repodata.json`.

Since this operates as a regular feedstock for the purposes of packages publication,
there are no further infrastructural details to cover.

### 5B. Mark a package as broken

Sometimes a package is faulty in ways that a repodata patch cannot amend (e.g. bad binary).
In these cases, conda-forge does not remove packages from Anaconda.org.
Instead, it marks them with `broken` label, which has a special meaning:
packages labeled as such will be removed from the repodata via automated patches.

The main repository handling this is `conda-forge/admin-requests`, which features different
Github Actions workflows running every 15 minutes.

For this task, the Github Action workflow needs access to:

- Anaconda.org, to add (or remove) labels
- Github, to modify and commit the input files after success