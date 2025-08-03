import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-[hsl(var(--foreground))] relative border-t border-[hsl(var(--border))] mt-12 pt-8 flex flex-wrap justify-between items-center">
      {" "}
      <p className="text-sm text-[hsl(var(--background))]">
        {" "}
        &copy; {new Date().getFullYear()} Materna. All rights reserved.
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-[hsl(var(--background))] hover:bg-[hsl(var(--primary))] text-[hsl(var(--foreground))] transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
