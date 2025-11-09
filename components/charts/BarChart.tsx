"use client";
import BaseCanvasChart from "./BaseCanvasChart";
import { scaleX, scaleY, computeBounds } from "../../lib/canvasUtils";
import { DataPoint } from "../../lib/types";
export default function BarChart(){
  const draw=(ctx:CanvasRenderingContext2D,w:number,h:number,data:DataPoint[])=>{
    if(!data.length) return; const vp=computeBounds(data); ctx.save(); ctx.fillStyle="#22c55e";
    const n=data.length; const barW=Math.max(1,(w-40)/n);
    for(let i=0;i<n;i++){ const x=scaleX(data[i].t,vp,w)-barW*0.5; const y=scaleY(Math.max(data[i].v,vp.yMin),vp,h); const baseY=scaleY(vp.yMin,vp,h); ctx.fillRect(x,y,barW,baseY-y); }
    ctx.restore();
  };
  return <BaseCanvasChart draw={draw}/>;
}
