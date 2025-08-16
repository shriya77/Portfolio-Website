import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/Hero";
import { AboutSection } from "../components/Experience";
import { SkillsSection } from "../components/Skills";
import { ProjectsSection } from "../components/Projects";
import { ContactSection } from "../components/Contact";
import { Footer } from "../components/Footer";

const PALETTE = {
  offWhite: "#F8FBFF", // soft off-white background
  deepOceanBlue: "#01497C", // deep ocean blue for text or accents
  overlay: "rgba(255,255,255,0.3)" // translucent white overlay
};

export const Home = () => {
  return (
    <>
      <div className="fixed inset-0 bg-sky-500/70 pointer-events-none z-0"></div>

      <div className="relative z-10 min-h-screen text-foreground overflow-x-hidden">
        <div className="hidden md:block">
          <Navbar />
        </div>
        {/* Main Content */}
        <main>
          {<HeroSection />}
          {<AboutSection />}
          {<ProjectsSection />}
          {<SkillsSection />}
          {<ContactSection />}
        </main>

        {<Footer />}
      </div>
    </>
  );
};
