import React from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router";
import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN;
const isProduction = import.meta.env.PROD;

Sentry.init({
  dsn,
  enabled: isProduction && Boolean(dsn),
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 0.1,
  tracePropagationTargets: ["gokaizen.app", /^https:\/\/gokaizen\.app/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
