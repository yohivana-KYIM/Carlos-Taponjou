import { type Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade + rise — the workhorse reveal for headings, paragraphs and cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

/** Soft fade only. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease } },
};

/** Pop in with a subtle scale — good for highlighted blocks/CTAs. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Slide in from the side — used for alternating columns. */
export const fadeSide = (dir: "left" | "right" = "left"): Variants => ({
  hidden: { opacity: 0, x: dir === "left" ? -40 : 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
});

/** Parent that reveals its children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/** Tighter stagger for dense lists (chips, certifications…). */
export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

/** Shared viewport config so every section triggers consistently. */
export const viewport = { once: true, margin: "-80px" } as const;
