import { React, useEffect } from "react";
import { Octokit } from "octokit";
import styles from "./styles.module.css";

const BAD_LABELS = new Map([
  ["investigating", null],
  ["degraded performance", null],
  ["major outage", null],
  ["maintenance", null]
]);

export default function Incidents({ onLoad }) {
  useEffect(() => {
    (async () => {
      const octokit = new Octokit({});
      try {
        const issues = await octokit.rest.issues.listForRepo({
          owner: "conda-forge",
          repo: "status",
          state: "all",
          per_page: 100
        });
        console.log("issues", issues.data.map(({ labels }) => (labels)));
      } catch (error) {
        console.warn(`error loading github issues`, error);
      }
      onLoad();
    })();
  }, []);
  return (
    <>
      <div id="incidents" className={styles.toc_anchor}></div>
      <div className="card margin-top--xs">
        <div className="card__header">
          <h3>Incidents</h3>
        </div>
        <div className="card__body">Incidents information</div>
      </div>
    </>
  );
}
