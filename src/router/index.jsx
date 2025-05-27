import { createBrowserRouter } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Pomodoro from "@/pages/Pomodoro";
import Journal from "@/pages/Journal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pomodoro",
        element: <Pomodoro />,
      },
      {
        path: "/journal",
        element: <Journal />,
      },
    ],
  },
]);

export default router;
