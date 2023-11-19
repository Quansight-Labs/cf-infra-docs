import React, { useEffect, useState } from "react";
import { urls } from "../../constants";

export default function VersionUpdates() {
  const [state, setState] = useState({
    errored: [],
    errors: {},
    queued: [],
    loaded: false,
  });
  useEffect(() => {
    if (state.loaded) {
      return;
    }
    void (async () => {
      try {
        const fetched = await (await fetch(urls.versions)).json();
        setState((prev) => ({ ...prev, ...fetched, loaded: true }));
      } catch (error) {
        console.log("error loading version updates", error);
      }
    })();
  });

  return (
    <div id="version_updates" className="card margin-top--xs">
      <div className="card__header">
        <h3>Version Updates</h3>
      </div>
      <div className="card__body">
        There are currently {state.queued.length} queued and{" "}
        {state.errored.length} errored version updates.
      </div>
    </div>
  );
}
