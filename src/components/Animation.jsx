import React, { useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useAnimationFrame, useSpring } from 'framer-motion';

// ─── SVG Leaf ────────────────────────────────────────────────────────────────
const LeafSVG = ({ size, c1, c2 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512">
    <path fill={c1} d="M489.525,493.943c-2.554,0-5.109-0.958-7.082-2.882L202.203,217.825c-4.013-3.913-4.094-10.338-0.181-14.348c3.913-4.014,10.337-4.095,14.35-0.183L496.609,476.53c4.013,3.913,4.094,10.338,0.183,14.348C494.804,492.919,492.166,493.943,489.525,493.943z"/>
    
    <path fill={c2} d="M511.807,192.381c-11.258,0.325-25.52,1.755-41.526,5.933c-18.494,4.826-33.315,11.753-44.071,17.797c4.988-41.131,5.085-52.544,5.085-52.544c0.2-23.451-4.554-41.131-7.625-52.544C408.39,54.226,367.591,12.837,354.175,0C340.91,11.633,324.4,28.551,309.256,51.697c-19.555,29.9-29.043,58.289-33.9,77.968c-0.344-0.357-29.909-36.019-61.867-60.173c-21.792-16.464-40.951-24.756-58.477-32.204C127.115,25.435,77.035,8.486,7.821,7.646c0.786,69.4,17.775,119.6,29.649,147.547c7.448,17.524,15.737,36.683,32.204,58.476c24.153,31.957,59.814,61.524,60.173,61.869c-19.679,4.856-48.07,14.343-77.971,33.899c-23.145,15.14-40.063,31.65-51.696,44.915c12.84,13.418,54.226,54.217,111.022,69.495c11.415,3.071,29.092,7.826,52.544,7.628c0,0,11.415-0.096,52.544-5.085c-6.046,10.755-12.971,25.577-17.797,44.069c-4.178,16.006-5.608,30.268-5.933,41.527c15.869,0.192,67.694-1.216,108.479-38.986c22.458-20.795,32.794-44.489,37.288-55.087c8.674-20.438,11.072-37.847,13.271-66.523c28.445-2.192,45.788-4.607,66.135-13.24c10.595-4.496,34.289-14.833,55.087-37.291C510.593,260.073,512.002,208.253,511.807,192.381z"/>
    
    <path fill={c1} d="M470.281,198.315c-18.494,4.826-33.317,11.751-44.073,17.796c4.988-41.127,5.085-52.543,5.085-52.543c0.198-23.453-4.553-41.131-7.624-52.544C408.39,54.229,367.591,12.84,354.172,0c-13.265,11.633-29.772,28.549-44.919,51.697c-19.555,29.901-29.043,58.292-33.898,77.968c-0.345-0.357-29.909-36.016-61.867-60.171c-21.792-16.467-40.953-24.756-58.477-32.204C127.12,25.44,77.027,8.521,7.838,7.673c0.794,69.373,17.761,119.579,29.634,147.518c1.905,4.496,3.89,9.106,6.03,13.832c-1.135-10.503-1.932-21.569-2.066-33.466c56.98,0.699,98.232,14.633,121.208,24.393c14.431,6.134,30.207,12.962,48.153,26.523c8.466,6.397,16.726,13.775,24.048,20.851c12.188,11.775,32.396,8.103,39.373-7.341c4.045-8.955,9.104-18.464,15.452-28.166c5.865-8.969,11.981-16.801,17.95-23.58c10.045-11.404,27.844-10.812,37.556,0.878c13.879,16.707,30.633,41.515,38.713,71.557c2.533,9.402,6.444,23.96,6.285,43.274c0,0-0.008,0.966-0.156,3.392c-1.039,17.225,15.118,29.755,31.801,25.341c13.186-3.442,24.926-4.618,34.201-4.887c0.069,5.624-0.269,16.876-2.966,30.38c6.409-4.765,12.982-10.358,19.31-17.192c37.77-40.786,39.178-92.608,38.985-108.479z"/>
  </svg>
);

// ─── Depth tiers ─────────────────────────────────────────────────────────────
const TIERS = [
  { size: 18, opacity: 0.3, blur: 3, speed: 0.4, c1: '#8B2020', c2: '#A83030' },
  { size: 28, opacity: 0.4, blur: 2, speed: 0.7, c1: '#B03030', c2: '#CC4040' },
  { size: 42, opacity: 0.5, blur: 1, speed: 1.0, c1: '#E84A4A', c2: '#FF6B6B' },
  { size: 60, opacity: 0.6, blur: 0, speed: 1.4, c1: '#E84A4A', c2: '#FF8C8C' },
];

// ─── Seeded random ───────────────────────────────────────────────────────────
function seeded(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

// ─── Leaf ────────────────────────────────────────────────────────────────────
const Leaf = React.memo(({ config, scrollVelocity }) => {
  const yMV = useMotionValue(config.initialY);
  const rotateMV = useMotionValue(config.rotate);

  // const smoothVel = useSpring(scrollVelocity, {
  //   stiffness: 120,
  //   damping: 20,
  // });

useAnimationFrame(() => {
  const vel = scrollVelocity.get(); // DIRECT value (no spring)

  const clamped = Math.max(Math.min(vel, 50), -50);
  const height = window.innerHeight;

  const delta = clamped * config.speed * 0.08;
  const nextY = yMV.get() + delta;

  if (nextY > height + 100) {
    yMV.set(-100);
  } else if (nextY < -150) {
    yMV.set(height + 80);
  } else {
    yMV.set(nextY);
  }

  if (Math.abs(clamped) > 0.2) {
    rotateMV.set(rotateMV.get() + clamped * config.speed * 0.01);
  }
});

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${config.xPercent}%`,
        top: 0,
        y: yMV,
        rotate: rotateMV,
        opacity: config.opacity,
        filter: config.blur ? `blur(${config.blur}px)` : 'none',
        pointerEvents: 'none',
      }}
      animate={{
        x: [0, config.swayAmount, -config.swayAmount, 0],
      }}
      transition={{
        duration: config.swayDuration,
        delay: config.swayDelay,
        repeat: Infinity,
        ease: 'easeInOut',
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

  useEffect(() => {
  lastScrollY.current = window.scrollY;
  let scrollTimeout;

  const handleScroll = () => {
    const currentY = window.scrollY;
    const dy = currentY - lastScrollY.current;

    scrollVelocity.set(dy);
    lastScrollY.current = currentY;

    // 🛑 Detect scroll stop
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollVelocity.set(0); // STOP movement
    }, 50); // small delay = smooth stop
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(scrollTimeout);
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
        swayAmount: 10 + rand() * 20,
        swayDuration: 4 + rand() * 5,
        swayDelay: -(rand() * 7),
        ...tier,
      };
    });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0, // IMPORTANT (above background)
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {leaves.map((leaf) => (
        <Leaf
          key={leaf.id}
          config={leaf}
          scrollVelocity={scrollVelocity}
        />
      ))}
    </div>
  );
};

export default Animation;