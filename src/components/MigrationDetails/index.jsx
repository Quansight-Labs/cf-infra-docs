import { React, useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { urls } from "@site/src/constants";

export default function Home() {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const [state, setState] = useState({
    name: location.pathname.replace("/status/migration", "").split("/").pop(),
    details: null
  });
  console.log('location', location);
  useEffect(() => {
    if (!state.name || state.details) {
      return;
    }
    const url = urls.migrations.details.replace("<NAME>", state.name);
    void (async () => {
      try {
        const fetched = await (await fetch(url)).json();
        setState((prev) => ({ ...prev, details: fetched }));
      } catch (error) {
        console.warn(`error loading migration: ${state.name}`, error);
      }
    })();
  });
  console.log('state.details', state.details);
  return (
    <Layout
      title={siteConfig.title}
      description="Status dashboard for conda-forge"
    >
      <main>
        <div>Migration details: {state.name}</div>
      </main>
    </Layout>
  );
}
