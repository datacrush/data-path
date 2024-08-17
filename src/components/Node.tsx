import { useEffect, useRef, useState } from "react";

interface Props {
  elementRef: React.RefObject<HTMLInputElement | HTMLTableCellElement>;
}

interface Point {
  x: number;
  y: number;
}

export default function Node({ elementRef: ref }: Props) {
  const [top, setTop] = useState<Point | null>(null);
  const [right, setRight] = useState<Point | null>(null);
  const [bottom, setBottom] = useState<Point | null>(null);
  const [left, setLeft] = useState<Point | null>(null);

  const previousRect = useRef<DOMRect | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const calculateNodePositions = () => {
        const rect = element.getBoundingClientRect();

        // Calculate and update the position states
        const [top, right, bottom, left] = [
          { x: rect.left + rect.width / 2, y: rect.top },
          { x: rect.right, y: rect.top + rect.height / 2 },
          { x: rect.left + rect.width / 2, y: rect.bottom },
          { x: rect.left, y: rect.top + rect.height / 2 },
        ];

        setTop(top);
        setRight(right);
        setBottom(bottom);
        setLeft(left);
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
      {top && <circle cx={top.x} cy={top.y} r="5" fill="red" />}
      {right && <circle cx={right.x} cy={right.y} r="5" fill="green" />}
      {bottom && <circle cx={bottom.x} cy={bottom.y} r="5" fill="blue" />}
      {left && <circle cx={left.x} cy={left.y} r="5" fill="cyan" />}
    </svg>
  );
}
