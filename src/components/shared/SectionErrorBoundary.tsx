import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  /** Optional section name shown in the fallback (helps debugging) */
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * SectionErrorBoundary
 *
 * Wraps any section/component so that if it throws an unhandled error,
 * only that section shows a fallback — the rest of the page is unaffected.
 *
 * Usage:
 *   <SectionErrorBoundary name="Offerings">
 *     <Offerings />
 *   </SectionErrorBoundary>
 */
export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production you could send this to Sentry / LogRocket etc.
    console.error(
      `[SectionErrorBoundary] Crash in "${this.props.name ?? "unknown"}" section:`,
      error,
      info.componentStack
    );
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-16 px-6 flex items-center justify-center">
          <div className="max-w-sm w-full rounded-2xl border border-white/10 bg-surface/30 backdrop-blur-sm p-8 text-center">
            <div className="w-10 h-10 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              {this.props.name
                ? `The "${this.props.name}" section ran into an issue.`
                : "This section ran into an issue."}
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-4 text-left text-xs text-destructive bg-destructive/5 rounded-lg p-3 overflow-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="mt-5 text-xs text-gold/70 hover:text-gold underline-offset-2 hover:underline transition-colors"
            >
              Try reloading section
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
