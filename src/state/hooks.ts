import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store";
import { NodeState } from "./slices";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useNodeSelector: TypedUseSelectorHook<NodeState> = (selector) =>
  useSelector((state: RootState) => selector(state.nodes));
