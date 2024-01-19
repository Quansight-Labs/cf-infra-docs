import { useLocation } from "@docusaurus/router";
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
import { React, useEffect } from "react";
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
  const { hash } = useLocation();
  useEffect(() => {
    const id = hash.length > 1 ? hash.substring(1) : "";
    if (id) {
      document.getElementById(id)?.scrollIntoView();
    }
  }, [hash]);
  return (
    <main className={["container", styles.dashboard].join(" ")}>
      <div className="row">
        <div className="col col--2">
          <TOC />
        </div>
        <div className="col col--10">
          <div id="incidents" className={styles.toc_anchor}></div>
          <Incidents />
          <div id="repos" className={styles.toc_anchor}></div>
          <ReposAndBots />
          <div id="cloud" className={styles.toc_anchor}></div>
          <CloudServices />
          <div id="migrations" className={styles.toc_anchor}></div>
          <CurrentMigrations />
          <div id="version" className={styles.toc_anchor}></div>
          <VersionUpdates />
          <div id="azure" className={styles.toc_anchor}></div>
          <AzurePipelineUsage />
          <div id="github" className={styles.toc_anchor}></div>
          <GitHubActionsUsage />
          <div id="travis" className={styles.toc_anchor}></div>
          <TravisCIUsage />
        </div>
      </div>
    </main>
  );
}
