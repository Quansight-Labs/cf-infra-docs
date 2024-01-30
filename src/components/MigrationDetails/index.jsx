import { React, useEffect, useState } from "react";
import { Redirect, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { urls } from "@site/src/constants";
import styles from "./styles.module.css";

const VIEW_KEY = "migration-toggle";

export function measureProgress(details) {
  const done = details["done"].length + details["in-pr"].length;
  const total =
    done +
    details["awaiting-parents"].length +
    details["awaiting-pr"].length +
    details["bot-error"].length +
    details["not-solvable"].length;
  const percentage = (done / (total || 1)) * 100;
  return { done, percentage, total };
}

export default function MigrationDetails() {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const [state, setState] = useState({
    name: location.pathname.replace("/status/migration", "").split("/").pop(),
    details: null,
    redirect: false,
    view: "table",
  });
  const toggle = (view) => {
    if (window && window.localStorage) {
      try {
        window.localStorage.setItem(VIEW_KEY, view);
      } catch (error) {
        console.warn(`error writing to local storage`, error);
      }
    }
    setState((prev) => ({ ...prev, view }));
  };
  useEffect(() => {
    if (!state.name) return setState((prev) => ({ ...prev, redirect: true }));
    let view = "";
    if (window && window.localStorage) {
      try {
        view = window.localStorage.getItem(VIEW_KEY);
      } catch (error) {
        console.warn(`error reading from local storage`, error);
      }
    }
    void (async () => {
      try {
        const url = urls.migrations.details.replace("<NAME>", state.name);
        const details = await (await fetch(url)).json();
        details.progress = measureProgress(details);
        setState((prev) => ({ ...prev, details, view: view || prev.view }));
      } catch (error) {
        console.warn(`error loading migration: ${state.name}`, error);
        setState((prev) => ({ ...prev, redirect: true }));
      }
    })();
  }, []);
  if (state.redirect) return <Redirect to="/status" />;
  const { details, name, view } = state;
  return (
    <Layout
      title={siteConfig.title}
      description="Status dashboard for conda-forge"
    >
      <main className={`container ${styles.migration_details}`}>
        <div className={`card margin-top--xs`}>
          <div className="card__header">
            <div className={styles.migration_details_toggle}>
              <button onClick={() => toggle("table")}>Table View</button>{" "}
              <button onClick={() => toggle("graph")}>Graph View</button>
            </div>
            <Breadcrumbs>{name}</Breadcrumbs>
            <div style={{ clear: "both" }}></div>
          </div>
          <div className="card__body">
            <DetailsBody details={details} view={view} name={name} />
          </div>
        </div>
      </main>
    </Layout>
  );
}

function Bar({ details: {progress} }) {
  return (<h4>Completion rate {progress.percentage.toFixed(0)}%</h4>);
}

function Breadcrumbs({ children }) {
  return (
    <nav aria-label="breadcrumbs">
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="/">
            conda-forge
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="/status">
            Status
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="/status#migrations">
            Migrations
          </a>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--active">
          <a className="breadcrumbs__link" href="">
            {children}
          </a>
        </li>
      </ul>
    </nav>
  );
}

function DetailsBody({ details, name, view }) {
  if (!details) return <>{name}...</>;
  return (
    <>
      <Bar details={details} />
      {view === "graph" ? <Graph>{name}</Graph> : <Table details={details} />}
    </>
  );
}

function Filters() {
  return (<h4>Filters</h4>)
}

function Graph(props) {
  const [error, setState] = useState("");
  const url = urls.migrations.graph.replace("<NAME>", props.children);
  const onError = (error) => setState(error);
  return (
    <div>
      {error ? `Graph is unavailable.` : <img onError={onError} src={url} />}
    </div>
  );
}

function Table({ details }) {
  console.log('details', details);
  return (
    <>
      <Filters />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Immediate Children</th>
          </tr>
          {details["awaiting-parents"].map((item, index) => (
            <tr key={`${index}-awaiting-parents`}>
              <td>{item}</td>
              <td>Awaiting parents</td>
              <td>...</td>
            </tr>
          ))}
          {details["bot-error"].map((item, index) => (
            <tr key={`${index}-bot-error`}>
              <td>{item}</td>
              <td>Bot error</td>
              <td>...</td>
            </tr>
          ))}
          {details["in-pr"].map((item, index) => (
            <tr key={`${index}-in-pr`}>
              <td>{item}</td>
              <td>In PR</td>
              <td>...</td>
            </tr>
          ))}
          {details["not-solvable"].map((item, index) => (
            <tr key={`${index}-not-solvable`}>
              <td>{item}</td>
              <td>Not solvable</td>
              <td>...</td>
            </tr>
          ))}
        </thead>
      </table>
    </>
  );
}
