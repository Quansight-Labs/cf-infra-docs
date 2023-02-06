---
title: Feedstocks
---

# Feedstocks and other package-building repositories

Most packages in conda-forge come from a repository named `<package_name>-feedstock`, but a very small subset comes from specific, non-feedstock, repositories.

## Feedstocks

conda-forge has thousands of feedstocks. 
Each feedstock hosts a recipe plus the required pipelines, supporting scripts and configuration metadata.

## cdt-builds

- ⚙️ Deployed in [Azure Pipelines](https://dev.azure.com/conda-forge/cdt-builds/_build) via [`conda-forge/cdt-builds`](https://github.com/conda-forge/cdt-builds)
- 🔒 Has access to Azure Pipelines, Anaconda.org (cf-staging)

This special repository builds Core Dependency Tree packages for conda-forge (Linux only).
It doesn't use the feedstock automated machinery.
Instead, it has its own Azure Pipelines workflow and a well documented README.

## msys2-recipes

- ⚙️ Deployed manually from [`conda-forge/msys2-recipes`](https://github.com/conda-forge/cdt-builds)

This is a fork of the old community recipes repository at Anaconda, which includes the `msys2` recipes under the [`msys2/`](https://github.com/conda-forge/msys2-recipes/tree/master/msys2) directory.
Note also the supporting scripts in the [`common-scripts/`](https://github.com/conda-forge/msys2-recipes/tree/master/common-scripts) folder.