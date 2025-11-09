"use client";
import BaseCanvasChart from "./BaseCanvasChart";
import { computeBounds } from "../../lib/canvasUtils";
import { DataPoint } from "../../lib/types";
export default function Heatmap(){
  const draw=(ctx:CanvasRenderingContext2D,w:number,h:number,data:DataPoint[])=>{
    if(!data.length) return; const vp=computeBounds(data); const cols=64,rows=32;
    const grid=Array.from({length:rows},()=>Array.from({length:cols},()=>0)); let max=1;
    for(const d of data){ const xi=Math.min(cols-1,Math.max(0,Math.floor(((d.t-vp.xMin)/(vp.xMax-vp.xMin))*cols))); const yi=Math.min(rows-1,Math.max(0,Math.floor(((d.v-vp.yMin)/(vp.yMax-vp.yMin))*rows))); const r=rows-1-yi; grid[r][xi]++; if(grid[r][xi]>max) max=grid[r][xi]; }
    const cellW=(w-40)/cols, cellH=(h-30)/rows;
    for(let r=0;r<rows;r++){ for(let c=0;c<cols;c++){ const v=grid[r][c]/max; const a=Math.min(1,v*1.2); ctx.fillStyle=`rgba(239,68,68,${a})`; const x=30+c*cellW; const y=10+r*cellH; ctx.fillRect(x,y,Math.ceil(cellW)+1,Math.ceil(cellH)+1); } }
  };
  return <BaseCanvasChart draw={draw}/>;
}
