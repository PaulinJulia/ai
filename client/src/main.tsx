import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute from "./routes/RootRoute";
import ErrorRoute from "./routes/ErrorRoute";
import HomeRoute from "./routes/HomeRoute";
import WorkoutsRoute from "./routes/WorkoutsRoute";
import CreateWorkoutRoute from "./routes/CreateWorkoutRoute";
import ResponseRoute from "./routes/ResponseRoute";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: "createworkout",
        element: <CreateWorkoutRoute />,
      },
      {
        path: "workout",
        element: <WorkoutsRoute />,
      },
      {
        path: "response",
        element: <ResponseRoute />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
