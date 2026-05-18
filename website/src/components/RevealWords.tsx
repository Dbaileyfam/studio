import { motion, useReducedMotion } from "framer-motion";

type RevealWordsProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
};

const RevealWords = ({
  text,
  className = "",
  wordClassName = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.07,
}: RevealWordsProps) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ opacity: 0, y: "0.45em", filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: delay + index * stagger,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default RevealWords;
