import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const useMousePosition = (containerRef: React.RefObject<HTMLElement>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );

  const updateMousePosition = useCallback(
    (ev: MouseEvent) => {
      const ref = containerRef.current;
      if (ref) {
        const rect = ref.getBoundingClientRect();
        setMousePosition({
          x: Math.round(ev.clientX - rect.left),
          y: Math.round(ev.clientY - rect.top),
        });
      }
    },
    [containerRef]
  );

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, [containerRef, updateMousePosition]);

  return { mousePosition, updateMousePosition };
};

export default useMousePosition;
