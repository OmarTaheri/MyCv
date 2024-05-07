import React, { useState } from "react";
import { motion } from "framer-motion";
import style from "./preloader.module.css";

export default function PreLoader() {
  const [hide, setHide] = useState(false);

  const text = [
    "< ",
    " ",
    "H",
    "e",
    "l",
    "l",
    "o",
    " ",
    "E",
    "v",
    "e",
    "r",
    "y",
    "o",
    "n",
    "e",
    "👋",
    ">",
  ];
  const text2 = [
    "I",
    " ",
    "a",
    "m",
    " ",
    "O",
    "m",
    "a",
    "r",
    "😎",
    ".",
    " ",
    "A",
    "n",
    "d",
    ".",
    ".",
    ".",
  ];
  const text3 = [
    "E",
    "n",
    "j",
    "o",
    "y",
    " ",
    "M",
    "y",
    " ",
    "P",
    "a",
    "g",
    "e",
    "💖",
  ];

  if (hide) {
    return null;
  }

  return (
    <>
      <motion.div
        id={style.preloader}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        style={{ zIndex: 1000 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <div className={style.preloadertext}>
          {text.map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        id={style.preloader}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        style={{ zIndex: 999 }}
        transition={{ duration: 1, delay: 7, ease: "circInOut" }}
      >
        <div className={style.preloadertext}>
          {text2.map((char, index) => (
            <span
              key={index}
              style={{ animationDelay: `${index * 0.1 + 4.5}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        id={style.preloader}
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        style={{ zIndex: 998 }}
        transition={{ duration: 2, delay: 11, ease: "circInOut" }}
        onAnimationComplete={() => setHide(true)}
      >
        <div className={style.preloadertext}>
          {text3.map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1 + 8}s` }}>
              {char}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
}
