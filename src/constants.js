export const charts = {
  usage: {
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          type: "time",
          time: {
            minUnit: "hour",
          },
        },
        y: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  },
};

export const urls = {
  azure: {
    pipelines:
      "https://conda-forge.herokuapp.com/status-monitor/report/azure-pipelines",
    status: "https://conda-forge.herokuapp.com/status-monitor/azure",
  },
  github: {
    actions:
      "https://conda-forge.herokuapp.com/status-monitor/report/github-actions",
  },
  stats:
    "https://raw.githubusercontent.com/conda-forge/by-the-numbers/main/data/live_counts.json",
  migrations: {
    details: "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/migration_json/<NAME>.json",
    status: {
      closed:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/closed_status.json",
      longterm:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/longterm_status.json",
      regular:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/regular_status.json",
    },
  },
  travis: {
    usage: "https://conda-forge.herokuapp.com/status-monitor/report/travis-ci",
  },
  versions:
    "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/version_status.json",
};
