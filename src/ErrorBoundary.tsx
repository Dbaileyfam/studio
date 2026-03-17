import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            padding: "2rem",
            maxWidth: "600px",
            margin: "2rem auto",
            fontFamily: "sans-serif",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            color: "#991b1b",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
          <pre
            style={{
              overflow: "auto",
              fontSize: "14px",
              marginBottom: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
