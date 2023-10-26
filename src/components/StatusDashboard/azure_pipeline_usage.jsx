import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { urls } from "../../urls";

export default function AzurePipelineUsage() {
  const [pipeline, setPipeline] = useState({ total: 0, rates: {}, repos: {} });
  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(urls.azure.pipelines);
        setPipeline(await response.json());
      } catch (error) {
        console.log("error", error);
      }
    };
    if (pipeline.total === 0) {
      void load();
    }
  });
  const rates = [];
  const labels = Object.keys(pipeline.rates).map((rate) => {
    rates.push(pipeline.rates[rate]);
    return moment(rate).local();
  });
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        type: "time",
        time: {
          minUnit: "hour",
        },
      },
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };
  return (
    <div id="azure_pipeline_usage" className="card margin-top--xs">
      <div className="card__header">
        <h3>Azure Pipeline usage</h3>
      </div>
      <div className="card__body">
        <p>
          Azure Pipelines ran {pipeline.total} jobs in the past eight hours.
        </p>
        <Bar data={{ labels, datasets: [{ data: rates }] }} options={options} />
      </div>
    </div>
  );
}
