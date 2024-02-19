import Link from "@docusaurus/Link";
import { useState } from "react";
import styles from "./styles.module.css";

export const STATUS = {
  "awaiting-parents": "Awaiting parents",
  "awaiting-pr": "Awaiting PR",
  "bot-error": "Bot error",
  "done": "Done",
  "in-pr": "In PR",
  "not-solvable": "Not solvable",
}

export const ORDERED_STATUS = [
  ["done", styles.migration_details_filter_done],
  ["awaiting-parents", styles.migration_details_filter_awaiting_parents],
  ["awaiting-pr", styles.migration_details_filter_awaiting_pr],
  ["bot-error", styles.migration_details_filter_bot_error],
  ["in-pr", styles.migration_details_filter_in_pr],
  ["not-solvable", styles.migration_details_filter_not_solvable]
];

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
    ...(filters["awaiting-pr"] ? []
      : details["awaiting-pr"]).map(name => ([name, "awaiting-pr"])),
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
      {ORDERED_STATUS.map(([key, className], index) =>
        <div
          className={
            itemClass + ` ${className}` +
            (filters[key] ? "": ` ${filteredClass}`)
          }
          key={index}
          onClick={() => onFilter(key)}>
          {filters[key] ?
            <i style={{ width: 16, float: "left", marginTop: 4, marginLeft: 2 }}
              className="fa-solid fa-filter-circle-xmark"></i> :
            <i style={{ width: 16, float: "left", marginTop: 4, marginLeft: 2 }}
              className="fa-solid fa-filter"></i>} {STATUS[key]} ({counts[key]})
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
