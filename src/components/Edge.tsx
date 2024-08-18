import React, { useEffect, useState } from "react";
import { Point } from "./Node";

interface EdgeProps {
  startPoint: Point | undefined;
  endPoint: Point | undefined;
  strokeColor?: string;
  strokeWidth?: number;
}

const Edge: React.FC<EdgeProps> = ({
  startPoint,
  endPoint,
  strokeColor = "black",
  strokeWidth = 2,
}) => {
  const [pathData, setPathData] = useState<string>("");

  useEffect(() => {
    const updatePath = () => {
      if (startPoint && endPoint) {
        // Simple straight line (you can modify this to be more complex, like Bezier curves)
        const path = `M${startPoint.x},${startPoint.y} L${endPoint.x},${endPoint.y}`;

        setPathData(path);
      }
    };

    updatePath();
  }, [startPoint, endPoint]);

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
      <path
        d={pathData}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export default Edge;
