import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { BarChart3, TrendingUp, Database, Activity } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Animated number that counts up when in view
function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const bars = [42, 68, 55, 82, 60, 95, 74, 88];
const months = ["J", "F", "M", "A", "M", "J", "J", "A"];

// Area chart path (viewBox 0 0 300 110)
const linePath =
  "M0,90 L40,70 L80,78 L120,48 L160,58 L200,30 L240,40 L300,14";
const areaPath = `${linePath} L300,110 L0,110 Z`;

export default function DataVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const donut = 0.72; // 72%
  const circumference = 2 * Math.PI * 38;

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col gap-3 overflow-hidden p-5"
    >
      {/* Animated grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--primary)/0.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)/0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Floating glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        className="relative flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
            <Activity className="h-4 w-4" />
          </div>
          <span className="clash-grotesk text-sm font-semibold tracking-tight text-foreground">
            BI Analytics
          </span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          live
        </span>
      </motion.div>

      {/* KPI row */}
      <div className="relative grid grid-cols-3 gap-2">
        {[
          { icon: Database, label: "Datasets", to: 128, suffix: "" },
          { icon: TrendingUp, label: "Growth", to: 24, suffix: "%" },
          { icon: BarChart3, label: "Accuracy", to: 98, suffix: "%" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
            className="rounded-lg border border-white/5 bg-white/[0.03] p-2.5 backdrop-blur"
          >
            <kpi.icon className="mb-1 h-3.5 w-3.5 text-primary" />
            <div className="clash-grotesk text-lg font-semibold tracking-tight text-foreground">
              <Counter to={kpi.to} suffix={kpi.suffix} />
            </div>
            <div className="text-[10px] tracking-tight text-muted-foreground">
              {kpi.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Area chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="relative flex-1 rounded-lg border border-white/5 bg-white/[0.03] p-3 backdrop-blur"
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] tracking-tight text-muted-foreground">
            Revenue trend
          </span>
          <span className="clash-grotesk text-gradient text-xs font-semibold">
            ↑ 32%
          </span>
        </div>
        <svg
          viewBox="0 0 300 110"
          preserveAspectRatio="none"
          className="h-[calc(100%-18px)] w-full"
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill="url(#areaFill)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.4, ease }}
          />
        </svg>
      </motion.div>

      {/* Bottom row: bars + donut */}
      <div className="relative grid grid-cols-[1.6fr_1fr] gap-2">
        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="rounded-lg border border-white/5 bg-white/[0.03] p-3 backdrop-blur"
        >
          <span className="mb-2 block text-[10px] tracking-tight text-muted-foreground">
            Monthly volume
          </span>
          <div className="flex h-[70px] items-end justify-between gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-sm bg-gradient-to-t from-primary/40 to-primary"
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.07, ease }}
                />
                <span className="text-[8px] text-muted-foreground">
                  {months[i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Donut */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] p-3 backdrop-blur"
        >
          <div className="relative h-[70px] w-[70px]">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="9"
                opacity="0.4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={
                  inView
                    ? { strokeDashoffset: circumference * (1 - donut) }
                    : {}
                }
                transition={{ duration: 1.4, delay: 0.7, ease }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="clash-grotesk text-sm font-semibold text-foreground">
                <Counter to={72} suffix="%" />
              </span>
            </div>
          </div>
          <span className="mt-1 text-[10px] tracking-tight text-muted-foreground">
            KPIs met
          </span>
        </motion.div>
      </div>
    </div>
  );
}
