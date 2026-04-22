import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-6 shadow-xl">

            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Something went wrong
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                An unexpected error occurred while loading this page.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-muted rounded-lg text-left overflow-auto max-h-32">
                <code className="text-xs text-red-500">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <Button
              className="w-full gap-2"
              onClick={this.handleReload}
            >
              <RefreshCcw className="w-4 h-4" />
              Reload Page
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={this.handleHome}
            >
              Back to Home
            </Button>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;