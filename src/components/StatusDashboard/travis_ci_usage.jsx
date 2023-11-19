import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { charts, urls } from "../../constants";

export default function TravisCIUsage() {
  const [state, setState] = useState({
    rates: {},
    repos: {},
    total: 0,
    loaded: false,
  });
  useEffect(() => {
    if (state.loaded) {
      return;
    }
    void (async () => {
      try {
        const fetched = await (await fetch(urls.travis.usage)).json();
        setState((prev) => ({ ...prev, ...fetched, loaded: true }));
      } catch (error) {
        console.warn("error loading travis ci usage", error);
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
    <div id="travis_ci_usage" className="card margin-top--xs margin-bottom--xs">
      <div className="card__header">
        <h3>Travis CI Usage</h3>
      </div>
      <div className="card__body">
        <p>Travis CI ran {state.total} jobs in the past eight hours.</p>
        <Bar data={{ labels, datasets: [{ data }] }} options={options} />
      </div>
    </div>
  );
}
