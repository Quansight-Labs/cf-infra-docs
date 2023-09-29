import React from "react";
import styles from "./styles.module.css";

export default function TOC() {
    return (
    <aside className={styles.status_dashboard_toc}>
        <ul>
            <li>
                <a href="#incidents">Incidents</a>
            </li>
            <li>
                <a href="#repos_and_bots">Repos and Bots</a>
            </li>
            <li>
                <a href="#cloud_services">Cloud Services</a>
            </li>
            <li>
                <a href="#current_migrations">Current Migrations</a>
            </li>
            <li>
                <a href="#version_updates">Version Updates</a>
            </li>
            <li>
                <a href="#azure_pipeline_usage">Azure Pipeline Usage</a>
            </li>
            <li>
                <a href="#github_actions_usage">GitHub Actions Usage</a>
            </li>
            <li>
                <a href="#travis_ci_usage">Travis CI Usage</a>
            </li>
        </ul>
    </aside>
    );
}
