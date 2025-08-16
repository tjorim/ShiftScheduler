import { useEffect, useRef, useCallback, useState } from "react";
import { addDays } from "../utils/dateHelpers";

/**
 * Configuration props for the useInfiniteScroll hook
 */
export interface UseInfiniteScrollProps {
    /** Whether the infinite scroll sentinel is currently visible in the viewport */
    isVisible: boolean;
    /** The current end date of the timeline that will be extended */
    currentEndDate: Date;
    /** Whether data is currently being loaded (used to reset extension state) */
    isLoading?: boolean;
    /** Optional callback to notify parent of date range changes (startDate, newEndDate) */
    onExtend?: (startDate: Date, newEndDate: Date) => void;
    /** The start date of the timeline (used in onExtend callback) */
    startDate: Date;
    /** Callback to update the local end date state */
    onEndDateChange: (newEndDate: Date) => void;
    /** Number of days to extend the timeline by (default: 15) */
    extensionDays?: number;
}

/**
 * Return value from the useInfiniteScroll hook
 */
export interface UseInfiniteScrollReturn {
    /** Whether an extension operation is currently in progress */
    isExtending: boolean;
}

/**
 * Custom hook for managing infinite scroll date range extension in timeline widgets.
 *
 * This hook consolidates complex state management, race condition prevention, and duplicate
 * extension guards into a single, clean interface. It was created to replace scattered
 * useEffect hooks and refs that were managing infinite scroll logic in ScheduleGrid.
 *
 * **Key Features:**
 * - **Race Condition Prevention**: Uses useState for reactive isExtending and useRef for fetch gating
 * - **Duplicate Extension Guards**: Prevents extending the same end date multiple times
 * - **Loading State Aware**: Resets extension state when data loading completes
 * - **Proper State Reset**: Handles both sentinel visibility and loading completion
 * - **Configurable Extension**: Allows customization of how many days to extend
 *
 * **Usage Pattern:**
 * 1. IntersectionObserver detects when sentinel enters viewport
 * 2. Hook extends timeline by specified days if conditions are met
 * 3. Hook notifies parent components of the new date range
 * 4. Extension state is reset when data loading completes OR sentinel leaves viewport
 *
 * @param props - Configuration object for infinite scroll behavior
 * @returns Object containing extension status for UI feedback
 *
 * @example
 * ```tsx
 * const { isExtending } = useInfiniteScroll({
 *   isVisible: isInfiniteScrollVisible,
 *   currentEndDate: endDate,
 *   isLoading: eventsLoading, // Pass loading state to reset extension properly
 *   onExtend: onDateRangeChange,
 *   startDate,
 *   onEndDateChange: setEndDate,
 *   extensionDays: 15
 * });
 *
 * // Use isExtending for loading indicators or accessibility announcements
 * {isExtending && <div aria-live="polite">Loading more timeline data</div>}
 * ```
 */
export const useInfiniteScroll = ({
    isVisible,
    currentEndDate,
    isLoading = false,
    onExtend,
    startDate,
    onEndDateChange,
    extensionDays = 15
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
    // Reactive state for UI feedback
    const [isExtending, setIsExtending] = useState(false);

    // Ref for fetch gating and duplicate prevention
    const fetchStateRef = useRef<{
        lastExtendedEndTime: number | null;
        hasPendingFetch: boolean;
    }>({
        lastExtendedEndTime: null,
        hasPendingFetch: false
    });

    // Reset extension state when loading completes
    useEffect(() => {
        if (!isLoading && isExtending) {
            setIsExtending(false);
            fetchStateRef.current.hasPendingFetch = false;
        }
    }, [isLoading, isExtending]);

    // Reset extension state when sentinel leaves viewport
    useEffect(() => {
        if (!isVisible) {
            setIsExtending(false);
            fetchStateRef.current.hasPendingFetch = false;
        }
    }, [isVisible]);

    // Consolidated extension logic with all guards
    const handleExtension = useCallback(() => {
        const fetchState = fetchStateRef.current;
        const currentEndTime = currentEndDate.getTime();

        // Guard: Already have pending fetch
        if (fetchState.hasPendingFetch) {
            return;
        }

        // Guard: Same end date already extended
        if (fetchState.lastExtendedEndTime === currentEndTime) {
            return;
        }

        // Guard: No extension callback
        if (!onExtend) {
            return;
        }

        // Guard: Currently loading data
        if (isLoading) {
            return;
        }

        // Perform extension
        fetchState.hasPendingFetch = true;
        fetchState.lastExtendedEndTime = currentEndTime;
        setIsExtending(true);

        const newEndDate = addDays(currentEndDate, extensionDays);
        onEndDateChange(newEndDate);
        onExtend(startDate, newEndDate);
    }, [currentEndDate, onExtend, startDate, onEndDateChange, extensionDays, isLoading]);

    // Main extension effect - trigger extension when sentinel becomes visible
    useEffect(() => {
        if (isVisible) {
            handleExtension();
        }
    }, [isVisible, handleExtension]);

    return {
        isExtending
    };
};
