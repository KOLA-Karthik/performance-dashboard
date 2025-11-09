"use client";
import { useEffect, useRef, useState } from "react";
import { fpsCounter, getMemoryMB } from "../lib/performanceUtils";
export function usePerformanceMonitor(){
  const fpsFn=useRef(fpsCounter());
  const [m,setM]=useState<{fps:number;memoryMB?:number}>({fps:0});
  useEffect(()=>{
    let raf:number;
    const loop=()=>{ const fps=fpsFn.current(); const memoryMB=getMemoryMB(); setM(s=>({...s,fps,memoryMB})); raf=requestAnimationFrame(loop); };
    raf=requestAnimationFrame(loop); return ()=>cancelAnimationFrame(raf);
  },[]);
  return m;
}
