"use client";
import { useDataContext } from "../providers/DataProvider";
export default function TimeRangeSelector(){
  const {state,dispatch}=useDataContext();
  const setWin=(ms:number)=>dispatch({type:"SET_WINDOW",windowMs:ms});
  return <div className="card"><h3>Time Range</h3><div className="toolbar">
    <button onClick={()=>setWin(5*60*1000)}>Last 5m</button>
    <button onClick={()=>setWin(15*60*1000)}>Last 15m</button>
    <button onClick={()=>setWin(30*60*1000)}>Last 30m</button>
    <button onClick={()=>setWin(60*60*1000)}>Last 1h</button>
  </div><div className="small">Current: {(state.windowMs/60000).toFixed(0)} minutes</div></div>;
}
