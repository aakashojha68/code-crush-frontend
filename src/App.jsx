import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Invitations from "./components/Invitations";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/invitations" element={<Invitations />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
