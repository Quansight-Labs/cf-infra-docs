import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Dashboard from "@site/src/components/Dashboard";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="Documentation for conda-forge infrastructure"
        >
            <Dashboard />
        </Layout>
    );
}
