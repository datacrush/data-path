import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Point = { x: number; y: number };
type Points = Record<string, Point>;

export interface NodeState {
  points: Points;
}

const initialState: NodeState = {
  points: {},
};

export const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    upsertNode: (
      state,
      action: PayloadAction<{ name: string; x: number; y: number }>
    ) => {
      const { name, x, y } = action.payload;
      state.points[name] = { x, y };
    },
  },
});

export const { upsertNode } = nodeSlice.actions;

export default nodeSlice.reducer;
