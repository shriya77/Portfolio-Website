import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "GraphQL", level: 60, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  return (
    <section id="mission" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Our <span className="text-primary">Mission</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="animate-fade-in animate-float-1 transition-transform duration-300">
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-[#DFA69F] to-[#99C8C1]">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 h-full glow-card">
                <h3 className="font-semibold text-xl mb-2 text-[#234451]">
                  Support In Every Stage
                </h3>
                <p className="text-[#234451]">
                  From pregnancy to postpartum, Materna provides personalized tools and resources to guide mothers every step of the way.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in animate-float-2 transition-transform duration-300">
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-[#DFA69F] to-[#99C8C1]">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 h-full glow-card">
                <h3 className="font-semibold text-xl mb-2 text-[#234451]">
                  Empowerment using Knowledge
                </h3>
                <p className="text-[#234451]">
                  We believe education is power. Materna connects moms to expert-backed content and symptom tracking tools to stay informed and confident.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in animate-float-loop transition-transform duration-300">
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-[#DFA69F] to-[#99C8C1]">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 h-full glow-card">
                <h3 className="font-semibold text-xl mb-2 text-[#234451]">
                  Community & Compassion
                </h3>
                <p className="text-[#234451]">
                  A moderated forum and shared experiences from other moms create a safe, supportive space where no one feels alone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
