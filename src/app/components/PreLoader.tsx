import React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import style from "./preloader.module.css";

interface TextAnimationProps {
  text: string;
  delay: number;
  zIndex: number;
}

interface PreLoaderProps {
  setIsPreloading: (value: boolean) => void;
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

const PreLoader: React.FC<PreLoaderProps> = ({ setIsPreloading }) => {
  const [initialDelayComplete, setInitialDelayComplete] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPreloading(false);
      setLocalLoading(false);
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [prefersReducedMotion, setIsPreloading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialDelayComplete(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = useCallback((): void => {
    setLocalLoading(false);
    setIsPreloading(false);
  }, [setIsPreloading]);

  const handleSkip = useCallback((): void => {
    setLocalLoading(false);
    setIsPreloading(false);
  }, [setIsPreloading]);

  const texts: string[] = [
    "< Hi, I'm Omar Taheri />",
    "< Computer Science Student />",
    "< I hope you will love my page />",
  ];

  return (
    <AnimatePresence>
      {localLoading && (
        <>
          {initialDelayComplete && (
            <>
              {texts.map((text, index) => (
                <TextAnimation
                  key={index}
                  text={text}
                  delay={index * 4}
                  zIndex={1000 - index}
                />
              ))}
              
              <motion.button
                aria-label="Skip Preloader"
                className={style.skipButton}
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Skip
              </motion.button>
            </>
          )}

          <motion.div
            id={style.preloader}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            style={{ zIndex: 997 }}
            transition={{
              duration: 1,
              delay: texts.length * 4,
              ease: "circInOut",
            }}
            onAnimationComplete={handleAnimationComplete}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;