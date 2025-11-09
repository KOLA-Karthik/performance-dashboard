"use client";
import BaseCanvasChart from "./BaseCanvasChart";
import { scaleX, scaleY, computeBounds } from "../../lib/canvasUtils";
import { DataPoint } from "../../lib/types";
export default function LineChart(){
  const draw=(ctx:CanvasRenderingContext2D,w:number,h:number,data:DataPoint[])=>{
    if(!data.length) return; const vp=computeBounds(data);
    ctx.save(); ctx.strokeStyle="#3b82f6"; ctx.lineWidth=1.2; ctx.beginPath();
    for(let i=0;i<data.length;i++){ const x=scaleX(data[i].t,vp,w); const y=scaleY(data[i].v,vp,h); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }
    ctx.stroke(); ctx.restore();
  };
  return <BaseCanvasChart draw={draw}/>;
}
