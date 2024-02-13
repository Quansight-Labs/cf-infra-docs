import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import styles from "./styles.module.css";

export default function Download() {
    const downloads = [
        {
            os: "Linux",
            arch: "x86_64\n(amd64)",
            icon: "fa-brands fa-linux",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh",
            image: "img/download/linux.svg",
        },
        {
            os: "Linux",
            arch: "aarch64\n(arm64)",
            icon: "fa-brands fa-linux",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-aarch64.sh",
            image: "img/download/linux.svg",
        },
        {
            os: "Linux",
            arch: "ppc64le\n(POWER8/9)",
            icon: "fa-brands fa-linux",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-ppc64le.sh",
            image: "img/download/linux.svg",
        },
        {
            os: "macOS",
            arch: "arm64\n(Apple Silicon)",
            icon: "fa-brands fa-apple",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh",
            image: "img/download/apple.svg",
        },
        {
            os: "macOS",
            arch: "x86_64\n(Intel)",
            icon: "fa-brands fa-apple",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-x86_64.sh",
            image: "img/download/apple.svg",
        },
        {
            os: "Windows",
            arch: "x86_64",
            icon: "fa-brands fa-windows",
            href: "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe",
            image: "img/download/windows.svg",
        }
    ];
/*
    name: "Anaconda",
    link: "https://www.anaconda.com/",
    light: "img/supporters/anaconda_light.svg",
    dark: "img/supporters/anaconda_dark.svg",
    width: 250,
*/
    return (
        <div className={[styles.header, styles.section_padding].join(" ")}>
            <div className={styles.header_image} style={{
                // backgroundColor: 'yellow'
            }}>
                <ThemedImage
                    alt="3D-Anvil illustration for conda-forge"
                    sources={{
                        light: useBaseUrl("/img/anvil-light.svg"),
                        dark: useBaseUrl("/img/anvil-dark.svg"),
                    }}
                />
            </div>
            <div className={styles.header_content}>

                {/* <div>
                    <p>Latest installers with Python 3.10 <code>(*)</code> in the base environment:</p>
                    {downloads.map(({ os, arch, icon, href }, index) => (
                        <Link key={index} href={href}>
                            <button><i className={icon}></i>{` ${os} – ${arch}`}</button>
                        </Link>
                    ))}
                </div> */}
                <div className={styles.card}>
                {downloads.map(({ os, arch, href, image }, index) => (
                <Link to={href} key={index}>
                    <div className={styles.cardWrapper}>
                    <ThemedImage
                        className={styles.image}
                        alt={`${os} logo`}
                        title={`Download miniforge for ${os} ${arch}`}
                        sources={{
                        light: useBaseUrl(`${image}`),
                        dark: useBaseUrl(`${image}`),
                        }}
                        width={200}
                        height={100}
                    />
                    <div>{os}{'\n'}{arch}</div>
                    </div>
                </Link>
                ))}
                </div>
            </div>
        </div>
    );
}
