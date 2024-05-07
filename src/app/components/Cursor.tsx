import { motion, useSpring } from "framer-motion";

import useMousePosition from "../utils/useMousePosition";
import style from "./cursor.module.css";
import { useEffect, useState } from "react";
export default function Page() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);
  useEffect(() => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => setIsHovering(true));
      link.addEventListener("mouseleave", () => setIsHovering(false));
    });

    // Clean up event listeners on unmount
    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => setIsHovering(true));
        link.removeEventListener("mouseleave", () => setIsHovering(false));
      });
    };
  }, []);
  const variants = {
    default: {
      x,
      y,
      transition: { type: "spring", mass: 0.6 },
    },
    hovering: {
      scale: 1.2, // Example: Increase size on hover
      opacity: 0.8, // Example: Decrease opacity on hover
      transition: { type: "spring", stiffness: 500, damping: 20 },
    },
  };

  return (
    <div>
      {/* Other components */}
      <motion.div
        variants={variants}
        className={isHovering ? style.cursorHovering : style.cursor}
        style={{
          x,
          y,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </div>
  );
}
