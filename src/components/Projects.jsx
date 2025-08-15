import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

/**
 * Premium Projects Section
 * - Orbiting category bubbles in center (desktop)
 * - Stacked/floating bubbles (mobile)
 * - Hover: scale + glow + tooltip
 * - Click: full-screen modal with project cards (zoom-in / fade-out)
 * - Clean Apple/Tesla aesthetic using your palette
 */

const PALETTE = {
  offWhite: "#F8FBFF", // soft off-white background
  deepOceanBlue: "#01497C", // deep ocean blue for text or accents
  overlay: "rgba(255,255,255,0.3)" // translucent white overlay
};


// Category definitions with gradients + example projects
const CATEGORIES = [
  {
    key: "ai",
    name: "AI",
    gradient: PALETTE.offWhite,
    projects: [
      {
        title: "Vision QA Agent",
        img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
        desc: "Multimodal RAG agent that answers questions about product photos with tool use and memory.",
        tags: ["RAG", "Vision", "LangChain"],
        github: "#",
        demo: "#",
      },
      {
        title: "Tiny LLM Trainer",
        img: "https://images.unsplash.com/photo-1551281044-8a5d2e9f7a2b?q=80&w=1200&auto=format&fit=crop",
        desc: "LoRA fine-tuning pipeline with experiment dashboard and dataset curation tooling.",
        tags: ["LoRA", "CUDA", "Weights & Biases"],
        github: "#",
        demo: "#",
      },
    ],
  },
  {
    key: "fullstack",
    name: "Full-Stack",
    gradient: PALETTE.offWhite,
    projects: [
      {
        title: "Realtime Collab Docs",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        desc: "End-to-end encrypted Notion-like editor with presence cursors and offline sync.",
        tags: ["CRDT", "WebSockets", "Postgres"],
        github: "#",
        demo: "#",
      },
      {
        title: "Serverless Commerce",
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
        desc: "Headless storefront + admin with Edge functions and image CDN.",
        tags: ["Next.js", "Stripe", "Edge"],
        github: "#",
        demo: "#",
      },
    ],
  },
  {
    key: "health",
    name: "HealthTech",
    gradient: PALETTE.offWhite,
    projects: [
      {
        title: "Glucose Guardian",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
        desc: "CGM anomaly detection and meal logging with privacy-first analytics.",
        tags: ["Time Series", "React Native", "Privacy"],
        github: "#",
        demo: "#",
      },
    ],
  },
  {
    key: "fin",
    name: "FinTech",
    gradient: PALETTE.offWhite,
    projects: [
      {
        title: "AlphaBacktester",
        img: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop",
        desc: "High-speed factor research and portfolio optimization playground.",
        tags: ["Pandas", "PyTorch", "Optimization"],
        github: "#",
        demo: "#",
      },
    ],
  },
  {
    key: "design",
    name: "Design",
    gradient: PALETTE.offWhite,
    projects: [
      {
        title: "FeatherUI",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
        desc: "Zero-config Tailwind + Motion component kit with dark-mode tokens.",
        tags: ["Tailwind", "Framer Motion", "Storybook"],
        github: "#",
        demo: "#",
      },
    ],
  },
];

const Tooltip = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 6 }}
    transition={{ duration: 0.18 }}
    className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold shadow-md backdrop-blur-xl"
    style={{
      background: "rgba(255,255,255,0.7)",
      color: PALETTE.text,
      border: `1px solid rgba(147,197,253,0.5)`, // hoverBlue
    }}
  >
    {children}
  </motion.div>
);

