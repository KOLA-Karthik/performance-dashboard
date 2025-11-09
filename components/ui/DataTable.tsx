"use client";
import { useEffect, useState } from "react";
import { useFilteredGetter } from "../providers/DataProvider";
import { useVirtualization } from "../../hooks/useVirtualization";

type Row = { t: number; v: number; cat: string };

export default function DataTable() {
  const getData = useFilteredGetter();

  // keep a local copy that refreshes periodically
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    // poll the data store every 500ms (cheap; doesn’t touch charts)
    const id = setInterval(() => {
      // cap to last 20k rows for perf
      const latest = getData().slice(-20000) as Row[];
      setRows(latest);
    }, 500);
    // do an immediate first fill
    setRows(getData().slice(-20000) as Row[]);
    return () => clearInterval(id);
  }, [getData]);

  const { containerRef, visibleItems, totalHeight, offsetY, rowHeight } =
    useVirtualization(rows, 28, 280);

  return (
    <div className="card">
      <h3>Data (virtualized)</h3>
      <div ref={containerRef} style={{ height: 280, overflow: "auto", position: "relative" }}>
        <div style={{ height: totalHeight }} />
        <table className="table" style={{ position: "absolute", top: offsetY, left: 0, right: 0 }}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Value</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((r, i) => (
              <tr key={i} style={{ height: rowHeight }}>
                <td>{new Date(r.t).toLocaleTimeString()}</td>
                <td>{r.v.toFixed(2)}</td>
                <td>{r.cat}</td>
              </tr>
            ))}
            {visibleItems.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: 12, opacity: 0.7 }}>
                  Waiting for data…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
