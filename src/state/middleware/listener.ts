import { createListenerMiddleware } from "@reduxjs/toolkit";
import { upsertNode } from "../slices";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: upsertNode,
  effect: (_node, listenerApi) => {
    listenerApi.cancelActiveListeners();
  },
});

export default listenerMiddleware;
