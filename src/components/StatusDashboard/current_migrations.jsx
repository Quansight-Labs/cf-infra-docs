import React, { useEffect, useState } from "react";
import { urls } from "../../constants";

function FullView(state) {
  console.log("state", state);
  return <div className="card__body">work in progress</div>;
}

function SummaryView({ longterm, regular, closed }) {
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
      const updated = {};
      for (const key in urls.migrations.status) {
        try {
          const response = await fetch(urls.migrations.status[key]);
          state[key] = Object.entries(await response.json()).map(
            ([name, description]) => ({ name, description })
          );
        } catch (error) {
          console.warn("error loading current migrations", error);
        }
      }
      setState({ ...state, ...updated, loaded: true });
    })();
  });

  return (
    <div id="current_migrations" className="card margin-top--xs">
      <div className="card__header">
        <h3>
          Current Migrations
          <a href="" onClick={toggle}>
            View all migrations
          </a>
        </h3>
      </div>
      {state.summary ? <SummaryView {...state} /> : <FullView {...state} />}
    </div>
  );
}
