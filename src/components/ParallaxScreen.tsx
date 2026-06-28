import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

/**
 * An inclined parallelogram "screen" that tilts in 3D and straightens as it
 * scrolls through the viewport (parallax), overlapping the neighbouring
 * sections for a layered effect.
 */
export default function ParallaxScreen() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle tilt that settles flat in the middle of the viewport
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [9, 0, -5]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, -28]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.55, 1, 1, 0.7],
  );
  // Gentle parallax drift of the inner content
  const contentY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <section
      data-scroll-section
      ref={ref}
      className="relative my-40"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, y, opacity, skewY: -3, transformPerspective: 1200 }}
        className="relative origin-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/25 via-background/60 to-secondary/20 p-8 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-12 xl:p-16"
      >
        {/* Glow accents */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-secondary/30 blur-3xl" />

        {/* Counter-skew so the content stays upright inside the parallelogram */}
        <motion.div style={{ y: contentY, skewY: 3 }} className="relative">
          {/* Fake screen chrome */}
          <div className="mb-6 flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-3 text-xs tracking-tight text-muted-foreground">
              {t.showcase.kicker}
            </span>
          </div>

          <h2 className="clash-grotesk max-w-3xl text-4xl font-semibold leading-tight tracking-tighter text-foreground xl:text-6xl">
            {t.showcase.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base tracking-tight text-muted-foreground xl:text-lg">
            {t.showcase.subtitle}
          </p>

          {/* Animated metric bar to reinforce the "screen" feel */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["SQL", "Python", "Power BI", "Azure", "Spark"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm tracking-tight text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
