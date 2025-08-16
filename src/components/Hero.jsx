import { useEffect, useState, useRef } from "react";

const getTimeAwareMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning.";
  if (hour >= 12 && hour < 16) return "Good afternoon.";
  if (hour >= 16 && hour < 23) return "Good evening."
  return "Burning the midnight oil?";
};

const messages = [
  getTimeAwareMessage(),
  "I've been expecting you.",
  "I build tech that saves lives.",
  "Want to see how?",
];

const PALETTE = {
  deepOceanBlue: "#2563eb",
  offWhite: "#f9fafb",
};

export const HeroSection = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showTypingIndicator, setShowTypingIndicator] = useState(true);
  const [finished, setFinished] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);
  const containerRef = useRef(null);
  const blobsRef = useRef([]);
  const particlesRef = useRef([]);
  const pointerPos = useRef({ x: 0, y: 0 });
  const lastMove = useRef(0);
  const prefersReducedMotion = useRef(false);
  const [primaryCTAHover, setPrimaryCTAHover] = useState(false);

  // For glow effect
  const glowRef = useRef(null);
  const glowPos = useRef({ x: 0, y: 0 });

  // For ripple effect
  const rippleContainerRef = useRef(null);
  const ripplesRef = useRef([]);

  // Inject keyframes for cursor blink
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      @keyframes blink-dots {
        0%, 20% { opacity: 0.2; }
        50% { opacity: 1; }
        100% { opacity: 0.2; }
      }
      @keyframes rippleExpandFade {
        0% {
          transform: scale(0);
          opacity: 0.4;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Sequentially show messages with typing indicator
  useEffect(() => {
    if (skipped) {
      setDisplayedText(messages.join(" "));
      setShowTypingIndicator(false);
      setFinished(true);
      setShowCTAs(true);
      return;
    }
    if (currentMessageIndex >= messages.length) {
      setFinished(true);
      setShowCTAs(true);
      setShowTypingIndicator(false);
      return;
    }
    setShowTypingIndicator(true);
    setDisplayedText("");
    const typingTimeout = setTimeout(() => {
      setDisplayedText(messages[currentMessageIndex]);
      setShowTypingIndicator(false);
      const nextTimeout = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(nextTimeout);
    }, 1500);

    return () => clearTimeout(typingTimeout);
  }, [currentMessageIndex, skipped]);

  // Skip intro handler
  const handleSkip = () => {
    setSkipped(true);
  };

  // Setup prefers-reduced-motion
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Pointer parallax effect for blobs and particles
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const blobs = blobsRef.current;
    const particles = particlesRef.current;
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e) => {
      const now = Date.now();
      if (now - lastMove.current < 16) return; // throttle ~60fps
      lastMove.current = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      pointerPos.current = { x, y };

      blobs.forEach((blob, i) => {
        if (!blob) return;
        const factor = (i + 1) * 0.03;
        blob.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
      });
      particles.forEach((particle, i) => {
        if (!particle) return;
        const factor = (i + 1) * 0.06;
        particle.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
      });
    };

    container.addEventListener("pointermove", handlePointerMove);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
    };
  }, [finished]);

  // Glow effect: follow pointer smoothly
  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    let animationFrameId;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const updateGlowPosition = () => {
      const rect = container.getBoundingClientRect();
      // Target position relative to container top-left
      const targetX = pointerPos.current.x + rect.width / 2;
      const targetY = pointerPos.current.y + rect.height / 2;

      // Current glow position
      const currentX = glowPos.current.x;
      const currentY = glowPos.current.y;

      // Smoothly interpolate towards target
      const newX = lerp(currentX, targetX, 0.15);
      const newY = lerp(currentY, targetY, 0.15);

      glowPos.current = { x: newX, y: newY };

      // Position glow div centered at newX, newY
      glow.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(updateGlowPosition);
    };

    animationFrameId = requestAnimationFrame(updateGlowPosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [finished]);

  // Ripple effect on pointer move
  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const container = containerRef.current;
    const rippleContainer = rippleContainerRef.current;
    if (!container || !rippleContainer) return;

    const ripples = [];

    const createRipple = (x, y) => {
      const ripple = document.createElement("div");
      const size = 60;
      ripple.style.position = "absolute";
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.borderRadius = "50%";
      ripple.style.backgroundColor = "rgba(37, 99, 235, 0.4)";
      ripple.style.pointerEvents = "none";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "rippleExpandFade 0.7s ease forwards";
      rippleContainer.appendChild(ripple);

      const timeoutId = setTimeout(() => {
        if (ripple.parentNode === rippleContainer) {
          rippleContainer.removeChild(ripple);
        }
      }, 700);

      ripples.push({ ripple, timeoutId });
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createRipple(x, y);
    };

    container.addEventListener("pointermove", handlePointerMove);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      ripples.forEach(({ ripple, timeoutId }) => {
        clearTimeout(timeoutId);
        if (ripple.parentNode === rippleContainer) {
          rippleContainer.removeChild(ripple);
        }
      });
      ripples.length = 0;
    };
  }, []);

  // Inline styles
  const containerStyle = {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 1.5rem",
    overflow: "hidden",
    // backgroundColor: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#111827",
    textAlign: "center",
  };

  const rippleContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "visible",
    zIndex: 1,
  };

  const blobStyle = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.3,
    pointerEvents: "none",
  };

  const particleStyle = {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "#60a5fa",
    opacity: 0.15,
    pointerEvents: "none",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    lineHeight: 1.2,
    maxWidth: "90vw",
    color: "#ffffff",
  };

