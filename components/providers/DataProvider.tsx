"use client";
import React, { createContext, useContext, useMemo, useReducer, useRef } from "react";
import { DataPoint, Aggregation } from "../../lib/types";

type State = {
  dataRef: React.MutableRefObject<DataPoint[]>;
  windowMs: number;
  agg: Aggregation;
  filters: { cat: string | "all" };
};

type Action =
  | { type: "SET_AGG"; agg: Aggregation }
  | { type: "SET_WINDOW"; windowMs: number }
  | { type: "SET_FILTER"; cat: State["filters"]["cat"] }
  | { type: "APPEND"; batch: DataPoint[] };

const DataCtx = createContext<{ state: State; dispatch: React.Dispatch<Action> }>(null as any);

export function DataProvider({
  initialData,
  children,
}: {
  initialData: DataPoint[];
  children: React.ReactNode;
}) {
  const dataRef = useRef<DataPoint[]>([...initialData]);

  const reducer = (s: State, a: Action): State => {
    if (a.type === "APPEND") {
      // mutate backing store
      dataRef.current.push(...a.batch);
      // sliding window prune
      const minT = Date.now() - s.windowMs;
      let idx = 0;
      while (idx < dataRef.current.length && dataRef.current[idx].t < minT) idx++;
      if (idx > 0) dataRef.current.splice(0, idx);
      return s;
    }
    if (a.type === "SET_AGG") return { ...s, agg: a.agg };
    if (a.type === "SET_WINDOW") return { ...s, windowMs: a.windowMs };
    if (a.type === "SET_FILTER") return { ...s, filters: { cat: a.cat } };
    return s;
  };

  const [state, dispatch] = useReducer(reducer, {
    dataRef,
    windowMs: 30 * 60 * 1000,
    agg: "1m" as Aggregation,
    filters: { cat: "all" as const },
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
}

export function useDataContext() {
  return useContext(DataCtx);
}

/**
 * Returns a function that computes the current filtered window on demand.
 * Avoids mutating the React ref object (which is sealed).
 */
export function useFilteredGetter(): () => DataPoint[] {
  const { state } = useDataContext();
  return () => {
    const now = Date.now();
    const minT = now - state.windowMs;
    const src = state.dataRef.current;
    if (state.filters.cat === "all") {
      return src.filter((d) => d.t >= minT);
    }
    return src.filter((d) => d.t >= minT && d.cat === state.filters.cat);
  };
}
