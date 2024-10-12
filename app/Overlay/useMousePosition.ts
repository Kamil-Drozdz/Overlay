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
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: Math.round(ev.clientX - rect.left),
          y: Math.round(ev.clientY - rect.top),
        });
      }
    },
    [containerRef]
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mousemove",
          updateMousePosition
        );
      }
    };
  }, [containerRef]);

  return { mousePosition, updateMousePosition };
};

export default useMousePosition;