const bubbleContainerStyle = {
  position: "relative",
  display: "inline-block",
  maxWidth: typeof window !== "undefined" && window.innerWidth < 768 ? "80vw" : "90vw",
  backgroundColor: typeof window !== "undefined"
    ? (window.innerWidth < 768 ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 1)")
    : "rgba(255, 255, 255, 1)",
  borderRadius: "16px",
  padding: "0.75rem 1.25rem",
  marginBottom: "1.5rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  color: "#111827",
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: "1.25rem",
  fontWeight: "500",
  whiteSpace: "pre-wrap",
  textAlign: "center",
  alignSelf: "center",
  zIndex: 1,
};

  const bubbleTailStyle = {
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 0,
  height: 0,
  borderTop: typeof window !== "undefined" && window.innerWidth < 768
    ? "12px solid rgba(255,255,255,0.3)"
    : "12px solid rgba(255,255,255,1)",
  borderRight: "12px solid transparent",
  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.05))",
};

  const messageWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "3rem",
    width: "100%",
    zIndex: 2,
  };

  const typingIndicatorStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    marginLeft: "6px",
    verticalAlign: "bottom",
    height: "1.25em",
  };

  const dotStyle = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#111827",
    opacity: 0.2,
    animationName: "blink-dots",
    animationDuration: "1.4s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  };

  const skipButtonStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    backgroundColor: PALETTE.deepOceanBlue,
    border: `2px solid ${PALETTE.deepOceanBlue}`,
    color: "#ffffff",
    padding: "0.75rem 1.25rem",
    borderRadius: "9999px",
    fontWeight: "700",
    cursor: "pointer",
    userSelect: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "background-color 0.3s, color 0.3s, transform 0.2s",
    touchAction: "manipulation",
    zIndex: 3,
  };

  const skipButtonHover = (e) => {
    e.currentTarget.style.backgroundColor = PALETTE.deepOceanBlue;
    e.currentTarget.style.color = "#fff";
  };

  const skipButtonUnhover = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = PALETTE.deepOceanBlue;
  };

  const ctaContainerStyle = {
    opacity: showCTAs ? 0.8 : 0,
    transform: showCTAs ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "2rem",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "360px",
    padding: "0 1rem",
    zIndex: 2,
  };

  const primaryCTAStyle = {
    backgroundColor: primaryCTAHover ? "#013b5c" : "#01497C",
    color: "#fff",
    border: "none",
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    fontWeight: "700",
    fontSize: "1.125rem",
    cursor: "pointer",
    textDecoration: "none",
    userSelect: "none",
    flex: "0 0 auto",
    textAlign: "center",
    minWidth: "100px",
  };

  const secondaryLinkStyle = {
    alignSelf: "center",
    fontSize: "1rem",
    color: PALETTE.deepOceanBlue,
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
    background: "none",
    border: "none",
    padding: 0,
    userSelect: "none",
    flex: "1 1 auto",
    minWidth: "100px",
    textAlign: "center",
  };

  // Typing indicator dots with staggered animation delay
  const TypingIndicator = () => (
    <span style={typingIndicatorStyle} aria-hidden="true">
      <span style={{ ...dotStyle, animationDelay: "0s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.2s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.4s" }} />
    </span>
  );

  const glowStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
    background: "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%)",
    filter: "blur(40px)",
    transform: "translate3d(0,0,0) translate(-50%, -50%)",
    transition: "background-color 0.3s",
  };

  return (
    <section ref={containerRef} style={containerStyle} aria-label="Hero section">
      {/* Glow effect */}
      <div ref={glowRef} style={glowStyle} />

      {/* Ripple effect container */}
      <div ref={rippleContainerRef} style={rippleContainerStyle} />

      {/* Background blobs */}
      <div
        ref={(el) => (blobsRef.current[0] = el)}
        style={{
          ...blobStyle,
          width: 280,
          height: 280,
          background:
            "radial-gradient(circle at center, #3b82f6 40%, transparent 70%)",
          top: "12%",
          left: "12%",
          zIndex: 0,
        }}
      />
      <div
        ref={(el) => (blobsRef.current[1] = el)}
        style={{
          ...blobStyle,
          width: 360,
          height: 360,
          background:
            "radial-gradient(circle at center, #2563eb 35%, transparent 80%)",
          bottom: "15%",
          right: "18%",
          zIndex: 0,
        }}
      />
      {/* Background particles */}
      {[...Array(6)].map((_, i) => {
        const size = 7 + i * 3;
        const posX = 14 + i * 11;
        const posY = 19 + (i % 2) * 14;
        return (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            style={{
              ...particleStyle,
              width: size,
              height: size,
              top: `${posY}%`,
              left: `${posX}%`,
              backgroundColor: `rgba(37, 99, 235, ${0.15 + i * 0.05})`,
              zIndex: 0,
            }}
          />
        );
      })}

      {/* Skip Intro Button */}
      {!finished && (
        <button
          type="button"
          onClick={handleSkip}
          style={skipButtonStyle}
          onMouseEnter={skipButtonHover}
          onMouseLeave={skipButtonUnhover}
          aria-label="Skip intro"
        >
          Skip intro
        </button>
      )}

      <h1 style={headingStyle}>Hi, I’m Shriya.</h1>

      <img
        src="https://img.freepik.com/premium-vector/caution-work-progress-construction-zone_24886-2804.jpg"
        alt="Work in progress"
        style={{ maxWidth: "300px", width: "80%", margin: "1.5rem auto", display: "block", borderRadius: "12px" }}
      />

      <div style={messageWrapperStyle} aria-live="polite" aria-atomic="true" role="text">
        <div style={bubbleContainerStyle}>
          {displayedText}
          {showTypingIndicator && !skipped && (
            <TypingIndicator />
          )}
        </div>
      </div>

      {showCTAs && (
        <div style={ctaContainerStyle}>
          <a
            href="#projects"
            style={primaryCTAStyle}
            tabIndex={0}
            onMouseEnter={() => setPrimaryCTAHover(true)}
            onMouseLeave={() => setPrimaryCTAHover(false)}
          >
            See my work
          </a>
        </div>
      )}
    </section>
  );
};
