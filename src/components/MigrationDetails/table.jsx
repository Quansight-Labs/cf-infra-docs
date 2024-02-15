import Link from "@docusaurus/Link";
import { useState } from "react";
import styles from "./styles.module.css";

const STATUS = {
  "awaiting-parents": "Awaiting parents",
  "bot-error": "Bot error",
  "done": "Done",
  "in-pr": "In PR",
  "not-solvable": "Not solvable",
}

export function Table({ details }) {
  const [filters, setState] = useState({
    "awaiting-parents": false,
    "bot-error": false,
    "done": false,
    "in-pr": false,
    "not-solvable": false,
  });
  const feedstock = details._feedstock_status;
  const items = [
    ...(filters["done"] ? []
      : details["done"]).map(name => ([name, "done"])),
    ...(filters["awaiting-parents"] ? []
      : details["awaiting-parents"]).map(name => ([name, "awaiting-parents"])),
    ...(filters["bot-error"] ? []
      : details["bot-error"]).map(name => ([name, "bot-error"])),
    ...(filters["in-pr"] ? []
      : details["in-pr"]).map(name => ([name, "in-pr"])),
    ...(filters["not-solvable"] ? []
      : details["not-solvable"]).map(name => ([name, "not-solvable"])),
  ];
  return (
    <>
      <Filters
        counts={Object.keys(STATUS).reduce((acc, key) =>
          ({ ...acc, [key]: details[key].length }), {})}
        filters={{ ...filters }}
        onFilter={key => setState(prev => ({ ...prev, [key]: !prev[key] }))} />
      {items.length > 0 && <table>
        <thead>
          <tr>
            <th style={{ width: 150 }}>Name</th>
            <th style={{ width: 150 }}>Status</th>
            <th style={{ flex: 1 }}>Immediate Children</th>
          </tr>
        </thead>
        <tbody>
          {items.map(([name, status], i) =>
              <Row key={i}>{{ feedstock: feedstock[name], name, status }}</Row>
            )}
        </tbody>
      </table>}
    </>
  );
}

function Filters({ counts, filters, onFilter }) {
  const itemClass = styles.migration_details_filter_item;
  const filteredClass = styles.migration_details_filter_item_on;
  return (
    <div className={styles.migration_details_filter}>
      {Object.keys(STATUS).map((key, index) =>
        <div
          className={itemClass + (filters[key] ? "": ` ${filteredClass}`)}
          key={index}
          onClick={() => onFilter(key)}>
          {STATUS[key]} ({counts[key]})
        </div>
      )}
    </div>
  );
}

function Row({ children }) {
  const { feedstock, name, status } = children;
  const url = feedstock["pr_url"];
  return (
  <tr>
    <td>{url ? <Link to={url}>{name}</Link> : name}</td>
    <td>{STATUS[status]}</td>
    <td>
      <ImmediateChildren>{feedstock["immediate_children"]}</ImmediateChildren>
    </td>
  </tr>
  );
}

function ImmediateChildren({ children }) {
  return (<>
    {(children || []).join(', ')}
  </>);
}
