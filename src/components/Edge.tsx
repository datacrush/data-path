import React, { useEffect, useState } from "react";
import { Point } from "./Node";

interface EdgeProps {
  startPoint: Point;
  endPoint: Point;
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
    const path = `
    M${startPoint.x},${startPoint.y} 
    H${endPoint.x} 
    V${endPoint.y}
  `;

    setPathData(path.trim());
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
