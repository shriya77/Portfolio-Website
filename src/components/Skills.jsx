import { useState } from "react";

const skills = [
  { name: "JavaScript", level: 90, category: "Languages" },
  { name: "TypeScript", level: 65, category: "Languages" },
  { name: "Python", level: 90, category: "Languages" },
  { name: "C++", level: 80, category: "Languages" },
  { name: "Swift", level: 30, category: "Languages" },
  { name: "HTML/CSS", level: 100, category: "Languages" },
  { name: "SQL", level: 70, category: "Languages" },
  { name: "Java", level: 10, category: "Languages" },
  { name: "Django", level: 35, category: "Frameworks" },
  { name: "React.js", level: 90, category: "Frameworks" },
  { name: "React Native", level: 70, category: "Frameworks" },
  { name: "Tailwind CSS", level: 70, category: "Frameworks" },
  { name: "Figma", level: 85, category: "Tools" },
  { name: "Canva", level: 100, category: "Tools" },
  { name: "Linux", level: 50, category: "Tools" },
  { name: "AWS (Lambda, DynamoDB)", level: 45, category: "Certs & Others" },
  { name: "Agile/Scrum", level: 80, category: "Certs & Others" },
  { name: "UI/UX Design", level: 95, category: "Certs & Others" },
  { name: "User Research", level: 75, category: "Certs & Others" },
  { name: "GitHub/Git", level: 90, category: "Certs & Others" },
  { name: "Relational Databases", level: 70, category: "Certs & Others" },
  { name: "SEO Optimization", level: 100, category: "Certs & Others" },
  { name: "Ownership", level: 95, category: "Soft Skills" },
  { name: "Collaboration with cross-functional teams", level: 90, category: "Soft Skills" },
  { name: "Resilience", level: 85, category: "Soft Skills" },
  { name: "Adaptability", level: 80, category: "Soft Skills" },
  { name: "Entrepreneurship", level: 85, category: "Soft Skills" },
];

const categories = ["Languages", "Frameworks", "Tools", "Certs & Others", "Soft Skills"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Placeholder for animation logic (e.g. GSAP or Three.js)
  // When a category is active, skills of that category expand outward in a wheel/spokes layout.

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center py-24 px-4 bg-secondary/30 min-h-[400px]"
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-center mb-12">My Skills</h2>
      <div className="relative w-80 flex flex-col items-center justify-center">
        {/* Central core categories */}
        <div className="flex justify-center gap-8 w-full">
          {categories.map((category) => (
            <div key={category} className="flex flex-col items-center relative">
              <button
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`flex-shrink-0 flex items-center justify-center w-36 h-36 rounded-full border-2 border-white bg-white/10 text-white font-semibold cursor-pointer transition-transform duration-300 text-center leading-tight
                  ${
                    activeCategory === category
                      ? "scale-110 z-10 bg-white/20"
                      : ""
                  }`}
                aria-pressed={activeCategory === category}
                aria-label={`${category} skills category`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
              {activeCategory === category && (
                <div className="mt-4 flex flex-col items-center w-full">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <div
                        key={skill.name}
                        className="rounded-md bg-white/20 text-white px-4 py-2 mt-2 w-56 text-center text-sm font-medium select-none"
                        aria-label={`${skill.name} skill`}
                      >
                        {skill.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
