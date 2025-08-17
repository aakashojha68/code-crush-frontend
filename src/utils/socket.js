import { io } from "socket.io-client";
import { BACKEND_BASE_URL } from "./constant";

const connectSocket = io(BACKEND_BASE_URL);

export default connectSocket;
