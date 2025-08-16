import { useEffect, useRef, useState } from "react";
import { addDays } from "../utils/dateHelpers";

/**
 * Configuration props for the useInfiniteScroll hook
 */
export interface UseInfiniteScrollProps {
    /** Whether the infinite scroll sentinel is currently visible in the viewport */
    isVisible: boolean;
    /** Whether data is currently being loaded (used to reset extension state) */
    isLoading: boolean;
    /** The current end date of the timeline that will be extended */
    currentEndDate: Date;
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
 * - **Race Condition Prevention**: Uses useRef to prevent multiple simultaneous extensions
 * - **Duplicate Extension Guards**: Prevents extending the same end date multiple times
 * - **Loading State Aware**: Resets extension state when data loading completes
 * - **Clean Dependency Tracking**: React useEffect handles most edge cases naturally
 * - **Configurable Extension**: Allows customization of how many days to extend
 *
 * **Usage Pattern:**
 * 1. IntersectionObserver detects when sentinel enters viewport
 * 2. Hook extends timeline by specified days if conditions are met
 * 3. Hook notifies parent components of the new date range
 * 4. Extension state is reset when data loading completes
 *
 * @param props - Configuration object for infinite scroll behavior
 * @returns Object containing extension status for UI feedback
 *
 * @example
 * ```tsx
 * const { isExtending } = useInfiniteScroll({
 *   isVisible: isInfiniteScrollVisible,
 *   isLoading: eventsLoading,
 *   currentEndDate: endDate,
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
    isLoading,
    currentEndDate,
    onExtend,
    startDate,
    onEndDateChange,
    extensionDays = 15
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
    const [isExtending, setIsExtending] = useState(false);

    // Use a ref to prevent triggering new extensions while one is already in flight
    // Also prevents duplicate extensions for the same end date
    const fetchStateRef = useRef<{
        isFetching: boolean;
        lastExtendedEndTime: number | null;
    }>({
        isFetching: false,
        lastExtendedEndTime: null
    });

    // Main extension effect - trigger when sentinel is visible and conditions are met
    useEffect(() => {
        const currentEndTime = currentEndDate.getTime();
        const fetchState = fetchStateRef.current;

        if (isVisible && !isLoading && !fetchState.isFetching && fetchState.lastExtendedEndTime !== currentEndTime) {
            fetchState.isFetching = true;
            fetchState.lastExtendedEndTime = currentEndTime;
            setIsExtending(true);

            const newEndDate = addDays(currentEndDate, extensionDays);
            onEndDateChange(newEndDate);
            onExtend?.(startDate, newEndDate);
        }
    }, [isVisible, isLoading, currentEndDate, extensionDays, onEndDateChange, onExtend, startDate]);

    // Reset extension state when loading completes
    useEffect(() => {
        if (!isLoading) {
            fetchStateRef.current.isFetching = false;
            setIsExtending(false);
        }
    }, [isLoading]);

    return { isExtending };
};
