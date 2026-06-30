import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

type P = { x: number; y: number };

// 4-layer network laid out in a 220×150 viewBox
const layers: P[][] = [
  [
    { x: 24, y: 42 },
    { x: 24, y: 78 },
    { x: 24, y: 114 },
  ],
  [
    { x: 90, y: 28 },
    { x: 90, y: 62 },
    { x: 90, y: 96 },
    { x: 90, y: 128 },
  ],
  [
    { x: 156, y: 46 },
    { x: 156, y: 80 },
    { x: 156, y: 112 },
  ],
  [
    { x: 208, y: 62 },
    { x: 208, y: 96 },
  ],
];

const edges: { a: P; b: P }[] = [];
for (let l = 0; l < layers.length - 1; l++) {
  for (const a of layers[l]!) {
    for (const b of layers[l + 1]!) edges.push({ a, b });
  }
}

const nodes = layers.flat();

// Representative signal paths that pulse through the network
const signals: P[][] = [
  [layers[0]![0]!, layers[1]![1]!, layers[2]![0]!, layers[3]![0]!],
  [layers[0]![2]!, layers[1]![2]!, layers[2]![2]!, layers[3]![1]!],
  [layers[0]![1]!, layers[1]![3]!, layers[2]![1]!, layers[3]![1]!],
];

// Crisp, animated neural-network illustration, styled to match DataVisual.
export default function AIVisual() {
  return (
    <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-background via-primary/5 to-background p-8 shadow-2xl backdrop-blur-sm">
      {/* Animated grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Floating glows */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary/25 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-gradient-to-br from-primary/30 to-primary/15 text-primary">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <span className="clash-grotesk text-lg font-bold tracking-tight text-foreground">
            Machine Learning
          </span>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
          inference
        </span>
      </div>

      {/* Network */}
      <div className="relative rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 to-primary/5 p-4 backdrop-blur">
        <svg viewBox="0 0 220 150" className="h-[180px] w-full">
          {/* connections */}
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              stroke="hsl(var(--primary))"
              strokeOpacity={0.12}
              strokeWidth={1}
            />
          ))}

          {/* traveling signals */}
          {signals.map((path, i) => (
            <motion.circle
              key={`sig-${i}`}
              r={3}
              fill="hsl(var(--primary))"
              initial={{ cx: path[0]!.x, cy: path[0]!.y, opacity: 0 }}
              animate={{
                cx: path.map((p) => p.x),
                cy: path.map((p) => p.y),
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.6,
                delay: i * 0.8,
              }}
            />
          ))}

          {/* nodes */}
          {nodes.map((n, i) => (
            <g key={`node-${i}`}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={7}
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
                animate={{ r: [7, 9, 7], fillOpacity: [0.1, 0.2, 0.1] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 5) * 0.3,
                }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={3.4}
                fill="hsl(var(--primary))"
                fillOpacity={0.9}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* tags */}
      <div className="relative flex flex-wrap gap-2">
        {["Random Forest", "LSTM", "Classification", "Régression"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium tracking-tight text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}