import { useReducer, useCallback } from "react";
import { ErrorState, ErrorAction } from "../types/shiftScheduler";

export interface UseErrorTrackingProps {
    showDebugInfo?: boolean;
}

export interface UseErrorTrackingReturn {
    errorState: ErrorState;
    trackProcessingError: (error: string) => void;
    trackInteractionError: (error: string) => void;
    trackDataQualityIssue: (issue: string) => void;
    clearErrors: (errorType?: keyof ErrorState) => void;
}

// Error reducer for managing error state
const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
    switch (action.type) {
        case "ADD_PROCESSING_ERROR":
            return { ...state, processingErrors: [...state.processingErrors, action.payload] };
        case "ADD_INTERACTION_ERROR":
            return { ...state, interactionErrors: [...state.interactionErrors, action.payload] };
        case "ADD_DATA_QUALITY_ISSUE":
            return { ...state, dataQualityIssues: [...state.dataQualityIssues, action.payload] };
        case "CLEAR_ERRORS":
            return { ...state, [action.errorType]: [] };
        case "CLEAR_ALL_ERRORS":
            return { processingErrors: [], interactionErrors: [], dataQualityIssues: [] };
        default:
            return state;
    }
};

/**
 * Custom hook for managing error tracking and debugging information
 * Provides centralized error state management with conditional debug mode
 */
export const useErrorTracking = ({ showDebugInfo = false }: UseErrorTrackingProps): UseErrorTrackingReturn => {
    // Separate error state management with useReducer
    const [errorState, dispatchError] = useReducer(errorReducer, {
        processingErrors: [],
        interactionErrors: [],
        dataQualityIssues: []
    });

    // Helper function to generate timestamp for error messages
    const getTimestamp = useCallback((): string => {
        return new Date().toISOString().split("T")[1].split(".")[0];
    }, []);

    // Enhanced error tracking functions with conditional debug mode
    const trackProcessingError = useCallback(
        (error: string): void => {
            if (!showDebugInfo) {
                return;
            } // Skip error tracking in production

            dispatchError({
                type: "ADD_PROCESSING_ERROR",
                payload: `${getTimestamp()}: ${error}`
            });
        },
        [showDebugInfo, getTimestamp]
    );

    const trackInteractionError = useCallback(
        (error: string): void => {
            if (!showDebugInfo) {
                return;
            } // Skip error tracking in production

            dispatchError({
                type: "ADD_INTERACTION_ERROR",
                payload: `${getTimestamp()}: ${error}`
            });
        },
        [showDebugInfo, getTimestamp]
    );

    const trackDataQualityIssue = useCallback(
        (issue: string): void => {
            if (!showDebugInfo) {
                return;
            } // Skip error tracking in production

            dispatchError({
                type: "ADD_DATA_QUALITY_ISSUE",
                payload: `${getTimestamp()}: ${issue}`
            });
        },
        [showDebugInfo, getTimestamp]
    );

    const clearErrors = useCallback(
        (errorType?: keyof ErrorState): void => {
            if (!showDebugInfo) {
                return;
            }

            if (errorType) {
                dispatchError({ type: "CLEAR_ERRORS", errorType });
            } else {
                dispatchError({ type: "CLEAR_ALL_ERRORS" });
            }
        },
        [showDebugInfo]
    );

    return {
        errorState,
        trackProcessingError,
        trackInteractionError,
        trackDataQualityIssue,
        clearErrors
    };
};