const ProjectCard = ({ p }) => (
  <div
    className="group rounded-2xl overflow-hidden border shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
    style={{ borderColor: "#e5e7eb", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
  >
    <div className="aspect-[16/10] overflow-hidden">
      <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
    </div>
    <div className="p-5">
      <h4 className="text-lg font-semibold" style={{ color: PALETTE.text }}>{p.title}</h4>
      <p className="mt-2 text-sm" style={{ color: PALETTE.textMuted }}>{p.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ background: PALETTE.section, color: PALETTE.text }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <a
          href={p.github}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors"
          style={{ background: PALETTE.base, color: PALETTE.text, border: "1px solid #e5e7eb" }}
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href={p.demo}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold"
          style={{ background: PALETTE.primary, color: PALETTE.text }}
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      </div>
    </div>
  </div>
);

const Modal = ({ open, onClose, category }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        key="overlay"
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)" }}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-6xl rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(18px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full" style={{ background: category.gradient, boxShadow: "0 10px 30px rgba(147,197,253,0.35)" }} />
              <h3 className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.hoverBlue }}>{category.name}</h3>
            </div>
            <button onClick={onClose} className="rounded-full p-2 hover:scale-105 transition" style={{ background: "rgba(255,255,255,0.12)", color: PALETTE.hoverBlue }}>
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8" style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.projects.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const ProjectsSection = () => {
  const [openKey, setOpenKey] = useState(null);
  const selected = useMemo(() => CATEGORIES.find((c) => c.key === openKey) || null, [openKey]);

  // Precompute positions around the wheel
  const radius = 180; // px on desktop
  const positions = useMemo(() => {
    const angleStep = (2 * Math.PI) / CATEGORIES.length;
    return CATEGORIES.map((_, i) => {
      const angle = i * angleStep;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{
        // translucent overlay removed for transparency
      }}
    >
      {/* Section heading */}
      <div className="pointer-events-none absolute inset-x-0 top-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: PALETTE.offWhite }}>Projects</h2>
        <p className="mt-3 text-sm md:text-base" style={{ color: PALETTE.offWhite }}>
          Click on each circle to see my projects :)
        </p>
      </div>

      {/* Centered stage */}
      <div className="relative mx-auto flex h-[120svh] w-full max-w-6xl items-center justify-center px-4">
        {/* Orbit Ring (rotates continuously) */}
        <motion.div
          className="relative h-[520px] w-[520px] hidden md:block"
          style={{
            borderRadius: "50%",
            // Subtle ring
            boxShadow: "inset 0 0 0 1px rgba(147,197,253,0.28)",
            background: "radial-gradient(transparent 63%, rgba(167,211,244,0.12) 64%, transparent 66%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        >


          {/* Bubbles placed around ring; they counter-rotate to remain upright */}
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.key}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(calc(-50% + ${positions[i].x}px), calc(-50% + ${positions[i].y}px))` }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 36, ease: "linear", repeat: Infinity }}
              >
                <motion.button
                  onClick={() => setOpenKey(cat.key)}
                  initial={false}
                  whileHover={{ scale: 1.15, boxShadow: "0 20px 50px rgba(147,197,253,0.45)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative grid place-items-center rounded-full select-none focus:outline-none"
                  style={{
                    width: 120,
                    height: 120,
                    background: `${cat.gradient}CC`,
                    color: PALETTE.deepOceanBlue,
                    boxShadow: "0 8px 30px rgba(2, 44, 89, 0.12)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    overflow: "hidden",
                  }}
                >
                  {/* Inner glass highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.42), rgba(255,255,255,0.06) 45%, transparent 60%)" }} />

                  {/* Category glyph (subtle) */}
                  <span className="text-base font-semibold tracking-tight" style={{ color: PALETTE.deepOceanBlue }}>
                    {cat.name}
                  </span>

                  {/* Tooltip */}
                  <AnimatePresence>
                    <Tooltip>{cat.name}</Tooltip>
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile layout — stacked bubbles with gentle float */}
        <div className="md:hidden grid grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setOpenKey(cat.key)}
              whileHover={{ scale: 1.08, boxShadow: "0 18px 40px rgba(147,197,253,0.45)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: Math.random() * 2 }}
              className="relative grid place-items-center rounded-full select-none focus:outline-none"
              style={{
                width: 110,
                height: 110,
                background: `${cat.gradient}CC`,
                color: PALETTE.deepOceanBlue,
                boxShadow: "0 8px 28px rgba(2, 44, 89, 0.12)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                overflow: "hidden",
              }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.42), rgba(255,255,255,0.06) 45%, transparent 60%)" }} />
              <span className="text-base font-semibold tracking-tight" style={{ color: PALETTE.deepOceanBlue }}>{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal for selected category */}
      <Modal open={!!selected} onClose={() => setOpenKey(null)} category={selected || CATEGORIES[0]} />
    </section>
  );
};

export default ProjectsSection;
