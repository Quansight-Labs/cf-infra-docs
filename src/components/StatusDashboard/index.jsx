import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import React from "react";
import AzurePipelineUsage from "./azure_pipelines_usage";
import CloudServices from "./cloud_services";
import CurrentMigrations from "./current_migrations";
import GitHubActionsUsage from "./github_actions_usage";
import Incidents from "./incidents";
import ReposAndBots from "./repos_and_bots";
import styles from "./styles.module.css";
import TOC from "./toc";
import TravisCIUsage from "./travis_ci_usage";
import VersionUpdates from "./version_updates";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export default function StatusDashboard() {
  return (
    <main className={["container", styles.dashboard].join(" ")}>
      <div className="row">
        <div className="col col--2">
          <TOC />
        </div>
        <div className="col col--10">
          <span id="incidents_anchor" style={styles.toc_anchor}></span>
          <Incidents />
          <span id="repos_anchor" style={styles.toc_anchor}></span>
          <ReposAndBots />
          <span id="cloud_anchor" style={styles.toc_anchor}></span>
          <CloudServices />
          <span id="migrations_anchor" style={styles.toc_anchor}></span>
          <CurrentMigrations />
          <span id="version_anchor" style={styles.toc_anchor}></span>
          <VersionUpdates />
          <span id="azure_anchor" style={styles.toc_anchor}></span>
          <AzurePipelineUsage />
          <span id="github_anchor" style={styles.toc_anchor}></span>
          <GitHubActionsUsage />
          <span id="travis_anchor"></span>
          <TravisCIUsage />
        </div>
      </div>
    </main>
  );
}
