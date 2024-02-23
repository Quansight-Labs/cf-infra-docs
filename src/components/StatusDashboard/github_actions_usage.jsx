import { charts, urls } from "@site/src/constants";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./styles.module.css";

export default function GitHubActionsUsage({ onLoad }) {
  const [state, setState] = useState({ total: 0, rates: {}, repos: {} });
  useEffect(() => {
    void (async () => {
      try {
        const fetched = await (await fetch(urls.github.actions)).json();
        setState((prev) => ({ ...prev, ...fetched }));
      } catch (error) {
        console.warn("error loading github actions", error);
      }
      onLoad();
    })();
  }, []);
  const data = [];
  const options = charts.usage.options;
  const labels = Object.keys(state.rates).map((rate) => {
    data.push(state.rates[rate]);
    return moment(rate).local();
  });
  return (
    <>
      <div id="github" className={styles.toc_anchor}></div>
      <div id="github_actions_usage" className="card margin-top--xs">
        <div className="card__header">
          <h3>GitHub Actions Usage</h3>
        </div>
        <div className="card__body">
          <p>
            GitHub Actions ran {state.total} actions in the past eight hours.
          </p>
          <Bar data={{ labels, datasets: [{ data }] }} options={options} />
        </div>
      </div>
    </>
  );
}
