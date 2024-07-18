import React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import style from "./preloader.module.css";

interface TextAnimationProps {
  text: string;
  delay: number;
  zIndex: number;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  delay,
  zIndex,
}) => {
  return (
    <motion.div
      id={style.preloader}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      style={{ zIndex }}
      transition={{ duration: 1, delay: delay + text.length * 0.1 }}
    >
      <div className={style.preloadertext}>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
const PreLoader: React.FC = () => {
  const [isPreloading, setIsPreloading] = useState<boolean>(true);

  useEffect(() => {
    document.body.style.overflow = isPreloading ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPreloading]);

  const handleAnimationComplete = useCallback((): void => {
    setIsPreloading(false);
  }, []);

  const texts: string[] = [
    "< Hello Everyone\u{1F44B}>",
    "I am Omar\u{1F60E}. And...",
    "Enjoy My Page\u{1F496}",
  ];

  if (!isPreloading) return null;

  return (
    <AnimatePresence>
      {texts.map((text, index) => (
        <TextAnimation
          key={index}
          text={text}
          delay={index * 4}
          zIndex={1000 - index}
        />
      ))}
      <motion.div
        id={style.preloader}
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        exit={{ x: "-100%" }}
        style={{ zIndex: 997 }}
        transition={{ duration: 1, delay: texts.length * 4, ease: "circInOut" }}
        onAnimationComplete={handleAnimationComplete}
      />
    </AnimatePresence>
  );
};

export default PreLoader;
