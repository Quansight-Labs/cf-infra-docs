import { React, useEffect } from "react";
import styles from "./styles.module.css";

export default function CloudServices({ onLoad }) {
  useEffect(() => void onLoad(), []);
  return (
    <>
      <div id="cloud" className={styles.toc_anchor}></div>
      <div id="cloud_services" className="card margin-top--xs">
        <div className="card__header">
          <h3>Cloud Services</h3>
        </div>
        <div className="card__body">Cloud Services information</div>
      </div>
    </>
  );
}
