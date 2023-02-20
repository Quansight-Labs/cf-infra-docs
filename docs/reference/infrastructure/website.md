# Website

[conda-forge.org](https://conda-forge.org) is a statically generated website published to Github Pages.
The main site is built with Sphinx and deployed from `conda-forge/conda-forge.github.io` to Github Pages.

The Sphinx site is then extended by three more components:

- `conda-forge/blog` powering the blog.
- `conda-forge/by-the-numbers` periodically computes the metrics reported on the frontpage.
- `conda-forge/status` and `conda-forge/conda-forge-status-monitor` providing the status dashboard.
