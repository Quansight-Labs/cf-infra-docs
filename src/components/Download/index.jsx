import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import styles from "./styles.module.css";

export default function Download() {
    const downloads = [
        {
            os: "macOS",
            arch: "arm64 (Apple Silicon)",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh",
            image: "img/download/apple.svg",
        },
        {
            os: "macOS",
            arch: "x86_64 (Intel)",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-x86_64.sh",
            image: "img/download/apple.svg",
        },
        {
            os: "Linux",
            arch: "x86_64 (amd64)",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh",
            image: "img/download/linux.svg",
        },
        {
            os: "Linux",
            arch: "aarch64 (arm64)",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh",
            image: "img/download/linux.svg",
        },
        {
            os: "Linux",
            arch: "ppc64le (POWER8/9)",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-ppc64le.sh",
            image: "img/download/linux.svg",
        },
        {
            os: "Windows",
            arch: "x86_64",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe",
            image: "img/download/windows.svg",
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
                <div className={styles.card}>
                {downloads.map(({ os, arch, href, image }, index) => (
                <Link to={href} key={index}>
                    <div className={styles.cardWrapper}>
                    <ThemedImage
                        className={styles.image}
                        alt={`${os} logo`}
                        title={`Download miniforge installer for ${os} ${arch}`}
                        sources={{
                        light: useBaseUrl(`${image}`),
                        dark: useBaseUrl(`${image}`),
                        }}
                        width={200}
                        height={100}
                    />
                    <div style={{
                        fontSize: '1.3em',
                        fontWeight: 'bold',
                        width: '100%'}}><p>{os}</p><code>{arch}</code></div>
                    </div>
                </Link>
                ))}
                </div>
            </div>
        </div>
    );
}
