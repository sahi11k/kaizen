import React from "react";
import { useRouteError } from "react-router";
import * as Sentry from "@sentry/react";
import { EmptyState, EmptyStateAction } from "@/shared/ui";

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
      <EmptyState
        code="500"
        title="Something went wrong"
        description="Try refreshing the page. If it keeps happening, the issue is on our end."
        action={
          <EmptyStateAction onClick={() => window.location.reload()}>
            Refresh
          </EmptyStateAction>
        }
        className="flex items-center justify-center"
      />
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
