import React, { useEffect, useState } from "react";
import { urls } from "../../urls";

export default function CurrentMigrations() {
  const [totals, setTotals] = useState({ closed: 0, longterm: 0, regular: 0 });
  useEffect(() => {
    const load = async () => {
      const updated = {};
      for (const key in urls.migrations.status) {
        try {
          const response = await fetch(urls.migrations.status[key]);
          totals[key] = Object.keys(await response.json()).length;
        } catch (error) {
          console.log("error", error);
        }
      }
      setTotals({ ...totals, ...updated });
    };
    if (totals.closed + totals.longterm + totals.regular === 0) {
      void load();
    }
  });

  return (
    <div id="current_migrations" className="card margin-top--xs">
      <div className="card__header">
        <h3>Current Migrations</h3>
      </div>
      <div className="card__body">
        <div className="row">
          <div className="col col--4">
            <div className="migration">
              Long-running migrations ({totals.longterm || ""})
            </div>
          </div>
          <div className="col col--4">
            <div className="migration">
              Regular migrations ({totals.regular || ""})
            </div>
          </div>
          <div className="col col--4">
            <div className="migration">
              Closed migrations ({totals.closed || ""})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
