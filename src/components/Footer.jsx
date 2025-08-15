
import { ArrowUp } from "lucide-react";

const PALETTE = {
  offWhite: "#F8FBFF", // soft off-white background
  deepOceanBlue: "#01497C", // deep ocean blue for text or accents
  overlay: "rgba(255,255,255,0.3)" // translucent white overlay
};

import { useState } from "react";

export const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <footer
      className={`py-12 px-4 relative border-t border-[hsl(var(--border))] mt-12 pt-8 flex flex-wrap justify-between items-center`}
      style={{ background: PALETTE.deepOceanBlue }}
    >
      {" "}
      <p className={`text-sm`} style={{ color: PALETTE.offWhite }}>
        {" "}
        &copy; {new Date().getFullYear()} Shriya Kalyan. All rights reserved.
      </p>
      <a
        href="#hero"
        className={`p-2 rounded-full transition-colors`}
        style={{
          background: isHovered ? PALETTE.overlay : PALETTE.offWhite,
          color: PALETTE.deepOceanBlue,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
