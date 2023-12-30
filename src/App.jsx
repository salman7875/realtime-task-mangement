import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import TaskDetail from "./pages/TaskDetail";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";

const router = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: ":id", Component: TaskDetail },
      { path: "create", Component: CreateTask },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
