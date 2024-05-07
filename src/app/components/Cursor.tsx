"use client";
import useMousePosition from "../utils/useMousePosition";
import style from "./cursor.module.css";
import { useEffect, useRef, useState } from "react";
export default function Page() {
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    }
  }, [x, y]);
  useEffect(() => {
    if (cursorOutlineRef.current) {
      cursorOutlineRef.current.style.left = `${x}px`;
      cursorOutlineRef.current.style.top = `${y}px`;
    }
  }, [x, y]);

  return (
    <div>
      <div ref={cursorOutlineRef} className={style.cursorOutline} />
      <div ref={cursorRef} className={style.cursor} />
    </div>
  );
}
