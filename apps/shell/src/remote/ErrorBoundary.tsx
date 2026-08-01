import { Component } from 'react';
import type { ErrorInfo, PropsWithChildren } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
  stack: string;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '', stack: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message,
      stack: '',
    };
  }

  componentDidCatch(_error: Error, errorInfo: ErrorInfo): void {
    this.setState({ stack: errorInfo.componentStack ?? '' });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="shell__error">
          <p>A micro frontend failed to load:</p>
          <pre className="shell__error-message">{this.state.message}</pre>
          {this.state.stack ? <pre className="shell__error-stack">{this.state.stack}</pre> : null}
        </div>
      );
    }
    return this.props.children;
  }
}
