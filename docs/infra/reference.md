---
sidebar_position: 4
title: Reference
---

# Infrastructure reference

:::tip
A list of critical repositories for conda-forge's infrastructure and operation is compiled automatically at `conda-forge/repository-index`.

<!-- TODO: Implement repository and link -->

:::

<!-- TODO: Bring content from `package-building` and `feedstock-maintenance` as needed -->

## Github organizations

conda-forge is structured around a main Github organization, with thousands of repositories and contributors to allow for a granular access control and federated maintenance model.

The organization has thousands of teams, but they can be easily categorized:

- `core`
- ...

There are several stateful properties that are key to its operational status.
Some are tracked with semi-automated strategies, while others are only changed manually:

- Org-wide secrets
- ...


There's a sister organization, `regro`, from where some services run too.

```yaml
- github.Organization:
    name: conda-forge
    description: "..."
    owners:
      - ...
    teams:
      - core:
        - ...
      - staged-recipes:
        - ...
      - help-*:
        - ...
      - "*": # feedstock teams
    moderators:
      - ...
    settings:
      - ...
    secrets:
      - ...
- github.Organization:
    name: regro
    description: "..."
    owners:
      - ...
    teams:
      - ...
    moderators:
      - ...
    settings:
      - ...
    secrets:
      - ...
```

## Operational elements

These items are tied to pipelines that have a concrete output. Most are CI pipelines tied to a repository (e.g. like the ones in the feedstocks), but it's not always like that (e.g. the conda-forge-linter).

### Feedstocks

conda-forge has thousands of feedstocks. 
Each feedstock hosts a recipe plus the required pipelines, supporting scripts and configuration metadata.

For each feedstock, we have this setup:

```yaml
github.Repository:
  name: "conda-forge/{{ name }}-feedstock"
  description: "..."
  access:
    - conda-forge/core
    - conda-forge/{{ name }}
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

:::info See also
There are two extra repositories that provide packages for conda-forge, but don't follow the usual feedstock architecture.

- [conda-forge/cdt-builds](https://github.com/conda-forge/cdt-builds)
- [conda-forge/msys2-recipes](https://github.com/conda-forge/msys2-recipes)
:::


### staged-recipes

This repository is thw gateway to conda-forge. This is where users can submit new recipes which, once reviewed and accepted, will generate a new feedstock and team.

```yaml
github.Repository:
  name: "conda-forge/staged-recipes"
  description: "..."
  access:
    - conda-forge/core
    - conda-forge/staged-recipes
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

### admin-migrations

This repository hosts workflows that are running 24/7. Its job is to procure an automation loop where some maintenance tasks are added. Its main user is the core team.

```yaml
github.Repository:
  name: "conda-forge/admin-migrations"
  description: "..."
  access: # check
    - ...
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

### admin-requests

This repository hosts workflows that mainly run when triggered by an user-initiated action. This is usually done via a PR that, once approved, it's merged and triggers the requested action (mark a package as broken, archive a feedstock, etc).

```yaml
github.Repository:
  name: "conda-forge/admin-requests"
  description: "..."
  access: # check
    - ...
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

### autotick-bot

This is the repository running the `regro-cf-autotick-bot` workflows. There are several pipelines in place (see [workflows](https://github.com/regro/autotick-bot/tree/master/.github/workflows)).

```yaml
github.Repository:
  name: "regro/autotick-bot"
  description: "..."
  access: # check
    - ...
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

### artifact-validation

The workflows (and code) to scan conda-forge artifacts 
```yaml
github.Repository:
  name: "conda-forge/artifact-validation"
  description: "..."
  access: # check
    - ...
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

### conda-forge-repodata-patches-feedstock

This is a regular feedstock with some special responsibilities.

<!-- TODO -->

### conda-forge-webservices

This web application powers several services, like:

- the `@conda-forge-admin, please ...` commands
- the `@conda-forge-linter` bot.
- the `cf-staging` to `conda-forge` validation (plus copy)
- status monitoring

It is deployed to a Heroku Dyno, and requires several webhooks. Its code is maintained in the source-only `conda-forge/conda-forge-webservices` repository.

```yaml
github.Repository:
  name: "conda-forge/conda-forge-webservices"
  description: "..."
  access: # check
    - ...
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

## Supporting repositories

### conda-smithy

WIP

### cf-scripts

WIP


### conda-forge-ci-setup-feedstock

WIP

### webservices-dispatch-action

WIP

### cf-oci-mirror-action

WIP

### libcflib

WIP

## Data repositories

### feedstocks

WIP

### feedstock-outputs

WIP

### cf-graph-countyfair

WIP

### libcfgraph

WIP

### conda-suggest-conda-forge

WIP

## Github accounts

### @regro-cf-autotick-bot

One of the bots taking care of the graph-based automation.

```yaml
github.Account:
  name: "regro-cf-autotick-bot"
  description: "..."
  access: # check
    - conda-forge/core
    - conda-forge/bot
    - regro/*
  secrets:
    - ...
  apps:
    - ...
  settings:
    archived: false
```

### @conda-forge-admin

WIP

### @conda-forge-linter

WIP

## CI providers

### Github Actions

WIP

### Azure Pipelines

WIP

### Travis CI

WIP

### AppVeyor

WIP

### Drone.io

WIP

### Circle CI

WIP

### Cirun

WIP



## Delivery & distribution

### Anaconda.org

WIP

### Github Packages

WIP

### Docker.io

WIP

### Quay.io

WIP


## Documentation

### HackMD

WIP

## Other products

### Miniforge installers

WIP

### Miniforge images

WIP

## Communications & reports

### conda-forge.github.io

WIP

### blog

WIP

### by-the-numbers

WIP

### conda-forge-status-monitor

WIP

### status

WIP

### Organizational resources

#### cfep

#### marketing