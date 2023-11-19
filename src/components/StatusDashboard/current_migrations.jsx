import React, { useEffect, useState } from "react";
import { urls } from "../../constants";

function Full({ closed, collapsed, longterm, regular, select, style }) {
  return (
    <div className="card__body" style={style}>
      <table>
        <TableContent
          collapsed={collapsed.longterm}
          name="Long-running migrations"
          rows={longterm}
          select={() => select("longterm")}
        />
        <TableContent
          collapsed={collapsed.regular}
          name="Regular migrations"
          rows={regular}
          select={() => select("regular")}
        />
        <TableContent
          collapsed={collapsed.closed}
          name="Closed migrations"
          rows={closed}
          select={() => select("closed")}
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
            Long-running migrations ({longterm.length || ""})
          </div>
        </div>
        <div className="col col--4">
          <div className="migration" onClick={() => select("regular")}>
            Regular migrations ({regular.length || ""})
          </div>
        </div>
        <div className="col col--4">
          <div className="migration" onClick={() => select("closed")}>
            Closed migrations ({closed.length || ""})
          </div>
        </div>
      </div>
    </div>
  );
}

function TableContent({ collapsed, name, rows, select }) {
  return (
    <>
      <thead>
        <tr onClick={select}>
          <th colSpan="4">
            {name}
            {collapsed ? "…" : ""}
          </th>
        </tr>
        <tr style={collapsed ? { display: "none" } : undefined}>
          <th>Name</th>
          <th>Status</th>
          <th>Awaiting parents</th>
          <th>Awaiting PR</th>
        </tr>
      </thead>
      <tbody style={collapsed ? { display: "none" } : undefined}>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>{row.description}</td>
            <td></td>
            <td>{row.details["awaiting-parents"].length}</td>
            <td>{row.details["awaiting-pr"].length}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default function CurrentMigrations() {
  const [state, setState] = useState({
    closed: [],
    collapsed: {
      closed: true,
      longterm: true,
      regular: true,
    },
    loaded: false,
    longterm: [],
    regular: [],
    summary: true,
  });
  const toggle = (event) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, summary: !state.summary }));
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
            ([name, description]) => ({
              name,
              // Remove superfluous text at the end of each description.
              description: description.replace(/\ Migration Status$/, ""),
            })
          );
          let index = 0;
          for (const { name } of fetched[status]) {
            promises.push(
              (async () => {
                try {
                  const url = urls.migrations.details.replace("<NAME>", name);
                  const response = await fetch(url);
                  fetched[status][index++].details = await response.json();
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
    <div id="current_migrations" className="card margin-top--xs">
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
      />
    </div>
  );
}
