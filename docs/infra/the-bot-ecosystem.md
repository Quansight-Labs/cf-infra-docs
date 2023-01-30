---
sidebar_position: 5
---

# The bot ecosystem

Conda-forge is a community led collection of recipes, build infrastructure and distributions for the conda package manager which makes it easy for developers to build and upload packages to the conda-forge channel.

The conda-forge community is supported by a set of bots that automate many of the tasks that would otherwise be performed manually by the core team or simply impossible to accomplish in a feasible time. This document provides a high level overview of the bot ecosystem and how it works.

Due to the nature of the bots and the way they interact and manage the conda-forge infrastructure, we can subdivide the bots into two categories:

- Core infrastructure maintenance bots
  - The auto-ticker bot
- User facing bots
  - the linter bot
  - the web-services bot

