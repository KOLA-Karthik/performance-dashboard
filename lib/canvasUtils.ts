import { DataPoint } from "./types";
export type Viewport={xMin:number;xMax:number;yMin:number;yMax:number};
export function computeBounds(data:DataPoint[]):Viewport{
  if(!data.length) return {xMin:0,xMax:1,yMin:0,yMax:1};
  let xMin=data[0].t,xMax=data[0].t,yMin=data[0].v,yMax=data[0].v;
  for(const d of data){ xMin=Math.min(xMin,d.t); xMax=Math.max(xMax,d.t); yMin=Math.min(yMin,d.v); yMax=Math.max(yMax,d.v); }
  if(yMin===yMax){ yMin-=1; yMax+=1; }
  return {xMin,xMax,yMin,yMax};
}
export function scaleX(t:number,vp:Viewport,w:number){ return ((t-vp.xMin)/(vp.xMax-vp.xMin))*(w-40)+30;}
export function scaleY(v:number,vp:Viewport,h:number){ return (1-(v-vp.yMin)/(vp.yMax-vp.yMin))*(h-30)+10;}
export function clearCanvas(ctx:CanvasRenderingContext2D,w:number,h:number){ ctx.clearRect(0,0,w,h); }
export function drawAxes(ctx:CanvasRenderingContext2D,w:number,h:number,vp:Viewport){
  ctx.save(); ctx.strokeStyle="#243041"; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(30,h-20); ctx.lineTo(w-10,h-20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(30,10); ctx.lineTo(30,h-20); ctx.stroke();
  ctx.fillStyle="#8aa0b8"; ctx.font="10px system-ui";
  const xs=6; for(let i=0;i<=xs;i++){ const t=vp.xMin+(i/xs)*(vp.xMax-vp.xMin); const x=scaleX(t,vp,w); ctx.fillText(new Date(t).toLocaleTimeString(), x-24, h-6); }
  const ys=4; for(let i=0;i<=ys;i++){ const v=vp.yMin+(i/ys)*(vp.yMax-vp.yMin); const y=scaleY(v,vp,h); ctx.fillText(v.toFixed(1), 4, y+3); ctx.strokeStyle="#151c27"; ctx.beginPath(); ctx.moveTo(30,y); ctx.lineTo(w-10,y); ctx.stroke(); }
  ctx.restore();
}
