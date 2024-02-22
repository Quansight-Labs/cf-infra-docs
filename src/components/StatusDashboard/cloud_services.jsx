import { urls } from "@site/src/constants";
import { React, useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function CloudServices({ onLoad }) {
  useEffect(() => {
    void onLoad();
  }, []);
  return (
    <>
      <div id="cloud" className={styles.toc_anchor}></div>
      <div id="cloud_services" className="card margin-top--xs">
        <div className="card__header">
          <h3>Cloud Services</h3>
        </div>
        <div className="card__body">
          <table style={{ fontSize: "small" }}>
            <tbody>
              {Object.keys(urls.cloud).map((service, index) =>
                <Status key={index} {...urls.cloud[service]} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Status({ api, link, title }) {
  const [state, setState] = useState({ status: "..." });
  useEffect(() => {
    void (async () => {
      try { // to fetch the api URL.
        const text = await (await fetch(api)).text();
        try { // to parse as JSON.
          setState({ status: JSON.parse(text).status });
        } catch (error) {
          if (error instanceof SyntaxError) try { // to parse as HTML.
            const doc = (new DOMParser()).parseFromString(text, "text/html");
            const status = doc.querySelector(".status .font-large").textContent;
            setState({ status: status.trim() });
          } catch (error) {
            console.warn(`error parsing HTML for ${title} – ${api}`, error);
          } else {
            console.warn(`error parsing JSON for ${title} – ${api}`, error);
          }
        }
      } catch (error) {
        console.warn(`error fetching ${title} – ${api}`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td><a href={link}>{title}</a></td>
      <td>{state.status}</td>
    </tr>
  );
}
