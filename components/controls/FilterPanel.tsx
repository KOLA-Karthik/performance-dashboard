"use client";
import { useDataContext } from "../providers/DataProvider";
export default function FilterPanel(){
  const {state,dispatch}=useDataContext();
  return <div className="card"><h3>Controls</h3><div className="toolbar">
    <label className="small">Category:</label>
    <select value={state.filters.cat} onChange={(e)=>dispatch({type:"SET_FILTER",cat:e.target.value as any})}>
      <option value="all">All</option><option value="A">A</option><option value="B">B</option><option value="C">C</option>
    </select>
    <label className="small">Window:</label>
    <select value={String(state.windowMs)} onChange={(e)=>dispatch({type:"SET_WINDOW",windowMs:Number(e.target.value)})}>
      <option value={5*60*1000}>5m</option>
      <option value={15*60*1000}>15m</option>
      <option value={30*60*1000}>30m</option>
      <option value={60*60*1000}>1h</option>
    </select>
  </div></div>;
}
