import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render-time errors anywhere below it and shows a recoverable
 * fallback instead of a blank page.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main
        role="alert"
        className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4 text-center text-foreground"
      >
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="max-w-md text-muted-foreground">
          An unexpected error occurred while rendering this page. Please reload
          to try again.
        </p>
        <button
          type="button"
          onClick={this.handleReload}
          className="rounded-xl bg-brand-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-purple/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Reload page
        </button>
      </main>
    );
  }
}

export default ErrorBoundary;
