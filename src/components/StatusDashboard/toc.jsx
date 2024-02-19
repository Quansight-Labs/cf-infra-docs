import React from "react";
import styles from "./styles.module.css";

export default function TOC() {
  return (
    <aside className={styles.status_dashboard_toc}>
      <ul>
        <li>
          <a href="#repos">Repos and Bots</a>
        </li>
        <li>
          <a href="#cloud">Cloud Services</a>
        </li>
        <li>
          <a href="#migrations">Current Migrations</a>
        </li>
        <li>
          <a href="#version">Version Updates</a>
        </li>
        <li>
          <a href="#azure">Azure Pipelines Usage</a>
        </li>
        <li>
          <a href="#github">GitHub Actions Usage</a>
        </li>
        <li>
          <a href="#travis">Travis CI Usage</a>
        </li>
        <li>
          <a href="#incidents">Incidents</a>
        </li>
      </ul>
    </aside>
  );
}
