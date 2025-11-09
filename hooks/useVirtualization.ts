"use client";
import { useMemo, useRef, useState, useEffect } from "react";
export function useVirtualization<T>(items:T[], rowHeight=28, viewportHeight=280){
  const containerRef=useRef<HTMLDivElement|null>(null);
  const [scrollTop,setScrollTop]=useState(0);
  useEffect(()=>{ const el=containerRef.current; if(!el) return; const onScroll=()=>setScrollTop(el.scrollTop); el.addEventListener("scroll",onScroll); return ()=>el.removeEventListener("scroll",onScroll); },[]);
  const total=items.length; const start=Math.floor(scrollTop/rowHeight); const visibleCount=Math.ceil(viewportHeight/rowHeight)+4; const end=Math.min(total,start+visibleCount); const offsetY=start*rowHeight;
  const visibleItems=useMemo(()=>items.slice(start,end),[items,start,end]);
  const totalHeight=total*rowHeight;
  return {containerRef,visibleItems,totalHeight,offsetY,rowHeight} as const;
}
