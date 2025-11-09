"use client";
import { useCallback, useEffect, useRef } from "react";
import { computeBounds, clearCanvas, drawAxes } from "../lib/canvasUtils";
import { DataPoint } from "../lib/types";
export type DrawFn=(ctx:CanvasRenderingContext2D,w:number,h:number,data:DataPoint[])=>void;
export function useChartRenderer(draw:DrawFn,getData:()=>DataPoint[]){
  const canvasRef=useRef<HTMLCanvasElement|null>(null);
  const rafRef=useRef<number|null>(null);
  const render=useCallback(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d"); if(!ctx) return;
    const dpr=window.devicePixelRatio||1;
    const w=Math.floor(canvas.clientWidth*dpr), h=Math.floor(260*dpr);
    if(canvas.width!==w||canvas.height!==h){ canvas.width=w; canvas.height=h; }
    const data=getData(); clearCanvas(ctx,w,h); const vp=computeBounds(data); drawAxes(ctx,w,h,vp); draw(ctx,w,h,data);
  },[draw,getData]);
  useEffect(()=>{ let mounted=true; const loop=()=>{ if(!mounted) return; render(); rafRef.current=requestAnimationFrame(loop); }; rafRef.current=requestAnimationFrame(loop); return ()=>{ mounted=false; if(rafRef.current) cancelAnimationFrame(rafRef.current); }; },[render]);
  return {canvasRef} as const;
}
