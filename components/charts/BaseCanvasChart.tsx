"use client";
import React from "react";
import { useChartRenderer } from "../../hooks/useChartRenderer";
import { useFilteredGetter } from "../providers/DataProvider";

export default function BaseCanvasChart({
  draw,
}: {
  draw: Parameters<typeof useChartRenderer>[0];
}) {
  const getData = useFilteredGetter();
  const { canvasRef } = useChartRenderer(draw as any, getData);
  return <canvas ref={canvasRef} />;
}
