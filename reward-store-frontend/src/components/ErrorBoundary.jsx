import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <h2>Something went wrong.</h2>
          <p>Please refresh the page to continue.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285f4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
