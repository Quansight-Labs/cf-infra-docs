import React, { useEffect, useState } from "react";
import { urls } from "../../urls";

export default function AzurePipelineUsage() {
  const [pipeline, setPipeline] = useState({total: 0, rates: {}, repos: {}});
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
  return (
    <div id="azure_pipeline_usage" className="card margin-top--xs">
      <div className="card__header">
        <h3>Azure Pipeline usage</h3>
      </div>
      <div className="card__body">
        Azure Pipelines ran {pipeline.total} jobs in the past eight hours.
      </div>
    </div>
  );
}
