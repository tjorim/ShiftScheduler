import React, { createElement } from "react";
import { ValidationError } from "../types/shiftScheduler";

export interface LoadingStatesProps {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
}

export interface ErrorStateProps extends LoadingStatesProps {
    error: ValidationError;
}

export interface EmptyStateProps extends LoadingStatesProps {
    message?: string;
    description?: string;
}

/**
 * Loading spinner component for data loading states
 */
export const LoadingState: React.FC<LoadingStatesProps> = ({ className = "", style, tabIndex }) => (
    <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
        <div className="shift-scheduler-loading">
            <div className="loading-spinner"></div>
            <p>Loading schedule data...</p>
        </div>
    </div>
);

/**
 * Error state component with detailed error information
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ error, className = "", style, tabIndex }) => (
    <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
        <div className="shift-scheduler-error">
            <h3>⚠️ Configuration Error</h3>
            <p>{error.message}</p>
            {error.property && (
                <p>
                    <small>Check the {error.property} property in the widget configuration.</small>
                </p>
            )}
            <details className="error-details">
                <summary>Technical Details</summary>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </details>
        </div>
    </div>
);

/**
 * Empty state component when no data is available
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    message = "No Data Available",
    description = "No people found. Please check your data source configuration.",
    className = "",
    style,
    tabIndex
}) => (
    <div className={`shift-scheduler ${className}`} style={style} tabIndex={tabIndex}>
        <div className="shift-scheduler-empty">
            <h3>📅 {message}</h3>
            <p>{description}</p>
        </div>
    </div>
);

/**
 * Fallback error boundary component for unexpected errors
 */
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

export class SchedulerErrorBoundary extends React.Component<
    React.PropsWithChildren<LoadingStatesProps>,
    ErrorBoundaryState
> {
    constructor(props: React.PropsWithChildren<LoadingStatesProps>) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Error boundary caught an error - error details will be shown in UI

        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <div
                    className={`shift-scheduler ${this.props.className || ""}`}
                    style={this.props.style}
                    tabIndex={this.props.tabIndex}
                >
                    <div className="shift-scheduler-error-boundary">
                        <h3>🛠️ Something went wrong</h3>
                        <p>The Shift Scheduler encountered an unexpected error.</p>
                        <details className="error-boundary-details">
                            <summary>Error Details</summary>
                            <h4>Error:</h4>
                            <pre>{this.state.error?.toString()}</pre>
                            {this.state.errorInfo && (
                                <div>
                                    <h4>Component Stack:</h4>
                                    <pre>{this.state.errorInfo.componentStack}</pre>
                                </div>
                            )}
                        </details>
                        <button
                            onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
                            className="error-boundary-retry"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error
        };
    }
}

/**
 * Higher-order component to wrap any component with error boundary
 */
export const withErrorBoundary = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P & LoadingStatesProps> => {
    const WrappedComponent: React.FC<P & LoadingStatesProps> = props => (
        <SchedulerErrorBoundary className={props.className} style={props.style} tabIndex={props.tabIndex}>
            <Component {...props} />
        </SchedulerErrorBoundary>
    );

    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
};
