"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const variants: Variants = {
  initial: {
    y: 0,
  },
  animate: (numberCount: number) => {
    return {
      y: `-${numberCount * 100}%`,
    };
  },
};

interface CountUpProps {
  value: number | string;
  speed?: number;
  className?: string;
  whileInView?: boolean;
  whileInViewOnce?: boolean;
  fontSize?: "xl" | "2xl" | "3xl" | "4xl";
}

export const CountUp = ({
  value,
  className,
  whileInView = true,
  whileInViewOnce = true,
  speed = 4,
  fontSize = "2xl",
}: CountUpProps) => {
  const animate = whileInView
    ? { whileInView: "animate" }
    : { animate: "animate" };
  return (
    <motion.div
      role="text"
      initial="initial"
      {...animate}
      viewport={{ once: whileInViewOnce }}
      className={cn(
        "relative flex h-[30px] overflow-hidden text-3xl font-bold leading-[30px]",
        fontSize === "xl" && "text-xl leading-[20px] h-[20px]",
        fontSize === "2xl" && "text-2xl leading-[24px] h-[24px]",
        fontSize === "4xl" && "text-4xl leading-[36px] h-[36px]",
        className
      )}
    >
      <span className="sr-only">{value}</span>
      {value
        .toString()
        .split("")
        .map((c, i) => (
          <Item key={i} value={c} speed={speed} />
        ))}
    </motion.div>
  );
};

const Item = ({ value, speed }: { value: string; speed: number }) => {
  const isDigit = /^\d$/.test(value);
  const numberCount = isDigit ? Number(value) : 0;
  return (
    <motion.span
      aria-hidden="true"
      variants={variants}
      custom={numberCount}
      transition={{ duration: numberCount / speed, ease: "easeInOut" }}
      className="flex flex-col"
    >
      {Array.from({ length: numberCount + 1 }).map((_, i) => (
        <span key={i}>{isDigit ? i : value}</span>
      ))}
    </motion.span>
  );
};
