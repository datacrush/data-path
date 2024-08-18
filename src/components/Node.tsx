import { useEffect, useRef, useState } from "react";

interface Props {
  elementRef: React.RefObject<HTMLInputElement | HTMLTableCellElement>;
}

interface Point {
  x: number;
  y: number;
}

export interface NodeCoordinates {
  top: Point;
  right: Point;
  bottom: Point;
  left: Point;
}

export default function Node({ elementRef: ref }: Props) {
  const [points, setPoints] = useState<NodeCoordinates>({
    top: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
    bottom: { x: 0, y: 0 },
    left: { x: 0, y: 0 },
  });
  const previousRect = useRef<DOMRect | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const calculateNodePositions = () => {
        const rect = element.getBoundingClientRect();
        setPoints({
          top: { x: rect.left + rect.width / 2, y: rect.top },
          right: { x: rect.right, y: rect.top + rect.height / 2 },
          bottom: { x: rect.left + rect.width / 2, y: rect.bottom },
          left: { x: rect.left, y: rect.top + rect.height / 2 },
        });
      };

      const monitorPositionChanges = () => {
        const rect = element.getBoundingClientRect();

        // Compare the current rect to the previous one
        if (
          !previousRect.current ||
          rect.left !== previousRect.current.left ||
          rect.top !== previousRect.current.top
        ) {
          // Update positions and store the new rect
          calculateNodePositions();
          previousRect.current = rect;
        }

        // Continue the loop
        requestAnimationFrame(monitorPositionChanges);
      };

      const handleResize = () => {
        calculateNodePositions();
      };

      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });

      // Start monitoring for resize events
      resizeObserver.observe(ref.current);
      // Start monitoring position changes
      requestAnimationFrame(monitorPositionChanges);

      return () => {
        resizeObserver.unobserve(element);
        previousRect.current = null;
      };
    }
  }, [ref]);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      {points.top && (
        <circle cx={points.top.x} cy={points.top.y} r="5" fill="red" />
      )}
      {points.right && (
        <circle cx={points.right.x} cy={points.right.y} r="5" fill="green" />
      )}
      {points.bottom && (
        <circle cx={points.bottom.x} cy={points.bottom.y} r="5" fill="blue" />
      )}
      {points.left && (
        <circle cx={points.left.x} cy={points.left.y} r="5" fill="cyan" />
      )}
    </svg>
  );
}
