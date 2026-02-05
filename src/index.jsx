import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "@/app/router";
import "@/styles/global.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
