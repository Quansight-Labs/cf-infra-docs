import React, { useEffect, useState } from "react";
import { urls } from "../../urls";

export default function VersionUpdates() {
  const [updates, setUpdates] = useState({
    errored: [],
    errors: {},
    queued: [],
  });
  useEffect(() => {
    const load = async () => {
      let updated = {};
      try {
        const response = await fetch(urls.versions);
        updated = await response.json();
      } catch (error) {
        console.log("error", error);
      }
      setUpdates(updated);
    };
    if (updates.errored.length + updates.queued.length === 0) {
      void load();
    }
  });

  return (
    <div id="version_updates" className="card margin-top--xs">
      <div className="card__header">
        <h3>Version Updates</h3>
      </div>
      <div className="card__body">
        There are currently {updates.queued.length} queued and{" "}
        {updates.errored.length} errored version updates.
      </div>
    </div>
  );
}
