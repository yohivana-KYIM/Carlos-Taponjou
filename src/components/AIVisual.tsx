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

// A senior, crisp neural-network illustration (vector, animated signal flow).
export default function AIVisual() {
  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-black/[0.06] via-background/40 to-transparent p-5 shadow-xl backdrop-blur">
      {/* glow */}
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-foreground/[0.08] blur-2xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground/[0.08] text-foreground">
            <BrainCircuit className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="clash-grotesk text-sm font-semibold tracking-tight text-foreground">
              Machine Learning
            </span>
            <span className="text-[10px] tracking-tight text-muted-foreground">
              Neural network
            </span>
          </div>
        </div>
        <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          inference
        </span>
      </div>

      {/* Network */}
      <div className="relative flex-1">
        <svg viewBox="0 0 220 150" className="h-full w-full">
          {/* connections */}
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              stroke="hsl(var(--foreground))"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          ))}

          {/* traveling signals */}
          {signals.map((path, i) => (
            <motion.circle
              key={`sig-${i}`}
              r={3}
              fill="hsl(var(--foreground))"
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
                fill="hsl(var(--foreground))"
                fillOpacity={0.08}
                animate={{ r: [7, 9, 7], fillOpacity: [0.08, 0.16, 0.08] }}
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
                fill="hsl(var(--foreground))"
                fillOpacity={0.85}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* tags */}
      <div className="relative flex flex-wrap gap-1.5">
        {["Random Forest", "LSTM", "Classification"].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[10px] tracking-tight text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
