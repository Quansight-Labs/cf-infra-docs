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
            <CDNStatus />
            <WebServices />
            {urls.repos.badges.map(({ name, ...badge }, index) =>
              <Badge key={index} {...badge}>{name}</Badge>)}
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
  const onError = () => setState(true);
  if (error) return (<>No status available</>);
  const image = (
    <img alt={alt} className={styles.badge} onError={onError} src={children} />
  );
  return link ? <a href={link}>{image}</a> : image;
}

function CDNStatus() {
  const [state, setState] = useState({ minutes: 0, status: '...' });
  useEffect(() => {
    void (async () => {
      try {
        const response = await (await fetch(urls.repos.cdn.api)).text();
        const updated = new Date(response.trim()).getTime();
        const delta = (new Date()).getTime() - updated;
        const status = delta < OPERATIONAL_WINDOW ? 'operational' :
          delta < DEGRADED_WINDOW ? 'degraded' : 'major outage';
        setState({ minutes: Math.round(delta / 1000 / 60), status });
      } catch (error) {
        console.warn(`error loading cdn cloning status`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td><a href={urls.repos.cdn.link}>CDN cloning</a></td>
      <td>{state.status} (last updated {state.minutes} min ago)</td>
    </tr>
  );
}

function WebServices() {
  const [status, setState] = useState('');
  useEffect(() => {
    void (async () => {
      try {
        const { status } = await (await fetch(urls.repos.services.api)).json();
        setState(status);
      } catch (error) {
        console.warn(`error loading web services status`, error);
      }
    })();
  }, []);
  return (
    <tr>
      <td><a href={urls.repos.services.link}>admin web services</a></td>
      <td>{status}</td>
    </tr>
  );
}
