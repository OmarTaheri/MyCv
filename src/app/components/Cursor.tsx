"use client";
import useMousePosition from "../utils/useMousePosition";
import style from "./cursor.module.css";
import { useEffect, useRef } from "react";
export default function Page() {
  const { x, y } = useMousePosition();

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  console.log(x, y);
  useEffect(() => {
    if (cursorRef.current && cursorOutlineRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursorOutlineRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, [x, y]);

  return (
    <div>
      <div ref={cursorOutlineRef} className={style.cursorOutline} />
      <div ref={cursorRef} className={style.cursor} />
    </div>
  );
}
