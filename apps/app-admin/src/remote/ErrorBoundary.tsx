import { Component } from 'react';
import type { PropsWithChildren } from 'react';
import { Card } from '@repo/ui';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card title="Remote widget">
          <p className="error">
            Remote widget unavailable. Start the kitchen-sink app to enable it.
          </p>
        </Card>
      );
    }
    return this.props.children;
  }
}
