import logo from "@/assets/locologo.png";
import {
  randomNoteColor,
  randomNoteSymbol,
} from "@/lib/musicalNotes";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionStyle,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type FloatingNote = {
  id: number;
  x: number;
  y: number;
  size: number;
  delayMs: number;
  symbol: string;
  color: string;
  rotate: number;
};

const MAX_NOTES = 28;
const AMBIENT_INTERVAL_MS = 420;
const HOVER_NOTES_PER_MOVE = 2;
const MIN_HOVER_MOVE_PX = 14;

type HeroLogoProps = {
  reduceMotion: boolean | null;
  scrollStyle?: MotionStyle;
};

const HeroLogo = ({ reduceMotion, scrollStyle }: HeroLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const lastHoverRef = useRef({ x: 0, y: 0 });
  const [notes, setNotes] = useState<FloatingNote[]>([]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 22,
  });
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 22,
  });

  const spawnNote = useCallback((x: number, y: number, delayMs = 0) => {
    const note: FloatingNote = {
      id: idRef.current++,
      x,
      y,
      size: 16 + Math.random() * 14,
      delayMs,
      symbol: randomNoteSymbol(),
      color: randomNoteColor(),
      rotate: (Math.random() - 0.5) * 70,
    };
    setNotes((current) => [...current.slice(-(MAX_NOTES - 1)), note]);
  }, []);

  const spawnAroundLogo = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 38 + Math.random() * 14;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    spawnNote(x, y, Math.random() * 80);
  }, [spawnNote]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(spawnAroundLogo, AMBIENT_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, spawnAroundLogo]);

  const removeNote = (id: number) => {
    setNotes((current) => current.filter((note) => note.id !== id));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const localX = (event.clientX - rect.left) / rect.width - 0.5;
    const localY = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(localX);
    pointerY.set(localY);

    const xPct = ((event.clientX - rect.left) / rect.width) * 100;
    const yPct = ((event.clientY - rect.top) / rect.height) * 100;
    const dx = xPct - lastHoverRef.current.x;
    const dy = yPct - lastHoverRef.current.y;
    if (Math.hypot(dx, dy) < MIN_HOVER_MOVE_PX) return;

    lastHoverRef.current = { x: xPct, y: yPct };
    for (let i = 0; i < HOVER_NOTES_PER_MOVE; i++) {
      spawnNote(
        xPct + (Math.random() * 10 - 5),
        yPct + (Math.random() * 10 - 5),
        i * 35,
      );
    }
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
    lastHoverRef.current = { x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] mx-auto mb-8 origin-center"
      style={reduceMotion ? undefined : scrollStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {!reduceMotion && (
        <motion.div
          className="absolute inset-[12%] rounded-full bg-gradient-to-br from-teal-500/25 via-transparent to-amber-500/20 blur-3xl pointer-events-none"
          aria-hidden
          animate={{ opacity: [0.4, 0.65, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {!reduceMotion &&
        notes.map((note) => (
          <span
            key={note.id}
            className="cursor-note-glitter absolute z-20 pointer-events-none"
            style={
              {
                left: `${note.x}%`,
                top: `${note.y}%`,
                fontSize: note.size,
                color: note.color,
                animationDelay: `${note.delayMs}ms`,
                "--note-rotate": `${note.rotate}deg`,
              } as CSSProperties
            }
            onAnimationEnd={() => removeNote(note.id)}
            aria-hidden
          >
            {note.symbol}
          </span>
        ))}

      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-center [perspective:1000px]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={logo}
          alt="801 Family Studios Logo"
          className="w-[88%] max-w-md object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          style={
            reduceMotion
              ? undefined
              : {
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: "preserve-3d",
                }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  filter: [
                    "drop-shadow(0 0 24px rgba(45, 212, 191, 0.3))",
                    "drop-shadow(0 0 40px rgba(245, 158, 11, 0.35))",
                    "drop-shadow(0 0 24px rgba(45, 212, 191, 0.3))",
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  filter: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }
          }
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroLogo;
