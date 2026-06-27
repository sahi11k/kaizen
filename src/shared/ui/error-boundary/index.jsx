import React from "react";
import { useRouteError } from "react-router";
import * as Sentry from "@sentry/react";
import ErrorBoundaryIllustration from "@/assets/illustrations/error-boundary.svg?react";

const reportError = (error, errorInfo) => {
  if (error) {
    Sentry.captureException(error, {
      contexts: errorInfo
        ? {
            react: {
              componentStack: errorInfo.componentStack,
            },
          }
        : undefined,
    });
  }

  if (import.meta.env.DEV) {
    console.error(error, errorInfo);
  }
};

const ErrorFallback = () => {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="flex min-h-screen w-full items-center justify-center px-5 py-10">
        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6">
          <div className="w-96 max-w-full md:w-[38rem]">
            <ErrorBoundaryIllustration />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="heading-2 text-center">Something went wrong</h2>
            <p className="body-description max-w-lg text-center">
              Please refresh the tab or try again later if the issue continues.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    reportError(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const RouteErrorBoundary = () => {
  const error = useRouteError();

  React.useEffect(() => {
    reportError(error);
  }, [error]);

  return <ErrorFallback />;
};

export { ErrorBoundary, ErrorFallback, RouteErrorBoundary, reportError };
