// The chart.js configuration defaults for the status dashboard.
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

// All of the JSON contents services that populate the page are stored here.
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
    details:
      "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/migration_json/<NAME>.json",
    graph:
      "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/migration_svg/<NAME>.svg?sanitize=true",
    status: {
      closed:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/closed_status.json",
      longterm:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/longterm_status.json",
      regular:
        "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/regular_status.json",
    },
  },
  repos: {
    badges: [
      {
        name: "conda-forge documentation",
        link: "https://github.com/conda-forge/conda-forge.github.io",
        badge: "https://github.com/conda-forge/conda-forge.github.io/workflows/deploy/badge.svg",
        badgeLink: "https://github.com/conda-forge/conda-forge.github.io/actions?query=workflow%3Adeploy"
      },
      {
        name: "autotick bot",
        link: "https://github.com/regro/cf-scripts",
        badge: "https://github.com/regro/cf-scripts/actions/workflows/bot-bot.yml/badge.svg",
        badgeLink: "https://github.com/regro/cf-scripts/actions"
      },
      {
        name: "staged-recipes migrations",
        link: "https://github.com/conda-forge/staged-recipes",
        badge: "https://github.com/conda-forge/admin-requests/actions/workflows/create_feedstocks.yml/badge.svg",
        badgeLink: "https://github.com/conda-forge/admin-requests/actions/workflows/create_feedstocks.yml"
      },
      {
        name: "admin migrations",
        link: "https://github.com/regro/libcfgraph",
        badge: "https://github.com/conda-forge/admin-migrations/actions/workflows/migrate.yml/badge.svg",
        badgeLink: "https://github.com/conda-forge/admin-migrations/actions/workflows/migrate.yml"
      },
      {
        name: "libcfgraph",
        link: "https://github.com/regro/libcfgraph",
        badge: "https://dl.circleci.com/status-badge/img/gh/regro/libcfgraph/tree/master.svg?style=svg",
        badgeLink: "https://circleci.com/gh/regro/libcfgraph"
      }
    ],
    cdn: {
      api: "https://s3.amazonaws.com/conda-static.anaconda.org/conda-forge/last-updated",
      link: "https://conda-static.anaconda.org/conda-forge/rss.xml"
    },
    services: {
      api: "https://conda-forge.herokuapp.com/alive",
      link: ""
    },
  },
  travis: {
    usage: "https://conda-forge.herokuapp.com/status-monitor/report/travis-ci",
  },
  versions:
    "https://raw.githubusercontent.com/regro/cf-graph-countyfair/master/status/version_status.json",
};
