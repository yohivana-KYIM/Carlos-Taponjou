import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  /** Value such as "6+", "8", "6 ans", "98%" — the numeric part is animated. */
  value: string;
  duration?: number;
  className?: string;
};

/**
 * Animates the numeric portion of a string from 0 to its target when it
 * scrolls into view, preserving any prefix/suffix (e.g. "+", " ans", "%").
 */
export default function AnimatedCounter({
  value,
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = /^(\D*)([\d.,]+)(.*)$/.exec(value);
  const prefix = match?.[1] ?? "";
  const numberStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = Number(numberStr.replace(",", "."));
  const decimals = numberStr.includes(".")
    ? numberStr.split(".")[1]?.length ?? 0
    : 0;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || isNaN(target)) return;
    const controls = animate(0, target, {
      duration,
      ease,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  // Fallback: if no number could be parsed, just render the raw value.
  if (!match || isNaN(target)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
