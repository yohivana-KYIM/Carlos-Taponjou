import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Cloud,
  Database,
  BrainCircuit,
  BarChart3,
  Workflow,
  GraduationCap,
  Award,
  Download,
  FileText,
  Github,
  Linkedin,
  Code2,
  Warehouse,
  Layers,
  ClipboardList,
  GitBranch,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import DataVisual from "@/components/DataVisual";
import Image from "next/image";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import AnimatedCounter from "@/components/AnimatedCounter";
import ParallaxScreen from "@/components/ParallaxScreen";
import {
  fadeUp,
  scaleIn,
  fadeSide,
  staggerContainer,
  staggerFast,
  viewport,
} from "@/lib/animations";

const CV_PATH = "/cv-carlos-taponjou.pdf";

// Icons paired by index with translations.domains.items
const domainIcons = [Cloud, Database, BrainCircuit, BarChart3, Workflow];

// Icons paired by index with translations.skills.items
const skillIcons = [
  BarChart3, // Business Intelligence
  BrainCircuit, // Machine Learning / IA
  Workflow, // ETL / ELT
  Cloud, // Cloud
  Code2, // Programming languages
  Database, // Databases
  Warehouse, // Data warehousing
  Layers, // Big Data
  ClipboardList, // Modeling & frameworks
  GitBranch, // Version control
];

