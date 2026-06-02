import logo from "@/assets/locologo.png";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { useRef } from "react";

const ORBIT_NOTES = [
  { symbol: "♪", duration: 18, radius: "46%", delay: 0, color: "text-teal-300" },
  { symbol: "♫", duration: 24, radius: "52%", delay: 0.25, color: "text-amber-300" },
  { symbol: "♬", duration: 21, radius: "48%", delay: 0.5, color: "text-teal-200" },
  { symbol: "♩", duration: 27, radius: "44%", delay: 0.75, color: "text-amber-200" },
];

type HeroLogoProps = {
  reduceMotion: boolean | null;
  scrollStyle?: MotionStyle;
};

const HeroLogo = ({ reduceMotion, scrollStyle }: HeroLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), {
    stiffness: 180,
    damping: 22,
  });
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 22,
  });
  const glareX = useSpring(useTransform(pointerX, [-0.5, 0.5], [30, 70]), {
    stiffness: 120,
    damping: 24,
  });
  const glareY = useSpring(useTransform(pointerY, [-0.5, 0.5], [25, 75]), {
    stiffness: 120,
    damping: 24,
  });
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, transparent 55%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[32rem] md:h-[32rem] mx-auto mb-8 origin-center"
      style={reduceMotion ? undefined : scrollStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      whileHover={
        reduceMotion
          ? undefined
          : { scale: 1.02, transition: { type: "spring", stiffness: 300 } }
      }
    >
      {/* Ambient pulse behind the stage */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-teal-500/30 via-transparent to-amber-500/25 blur-3xl"
          aria-hidden
          animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Expanding sound-wave rings */}
      {!reduceMotion &&
        [0, 1.2, 2.4].map((delay) => (
          <motion.div
            key={delay}
            className="absolute inset-4 rounded-[1.75rem] border border-teal-400/25"
            aria-hidden
            initial={{ scale: 0.92, opacity: 0.5 }}
            animate={{ scale: [0.92, 1.12, 0.92], opacity: [0.45, 0, 0.45] }}
            transition={{
              duration: 3.6,
              delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Orbiting music notes */}
      {!reduceMotion &&
        ORBIT_NOTES.map((note) => (
          <motion.div
            key={note.symbol + note.duration}
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{
              duration: note.duration,
              repeat: Infinity,
              ease: "linear",
              delay: note.delay,
            }}
          >
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]",
                note.color,
              )}
              style={{ top: `calc(50% - ${note.radius})` }}
            >
              {note.symbol}
            </span>
          </motion.div>
        ))}

      {/* Rotating gradient ring */}
      {!reduceMotion && (
        <motion.div
          className="absolute -inset-[3px] rounded-[1.65rem] p-[3px] hero-logo-ring"
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-[1.55rem] bg-[var(--bg-base)]" />
        </motion.div>
      )}

      {/* Main logo card */}
      <motion.div
        className="relative w-full h-full [perspective:1200px]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, rotateZ: -4 }}
        animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative w-full h-full"
          style={
            reduceMotion
              ? undefined
              : {
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: "preserve-3d",
                }
          }
        >
        <motion.div
          className={cn(
            "relative w-full h-full surface-glass rounded-3xl flex items-center justify-center",
            "shadow-2xl ring-2 ring-teal-400/30 ring-offset-4 ring-offset-[var(--bg-base)] overflow-hidden",
            !reduceMotion && "hero-logo-shimmer",
          )}
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{ background: glare }}
              aria-hidden
            />
          )}
          <motion.img
            src={logo}
            alt="801 Family Studios Logo"
            className="relative z-10 w-4/5 h-4/5 object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
            animate={
              reduceMotion
                ? undefined
                : {
                    filter: [
                      "drop-shadow(0 0 20px rgba(45, 212, 191, 0.25))",
                      "drop-shadow(0 0 36px rgba(245, 158, 11, 0.35))",
                      "drop-shadow(0 0 20px rgba(45, 212, 191, 0.25))",
                    ],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroLogo;
