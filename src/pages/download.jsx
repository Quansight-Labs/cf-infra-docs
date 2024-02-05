import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Download from "@site/src/components/Download";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="Download page for conda-forge infrastructure"
        >
            <main>
                <Download />
            </main>
        </Layout>
    );
}
