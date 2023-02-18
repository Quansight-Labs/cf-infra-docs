# Continuous integration

:::tip See also
Refer to the [`conda-forge.yml` documentation](/docs/reference/feedstock-configuration.md#conda-forge-yml) to learn how to configure your CI providers
:::

## Azure Pipelines

- 🌐 https://dev.azure.com/conda-forge/feedstock-builds/_build
- 📍 Available on all feedstocks
- 🛠 Provides [Microsoft-hosted runners](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml) (x64 Linux, macOS and Windows)
- 🔒 Needs access to Anaconda.org (cf-staging)

conda-forge benefits from the generously offered Microsoft-hosted runners.

## Travis CI

- 🌐 https://app.travis-ci.com/github/conda-forge
- 📍 Available on all feedstocks
- 🛠 Provides [native Linux aarch64 and ppc64le runners](https://docs.travis-ci.com/user/reference/overview/)
- 🔒 Needs access to Anaconda.org (cf-staging)

## Cirun

- 🌐 https://cirun.io
- 📍 Available on selected feedstocks only
- 🛠 Provides several architectures (depends on feedstock configuration)
- 🔒 Needs access to Anaconda.org (cf-staging) and the configured backend

Configured with `@conda-forge-daemon`.

Organization-wide configuration can be found in the [`.cirun` repository](https://github.com/conda-forge/.cirun).

## Github Actions

- 🌐 https://github.com/features/actions
- 📍 Not available in feedstocks (only admin tasks)
- 🛠 Provides [GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) (x64 Linux, macOS and Windows)
- 🔒 Has access to Github API

## Retired services

- [AppVeyor](https://ci.appveyor.com/account/conda-forge/projects)
- Circle CI
- Drone.io
