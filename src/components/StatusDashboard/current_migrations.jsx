import React, { useEffect, useState } from "react";
import { urls } from "../../constants";

function Full({ longterm, regular, closed }) {
  return (
    <div className="card__body">
      <table>
        <TableContent name="Long-running migrations" rows={longterm} />
        <TableContent name="Regular migrations" rows={regular} />
        <TableContent name="Closed migrations" rows={closed} />
      </table>
    </div>
  );
}

function Summary({ longterm, regular, closed }) {
  return (
    <div className="card__body">
      <div className="row">
        <div className="col col--4">
          <div className="migration">
            Long-running migrations ({longterm.length || ""})
          </div>
        </div>
        <div className="col col--4">
          <div className="migration">
            Regular migrations ({regular.length || ""})
          </div>
        </div>
        <div className="col col--4">
          <div className="migration">
            Closed migrations ({closed.length || ""})
          </div>
        </div>
      </div>
    </div>
  );
}

function TableContent({ name, rows }) {
  const [toggled, setToggled] = useState(true);
  return (
    <>
      <thead>
        <tr onClick={() => setToggled(!toggled)}>
          <th colSpan="4">
            {name}
            {toggled ? "" : "…"}
          </th>
        </tr>
        <tr style={toggled ? undefined : { display: "none" }}>
          <th>Name</th>
          <th>Status</th>
          <th>Awaiting parents</th>
          <th>Awaiting PR</th>
        </tr>
      </thead>
      <tbody style={toggled ? undefined : { display: "none" }}>
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
    loaded: false,
    longterm: [],
    regular: [],
    summary: true,
  });
  const toggle = (event) => {
    event.preventDefault();
    setState({ ...state, summary: !state.summary });
  };

  useEffect(() => {
    if (state.loaded) {
      return;
    }
    void (async () => {
      let fetched = {};
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
        } catch (error) {
          console.warn(`error loading top-level ${status} migrations`, error);
        }
      }
      const promises = [];
      for (const status in urls.migrations.status) {
        let index = 0;
        for (const { name } of fetched[status]) {
          promises.push(
            (async (status, name, index) => {
              try {
                const url = urls.migrations.details.replace("<NAME>", name);
                const response = await fetch(url);
                fetched[status][index].details = await response.json();
              } catch (error) {
                console.warn(
                  `error loading ${status}/${name} migration`,
                  error
                );
              }
            })(status, name, index++)
          );
        }
      }
      await Promise.all(promises);
      setState({ ...state, ...fetched, loaded: true });
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
      {state.summary ? <Summary {...state} /> : <Full {...state} />}
    </div>
  );
}
