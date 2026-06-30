import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const YELLOW = "#F2C811";
const YELLOW_DARK = "#E0A800";

const rnd = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));

// A senior, on-brand Power BI mini-report illustration (crisp vector, no raster).
export default function PowerBIVisual() {
  const [bars, setBars] = useState([48, 72, 60, 88, 66, 95]);

  useEffect(() => {
    const t = setInterval(() => setBars((b) => b.map(() => rnd(35, 100))), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-black/[0.05] via-background/40 to-transparent p-5 shadow-xl backdrop-blur">
      {/* brand glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
        style={{ background: `${YELLOW}40` }}
      />

      {/* Header with the Power BI ascending-bars mark */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-sm">
            <defs>
              <linearGradient id="pbiMark" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={YELLOW_DARK} />
                <stop offset="100%" stopColor={YELLOW} />
              </linearGradient>
            </defs>
            <rect x="3" y="13" width="4.2" height="9" rx="1.2" fill="url(#pbiMark)" />
            <rect x="9.9" y="8" width="4.2" height="14" rx="1.2" fill="url(#pbiMark)" />
            <rect x="16.8" y="3" width="4.2" height="19" rx="1.2" fill="url(#pbiMark)" />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="clash-grotesk text-sm font-semibold tracking-tight text-foreground">
              Power BI
            </span>
            <span className="text-[10px] tracking-tight text-muted-foreground">
              Sales report
            </span>
          </div>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ background: `${YELLOW}22`, color: YELLOW_DARK }}
        >
          ● Live
        </span>
      </div>

      {/* KPI tiles */}
      <div className="relative grid grid-cols-3 gap-2">
        {[
          { label: "Revenue", value: "1.4M" },
          { label: "Growth", value: "+24%" },
          { label: "Deals", value: "318" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-black/10 bg-white/50 p-2.5 backdrop-blur"
          >
            <div className="clash-grotesk text-base font-semibold tracking-tight text-foreground">
              {k.value}
            </div>
            <div className="text-[9px] uppercase tracking-wide text-muted-foreground">
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {/* Clustered column chart */}
      <div className="relative flex-1 rounded-lg border border-black/10 bg-white/40 p-3 backdrop-blur">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] tracking-tight text-muted-foreground">
            Revenue by region
          </span>
          <span
            className="h-1.5 w-6 rounded-full"
            style={{ background: YELLOW }}
          />
        </div>
        <div className="flex h-[68px] items-end justify-between gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t-sm"
                style={{
                  background: `linear-gradient(to top, ${YELLOW_DARK}, ${YELLOW})`,
                }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, ease }}
              />
              <span className="text-[8px] text-muted-foreground">
                Q{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
