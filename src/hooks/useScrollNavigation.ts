import React, { useRef, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export interface UseScrollNavigationReturn {
    headerScrollRef: React.RefObject<HTMLDivElement>;
    contentScrollRef: React.RefCallback<HTMLDivElement>;
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
    const isScrolling = useRef(false);

    // State to track when the content scroll element is ready for intersection observer
    const [contentScrollEl, setContentScrollEl] = useState<HTMLDivElement | null>(null);

    // Ref callback to set the content scroll element and trigger observer creation
    const contentScrollRef = useCallback((node: HTMLDivElement | null) => {
        setContentScrollEl(node);
    }, []);

    const { ref: infiniteScrollRef, inView: isInfiniteScrollVisible } = useInView({
        root: contentScrollEl,
        rootMargin: "0px 50px 0px 0px", // Trigger 50px before right edge (for horizontal scroll)
        threshold: 1,
        skip: !contentScrollEl // Skip creating observer until root element is ready
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
        const contentEl = contentScrollEl;

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
    }, [syncScroll, contentScrollEl]);

    return {
        headerScrollRef,
        contentScrollRef,
        isScrolling,
        infiniteScrollRef,
        isInfiniteScrollVisible
    };
};
