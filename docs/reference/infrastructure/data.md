# Data

## conda-forge-pinning-feedstock

- ⚙️ Deployed in [Anaconda.org](https://anaconda.org/conda-forge/conda-forge-pinning) via [`conda-forge/conda-forge-pinning-feedstock`](https://github.com/conda-forge/conda-forge-pinning-feedstock)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

Hosts the global pinnings for conda-forge, and the ongoing migrations.

## cf-graph-countyfair

- ⚙️ Deployed in [Github Actions via `regro/cf-graph-countyfair`](https://github.com/regro/cf-graph-countyfair)
- ⛓ Needs [`regro/cf-scripts`](https://github.com/regro/cf-scripts), [`conda-forge/conda-forge-pinning-feedstock`](https://github.com/conda-forge/conda-forge-pinning-feedstock)
- 🤖 Uses [`@regro-cf-autotick-bot`](https://github.com/regro-cf-autotick-bot)
- 🔒 Has access to Github API

## feedstock-outputs

- ⚙️ Deployed in [Github Actions via `conda-forge/feedstock-outputs`](https://github.com/conda-forge/feedstock-outputs)
- 🔒 Has access to Azure, Anaconda.org (cf-staging)

## libcfgraph

- ⚙️ Deployed in [Circle CI](https://app.circleci.com/pipelines/github/regro/libcfgraph) via [`regro/libcfgraph`](https://github.com/regro/libcfgraph)
- ⛓ Needs [`regro/libcflib`](https://github.com/regro/libcflib)
- 🤖 Commits as `circleci` (fake username)
- 🔒 Has access to Github API, Circle CI

## Others

- [`regro/conda-suggest-conda-forge`](https://github.com/regro/conda-suggest-conda-forge) provides [`conda-suggest`](https://github.com/conda-incubator/conda-suggest) files that map executables to package names.
