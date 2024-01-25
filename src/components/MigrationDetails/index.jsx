import { React, useEffect, useState } from "react";
import { Redirect, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { urls } from "@site/src/constants";

export default function Home() {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const [state, setState] = useState({
    name: location.pathname.replace("/status/migration", "").split("/").pop(),
    details: null,
    redirect: false,
  });
  useEffect(() => {
    if (!state.name) return setState((prev) => ({ ...prev, redirect: true }));
    void (async () => {
      try {
        const url = urls.migrations.details.replace("<NAME>", state.name);
        const fetched = await (await fetch(url)).json();
        setState((prev) => ({ ...prev, details: fetched }));
      } catch (error) {
        console.warn(`error loading migration: ${state.name}`, error);
        setState((prev) => ({ ...prev, redirect: true }));
      }
    })();
  }, []);
  console.log("state.details", state.details);
  if (state.redirect) return <Redirect to="/status" />;
  return (
    <Layout
      title={siteConfig.title}
      description="Status dashboard for conda-forge"
    >
      <main>
        <div className="card margin-top--xs">
          <div className="card__header">
            <Breadcrumbs>{state.name}</Breadcrumbs>
          </div>
          <div className="card__body">Migration details: {state.name}</div>
        </div>
      </main>
    </Layout>
  );
}

function Breadcrumbs(props) {
  const status = "/status";
  const migrations = "/status#migrations";
  return (
    <nav aria-label="breadcrumbs">
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="/">
            conda-forge
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href={status}>
            Status
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href={migrations}>
            Migrations
          </a>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--active">
          <a className="breadcrumbs__link" href="">
            {props.children}
          </a>
        </li>
      </ul>
    </nav>
  );
}
