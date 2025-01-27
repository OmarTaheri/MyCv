"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./cursor.module.css";

interface CustomCursorProps {
  isPreloading?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isPreloading = false }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      setPosition({ x: clientX, y: clientY });
    },
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleElementHover = () => setIsHovered(true);
    const handleElementLeave = () => setIsHovered(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover effect for clickable elements
    const clickableElements = document.querySelectorAll('a, button, [role="button"]');
    clickableElements.forEach(element => {
      element.addEventListener("mouseenter", handleElementHover);
      element.addEventListener("mouseleave", handleElementLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      clickableElements.forEach(element => {
        element.removeEventListener("mouseenter", handleElementHover);
        element.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, [updateCursorPosition]);

  useEffect(() => {
    if (cursorRef.current && cursorOutlineRef.current) {
      const cursorScale = isClicked ? 0.8 : 1;
      const outlineScale = isClicked ? 1.5 : 1;
  
      // Apply translate and scale together
      const cursorTransform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
      const outlineTransform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${outlineScale})`;
  
      cursorRef.current.style.transform = cursorTransform;
      cursorOutlineRef.current.style.transform = outlineTransform;
  
      // Toggle hover class for size and style changes
      if (isHovered) {
        cursorRef.current.classList.add(styles.hovered);
        cursorOutlineRef.current.classList.add(styles.hovered);
      } else {
        cursorRef.current.classList.remove(styles.hovered);
        cursorOutlineRef.current.classList.remove(styles.hovered);
      }
    }
  }, [position, isClicked, isHovered]);

  useEffect(() => {
    if (cursorRef.current && cursorOutlineRef.current) {
      if (isPreloading) {
        cursorRef.current.classList.add(styles.white);
        cursorOutlineRef.current.classList.add(styles.white);
      } else {
        cursorRef.current.classList.remove(styles.white);
        cursorOutlineRef.current.classList.remove(styles.white);
      }
    }
  }, [isPreloading]);

  return (
    <>
      <div ref={cursorOutlineRef} className={styles.cursorOutline} />
      <div ref={cursorRef} className={styles.cursor} />
    </>
  );
};

export default CustomCursor;