// Technologies paired by index with translations.experience.items
const experienceTech = [
  ["Microsoft Fabric", "Power BI", "Python", "SQL", "Git"],
  ["Microsoft Azure", "Azure Data Factory", "Power BI", "Python", "SQL Azure"],
  ["Microsoft Azure", "SSIS", "SSAS", "Power BI", "Python", "SQL"],
  ["Microsoft Azure", "SSIS", "SSAS", "Power BI", "SQL", "Git"],
  ["Microsoft Azure", "SSIS", "SSAS", "Power BI", "Python", "R"],
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { t } = useLanguage();

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  {t.hero.greeting}
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-5xl 2xl:text-7xl">
                  Carlos Gael
                  <br />
                  Taponjou Kenfack.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-3 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                {t.hero.subtitle}
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row flex-wrap items-center gap-2 pt-6"
            >
              <Link href="mailto:taponjoucarlos@gmail.com" passHref>
                <Button>
                  {t.hero.contact} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                {t.hero.learnMore}
              </Button>
            </span>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row flex-wrap items-center gap-2 pt-3"
            >
              <Link href={CV_PATH} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">
                  <FileText className="mr-1.5 h-4 w-4" />
                  {t.hero.viewCv}
                </Button>
              </Link>
              <a href={CV_PATH} download="CV-Carlos-Gael-Taponjou-Kenfack.pdf">
                <Button variant="ghost">
                  <Download className="mr-1.5 h-4 w-4" />
                  {t.hero.downloadCv}
                </Button>
              </a>
            </span>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row flex-wrap items-center gap-2 pt-3"
            >
              <Link
                href="https://github.com/taponjou"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/carlos-taponjou-bb58929b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              {t.hero.scroll}{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 flex h-full w-full flex-col items-center justify-center gap-6 xl:mt-0"
          >
            <DataVisual />
            <Image
              src="/ia.jpeg"
              alt="Intelligence Artificielle"
              width={400}
              height={400}
              className="h-auto w-full max-w-[360px] rounded-xl object-contain shadow-lg"
              priority
            />
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-32 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <motion.h2
              variants={fadeUp}
              className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]"
            >
              {t.about.paragraph}
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-8 xl:grid-cols-3"
            >
              {t.about.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <AnimatedCounter
                    value={stat.value}
                    className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl"
                  />
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Compétences */}
        <section id="skills" data-scroll-section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-32 flex flex-col justify-start space-y-10"
          >
            <motion.span
              variants={fadeUp}
              className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter"
            >
              {t.skills.tag}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-4xl font-semibold tracking-tighter xl:text-6xl"
            >
              {t.skills.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="-mt-4 max-w-2xl text-base tracking-tight text-muted-foreground xl:text-lg"
            >
              {t.skills.subtitle}
            </motion.p>
            <motion.div
              variants={staggerFast}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {t.skills.items.map((skill, i) => {
                const Icon = skillIcons[i] ?? BarChart3;
                const tools = skill.items.split(/,\s*|\s+et\s+|\s+and\s+/);
                return (
                  <motion.div
                    key={skill.category}
                    variants={fadeUp}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="flex flex-col rounded-md bg-black/[0.04] p-6 shadow-md backdrop-blur hover:bg-black/[0.07]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground/[0.06] text-foreground">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-lg tracking-tight text-foreground">
                          {skill.category}
                        </span>
                      </div>
                      <AnimatedCounter
                        value={skill.years}
                        className="clash-grotesk text-gradient shrink-0 text-sm font-semibold"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed tracking-tight text-muted-foreground">
                      {skill.desc}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-foreground/10 pt-4">
                      {tools.map((tool) => (
                        <li
                          key={tool}
                          className="flex items-start gap-2 text-sm tracking-tight text-muted-foreground"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* Parallax parallelogram showcase */}
        <ParallaxScreen />

        {/* Expériences */}
        <section id="experience" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            data-scroll
            data-scroll-speed=".4"
            className="my-64"
          >
            <motion.span
              variants={fadeUp}
              className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter"
            >
              {t.experience.tag}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl"
            >
              {t.experience.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg"
            >
              {t.experience.subtitle}
            </motion.p>

            {/* Mandats Grid */}
            <motion.div variants={fadeUp} className="mt-14">
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
                {t.experience.items.map((exp, i) => (
                  <Card key={exp.company} className="h-full flex flex-col">
                    <CardHeader className="bg-gradient-to-br from-primary/20 to-black/[0.04] p-6">
                      <span className="clash-grotesk text-gradient text-xs font-semibold tracking-tight">
                        {exp.period}
                      </span>
                      <CardTitle className="mt-2 text-lg font-medium tracking-tight">
                        {exp.role}
                      </CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {exp.company} · {exp.location}
                      </span>
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <p className="text-sm font-medium tracking-tight text-foreground">
                        {exp.project}
                      </p>
                      <ul className="mt-4 space-y-2 flex-1">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-sm leading-snug tracking-tight text-muted-foreground"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-foreground/10 pt-4">
                        {experienceTech[i]?.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-black/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Domaines d'intervention */}
        <section id="domains" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-32 flex flex-col justify-start space-y-10"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <motion.div variants={fadeUp} className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  {t.domains.title}
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  {t.domains.subtitle}
                </p>
              </motion.div>
              {t.domains.items.map((domain, i) => {
                const Icon = domainIcons[i] ?? Cloud;
                return (
                  <motion.div
                    key={domain.service}
                    variants={scaleIn}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="flex flex-col items-start rounded-lg bg-gradient-to-br from-black/[0.02] to-black/[0.08] p-8 shadow-sm backdrop-blur hover:shadow-md transition-all duration-300 border border-primary/10"
                  >
                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 p-4 mb-4"
                    >
                      <Icon className="text-primary" size={32} />
                    </motion.div>
                    <span className="text-lg font-semibold tracking-tight text-foreground">
                      {domain.service}
                    </span>
                    <span className="mt-3 text-sm leading-relaxed tracking-tighter text-muted-foreground">
                      {domain.description}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Formation & Certifications */}
        <section id="education" data-scroll-section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-32 flex flex-col justify-start space-y-10"
          >
            <motion.div variants={fadeUp}>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                {t.education.tag}
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter xl:text-6xl">
                {t.education.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Formation */}
              <motion.div
                variants={fadeSide("left")}
                className="flex flex-col space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className="text-primary" size={20} />
                  <span className="text-lg font-medium tracking-tight">
                    {t.education.formation}
                  </span>
                </div>
                {t.education.items.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="rounded-md bg-black/[0.04] p-6 shadow-md backdrop-blur hover:bg-black/[0.07]"
                  >
                    <span className="tracking-tight text-foreground">
                      {item.title}
                    </span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.place}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
              {/* Certifications */}
              <motion.div
                variants={fadeSide("right")}
                className="flex flex-col space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <Award className="text-primary" size={20} />
                  <span className="text-lg font-medium tracking-tight">
                    {t.education.certifications}
                  </span>
                </div>
                <motion.ul
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className="space-y-2"
                >
                  {t.education.certs.map((cert) => (
                    <motion.li
                      key={cert}
                      variants={fadeUp}
                      whileHover={{ x: 4 }}
                      className="flex items-start rounded-md bg-black/[0.04] px-4 py-3 text-sm tracking-tight text-muted-foreground backdrop-blur hover:bg-black/[0.07]"
                    >
                      <ChevronRight className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {cert}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-black/[0.04] px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              {t.contact.title}
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              {t.contact.subtitle}
            </p>
            <p className="mt-2 text-sm tracking-tight text-muted-foreground">
              {t.contact.address}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Link href="mailto:taponjoucarlos@gmail.com" passHref>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button>{t.contact.button}</Button>
                </motion.div>
              </Link>
              <a href={CV_PATH} download="CV-Carlos-Gael-Taponjou-Kenfack.pdf">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline">
                    <Download className="mr-1.5 h-4 w-4" />
                    {t.hero.downloadCv}
                  </Button>
                </motion.div>
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#000000" />
              <stop offset={1} stopColor="#cccccc" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#000000" />
              <stop offset={1} stopColor="#cccccc" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
