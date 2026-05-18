import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const springPrimary = { stiffness: 38, damping: 28, mass: 0.9 };
const springSecondary = { stiffness: 22, damping: 32, mass: 1.1 };

const InteractiveBackground = () => {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  useEffect(() => {
    const update = (clientX: number, clientY: number) => {
      pointerX.set(clientX / window.innerWidth);
      pointerY.set(clientY / window.innerHeight);
    };

    const onPointerMove = (event: PointerEvent) => {
      update(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [pointerX, pointerY]);

  const orbLeft = useSpring(
    useTransform(pointerX, (value) => `${value * 100}%`),
    springPrimary
  );
  const orbTop = useSpring(
    useTransform(pointerY, (value) => `${value * 100}%`),
    springPrimary
  );

  const orbLeftAlt = useSpring(
    useTransform(pointerX, (value) => `${(1 - value) * 85 + 7.5}%`),
    springSecondary
  );
  const orbTopAlt = useSpring(
    useTransform(pointerY, (value) => `${(1 - value) * 75 + 12.5}%`),
    springSecondary
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute h-[min(85vw,640px)] w-[min(85vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[110px]"
        style={{
          left: orbLeft,
          top: orbTop,
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.45) 0%, rgba(20, 184, 166, 0) 68%)",
        }}
      />
      <motion.div
        className="absolute h-[min(70vw,480px)] w-[min(70vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-[100px]"
        style={{
          left: orbLeftAlt,
          top: orbTopAlt,
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(245, 158, 11, 0) 70%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_55%)]" />
      <motion.div
        className="absolute -left-1/4 top-1/3 h-[50vh] w-[50vh] rounded-full bg-violet-500/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[45vh] w-[45vh] rounded-full bg-teal-400/10 blur-[100px]"
        animate={{ x: [0, -35, 0], y: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.35]"
        animate={{ opacity: [0.28, 0.38, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(148, 163, 184, 0.12), transparent 65%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />
    </motion.div>
  );
};

export default InteractiveBackground;
