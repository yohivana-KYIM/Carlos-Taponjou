import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en";

type Stat = { label: string; value: string };
type Skill = { category: string; items: string; years: string };
type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  project: string;
};
type Domain = { service: string; description: string };
type Education = { title: string; place: string };

export type Dict = {
  nav: { home: string; about: string; skills: string; experience: string; education: string; contact: string };
  hero: {
    greeting: string;
    subtitle: string;
    contact: string;
    learnMore: string;
    viewCv: string;
    downloadCv: string;
    scroll: string;
  };
  about: { paragraph: ReactNode; stats: Stat[] };
  skills: { tag: string; title: string; subtitle: string; items: Skill[] };
  experience: {
    tag: string;
    title: string;
    subtitle: string;
    counter: string;
    items: Experience[];
  };
  showcase: { kicker: string; title: string; subtitle: string };
  domains: { title: ReactNode; subtitle: string; items: Domain[] };
  education: {
    tag: string;
    title: string;
    formation: string;
    certifications: string;
    items: Education[];
    certs: string[];
  };
  contact: { title: ReactNode; subtitle: string; address: string; button: string };
  footer: { rights: string; localTime: string };
};

const certifications = [
  "Microsoft Certified : Power BI Data Analyst — 2026",
  "Microsoft Certified : Fabric Data Engineer Associate — 2026",
  "Microsoft Certified : Fabric Analytics Engineer Associate — 2026",
  "Microsoft Certified : Azure Data Fundamentals — 2025",
  "ScrumEdu : Scrum Fundamentals Certified (SFC) — 2025",
  "SkillUp : Analyse des données avec Python — 2022",
  "SkillUp : Analyse des données avec R — 2022",
  "Corporate Finance Institute : Business Intelligence & Data Science — 2021",
];

