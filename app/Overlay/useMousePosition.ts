import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const useMousePosition = (containerRef: React.RefObject<HTMLElement>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );
  const ref = containerRef.current;

  const updateMousePosition = useCallback(
    (ev: MouseEvent) => {
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
    if (ref) {
      ref.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, [containerRef]);

  return { mousePosition, updateMousePosition };
};

export default useMousePosition;
