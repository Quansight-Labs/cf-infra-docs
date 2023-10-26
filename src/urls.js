export const urls = {
  azure: {
    pipelines:
      "https://conda-forge.herokuapp.com/status-monitor/report/azure-pipelines",
    status: "https://conda-forge.herokuapp.com/status-monitor/azure",
  },
  stats:
    "https://raw.githubusercontent.com/conda-forge/by-the-numbers/main/data/live_counts.json",
  migrations: {
    status: {
      closed:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/closed_status.json",
      longterm:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/longterm_status.json",
      regular:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/regular_status.json",
    },
  },
  versions:
    "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/version_status.json",
};
