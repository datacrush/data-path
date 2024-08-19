import { NodeState } from "../slices";

export const selectEdge =
  (startingNode: string, endingNode: string) => (state: NodeState) => {
    const { [startingNode]: start, [endingNode]: end } = state.points;

    return start && end
      ? `M${start?.x},${start?.y} H${end?.x} V${end?.y}`
      : null;
  };
