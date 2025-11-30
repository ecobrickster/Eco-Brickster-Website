"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ from = 0, to = 100, duration = 1500, prefix = "", suffix = "" }: { from?: number; to?: number; duration?: number; prefix?: string; suffix?: string; }) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const current = Math.floor(from + (to - from) * p);
      setValue(current);
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [started, from, to, duration]);

  return <div ref={ref} className="font-extrabold text-3xl md:text-4xl">{prefix}{value.toLocaleString()}{suffix}</div>;
}
