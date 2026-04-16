import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🔁 Replace this with YOUR SVG
const YourSVG = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      background: "#c25656",
      borderRadius: "100% 0 100% 0",
    }}
  />
);

const Animation = () => {
  const itemsRef = useRef([]);

  // ✅ MOBILE DETECTION
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return;

        // 🎯 DEPTH SYSTEM (same logic, slight mobile tuning)
        const rand = Math.random();
        let scale, opacity, speedMultiplier, blur;

        if (rand > 0.7) {
          scale = 1.2;
          opacity = 0.9;
          speedMultiplier = 1.4;
          blur = 0;
        } else if (rand > 0.3) {
          scale = 1;
          opacity = 0.6;
          speedMultiplier = 1;
          blur = 0;
        } else {
          scale = 0.7;
          opacity = 0.3;
          speedMultiplier = 0.6;
          blur = 1;
        }

        // 🔧 MOBILE VISUAL REDUCTION
        if (isMobile) {
          opacity *= 0.7; // softer look
        }

        // 🎯 INITIAL POSITION
        gsap.set(el, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale,
          opacity,
          filter: `blur(${blur}px)`
        });

        // 🔥 WIND SYSTEM (same as before)
        const directionBias = Math.random();
        let windDirection;

        if (directionBias > 0.2) {
          windDirection = 0.8 + Math.random() * 0.6;
        } else {
          windDirection = -(0.2 + Math.random() * 0.4);
        }

        // 🎯 DISTANCE (mobile reduced)
        const distanceY =
          window.innerHeight *
          (Math.random() * (isMobile ? 3 : 5) + (isMobile ? 2 : 3)) *
          speedMultiplier;

        const distanceX =
          window.innerWidth *
          (Math.random() * 3 + 2) *
          windDirection *
          speedMultiplier;

        // 🚀 GSAP ANIMATION
        gsap.to(el, {
          y: `+=${distanceY}`,
          x: `+=${distanceX}`,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: isMobile ? 2.5 : 1.5, // 🔥 smoother on mobile
          },
          modifiers: {
            y: (y) =>
              gsap.utils.wrap(-100, window.innerHeight + 100, parseFloat(y)) + "px",
            x: (x) =>
              gsap.utils.wrap(-100, window.innerWidth + 100, parseFloat(x)) + "px",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: isMobile ? 30 : 50 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          className="absolute top-0 left-0 will-change-transform"
        >
          {/* 🔥 Flutter layer */}
          <div
            style={{
              animation: `flutter ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `-${Math.random() * 5}s`,
            }}
          >
            <YourSVG
              size={
                isMobile
                  ? 5 + Math.random() * 6   // 🔧 smaller on mobile
                  : 8 + Math.random() * 10
              }
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes flutter {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          33% { transform: translate(25px, -15px) rotate(120deg) scale(0.9); }
          66% { transform: translate(-20px, 15px) rotate(240deg) scale(1.1); }
          100% { transform: translate(0px, 0px) rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Animation;