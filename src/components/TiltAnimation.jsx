import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltWrapper = ({ children, shadowColor = "232,74,74", cursorShadow = "232,74,74", tilt=20 , radius="9px" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tilt}deg`, `-${tilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tilt}deg`, `${tilt}deg`]);

  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) => `
      ${-x * 0.5}px ${y * 0.5}px 60px rgba(${shadowColor}, 0.18),
      ${-x * 0.4}px ${y * 0.4}px 30px rgba(${shadowColor}, 0.12),
      0px 0px 40px rgba(${shadowColor}, 0.1)
    `
  );

  const lightOpacity = useMotionValue(0);
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);

  const background = useTransform(
    [lightX, lightY, lightOpacity],
    ([x, y, opacity]) =>
      opacity === 0
        ? "transparent"
        : `radial-gradient(circle at ${x}px ${y}px, rgba(${cursorShadow}, 0.25), transparent 150px)`
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    lightOpacity.set(1);
    lightX.set(mouseX);
    lightY.set(mouseY);

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    lightOpacity.set(0);
  };

  return (
    <div style={{ perspective: "1000px"}}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          boxShadow,
          transformStyle: "preserve-3d",
          position: "relative",
          overflow: "hidden",
          borderRadius: radius,
        }}
      >
      <motion.div
          style={{
            background,
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};

export default TiltWrapper;