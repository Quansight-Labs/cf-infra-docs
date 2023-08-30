import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from "@site/src/components/Header";
import About from "@site/src/components/About";

//import styles from "./modules/index.module.css";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="Documentation for conda-forge infrastructure"
        >
            <main>
                <Header />
                <About />
            </main>
        </Layout>
    );
}
