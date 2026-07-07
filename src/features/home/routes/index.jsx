import Home from "@/features/home/pages/Home";
import NotFound from "@/features/home/pages/NotFound";

export const homeRoutes = [
  {
    path: "/",
    element: <Home />,
  },
];

export const notFoundRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
];
