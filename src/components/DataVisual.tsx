import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { BarChart3, TrendingUp, Database, Activity } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rnd = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));

// Live number that smoothly animates whenever its value changes
function LiveNumber({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.9,
      ease,
      onUpdate: (v) => setDisplay(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  return (
    <>
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
}

const CHART_W = 300;
const CHART_H = 110;

// Build an SVG line path from an array of values (0–100)
function buildLine(values: number[]) {
  return values
    .map((v, i) => {
      const x = (i * CHART_W) / (values.length - 1);
      const y = CHART_H - 5 - (v / 100) * (CHART_H - 15);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const months = ["J", "F", "M", "A", "M", "J", "J", "A"];

export default function DataVisual() {
  const [bars, setBars] = useState([42, 68, 55, 82, 60, 95, 74, 88]);
  const [line, setLine] = useState([30, 48, 40, 70, 58, 82, 72, 90]);
  const [donut, setDonut] = useState(72);
  const [kpis, setKpis] = useState({ datasets: 128, growth: 24, accuracy: 98 });

  // Live, automatic updates
  useEffect(() => {
    const barTimer = setInterval(() => {
      setBars((b) => b.map(() => rnd(30, 100)));
    }, 1800);

    const lineTimer = setInterval(() => {
      setLine((l) => [...l.slice(1), rnd(20, 95)]);
    }, 2000);

    const donutTimer = setInterval(() => setDonut(rnd(58, 92)), 2600);

    const kpiTimer = setInterval(() => {
      setKpis({
        datasets: rnd(110, 160),
        growth: rnd(12, 38),
        accuracy: rnd(94, 99),
      });
    }, 2200);

    return () => {
      clearInterval(barTimer);
      clearInterval(lineTimer);
      clearInterval(donutTimer);
      clearInterval(kpiTimer);
    };
  }, []);

  const circumference = 2 * Math.PI * 38;
  const linePath = buildLine(line);
  const areaPath = `${linePath} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;

  return (
    <div className="relative flex h-full w-full flex-col gap-3 overflow-hidden p-5">
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
      <div className="relative flex items-center justify-between">
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
      </div>

      {/* KPI row */}
      <div className="relative grid grid-cols-3 gap-2">
        {[
          { icon: Database, label: "Datasets", value: kpis.datasets, suffix: "" },
          { icon: TrendingUp, label: "Growth", value: kpis.growth, suffix: "%" },
          { icon: BarChart3, label: "Accuracy", value: kpis.accuracy, suffix: "%" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-white/5 bg-white/[0.03] p-2.5 backdrop-blur"
          >
            <kpi.icon className="mb-1 h-3.5 w-3.5 text-primary" />
            <div className="clash-grotesk text-lg font-semibold tracking-tight text-foreground">
              <LiveNumber value={kpi.value} suffix={kpi.suffix} />
            </div>
            <div className="text-[10px] tracking-tight text-muted-foreground">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Area chart */}
      <div className="relative flex-1 rounded-lg border border-white/5 bg-white/[0.03] p-3 backdrop-blur">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] tracking-tight text-muted-foreground">
            Revenue trend
          </span>
          <span className="clash-grotesk text-gradient text-xs font-semibold">
            ↑ <LiveNumber value={kpis.growth + 8} suffix="%" />
          </span>
        </div>
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
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
            animate={{ d: areaPath }}
            transition={{ duration: 0.9, ease }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ d: linePath }}
            transition={{ duration: 0.9, ease }}
          />
          {/* Leading dot */}
          <motion.circle
            r="3.5"
            fill="hsl(var(--primary))"
            animate={{
              cx: CHART_W,
              cy: CHART_H - 5 - ((line[line.length - 1] ?? 0) / 100) * (CHART_H - 15),
            }}
            transition={{ duration: 0.9, ease }}
          />
        </svg>
      </div>

      {/* Bottom row: bars + donut */}
      <div className="relative grid grid-cols-[1.6fr_1fr] gap-2">
        {/* Bar chart */}
        <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3 backdrop-blur">
          <span className="mb-2 block text-[10px] tracking-tight text-muted-foreground">
            Monthly volume
          </span>
          <div className="flex h-[70px] items-end justify-between gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-sm bg-gradient-to-t from-primary/40 to-primary"
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, ease }}
                />
                <span className="text-[8px] text-muted-foreground">
                  {months[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] p-3 backdrop-blur">
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
                animate={{ strokeDashoffset: circumference * (1 - donut / 100) }}
                transition={{ duration: 0.9, ease }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="clash-grotesk text-sm font-semibold text-foreground">
                <LiveNumber value={donut} suffix="%" />
              </span>
            </div>
          </div>
          <span className="mt-1 text-[10px] tracking-tight text-muted-foreground">
            KPIs met
          </span>
        </div>
      </div>
    </div>
  );
}
