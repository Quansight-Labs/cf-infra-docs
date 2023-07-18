import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from '@site/src/components/Header';

//import styles from "./modules/index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Distribute Artifacts Across OCI Registries With Ease">
      <main>
        <Header />
      </main>
    </Layout>
  );
}