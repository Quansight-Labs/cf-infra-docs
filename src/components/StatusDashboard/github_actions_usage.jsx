import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { charts, urls } from "../../constants";

export default function GitHubActionsUsage() {
  const [pipeline, setPipeline] = useState({ total: 0, rates: {}, repos: {} });
  useEffect(() => {
    const load = async () => {
      try {
        setPipeline(await (await fetch(urls.github.actions)).json());
      } catch (error) {
        console.log("error", error);
      }
    };
    if (pipeline.total === 0) {
      void load();
    }
  });
  const data = [];
  const options = charts.usage.options;
  const labels = Object.keys(pipeline.rates).map((rate) => {
    data.push(pipeline.rates[rate]);
    return moment(rate).local();
  });
  return (
    <div id="github_actions_usage" className="card margin-top--xs">
      <div className="card__header">
        <h3>GitHub Actions Uage</h3>
      </div>
      <div className="card__body">
        <p>
          GitHub Actions ran {pipeline.total} actions in the past eight hours.
        </p>
        <Bar data={{ labels, datasets: [{ data }] }} options={options} />
      </div>
    </div>
  );
}
