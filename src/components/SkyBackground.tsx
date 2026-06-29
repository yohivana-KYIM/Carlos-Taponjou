import { motion } from "framer-motion";

type Cloud = {
  top: string;
  size: number; // base width in px
  opacity: number;
  duration: number;
  delay: number;
  blur: string;
};

const clouds: Cloud[] = [
  { top: "8%", size: 340, opacity: 0.22, duration: 70, delay: 0, blur: "blur-2xl" },
  { top: "20%", size: 240, opacity: 0.16, duration: 95, delay: -30, blur: "blur-2xl" },
  { top: "38%", size: 420, opacity: 0.14, duration: 120, delay: -60, blur: "blur-3xl" },
  { top: "55%", size: 280, opacity: 0.12, duration: 85, delay: -20, blur: "blur-2xl" },
  { top: "72%", size: 360, opacity: 0.1, duration: 110, delay: -75, blur: "blur-3xl" },
  { top: "86%", size: 220, opacity: 0.1, duration: 100, delay: -45, blur: "blur-2xl" },
];

/** A single fluffy cloud built from a few overlapping soft blobs. */
function CloudShape({ size, opacity, blur }: Pick<Cloud, "size" | "opacity" | "blur">) {
  const h = size * 0.32;
  return (
    <div className={blur} style={{ width: size, height: h, opacity }}>
      <div className="relative h-full w-full">
        <span className="absolute bottom-0 left-[8%] h-[60%] w-[55%] rounded-full bg-neutral-200" />
        <span className="absolute bottom-0 left-[28%] h-[100%] w-[45%] rounded-full bg-neutral-200" />
        <span className="absolute bottom-0 left-[50%] h-[75%] w-[45%] rounded-full bg-neutral-200" />
        <span className="absolute bottom-0 left-0 h-[40%] w-full rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}

export default function SkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 97%) 42%, hsl(0 0% 95%) 78%, hsl(0 0% 93%) 100%)",
      }}
    >
      {/* Soft glow */}
      <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-neutral-200/40 blur-3xl" />

      {/* Drifting clouds */}
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: cloud.top }}
          initial={{ x: "-30vw" }}
          animate={{ x: "130vw" }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <CloudShape size={cloud.size} opacity={cloud.opacity} blur={cloud.blur} />
        </motion.div>
      ))}
    </div>
  );
}
