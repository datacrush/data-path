import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { upsertNode } from "../../state/slices"; // Update this with the correct import path

export const useRegisterNode = (
  elementRef: React.RefObject<HTMLElement>,
  name: string,
  position: "top" | "right" | "bottom" | "left"
) => {
  const dispatch = useDispatch();
  const previousRect = useRef<DOMRect | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const calculateNodePositions = () => {
        const rect = element.getBoundingClientRect();
        const availableNodes = {
          top: { x: rect.left + rect.width / 2, y: rect.top },
          right: { x: rect.right, y: rect.top + rect.height / 2 },
          bottom: { x: rect.left + rect.width / 2, y: rect.bottom },
          left: { x: rect.left, y: rect.top + rect.height / 2 },
        };

        dispatch(
          upsertNode({
            name,
            ...availableNodes[position],
          })
        );
      };

      const monitorPositionChanges = () => {
        const rect = element.getBoundingClientRect();

        if (
          !previousRect.current ||
          rect.left !== previousRect.current.left ||
          rect.top !== previousRect.current.top
        ) {
          calculateNodePositions();
          previousRect.current = rect;
        }

        requestAnimationFrame(monitorPositionChanges);
      };

      const handleResize = () => {
        calculateNodePositions();
      };

      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });

      resizeObserver.observe(element);
      requestAnimationFrame(monitorPositionChanges);

      return () => {
        resizeObserver.unobserve(element);
        previousRect.current = null;
      };
    }
  }, [dispatch, elementRef, name, position]);
};
