import { Component } from 'react';
import type { PropsWithChildren } from 'react';
interface ErrorBoundaryState {
    hasError: boolean;
}
export declare class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
    state: ErrorBoundaryState;
    static getDerivedStateFromError(): ErrorBoundaryState;
    render(): string | number | bigint | boolean | import("react").JSX.Element | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | Iterable<import("react").ReactNode> | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | import("react").ReactPortal | null | undefined> | null | undefined;
}
export {};
