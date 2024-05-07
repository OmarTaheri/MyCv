import React from "react";
import { motion } from "framer-motion";
import style from "./preloader.module.css";

export default function PreLoader() {
  const text = "< Hello Everyone👋/>".split("");

  return (
    <motion.div
      id={style.preloader}
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ duration: 1.5, delay: 3, ease: "circInOut" }}
    >
      <div className={style.preloadertext}>
        {text.map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
