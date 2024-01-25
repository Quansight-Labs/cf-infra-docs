import React, { useEffect, useState } from "react";
import { urls } from "../../constants";
import styles from "./styles.module.css";

export default function VersionUpdates({ onLoad }) {
  const [state, setState] = useState({ errored: [], errors: {}, queued: [] });
  useEffect(() => {
    void (async () => {
      try {
        const fetched = await (await fetch(urls.versions)).json();
        setState((prev) => ({ ...prev, ...fetched }));
      } catch (error) {
        console.warn("error loading version updates", error);
      }
      onLoad();
    })();
  }, []);
  return (
    <>
      <div id="version" className={styles.toc_anchor}></div>
      <div id="version_updates" className="card margin-top--xs">
        <div className="card__header">
          <h3>Version Updates</h3>
        </div>
        <div className="card__body">
          There are currently {state.queued.length} queued and{" "}
          {state.errored.length} errored version updates.
        </div>
      </div>
    </>
  );
}
