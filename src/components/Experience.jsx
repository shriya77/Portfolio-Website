import React, { useState, useRef, useEffect } from "react";

const roles = [
  {
    title: "Software Engineering Intern",
    logo: "https://static.wixstatic.com/media/72564c_34e8ca1fca4d4e30838e3b1b60983614~mv2.png",
    impact: "Built a full-stack booking platform used by 10,000+ seniors with automated session matching.",
    techStack: "React, JavaScript, Python",
    duration: "Present (Tech Me Kid)",
  },
  {
    title: "AI & Workflow Automation Extern",
    logo: "https://cdn.prod.website-files.com/6573df751dbab4bb0aac132c/65cbe658681665405e277f6d_extern_primary_black.svg",
    impact: "Developed AI-powered OCR and document retrieval pipelines, improving mortgage processing speed by 70%.",
    techStack: "Python, LlamaIndex, OCR",
    duration: "Jun 2025 - Present (Outamation @ Extern)",
  },
  {
    title: "Founder and Developer",
    logo: "/Logo.jpg",
    impact: "Built a maternal health app, won Axxess Hackathon, and now leading a 45-person team to 104 waitlist users launch product.",
    techStack: "React, Django, Firebase, PostgreSQL",
    duration: "Jan 2025 – Present (Materna)",
  },
  {
    title: "Technical Lead – Web Development",
    logo: "https://visionari-women.netlify.app/visio-logo.png",
    impact: "Led dev of a multilingual site for 300+ users with a registration system reducing manual processing.",
    techStack: "HTML, JavaScript, Flask",
    duration: "Apr 2025 - Jul 2025 (VisioNari)",
  },
  {
    title: "Software Testing Intern",
    logo: "https://play-lh.googleusercontent.com/vlu-8M6EQ6d8eLbwa3VrNTIRl0GXFJZWm2-rLQHUnXfJG-MB14CV3GFtAdswRuOXGo8=w240-h480-rw",
    impact: "Led QA cycles and test planning for 5 apps, improving release stability and operational efficiency.",
    techStack: "QA, Agile, IoT",
    duration: "Aug 2024 - Feb 2025 (Smartility)",
  },
  {
    title: "Bioinformatics Research Intern",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Monash_University_logo.svg",
    impact: "Analyzed genomic data and implemented data pipelines, delivering key insights to the Genomics Department.",
    techStack: "C, Bash, Python, Linux",
    duration: "Jun 2023 - Jul 2023 (Monash University)",
  },
  {
    title: "Project Manager",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGtHqKsz4RMR6tyLSrovhR56xoDF4u-pEBg&s",
    impact: "Organized Python workshops and a global coding competition for 80+ girls across 8 countries.",
    techStack: "Python, Project Management",
    duration: "Nov 2022 - Aug 2023 (Girls in Code SEA)",
  },
];

// Number of visible cards based on screen width
function getVisibleCount() {
  if (typeof window !== "undefined") {
    if (window.innerWidth >= 1024) return 2;
    if (window.innerWidth >= 640) return 1;
    return 1;
  }
  return 1;
}

export const AboutSection = () => {
  // Track slider values for each card
  const [sliderValues, setSliderValues] = useState(Array(roles.length).fill(50));
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Responsive visible count
  React.useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clamp current index if visibleCount changes
  React.useEffect(() => {
    if (current > roles.length - visibleCount) {
      setCurrent(Math.max(0, roles.length - visibleCount));
    }
  }, [visibleCount]);

  const handlePrev = () => {
    setCurrent((prev) => Math.max(0, prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => Math.min(roles.length - visibleCount, prev + 1));
  };

  // For sliding animation
  const cardWidth = 384; // Approx 24rem, matches max-w-md
  const gap = 48; // px-6 or gap-12
  const totalCardWidth = cardWidth + gap;
  const translateX = -(current * totalCardWidth);

  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-left sm:text-center text-white">
          Work Experience & Impact
        </h2>
        <div className="relative flex items-center justify-center max-w-4xl mx-auto">
          {/* Left Arrow */}
          <button
            aria-label="Previous role"
            onClick={handlePrev}
            disabled={current === 0}
            className={`z-10 absolute left-0 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/90 text-gray-900 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed`}
            style={{ marginLeft: '-4rem' }}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Slider */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${translateX}px)`,
                minWidth: totalCardWidth * roles.length,
              }}
            >
              {roles.map((role, idx) => (
                <div
                  key={role.title}
                  className="rounded-lg overflow-hidden shadow-md bg-white/30 backdrop-blur-md flex-shrink-0"
                  style={{
                    width: cardWidth,
                    marginRight: gap,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <img
                    src={role.logo}
                    alt={`${role.title} logo`}
                    className={`mx-auto ${
                      role.title === "AI & Workflow Automation Extern" ? "mt-8 max-h-12" : "mt-4 max-h-24"
                    } mb-6 object-contain`}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                    <p className="mb-4 text-gray-700">{role.impact}</p>
                    <p className="mb-2">
                      <strong>Tech Stack:</strong> {role.techStack}
                    </p>
                    <p className="text-sm font-semibold bg-white/20 rounded-md px-2 py-1 text-white">{role.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Arrow */}
          <button
            aria-label="Next role"
            onClick={handleNext}
            disabled={current >= roles.length - visibleCount}
            className={`z-10 absolute right-0 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/90 text-gray-900 rounded-full shadow p-2 transition disabled:opacity-40 disabled:cursor-not-allowed`}
            style={{ marginRight: '-4rem' }}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
