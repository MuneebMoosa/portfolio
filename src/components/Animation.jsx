import React, { useRef, useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

// ─── SVG Leaf ────────────────────────────────────────────────────────────────
const LeafSVG = ({ size, c1, c2 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512">
    <path fill={c1} d="M489.525,493.943c-2.554,0-5.109-0.958-7.082-2.882L202.203,217.825c-4.013-3.913-4.094-10.338-0.181-14.348c3.913-4.014,10.337-4.095,14.35-0.183L496.609,476.53c4.013,3.913,4.094,10.338,0.183,14.348C494.804,492.919,492.166,493.943,489.525,493.943z"/>
    <path fill={c2} d="M511.807,192.381c-11.258,0.325-25.52,1.755-41.526,5.933c-18.494,4.826-33.315,11.753-44.071,17.797c4.988-41.131,5.085-52.544,5.085-52.544c0.2-23.451-4.554-41.131-7.625-52.544C408.39,54.226,367.591,12.837,354.175,0C340.91,11.633,324.4,28.551,309.256,51.697c-19.555,29.9-29.043,58.289-33.9,77.968c-0.344-0.357-29.909-36.019-61.867-60.173c-21.792-16.464-40.951-24.756-58.477-32.204C127.115,25.435,77.035,8.486,7.821,7.646c0.786,69.4,17.775,119.6,29.649,147.547c7.448,17.524,15.737,36.683,32.204,58.476c24.153,31.957,59.814,61.524,60.173,61.869c-19.679,4.856-48.07,14.343-77.971,33.899c-23.145,15.14-40.063,31.65-51.696,44.915c12.84,13.418,54.226,54.217,111.022,69.495c11.415,3.071,29.092,7.826,52.544,7.628c0,0,11.415-0.096,52.544-5.085c-6.046,10.755-12.971,25.577-17.797,44.069c-4.178,16.006-5.608,30.268-5.933,41.527c15.869,0.192,67.694-1.216,108.479-38.986c22.458-20.795,32.794-44.489,37.288-55.087c8.674-20.438,11.072-37.847,13.271-66.523c28.445-2.192,45.788-4.607,66.135-13.24c10.595-4.496,34.289-14.833,55.087-37.291C510.593,260.073,512.002,208.253,511.807,192.381z"/>
  </svg>
);

// ─── Depth tiers ─────────────────────────────────────────────────────────────
const TIERS = [
  { size: 18, opacity: 0.3, blur: 3, speed: 0.4, c1: "#8B2020", c2: "#A83030" },
  { size: 28, opacity: 0.4, blur: 2, speed: 0.7, c1: "#B03030", c2: "#CC4040" },
  { size: 42, opacity: 0.5, blur: 1, speed: 1.0, c1: "#E84A4A", c2: "#FF6B6B" },
  { size: 60, opacity: 0.6, blur: 0, speed: 1.4, c1: "#E84A4A", c2: "#FF8C8C" },
];

// ─── Seeded random ───────────────────────────────────────────────────────────
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Leaf ────────────────────────────────────────────────────────────────────
const Leaf = React.memo(({ config, scrollVelocity }) => {
  const yMV = useMotionValue(config.initialY);
  const rotateMV = useMotionValue(config.rotate);

  useAnimationFrame(() => {
    const vel = scrollVelocity.get();
    const clamped = Math.max(Math.min(vel, 50), -50);
    const height = window.innerHeight;

    const delta = clamped * config.speed * 0.08;
    const nextY = yMV.get() + delta;

    if (nextY > height + 100) yMV.set(-100);
    else if (nextY < -150) yMV.set(height + 80);
    else yMV.set(nextY);

    if (Math.abs(clamped) > 0.2) {
      rotateMV.set(rotateMV.get() + clamped * config.speed * 0.01);
    }
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${config.xPercent}%`,
        top: 0,
        y: yMV,
        rotate: rotateMV,
        opacity: config.opacity,
        filter: config.blur ? `blur(${config.blur}px)` : "none",
        pointerEvents: "none",
      }}
      animate={{
        x: [0, config.swayAmount, -config.swayAmount, 0],
      }}
      transition={{
        duration: config.swayDuration,
        delay: config.swayDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <LeafSVG size={config.size} c1={config.c1} c2={config.c2} />
    </motion.div>
  );
});

// ─── Main ────────────────────────────────────────────────────────────────────
const Animation = () => {
  const scrollVelocity = useMotionValue(0);
  const lastScrollY = useRef(0);

  // 🔥 Responsive scale factor
  const getScale = () => {
    if (window.innerWidth < 640) return 0.6;
    if (window.innerWidth < 1024) return 0.8;
    return 1;
  };

  const scale = getScale();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let timeout;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const dy = currentY - lastScrollY.current;

      scrollVelocity.set(dy);
      lastScrollY.current = currentY;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        scrollVelocity.set(0);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [scrollVelocity]);

  const leaves = useMemo(() => {
    const rand = seeded(77);
    const vh = window.innerHeight;

    return Array.from({ length: 30 }, (_, i) => {
      const tier = TIERS[Math.floor(rand() * TIERS.length)];

      return {
        id: i,
        xPercent: rand() * 100,
        initialY: rand() * vh,
        rotate: rand() * 360,
        swayAmount: (10 + rand() * 20) * scale,
        swayDuration: 4 + rand() * 5,
        swayDelay: -(rand() * 7),

        size: tier.size * scale,
        opacity: tier.opacity,
        blur: tier.blur * scale,
        speed: tier.speed,
        c1: tier.c1,
        c2: tier.c2,
      };
    });
  }, [scale]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} config={leaf} scrollVelocity={scrollVelocity} />
      ))}
    </div>
  );
};

export default Animation;