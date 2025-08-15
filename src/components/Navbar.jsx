import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const PALETTE = {
  offWhite: "#F8FBFF", // soft off-white background
  deepOceanBlue: "#01497C", // deep ocean blue for text or accents
  overlay: "rgba(255,255,255,0.3)" // translucent white overlay
};

const navItems = [
  { name: "About Me", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Timeline", href: "#timeline" },
  { name: "Proof", href: "#proof" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.screenY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Handler for hover color change
  const handleLinkMouseEnter = (e) => {
    e.target.style.color = PALETTE.overlay;
  };
  const handleLinkMouseLeave = (e) => {
    e.target.style.color = PALETTE.offWhite;
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 backdrop-blur-md shadow-xs" : "py-5"
      )}
      style={{ background: PALETTE.deepOceanBlue }}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold flex items-center"
          href="#hero"
        >
          <span
            className="relative z-10"
            style={{ color: PALETTE.offWhite }}
          >
            Shriya Kalyan
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="transition-colors duration-300"
              style={{ color: PALETTE.offWhite }}
              onMouseEnter={handleLinkMouseEnter}
              onMouseLeave={handleLinkMouseLeave}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile nav */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          style={{ color: PALETTE.offWhite }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed inset-0 backdroup-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
          style={{ background: PALETTE.offWhite, opacity: 0.95 }}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="transition-colors duration-300"
                style={{ color: PALETTE.offWhite }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={handleLinkMouseEnter}
                onMouseLeave={handleLinkMouseLeave}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
