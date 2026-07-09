import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const prevScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (currentY <= 0) {
          setDirection("up");
        } else {
          setDirection(currentY > prevScrollY.current ? "down" : "up");
        }

        prevScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
}
