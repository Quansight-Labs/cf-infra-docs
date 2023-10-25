import React from "react";
import AzurePipelineUsage from "./azure_pipeline_usage";
import CloudServices from "./cloud_services";
import CurrentMigrations from "./current_migrations";
import GitHubActionsUsage from "./github_actions_usage";
import Incidents from "./incidents";
import ReposAndBots from "./repos_and_bots";
import styles from "./styles.module.css";
import TOC from "./toc";
import TravisCIUsage from "./travis_ci_usage";
import VersionUpdates from "./version_updates";

export default function StatusDashboard() {
  return (
    <main className={["container", styles.dashboard].join(" ")}>
      <div className="row">
        <div className="col col--2">
          <TOC />
        </div>
        <div className="col col--10">
          <Incidents />
          <ReposAndBots />
          <CloudServices />
          <CurrentMigrations />
          <VersionUpdates />
          <AzurePipelineUsage />
          <GitHubActionsUsage />
          <TravisCIUsage />
        </div>
      </div>
    </main>
  );
}
