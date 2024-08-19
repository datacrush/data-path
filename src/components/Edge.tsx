import React from "react";
import { selectEdge } from "../state/selectors";
import { useNodeSelector } from "../state/hooks";

interface EdgeProps {
  startPoint: string;
  endPoint: string;
  strokeColor?: string;
  strokeWidth?: number;
}

const Edge: React.FC<EdgeProps> = ({
  startPoint,
  endPoint,
  strokeColor = "black",
  strokeWidth = 2,
}) => {
  const pathData = useNodeSelector(selectEdge(startPoint, endPoint));

  return pathData ? (
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
  ) : null;
};

export default Edge;
