import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import ConnectionReducer from "./connectionSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    feed: FeedReducer,
    connections: ConnectionReducer,
  },
});
