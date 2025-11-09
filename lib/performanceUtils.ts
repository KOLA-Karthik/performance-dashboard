export function fpsCounter() {
  let frames = 0;
  let last = performance.now();
  let fps = 0;
  return () => {
    const now = performance.now();
    frames++;
    if (now - last >= 1000) {
      fps = frames;
      frames = 0;
      last = now;
    }
    return fps;
  };
}


export function getMemoryMB(): number | undefined {
  const mem = (globalThis as any)?.performance?.memory?.usedJSHeapSize as number | undefined;
  return mem ? mem / 1048576 : undefined;
}
