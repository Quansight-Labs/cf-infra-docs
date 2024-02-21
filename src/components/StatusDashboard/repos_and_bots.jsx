import { urls } from "@site/src/constants";
import { React, useEffect, useState } from "react";
import styles from "./styles.module.css";

// If the CDN status is updated within this window (20 minutes),
// the status is operational.
const OPERATIONAL_WINDOW = 20 * 60 * 1000;

// If the CDN status is updated within this window (40 minutes),
// the status is degraded.
const DEGRADED_WINDOW = 40 * 60 * 1000;

export default function ReposAndBots({ onLoad }) {
  useEffect(() => void onLoad(), []);
  return (
    <>
      <div id="repos" className={styles.toc_anchor}></div>
      <div className="card margin-top--xs">
        <div className="card__header">
          <h3>Repos and Bots</h3>
        </div>
        <table style={{ fontSize: "small", margin: 20 }}>
          <tbody>
            <Badge
              badge="https://github.com/conda-forge/conda-forge.github.io/workflows/deploy/badge.svg"
              badgeLink="https://github.com/conda-forge/conda-forge.github.io/actions?query=workflow%3Adeploy"
              link="https://github.com/conda-forge/conda-forge.github.io">
              conda-forge documentation
            </Badge>
            <Badge
              badge="https://github.com/regro/cf-scripts/actions/workflows/bot-bot.yml/badge.svg"
              badgeLink="https://github.com/regro/cf-scripts/actions"
              link="https://github.com/regro/cf-scripts">
              autotick bot
            </Badge>
            <Badge
              badge="https://github.com/conda-forge/admin-requests/actions/workflows/create_feedstocks.yml/badge.svg"
              badgeLink="https://github.com/conda-forge/admin-requests/actions/workflows/create_feedstocks.yml"
              link="https://github.com/conda-forge/staged-recipes">
              staged-recipes migrations
            </Badge>
            <WebServices />
            <Badge
              badge="https://github.com/conda-forge/admin-migrations/actions/workflows/migrate.yml/badge.svg"
              badgeLink="https://github.com/conda-forge/admin-migrations/actions/workflows/migrate.yml"
              link="https://github.com/regro/libcfgraph">
              admin migrations
            </Badge>
            <Badge
              badge="https://dl.circleci.com/status-badge/img/gh/regro/libcfgraph/tree/master.svg?style=svg"
              badgeLink="https://circleci.com/gh/regro/libcfgraph"
              link="https://github.com/regro/libcfgraph">
              libcfgraph
            </Badge>
            <CDNStatus />
          </tbody>
        </table>
      </div>
    </>
  );
}

function Badge({ children, link, badge, badgeLink }) {
  return (
    <tr>
      <td><a href={link}>{children}</a></td>
      <td>
        <Image alt={`${children} status`} link={badgeLink}>{badge}</Image>
      </td>
    </tr>
  );
}

function Image({ alt, link, children }) {
  const [error, setState] = useState(false);
  if (error) return (<>No status available</>);
  const image = (
    <img
      alt={alt}
      onError={() => setState(true)}
      src={children}
      style={{ verticalAlign: "bottom" }} />
  );
  return link ? <a href={link}>{image}</a> : image;
}

function CDNStatus() {
  const [state, setState] = useState({ minutes: 0, status: '...' });
  useEffect(() => {
    void (async () => {
      try {
        const url = urls.repos.cdn;
        const response = (await (await fetch(url)).text()).trim();
        const updated = new Date(response).getTime();
        const delta = (new Date()).getTime() - updated;
        const status = delta < OPERATIONAL_WINDOW ?
          'operational' :
          delta < DEGRADED_WINDOW ?
          'degraded' :
          'major outage';
        setState({ minutes: Math.round(delta / 1000 / 60), status });
      } catch (error) {
        console.warn(`error loading cdn cloning status`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td>
      <a href="https://conda-static.anaconda.org/conda-forge/rss.xml">
        CDN cloning
      </a>
      </td>
      <td>{state.status} (last updated {state.minutes} min ago)</td>
    </tr>
  );
}

function WebServices() {
  const [status, setState] = useState('');
  useEffect(() => {
    void (async () => {
      try {
        const url = urls.repos.services;
        const { status } = await (await fetch(url)).json();
        setState(status);
      } catch (error) {
        console.warn(`error loading web services status`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td>
        <a href="https://github.com/conda-forge/conda-forge-webservices">admin web services</a>
      </td>
      <td>{status}</td>
  </tr>
  );
}
