"use client";
import BaseCanvasChart from "./BaseCanvasChart";
import { scaleX, scaleY, computeBounds } from "../../lib/canvasUtils";
import { DataPoint } from "../../lib/types";
export default function ScatterPlot(){
  const draw=(ctx:CanvasRenderingContext2D,w:number,h:number,data:DataPoint[])=>{
    if(!data.length) return; const vp=computeBounds(data); ctx.save(); ctx.fillStyle="#f59e0b";
    for(let i=0;i<data.length;i++){ const x=scaleX(data[i].t,vp,w); const y=scaleY(data[i].v,vp,h); ctx.beginPath(); ctx.arc(x,y,1.2,0,Math.PI*2); ctx.fill(); }
    ctx.restore();
  };
  return <BaseCanvasChart draw={draw}/>;
}
