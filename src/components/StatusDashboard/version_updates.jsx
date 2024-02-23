import React, { useEffect, useState } from "react";
import { urls } from "../../constants";
import styles from "./styles.module.css";

export default function VersionUpdates({ onLoad }) {
  const [{ collapsed, errored, errors, queued }, setState] = useState({
    collapsed: { queued: false, errored: false },
    errored: [],
    errors: {},
    queued: []
  });
  const toggle = key => () => setState(prev => (
    { ...prev, collapsed: { ...prev.collapsed, [key]: !prev.collapsed[key] } }
  ));
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
      <div className={`card margin-top--xs ${styles.version_updates}`}>
        <div className="card__header">
          <h3>Version Updates</h3>
        </div>
        <div className="card__body">
          There are currently {queued.length} queued and{" "}
          {errored.length} errored version updates.
          <div
            onClick={toggle('queued')}
            className={
              styles.version_updates_title + " " +
              (collapsed.queued ? styles.collapsed : styles.expanded)
            }>
            queued
          </div>
          <div
            className={styles.version_updates_content}
            style={collapsed.queued ? { display: "none" } : { display: "flex" }}>
            {queued.map((item, index) => (
              <div key={index} className={styles.queued_item}>{item}</div>
            ))}
          </div>
          <div
            onClick={toggle('errored')}
            className={
              styles.version_updates_title + " " +
              (collapsed.errored ? styles.collapsed : styles.expanded)
            }>
            errored
          </div>
          <div
            className={styles.version_updates_content}
            style={collapsed.errored ? { display: "none" } : { display: "block" }}>
            errored contents
          </div>
        </div>
      </div>
    </>
  );
}
