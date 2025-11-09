"use client";
import { usePerformanceMonitor } from "../../hooks/usePerformanceMonitor";
export default function PerformanceMonitor(){
  const m=usePerformanceMonitor();
  return <div className="card"><h3>Performance</h3><div className="toolbar"><span className="badge">FPS: {m.fps}</span><span className="badge">Memory: {m.memoryMB? m.memoryMB.toFixed(1)+' MB':'N/A'}</span></div></div>;
}
