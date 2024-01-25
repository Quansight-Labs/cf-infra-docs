import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { charts, urls } from "../../constants";

export default function AzurePipelinesUsage() {
  const [state, setState] = useState({ rates: {}, repos: {}, total: 0 });
  useEffect(() => {
    void (async () => {
      try {
        const fetched = await (await fetch(urls.azure.pipelines)).json();
        setState((prev) => ({ ...prev, ...fetched }));
      } catch (error) {
        console.log("error loading azure pipelines", error);
      }
    })();
  }, []);
  const data = [];
  const options = charts.usage.options;
  const labels = Object.keys(state.rates).map((rate) => {
    data.push(state.rates[rate]);
    return moment(rate).local();
  });
  return (
    <div id="azure_pipelines_usage" className="card margin-top--xs">
      <div className="card__header">
        <h3>Azure Pipelines usage</h3>
      </div>
      <div className="card__body">
        <p>Azure Pipelines ran {state.total} jobs in the past eight hours.</p>
        <Bar data={{ labels, datasets: [{ data }] }} options={options} />
      </div>
    </div>
  );
}
