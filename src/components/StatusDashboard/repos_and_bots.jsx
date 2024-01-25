import React from "react";
import styles from "./styles.module.css";

export default function ReposAndBots() {
  return (
    <>
      <div id="repos" className={styles.toc_anchor}></div>
      <div id="repos_and_bots" className="card margin-top--xs">
        <div className="card__header">
          <h3>Repos and Bots</h3>
        </div>
        <div className="card__body">Repos and Bots information</div>
      </div>
    </>
  );
}
