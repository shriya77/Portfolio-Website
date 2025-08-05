import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const phrases = [
  "your uterus deserves better.",
  "we’ve seen things.",
  "materna is the group chat, but smarter.",
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center"
    >
      <div className="container max-w-4xl mx-auto z-10 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          This isn't a mommy blog. <br /> This is Materna.
        </h1>

        <p className="text-xl md:text-2xl font-medium">
          Unlimited support for every mother
        </p>

        <p className="text-lg font-mono italic text-foreground h-10 transition-opacity duration-300">
          {phrases[index]}
        </p>

        <div className="pt-4">
          <a
            href="#waitlist"
            className="inline-block text-white bg-[#234451] px-8 py-3 rounded-full text-lg font-semibold transition-transform hover:animate-wiggle"
          >
            GET ME IN ALREADY 🔥
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
