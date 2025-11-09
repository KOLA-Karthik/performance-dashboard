import { DataPoint } from "./types";
export function generateInitialDataset(count=12000,start=Date.now()-60*60*1000):DataPoint[]{
  const out:DataPoint[]=[]; let v=50;
  for(let i=0;i<count;i++){ const t=start+i*100; v+=(Math.random()-0.5)*2; out.push({t,v,cat:['A','B','C'][i%3]}); }
  return out;
}
export function nextDataBatch(batchSize=100):DataPoint[]{
  const now=Date.now(); const arr:DataPoint[]=[]; let v=50+Math.sin(now/1000)*10;
  for(let i=0;i<batchSize;i++){ v+=(Math.random()-0.5)*2; arr.push({t:now+i*100,v,cat:['A','B','C'][Math.floor(Math.random()*3)]}); }
  return arr;
}
