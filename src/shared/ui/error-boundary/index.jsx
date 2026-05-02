import React from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import * as Sentry from "@sentry/react";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";

const getErrorMessage = (error) => {
  if (isRouteErrorResponse(error)) {
    return error.statusText || error.data?.message || `Route failed: ${error.status}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error interrupted the app.";
};

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

const ErrorFallback = ({ error, onReset }) => {
  const handleGoHome = () => {
    window.location.assign("/");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-background">
      <EmptyState
        className="min-h-[420px]"
        icon={<AlertTriangle className="size-12 text-destructive" />}
        title="Something went wrong"
        description={getErrorMessage(error)}
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button icon={<RotateCcw size={16} />} onClick={onReset}>
              Try again
            </Button>
            <Button
              variant="outline"
              icon={<Home size={16} />}
              onClick={handleGoHome}
            >
              Go home
            </Button>
          </div>
        }
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
      return (
        <ErrorFallback error={this.state.error} onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

const RouteErrorBoundary = () => {
  const error = useRouteError();

  React.useEffect(() => {
    reportError(error);
  }, [error]);

  return <ErrorFallback error={error} onReset={() => window.location.reload()} />;
};

export { ErrorBoundary, ErrorFallback, RouteErrorBoundary, reportError };
