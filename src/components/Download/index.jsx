import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import styles from "./styles.module.css";

export default function Download() {
    const downloads = [
        {
            os: "Linux",
            arch: "x86_64 (amd64)",
            icon: "fa-brands fa-linux",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh"
        },
        {
            os: "Linux",
            arch: "aarch64 (arm64)",
            icon: "fa-brands fa-linux",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh"
        },
        {
            os: "Linux",
            arch: "ppc64le (POWER8/9)",
            icon: "fa-brands fa-linux",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-ppc64le.sh"
        },
        {
            os: "macOS",
            arch: "arm64 (Apple Silicon)",
            icon: "fa-brands fa-apple",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh"
        },
        {
            os: "macOS",
            arch: "x86_64 (Intel)",
            icon: "fa-brands fa-apple",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-x86_64.sh"
        },
        {
            os: "Windows",
            arch: "x86_64",
            icon: "fa-brands fa-windows",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe"
        }
    ];
    return (
        <div className={[styles.header, styles.section_padding].join(" ")}>
            <div className={styles.header_image}>
                <ThemedImage
                    alt="3D-Anvil illustration for conda-forge"
                    sources={{
                        light: useBaseUrl("/img/anvil-light.svg"),
                        dark: useBaseUrl("/img/anvil-dark.svg"),
                    }}
                />
            </div>
            <div className={styles.header_content}>
                <h1>
                    Download an installer
                </h1>
                <div>
                    <p>Latest installers with Python 3.10 <code>(*)</code> in the base environment:</p>
                    {downloads.map(({ os, arch, icon, href }, index) => (
                        <Link key={index} href={href}>
                            <button><i className={icon}></i>{` ${os} – ${arch}`}</button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
