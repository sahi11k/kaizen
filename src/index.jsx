import "./instrument";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { reactErrorHandler } from "@sentry/react";
import router from "@/app/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "@/shared/ui";
import { queryClient } from "@/shared/react-query";
import "@/styles/global.css";

const root = createRoot(document.getElementById("root"), {
  onUncaughtError: reactErrorHandler(),
  onCaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