export const translations: Record<Lang, Dict> = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      experience: "Expériences",
      education: "Formation",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      subtitle:
        "Développeur Analyste BI-IA avec plus de 6 ans d'expérience internationale en analyse statistique, traitement de données massives et visualisation décisionnelle.",
      contact: "Me contacter",
      learnMore: "En savoir plus",
      viewCv: "Voir le CV",
      downloadCv: "Télécharger le CV",
      scroll: "Faire défiler pour découvrir",
    },
    about: {
      paragraph: (
        <>
          Développeur Analyste BI rigoureux et orienté résultats, spécialisé dans
          la conception et l&apos;optimisation de{" "}
          <span className="text-gradient clash-grotesk">pipelines BI/ETL</span> et
          la maîtrise de SQL, R et Python. Expérimenté sur les plateformes
          analytiques et environnements cloud — Microsoft Fabric, Azure Data
          Factory et Power BI — je transforme les données en leviers stratégiques
          et opérationnels pour soutenir la prise de décision à tous les niveaux.
        </>
      ),
      stats: [
        { label: "Années d'expérience", value: "6+" },
        { label: "Mandats réalisés", value: "5" },
        { label: "Certifications", value: "8" },
      ],
    },
    skills: {
      tag: "🛠️ Compétences",
      title: "Une stack data complète.",
      subtitle:
        "Des outils BI à l'ingénierie de données cloud, voici les technologies que je maîtrise et le nombre d'années d'expérience sur chacune.",
      items: [
        { category: "Outils Business Intelligence", desc: "Création de tableaux de bord et de rapports interactifs pour explorer la donnée et appuyer la décision.", items: "Power BI, Tableau, DAX, SQL, Python, R, Power Query", years: "6 ans" },
        { category: "Machine Learning / IA", desc: "Modèles d'apprentissage automatique pour prédire, classer et détecter des tendances dans les données.", items: "Régression linéaire, Classification, Random Forest, LSTM", years: "1 an" },
        { category: "ETL / ELT", desc: "Extract-Transform-Load : pipelines qui extraient, transforment et chargent la donnée d'un système vers un autre.", items: "Microsoft Fabric, Azure Synapse, Azure Data Factory, Azure Databricks", years: "5 ans" },
        { category: "Cloud", desc: "Hébergement et traitement de la donnée sur une infrastructure cloud évolutive et sécurisée.", items: "Azure", years: "5 ans" },
        { category: "Langages de programmation", desc: "Langages utilisés pour manipuler, analyser et automatiser le traitement de la donnée.", items: "Python, R et SQL", years: "6 ans" },
        { category: "Bases de données", desc: "Systèmes relationnels pour stocker et interroger la donnée structurée en SQL.", items: "PostgreSQL, MySQL, Azure SQL Database", years: "6 ans" },
        { category: "Entrepôt de données", desc: "Centralisation de la donnée (Warehouse, Data Lake, Lakehouse) pour l'analyse à grande échelle.", items: "Warehouse, Data Lake, Lakehouse", years: "4 ans" },
        { category: "Big Data", desc: "Traitement distribué et en parallèle de très grands volumes de données.", items: "Spark, Hadoop", years: "4 ans" },
        { category: "Modélisation & cadre de référence", desc: "Méthodes agiles et outils de gestion pour structurer et piloter les projets data.", items: "JIRA, Méthode Scrum, Méthode Agile", years: "6 ans" },
        { category: "Versionning", desc: "Suivi des versions du code et collaboration en équipe via Git et GitHub.", items: "Git et GitHub", years: "6 ans" },
      ],
    },
    experience: {
      tag: "✨ Expériences",
      title: "Des projets à impact international.",
      subtitle:
        "J'ai accompagné des organisations humanitaires et institutionnelles à travers l'Afrique. Voici quelques-uns de mes mandats :",
      counter: "mandats",
      items: [
        { role: "Développeur Business Intelligence", company: "International Council for Voluntary Agencies (ICVA)", period: "Nov. 2024 – Fév. 2025 · 5 mois", location: "Sénégal", project: "Baromètre de localisation de l'aide humanitaire" },
        { role: "Analyste de données", company: "Impact-Initiatives", period: "Sep. 2022 – Sep. 2024 · 24 mois", location: "République Centrafricaine, Uganda", project: "Évaluation multisectorielle des besoins de population (OCHA)" },
        { role: "Analyste de données", company: "iMMAP", period: "Avr. 2022 – Jui. 2022 · 3 mois", location: "Cameroun", project: "Renforcement des capacités techniques en gestion de l'information (OCHA)" },
        { role: "Analyste de données", company: "INTERSOS", period: "Sep. 2019 – Fév. 2022 · 31 mois", location: "Cameroun", project: "Assistance aux personnes victimes de catastrophes et de conflits armés (OCHA, ECHO)" },
        { role: "Analyste de données", company: "Ministère de l'Élevage et de l'Agriculture", period: "Oct. 2016 – Fév. 2019 · 29 mois", location: "Cameroun", project: "Recensement Général de l'Agriculture et de l'Élevage (RGAE)" },
      ],
    },
    showcase: {
      kicker: "Data → Décision",
      title: "Transformer la donnée en décision.",
      subtitle:
        "De la collecte à la visualisation, des pipelines fiables et automatisés qui font parler vos données et éclairent chaque décision.",
    },
    domains: {
      title: (
        <>
          Domaines
          <br />
          <span className="text-gradient clash-grotesk tracking-normal">
            d&apos;intervention.
          </span>
        </>
      ),
      subtitle:
        "Mon expertise couvre l'ensemble de la chaîne de la donnée, de l'infrastructure cloud à la décision métier.",
      items: [
        { service: "Infonuagique & Cloud", description: "Conception et exploitation d'environnements cloud Azure : Microsoft Fabric, Synapse, Data Factory et Databricks." },
        { service: "Big Data & ETL/ELT", description: "Mise en place de pipelines ETL/ELT automatisés, résilients et monitorables avec Spark et Hadoop." },
        { service: "Machine Learning / IA", description: "Modélisation prédictive : régression, classification, Random Forest et réseaux LSTM." },
        { service: "Visualisation des données", description: "Tableaux de bord dynamiques et reporting décisionnel sous Power BI et Tableau pour les parties prenantes." },
        { service: "Gestion de projet agile", description: "Collaboration avec les équipes métiers en méthode Scrum / Agile pour transformer la donnée en levier stratégique." },
      ],
    },
    education: {
      tag: "🎓 Parcours",
      title: "Formation & certifications.",
      formation: "Formation",
      certifications: "Certifications",
      items: [
        { title: "Certificat en Science des données", place: "Université du Québec (TÉLUQ)" },
        { title: "Maîtrise en Informatique Appliquée aux Systèmes d'Information Géographique", place: "Université de Douala" },
      ],
      certs: certifications,
    },
    contact: {
      title: (
        <>
          Travaillons{" "}
          <span className="text-gradient clash-grotesk">ensemble.</span>
        </>
      ),
      subtitle:
        "Disponible pour de nouveaux projets data, BI et IA. N'hésitez pas à me contacter pour en discuter.",
      address: "📍 2125 Rue de Villeneuve, Longueuil, QC · 📞 418 572 5156",
      button: "Me contacter",
    },
    footer: { rights: "Tous droits réservés.", localTime: "Heure locale :" },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      subtitle:
        "BI-AI Developer & Analyst with over 6 years of international experience in statistical analysis, big data processing and decision-oriented visualization.",
      contact: "Get in touch",
      learnMore: "Learn more",
      viewCv: "View CV",
      downloadCv: "Download CV",
      scroll: "Scroll to discover",
    },
    about: {
      paragraph: (
        <>
          Rigorous, results-driven BI Developer & Analyst specialized in
          designing and optimizing{" "}
          <span className="text-gradient clash-grotesk">BI/ETL pipelines</span>{" "}
          with strong command of SQL, R and Python. Experienced with analytics
          platforms and cloud environments — Microsoft Fabric, Azure Data Factory
          and Power BI — I turn data into strategic and operational leverage to
          support decision-making at every level.
        </>
      ),
      stats: [
        { label: "Years of experience", value: "6+" },
        { label: "Projects delivered", value: "5" },
        { label: "Certifications", value: "8" },
      ],
    },
    skills: {
      tag: "🛠️ Skills",
      title: "A full data stack.",
      subtitle:
        "From BI tools to cloud data engineering, here are the technologies I master and the years of experience on each.",
      items: [
        { category: "Business Intelligence Tools", desc: "Building interactive dashboards and reports to explore data and support decision-making.", items: "Power BI, Tableau, DAX, SQL, Python, R, Power Query", years: "6 yrs" },
        { category: "Machine Learning / AI", desc: "Machine learning models to predict, classify and detect trends in data.", items: "Linear Regression, Classification, Random Forest, LSTM", years: "1 yr" },
        { category: "ETL / ELT", desc: "Extract-Transform-Load: pipelines that extract, transform and load data from one system to another.", items: "Microsoft Fabric, Azure Synapse, Azure Data Factory, Azure Databricks", years: "5 yrs" },
        { category: "Cloud", desc: "Hosting and processing data on scalable, secure cloud infrastructure.", items: "Azure", years: "5 yrs" },
        { category: "Programming Languages", desc: "Languages used to manipulate, analyze and automate data processing.", items: "Python, R and SQL", years: "6 yrs" },
        { category: "Databases", desc: "Relational systems to store and query structured data with SQL.", items: "PostgreSQL, MySQL, Azure SQL Database", years: "6 yrs" },
        { category: "Data Warehousing", desc: "Centralizing data (Warehouse, Data Lake, Lakehouse) for large-scale analysis.", items: "Warehouse, Data Lake, Lakehouse", years: "4 yrs" },
        { category: "Big Data", desc: "Distributed, parallel processing of very large data volumes.", items: "Spark, Hadoop", years: "4 yrs" },
        { category: "Modeling & Frameworks", desc: "Agile methods and management tools to structure and drive data projects.", items: "JIRA, Scrum, Agile", years: "6 yrs" },
        { category: "Version Control", desc: "Version tracking and team collaboration through Git and GitHub.", items: "Git and GitHub", years: "6 yrs" },
      ],
    },
    experience: {
      tag: "✨ Experience",
      title: "Projects with international impact.",
      subtitle:
        "I have supported humanitarian and institutional organizations across Africa. Here are some of my assignments:",
      counter: "assignments",
      items: [
        { role: "Business Intelligence Developer", company: "International Council for Voluntary Agencies (ICVA)", period: "Nov. 2024 – Feb. 2025 · 5 months", location: "Senegal", project: "Humanitarian aid localization barometer" },
        { role: "Data Analyst", company: "Impact-Initiatives", period: "Sep. 2022 – Sep. 2024 · 24 months", location: "Central African Republic, Uganda", project: "Multi-sector needs assessment of populations (OCHA)" },
        { role: "Data Analyst", company: "iMMAP", period: "Apr. 2022 – Jun. 2022 · 3 months", location: "Cameroon", project: "Technical capacity building in information management (OCHA)" },
        { role: "Data Analyst", company: "INTERSOS", period: "Sep. 2019 – Feb. 2022 · 31 months", location: "Cameroon", project: "Assistance to people affected by disasters and armed conflicts (OCHA, ECHO)" },
        { role: "Data Analyst", company: "Ministry of Livestock and Agriculture", period: "Oct. 2016 – Feb. 2019 · 29 months", location: "Cameroon", project: "General Census of Agriculture and Livestock (RGAE)" },
      ],
    },
    showcase: {
      kicker: "Data → Decision",
      title: "Turning data into decisions.",
      subtitle:
        "From ingestion to visualization, reliable automated pipelines that make your data speak and inform every decision.",
    },
    domains: {
      title: (
        <>
          Areas of
          <br />
          <span className="text-gradient clash-grotesk tracking-normal">
            expertise.
          </span>
        </>
      ),
      subtitle:
        "My expertise covers the entire data chain, from cloud infrastructure to business decision-making.",
      items: [
        { service: "Cloud Computing", description: "Design and operation of Azure cloud environments: Microsoft Fabric, Synapse, Data Factory and Databricks." },
        { service: "Big Data & ETL/ELT", description: "Building automated, resilient and monitorable ETL/ELT pipelines with Spark and Hadoop." },
        { service: "Machine Learning / AI", description: "Predictive modeling: regression, classification, Random Forest and LSTM networks." },
        { service: "Data Visualization", description: "Dynamic dashboards and decision-oriented reporting in Power BI and Tableau for stakeholders." },
        { service: "Agile Project Management", description: "Collaborating with business teams using Scrum / Agile to turn data into strategic leverage." },
      ],
    },
    education: {
      tag: "🎓 Background",
      title: "Education & certifications.",
      formation: "Education",
      certifications: "Certifications",
      items: [
        { title: "Data Science Certificate", place: "University of Quebec (TÉLUQ)" },
        { title: "Master's in Computer Science Applied to Geographic Information Systems", place: "University of Douala" },
      ],
      certs: certifications,
    },
    contact: {
      title: (
        <>
          Let&apos;s work{" "}
          <span className="text-gradient clash-grotesk">together.</span>
        </>
      ),
      subtitle:
        "Available for new data, BI and AI projects. Feel free to reach out to discuss.",
      address: "📍 2125 Rue de Villeneuve, Longueuil, QC · 📞 418 572 5156",
      button: "Get in touch",
    },
    footer: { rights: "All rights reserved.", localTime: "Local time:" },
  },
};

type LanguageContextValue = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang") as Lang | null;
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
    } else if (navigator.language.toLowerCase().startsWith("en")) {
      setLangState("en");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
