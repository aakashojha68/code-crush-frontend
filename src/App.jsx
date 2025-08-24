import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Invitations from "./components/Invitations";
import { store } from "./utils/store";
import Chat from "./components/Chat";
import SignUp from "./components/SignUp";

// Before v6.4 → called the "JSX Route Elements" API (or sometimes just the old JSX-based routing).

function App() {
  return (
    <div className="h-screen">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={"/login"} replace={true} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Layout />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/invitations" element={<Invitations />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
