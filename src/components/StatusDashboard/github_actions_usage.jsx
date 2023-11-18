import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { charts, urls } from "../../constants";

export default function GitHubActionsUsage() {
  const [state, setState] = useState({
    loaded: false,
    total: 0,
    rates: {},
    repos: {},
  });
  useEffect(() => {
    if (state.loaded) {
      return;
    }
    void (async () => {
      try {
        setState({
          ...state,
          ...(await (await fetch(urls.github.actions)).json()),
          loaded: true,
        });
      } catch (error) {
        console.log("error loading github actions", error);
      }
    })();
  });
  const data = [];
  const options = charts.usage.options;
  const labels = Object.keys(state.rates).map((rate) => {
    data.push(state.rates[rate]);
    return moment(rate).local();
  });
  return (
    <div id="github_actions_usage" className="card margin-top--xs">
      <div className="card__header">
        <h3>GitHub Actions Uage</h3>
      </div>
      <div className="card__body">
        <p>GitHub Actions ran {state.total} actions in the past eight hours.</p>
        <Bar data={{ labels, datasets: [{ data }] }} options={options} />
      </div>
    </div>
  );
}
