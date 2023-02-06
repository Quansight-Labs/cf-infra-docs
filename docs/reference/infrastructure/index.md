---
title: Infrastructure
---

# Infrastructure reference

:::tip
A list of critical repositories for conda-forge's infrastructure and operation is compiled automatically at `conda-forge/****`.

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



### conda-forge-repodata-patches-feedstock

This is a regular feedstock with some special responsibilities.

<!-- TODO -->


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