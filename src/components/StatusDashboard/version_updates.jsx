import React, { useEffect, useState } from "react";
import { urls } from "../../constants";
import styles from "./styles.module.css";

export default function VersionUpdates({ onLoad }) {
  const [{ collapsed, errored, expanded, errors, queued }, setState] =
    useState({
      collapsed: { queued: true, errored: true },
      expanded: {},
      errored: [],
      errors: {},
      queued: []
    });
  const toggleItem = item => () => setState(prev => (
    { ...prev, expanded: { ...prev.expanded, [item]: !prev.expanded[item] } }
  ));
  const toggleTitle = key => () => setState(prev => (
    { ...prev, collapsed: { ...prev.collapsed, [key]: !prev.collapsed[key] } }
  ));
  useEffect(() => {
    void (async () => {
      try {
        const fetched = await (await fetch(urls.versions.api)).json();
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
            onClick={toggleTitle('queued')}
            className={
              styles.version_updates_title + " " +
              (collapsed.queued ? styles.collapsed : styles.expanded)
            }>
            Queued Version Updates
          </div>
          <div
            className={styles.version_updates_content}
            style={collapsed.queued ?
              { display: "none" } :
              { display: "flex", flexDirection: "row" }
            }>
            {queued.map((item, index) => (
              <div key={index} className={styles.queued_item}>
                <a href={urls.versions.pr.replace("<NAME>", item)}>{item}</a>
              </div>
            ))}
          </div>
          <div
            onClick={toggleTitle('errored')}
            className={
              styles.version_updates_title + " " +
              (collapsed.errored ? styles.collapsed : styles.expanded)
            }>
            Errored Version Updates
          </div>
          <div
            className={styles.version_updates_content}
            style={collapsed.errored ?
              { display: "none" } :
              { display: "flex", flexDirection: "column" }}>
            {errored.map((item, index) => (
              <React.Fragment key={index}>
              <div
                className={
                  styles.errored_item + " " +
                  (expanded[item] ? styles.expanded : styles.collapsed)}
                onClick={toggleItem(item)}>
                <a href={urls.versions.pr.replace("<NAME>", item)}>{item}</a>
              </div>
              <div
                className={styles.errored_item_content}
                style={{
                  display: !expanded[item] && "none"
                }}>
                <pre>{errors[item]}</pre>
              </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
