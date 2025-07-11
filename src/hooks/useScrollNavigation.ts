import React, { useRef, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export interface UseScrollNavigationReturn {
    headerScrollRef: React.RefObject<HTMLDivElement>;
    contentScrollRef: React.RefObject<HTMLDivElement>;
    isScrolling: React.MutableRefObject<boolean>;
    infiniteScrollRef: (node?: Element | null) => void;
    isInfiniteScrollVisible: boolean;
}

/**
 * Custom hook for managing scroll synchronization and infinite loading
 * Ensures unified scrolling experience and handles lazy loading of additional timeline data
 */
export const useScrollNavigation = (): UseScrollNavigationReturn => {
    // Refs for scroll synchronization
    const headerScrollRef = useRef<HTMLDivElement>(null);
    const contentScrollRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    // Infinite scroll / lazy loading with intersection observer
    const { ref: infiniteScrollRef, inView: isInfiniteScrollVisible } = useInView({
        rootMargin: "0px",
        threshold: 1
    });

    // Scroll synchronization between header and content
    const syncScroll = useCallback((source: HTMLDivElement, target: HTMLDivElement) => {
        if (isScrolling.current) {
            return;
        }
        isScrolling.current = true;
        target.scrollLeft = source.scrollLeft;
        setTimeout(() => {
            isScrolling.current = false;
        }, 10);
    }, []);

    // Set up scroll event listeners for synchronization
    useEffect(() => {
        const headerEl = headerScrollRef.current;
        const contentEl = contentScrollRef.current;

        if (!headerEl || !contentEl) {
            return;
        }

        const handleHeaderScroll = (): void => syncScroll(headerEl, contentEl);
        const handleContentScroll = (): void => syncScroll(contentEl, headerEl);

        headerEl.addEventListener("scroll", handleHeaderScroll, { passive: true });
        contentEl.addEventListener("scroll", handleContentScroll, { passive: true });

        return () => {
            headerEl.removeEventListener("scroll", handleHeaderScroll);
            contentEl.removeEventListener("scroll", handleContentScroll);
        };
    }, [syncScroll]);

    return {
        headerScrollRef,
        contentScrollRef,
        isScrolling,
        infiniteScrollRef,
        isInfiniteScrollVisible
    };
};
