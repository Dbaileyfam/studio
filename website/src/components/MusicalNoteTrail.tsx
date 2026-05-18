import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

/** Matches oneheartorchestra.com cursor glitter — notes instead of gold dots. */
type NoteParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delayMs: number;
  symbol: string;
  color: string;
  rotate: number;
};

const SYMBOLS = ["♪", "♫", "♬", "♩"];
const COLORS = ["#5eead4", "#2dd4bf", "#fbbf24", "#f59e0b", "#fde68a"];

const MIN_MOVE_PX = 16;
const MIN_MOVE_MS = 18;
const MAX_NOTES = 36;
const NOTES_PER_SPAWN = 3;

const MusicalNoteTrail = () => {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const [notes, setNotes] = useState<NoteParticle[]>([]);
  const [active, setActive] = useState(false);
  const idRef = useRef(0);
  const lastMoveRef = useRef({ x: 0, y: 0, t: 0 });

  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${mouseX}px ${mouseY}px, rgba(20, 184, 166, 0.14) 0%, rgba(245, 158, 11, 0.08) 42%, transparent 58%)`;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncActive = () => {
      setActive(!reduceMotion.matches && finePointer.matches);
    };
    syncActive();
    reduceMotion.addEventListener("change", syncActive);
    finePointer.addEventListener("change", syncActive);

    if (reduceMotion.matches || !finePointer.matches) {
      return () => {
        reduceMotion.removeEventListener("change", syncActive);
        finePointer.removeEventListener("change", syncActive);
      };
    }

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      const now = performance.now();
      const dx = event.clientX - lastMoveRef.current.x;
      const dy = event.clientY - lastMoveRef.current.y;
      const dist = Math.hypot(dx, dy);
      const elapsed = now - lastMoveRef.current.t;
      if (dist < MIN_MOVE_PX || elapsed < MIN_MOVE_MS) return;

      lastMoveRef.current = {
        x: event.clientX,
        y: event.clientY,
        t: now,
      };

      const batch: NoteParticle[] = Array.from({ length: NOTES_PER_SPAWN }, (_, i) => ({
        id: idRef.current++,
        x: event.clientX + (Math.random() * 18 - 9),
        y: event.clientY + (Math.random() * 18 - 9),
        size: 14 + Math.random() * 12,
        delayMs: i * 35,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] ?? "♪",
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#2dd4bf",
        rotate: (Math.random() - 0.5) * 70,
      }));

      setNotes((current) => [...current.slice(-(MAX_NOTES - NOTES_PER_SPAWN)), ...batch]);
    };

    const pruneTimer = window.setInterval(() => {
      setNotes((current) => current.slice(-MAX_NOTES));
    }, 700);

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      reduceMotion.removeEventListener("change", syncActive);
      finePointer.removeEventListener("change", syncActive);
      window.removeEventListener("mousemove", onMove);
      window.clearInterval(pruneTimer);
    };
  }, [mouseX, mouseY]);

  const removeNote = (id: number) => {
    setNotes((current) => current.filter((note) => note.id !== id));
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: active ? spotlight : undefined }}
      />
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
        >
          {notes.map((note) => (
            <span
              key={note.id}
              className="cursor-note-glitter"
              style={
                {
                  left: note.x,
                  top: note.y,
                  fontSize: note.size,
                  color: note.color,
                  animationDelay: `${note.delayMs}ms`,
                  "--note-rotate": `${note.rotate}deg`,
                } as CSSProperties
              }
              onAnimationEnd={() => removeNote(note.id)}
            >
              {note.symbol}
            </span>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default MusicalNoteTrail;
