import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

import { store } from "./utils/store";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import ErrorPage from "./components/ErrorPage";
import Chat from "./components/Chat";

const Invitations = lazy(() => import("./components/Invitations"));
const Connections = lazy(() => import("./components/Connections"));

// v6.4 and newer → called the "Data Router API" (or object-based routing), introduced with createBrowserRouter, createRoutesFromElements, loader, action, ErrorBoundary, etc.
const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "feed",
        Component: Feed,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "connections",
        element: (
          <Suspense fallback={<Loader />}>
            <Connections />
          </Suspense>
        ),
      },
      {
        path: "invitations",
        element: (
          <Suspense fallback={<Loader />}>
            <Invitations />
          </Suspense>
        ),
      },
      {
        path: "chat/:targetUserId",
        Component: Chat,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

function NewApp() {
  return (
    <Provider store={store}>
      <div className="h-screen">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default NewApp;
