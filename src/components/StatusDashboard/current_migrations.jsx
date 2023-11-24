import React, { useEffect, useState } from "react";
import { urls } from "../../constants";

function Full({
  closed,
  collapsed,
  longterm,
  regular,
  resort,
  select,
  sort,
  style,
}) {
  return (
    <div className="card__body" style={style}>
      <table>
        <TableContent
          collapsed={collapsed.longterm}
          name="Long-running migrations"
          resort={resort}
          rows={longterm}
          select={() => select("longterm")}
          sort={sort}
        />
        <TableContent
          collapsed={collapsed.regular}
          name="Regular migrations"
          resort={resort}
          rows={regular}
          select={() => select("regular")}
          sort={sort}
        />
        <TableContent
          collapsed={collapsed.closed}
          name="Closed migrations"
          resort={resort}
          rows={closed}
          select={() => select("closed")}
          sort={sort}
        />
      </table>
    </div>
  );
}

function Summary({ closed, longterm, regular, select, style }) {
  return (
    <div className="card__body" style={style}>
      <div className="row">
        <div className="col col--4">
          <div className="migration" onClick={() => select("longterm")}>
            Long-running migrations ({longterm.length || "…"})
          </div>
        </div>
        <div className="col col--4">
          <div className="migration" onClick={() => select("regular")}>
            Regular migrations ({regular.length || "…"})
          </div>
        </div>
        <div className="col col--4">
          <div className="migration" onClick={() => select("closed")}>
            Closed migrations ({closed.length || "…"})
          </div>
        </div>
      </div>
    </div>
  );
}

function TableContent({ collapsed, name, resort, rows, select, sort }) {
  return (
    <>
      <thead>
        <tr onClick={select}>
          <th colSpan="7" className={collapsed ? "collapsed" : undefined}>
            {name}
          </th>
        </tr>
        <tr className={collapsed ? "collapsed" : undefined}>
          <th
            onClick={() => resort("name")}
            className={sort.by === "name" ? sort.order : undefined}
          >
            Name
          </th>
          <th
            onClick={() => resort("status")}
            className={sort.by === "status" ? sort.order : undefined}
          >
            Status
          </th>
          <th
            onClick={() => resort("awaiting-parents")}
            className={sort.by === "awaiting-parents" ? sort.order : undefined}
          >
            Awaiting parents
          </th>
          <th
            onClick={() => resort("awaiting-pr")}
            className={sort.by === "awaiting-pr" ? sort.order : undefined}
          >
            Awaiting PR
          </th>
          <th
            onClick={() => resort("in-pr")}
            className={sort.by === "in-pr" ? sort.order : undefined}
          >
            In PR
          </th>
          <th
            onClick={() => resort("not-solvable")}
            className={sort.by === "not-solvable" ? sort.order : undefined}
          >
            Not solvable
          </th>
          <th
            onClick={() => resort("bot-error")}
            className={sort.by === "bot-error" ? sort.order : undefined}
          >
            Bot error
          </th>
        </tr>
      </thead>
      <tbody className={collapsed ? "collapsed" : undefined}>
        {rows.map((row) => {
          const { progress } = row;
          return (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>
                <label className="progress_bar">
                  <progress value={progress.done} max={progress.total}>
                    {progress.percentage.toFixed(2)}%
                  </progress>
                  <span className="ratio">
                    {progress.done}/{progress.total}
                  </span>
                </label>
              </td>
              <td>{row.details["awaiting-parents"].length}</td>
              <td>{row.details["awaiting-pr"].length}</td>
              <td>{row.details["in-pr"].length}</td>
              <td>{row.details["not-solvable"].length}</td>
              <td>{row.details["bot-error"].length}</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}

export default function CurrentMigrations() {
  const [state, setState] = useState({
    closed: [],
    collapsed: { closed: true, longterm: true, regular: true },
    loaded: false,
    longterm: [],
    regular: [],
    sort: { by: "name", order: "ascending" },
    summary: true,
  });
  const toggle = (event) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, summary: !state.summary }));
  };
  const resort = (by) => {
    setState((prev) => {
      const order =
        by === prev.sort.by
          ? prev.sort.order === "ascending"
            ? "descending"
            : "ascending"
          : "ascending";
      const compare = (field, order) => {
        if (field === "name") {
          if (order === "ascending") {
            return (a, b) => a.name.localeCompare(b.name);
          } else {
            return (a, b) => b.name.localeCompare(a.name);
          }
        }
        if (field === "status") {
          if (order === "ascending") {
            return (a, b) => a.progress.percentage - b.progress.percentage;
          } else {
            return (a, b) => b.progress.percentage - a.progress.percentage;
          }
        }
        if (order === "ascending") {
          return (a, b) => a.details[field].length - b.details[field].length;
        } else {
          return (a, b) => b.details[field].length - a.details[field].length;
        }
      };
      return {
        ...prev,
        closed: prev.closed.sort(compare(by, order)),
        longterm: prev.longterm.sort(compare(by, order)),
        regular: prev.regular.sort(compare(by, order)),
        sort: { by, order },
      };
    });
  };
  const select = (selection) =>
    setState((prev) => ({
      ...prev,
      collapsed: {
        closed:
          selection === "closed"
            ? !prev.collapsed.closed
            : prev.collapsed.closed,
        longterm:
          selection === "longterm"
            ? !prev.collapsed.longterm
            : prev.collapsed.longterm,
        regular:
          selection === "regular"
            ? !prev.collapsed.regular
            : prev.collapsed.regular,
      },
      summary: false,
    }));
  useEffect(() => {
    if (state.loaded) {
      return;
    }
    void (async () => {
      const promises = [];
      const fetched = {};
      for (const status in urls.migrations.status) {
        try {
          const response = await fetch(urls.migrations.status[status]);
          fetched[status] = Object.entries(await response.json()).map(
            ([name, description]) => ({ name, description })
          );
          let index = 0;
          for (const { name } of fetched[status]) {
            promises.push(
              (async () => {
                try {
                  const url = urls.migrations.details.replace("<NAME>", name);
                  const response = await fetch(url);
                  const details = await response.json();
                  const done = details["done"].length;
                  const total =
                    done +
                    details["awaiting-parents"].length +
                    details["awaiting-pr"].length +
                    details["bot-error"].length +
                    details["in-pr"].length +
                    details["not-solvable"].length;
                  const percentage = (done / (total || 1)) * 100;
                  fetched[status][index].details = details;
                  fetched[status][index].progress = { done, percentage, total };
                  index += 1;
                } catch (error) {
                  console.warn(`error loading migration: ${name}`, error);
                }
              })()
            );
          }
        } catch (error) {
          console.warn(`error loading top-level ${status} migrations`, error);
        }
      }
      await Promise.all(promises);
      setState((prev) => ({ ...prev, ...fetched, loaded: true }));
    })();
  });

  return (
    <div id="current_migrations" className="card margin--xs padding--xs">
      <div className="card__header">
        <h3>
          Current Migrations
          <a href="" onClick={toggle}>
            {state.summary ? "View all migrations" : "View summary"}
          </a>
        </h3>
      </div>
      <Summary
        {...state}
        select={select}
        style={state.summary ? undefined : { display: "none" }}
      />
      <Full
        {...state}
        select={select}
        style={state.summary ? { display: "none" } : undefined}
        resort={resort}
        sort={state.sort}
      />
    </div>
  );
}
