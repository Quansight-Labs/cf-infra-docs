import React from "react";
import styles from "./styles.module.css";

export default function TOC() {
  return (
    <aside className={styles.status_dashboard_toc}>
      <ul>
        <li>
          <a href="#incidents_anchor">Incidents</a>
        </li>
        <li>
          <a href="#repos_anchor">Repos and Bots</a>
        </li>
        <li>
          <a href="#cloud_anchor">Cloud Services</a>
        </li>
        <li>
          <a href="#migrations_anchor">Current Migrations</a>
        </li>
        <li>
          <a href="#version_anchor">Version Updates</a>
        </li>
        <li>
          <a href="#azure_anchor">Azure Pipelines Usage</a>
        </li>
        <li>
          <a href="#github_anchor">GitHub Actions Usage</a>
        </li>
        <li>
          <a href="#travis_anchor">Travis CI Usage</a>
        </li>
      </ul>
    </aside>
  );
}
