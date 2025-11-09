"use client";
import { useEffect, useRef } from "react";
import { useDataContext } from "../components/providers/DataProvider";
import { nextDataBatch } from "../lib/dataGenerator";
export function useDataStream(enabled=true, intervalMs=100, batchSize=100){
  const {dispatch}=useDataContext();
  const timerRef=useRef<number|null>(null);
  useEffect(()=>{
    if(!enabled) return;
    const tick=()=>{ const batch=nextDataBatch(batchSize); dispatch({type:"APPEND",batch}); timerRef.current=window.setTimeout(tick,intervalMs); };
    timerRef.current=window.setTimeout(tick,intervalMs);
    return ()=>{ if(timerRef.current) window.clearTimeout(timerRef.current); };
  },[enabled,intervalMs,batchSize,dispatch]);
}
