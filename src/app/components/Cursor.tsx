"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./cursor.module.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      const x = clientX;
      const y = clientY;
      setPosition({ x, y });
    },
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [updateCursorPosition]);

  useEffect(() => {
    const updateCursorStyle = () => {
      if (cursorRef.current && cursorOutlineRef.current) {
        const transform = `translate(${position.x}px, ${position.y}px)`;
        cursorRef.current.style.transform = transform;
        cursorOutlineRef.current.style.transform = transform;
      }
    };

    updateCursorStyle();
  }, [position]);

  return (
    <>
      <div ref={cursorOutlineRef} className={styles.cursorOutline} />
      <div ref={cursorRef} className={styles.cursor} />
    </>
  );
};

export default CustomCursor;
