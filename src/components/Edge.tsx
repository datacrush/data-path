import React, { useEffect, useState } from "react";
import { Point } from "./Node";

interface EdgeProps {
  snp: Point | undefined;
  enp: Point | undefined;
  strokeColor?: string;
  strokeWidth?: number;
}

const Edge: React.FC<EdgeProps> = ({
  snp,
  enp,
  strokeColor = "black",
  strokeWidth = 2,
}) => {
  const [pathData, setPathData] = useState<string>("");

  useEffect(() => {
    const updatePath = () => {
      if (snp && enp) {
        // Simple straight line (you can modify this to be more complex, like Bezier curves)
        const path = `M${snp.x},${snp.y} L${enp.x},${enp.y}`;

        setPathData(path);
      }
    };

    updatePath();
  }, [snp, enp]);

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
