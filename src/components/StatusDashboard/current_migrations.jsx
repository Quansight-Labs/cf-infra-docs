import React, { useEffect, useState } from "react";
import { urls } from "../../constants";

function parseHash(hash = "") {
  if (hash === "" || hash.indexOf("#migrations" !== 0)) {
    return;
  }
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
              <td onClick={() => console.log(row.name)}>{row.name}</td>
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

export default function CurrentMigrations(props) {
  const hash = props.hash || '';
  const [state, setState] = useState({
    closed: [],
    collapsed: { closed: true, longterm: true, regular: true },
    loaded: false,
    longterm: [],
    regular: [],
    sort: { by: "name", order: "ascending" },
    view: "summary", // or "full" or "details"
  });
  const toggle = (event) => {
    const view = event.target?.dataset?.view;
    if (view) {
      setState((prev) => ({ ...prev, view }));
    }
  };
  const compare = (field, order) => {
    switch (field) {
      case "name":
        return order === "ascending"
          ? (a, b) => a.name.localeCompare(b.name)
          : (a, b) => b.name.localeCompare(a.name);
      case "status":
        return order === "ascending"
          ? (a, b) => a.progress.percentage - b.progress.percentage
          : (a, b) => b.progress.percentage - a.progress.percentage;
      default:
        return order === "ascending"
          ? (a, b) => a.details[field].length - b.details[field].length
          : (a, b) => b.details[field].length - a.details[field].length;
    }
  };
  const resort = (by) => {
    setState(({ closed, longterm, regular, sort, ...prev }) => {
      let order = "ascending";
      order = by === sort.by && order === sort.order ? "descending" : order;
      return {
        ...prev,
        closed: closed.sort(compare(by, order)),
        longterm: longterm.sort(compare(by, order)),
        regular: regular.sort(compare(by, order)),
        sort: { by, order },
      };
    });
  };
  const select = (status) =>
    setState(({ collapsed, ...prev }) => ({
      ...prev,
      collapsed: { ...collapsed, [status]: !collapsed[status] },
      view: "full",
    }));
  useEffect(() => {
    if (state.loaded) {
      return;
    }
    setState(prev => ({ ...prev, loaded: true }));
    void (async () => {
      console.log('loading...');
      const promises = [];
      const fetched = {};
      for (const status in urls.migrations.status) {
        let count = 0;
        try {
          console.log('fetching', urls.migrations.status[status])
          const response = await fetch(urls.migrations.status[status]);
          fetched[status] = Object.entries(await response.json()).map(
            ([name, description]) => ({ name, description })
          );
          for (const { name } of fetched[status]) {
            promises.push(
              (async (index) => {
                try {
                  const url = urls.migrations.details.replace("<NAME>", name);
                  const response = await fetch(url);
                  const details = await response.json();
                  const done = details["done"].length + details["in-pr"].length;
                  const total =
                    done +
                    details["awaiting-parents"].length +
                    details["awaiting-pr"].length +
                    details["bot-error"].length +
                    details["not-solvable"].length;
                  const percentage = (done / (total || 1)) * 100;
                  fetched[status][index].details = details;
                  fetched[status][index].progress = { done, percentage, total };
                } catch (error) {
                  console.warn(`error loading migration: ${name}`, error);
                }
              })(count++)
            );
          }
        } catch (error) {
          console.warn(`error loading top-level ${status} migrations`, error);
        }
      }
      await Promise.all(promises);
      setState((prev) => ({ ...prev, ...fetched }));
    })();
  }, [state.loaded]);

  console.log('hash is', hash);
  return (
    <div id="current_migrations" className="card margin--xs padding--xs">
      <div className="card__header">
        <h3>
          Current Migrations
          <span className="button-group">
            <button data-view="summary" onClick={toggle}>
              Summary
            </button>
            <button data-view="full" onClick={toggle}>
              Full
            </button>
            <button data-view="details" onClick={toggle}>
              Details
            </button>
          </span>
        </h3>
      </div>
      <div
        className="card__body"
        style={state.view === "summary" ? undefined : { display: "none" }}
      >
        <div className="row">
          <div className="col col--4">
            <div className="migration" onClick={() => select("longterm")}>
              Long-running migrations ({state.longterm.length || "…"})
            </div>
          </div>
          <div className="col col--4">
            <div className="migration" onClick={() => select("regular")}>
              Regular migrations ({state.regular.length || "…"})
            </div>
          </div>
          <div className="col col--4">
            <div className="migration" onClick={() => select("closed")}>
              Closed migrations ({state.closed.length || "…"})
            </div>
          </div>
        </div>
      </div>
      <div
        className="card__body"
        style={state.view === "full" ? undefined : { display: "none" }}
      >
        <table>
          <TableContent
            collapsed={state.collapsed.longterm}
            name="Long-running migrations"
            resort={resort}
            rows={state.longterm}
            select={() => select("longterm")}
            sort={state.sort}
          />
          <TableContent
            collapsed={state.collapsed.regular}
            name="Regular migrations"
            resort={resort}
            rows={state.regular}
            select={() => select("regular")}
            sort={state.sort}
          />
          <TableContent
            collapsed={state.collapsed.closed}
            name="Closed migrations"
            resort={resort}
            rows={state.closed}
            select={() => select("closed")}
            sort={state.sort}
          />
        </table>
      </div>
    </div>
  );
}
