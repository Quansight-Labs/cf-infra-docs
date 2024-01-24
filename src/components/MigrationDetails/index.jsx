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
    loaded: false,
    redirect: false,
  });
  console.log("location", location);
  useEffect(() => {
    if (state.loaded) {
      return;
    }
    setState((prev) => ({ ...prev, loaded: true }));
    const url = urls.migrations.details.replace("<NAME>", state.name);
    void (async () => {
      try {
        const fetched = await (await fetch(url)).json();
        setState((prev) => ({ ...prev, details: fetched }));
      } catch (error) {
        setState((prev) => ({ ...prev, redirect: true }));
        console.warn(`error loading migration: ${state.name}`, error);
      }
    })();
  });
  console.log("state.details", state.details);
  if (!state.loaded) return <main>loading...</main>;
  if (!state.name || state.redirect) {
    return <Redirect to="/status" />;
  }
  return (
    <Layout
      title={siteConfig.title}
      description="Status dashboard for conda-forge"
    >
      <main>
        <div className="card margin-top--xs">
          <div className="card__header">
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
                  <a className="breadcrumbs__link" href="#url">
                    {state.name}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="card__body">Migration details: {state.name}</div>
        </div>
      </main>
    </Layout>
  );
}
