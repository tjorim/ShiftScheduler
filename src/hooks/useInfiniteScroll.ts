import { useEffect, useRef, useCallback } from "react";
import { addDays } from "../utils/dateHelpers";

export interface UseInfiniteScrollProps {
    isVisible: boolean;
    currentEndDate: Date;
    onExtend?: (startDate: Date, newEndDate: Date) => void;
    startDate: Date;
    onEndDateChange: (newEndDate: Date) => void;
    extensionDays?: number;
}

export interface UseInfiniteScrollReturn {
    isExtending: boolean;
}

/**
 * Custom hook for managing infinite scroll date range extension
 * Consolidates all the complex state management and guards into a single, clean interface
 */
export const useInfiniteScroll = ({
    isVisible,
    currentEndDate,
    onExtend,
    startDate,
    onEndDateChange,
    extensionDays = 15
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
    // Single state ref to track extension status and prevent race conditions
    const extensionStateRef = useRef<{
        isExtending: boolean;
        lastExtendedEndTime: number | null;
    }>({
        isExtending: false,
        lastExtendedEndTime: null
    });

    // Consolidated extension logic with all guards
    const handleExtension = useCallback(() => {
        const state = extensionStateRef.current;
        const currentEndTime = currentEndDate.getTime();

        // Guard: Already extending
        if (state.isExtending) {
            return;
        }

        // Guard: Same end date already extended
        if (state.lastExtendedEndTime === currentEndTime) {
            return;
        }

        // Guard: No extension callback
        if (!onExtend) {
            return;
        }

        // Perform extension
        state.isExtending = true;
        state.lastExtendedEndTime = currentEndTime;

        const newEndDate = addDays(currentEndDate, extensionDays);
        onEndDateChange(newEndDate);
        onExtend(startDate, newEndDate);
    }, [currentEndDate, onExtend, startDate, onEndDateChange, extensionDays]);

    // Reset extension state when sentinel leaves view
    const resetExtensionState = useCallback(() => {
        extensionStateRef.current.isExtending = false;
    }, []);

    // Main extension effect
    useEffect(() => {
        if (isVisible) {
            handleExtension();
        } else {
            resetExtensionState();
        }
    }, [isVisible, handleExtension, resetExtensionState]);

    return {
        isExtending: extensionStateRef.current.isExtending
    };
};
