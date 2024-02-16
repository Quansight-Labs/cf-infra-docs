import { React, useEffect, useState } from "react";
import { Octokit } from "octokit";
import styles from "./styles.module.css";

// The GitHub repository with relevant issues.
const REPO = { owner: "conda-forge", repo: "status" };

// Incident labels we care about.
const BAD_LABELS = new Set([
  "investigating",
  "degraded performance",
  "major outage",
  "maintenance"
]);

// Time period  we care about: 90 days – in milliseconds.
const PERIOD = 90 * 24 * 60 * 60 * 1000;

export default function Incidents({ onLoad }) {
  const [{ closed, current, open }, setState] = useState(
    { closed: [], current: new Set(), open: [] }
  );
  useEffect(() => {
    (async () => {
      const octokit = new Octokit({});
      try {
        const issues = await octokit.rest.issues.listForRepo({
          ...REPO,
          per_page: 100,
          state: "all"
        });
        const era = Date.now() - PERIOD;
        const open = [];
        const closed = [];
        let current = new Set();
        for (const issue of issues.data) {
          const labels = new Set(issue.labels.map(({ name }) => name));

          // If the issue is not an incident, bail.
          const incident = intersection(labels, BAD_LABELS);
          if (!incident.size) continue;

          const severity = incident.keys().next().value;
          if (issue.state === "open") {
            current = union(current, incident);
            open.push({ ...issue, severity });
          } else if (era < new Date(issue.closed_at).getTime()) {
            closed.push({ ...issue, severity });
          }
        }
        setState({ closed, current, open });
      } catch (error) {
        console.warn(`error loading github issues`, error);
      }
      onLoad();
    })();
  }, []);
  const status = Array.from(current).join(', ')
  return (
    <>
      <div id="incidents" className={styles.toc_anchor}></div>
      <div className="card margin-top--xs">
        <div className="card__header">
          <h3>Incidents {status && `(${status})`}</h3>
        </div>
        <div className="card__body">
          {open.map((issue, i) => <Incident key={i}>{issue}</Incident>)}
          {closed.map((issue, i) => <Incident key={i}>{issue}</Incident>)}
        </div>
      </div>
    </>
  );
}

function Incident({ children }) {
  const issue = children;
  console.log('issue', issue);
  return (
    <pre>({issue.state}) {issue.severity}</pre>
  );
}

const intersection = (one, two) => {
  const intersection = new Set();
  one.forEach(item => { if (two.has(item)) intersection.add(item); });
  return intersection;
}

const union = (one, two) => {
  const union = new Set();
  one.forEach(item => union.add(item));
  two.forEach(item => union.add(item));
  return union;
}
