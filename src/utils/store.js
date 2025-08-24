import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import ConnectionReducer from "./connectionSlice";
import InvitationSlice from "./invitationSlice";
import MessageSlice from "./messageSlice";
import SidebarSlice from "./sidebarSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    feed: FeedReducer,
    connections: ConnectionReducer,
    invitations: InvitationSlice,
    messages: MessageSlice,
    sidebar: SidebarSlice,
  },
});
