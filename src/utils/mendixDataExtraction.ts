import { ObjectItem } from "mendix";

/**
 * Creates a value extractor function for Mendix object items
 * Provides consistent data extraction with fallback handling
 */
export const createValueExtractor = (item: ObjectItem) => {
    return <T>(fieldName: string, fallback: T): T => {
        try {
            // Use Mendix ObjectItem.get() method - the correct way according to docs
            if (typeof (item as any).get === "function") {
                try {
                    const value = (item as any).get(fieldName);
                    return value ?? fallback;
                } catch {
                    // Fall through to fallback if get() fails
                }
            }

            // Fallback: Try direct property access for custom objects
            const itemAsRecord = item as Record<string, any>;
            if (itemAsRecord[fieldName] !== undefined) {
                const value = itemAsRecord[fieldName];
                return value?.value ?? value ?? fallback;
            }

            return fallback;
        } catch {
            return fallback;
        }
    };
};

/**
 * Type-safe value extractor with specific types
 */
export const createTypedValueExtractor = (
    item: ObjectItem
): {
    getString: (fieldName: string, fallback?: string) => string;
    getNumber: (fieldName: string, fallback?: number) => number;
    getBoolean: (fieldName: string, fallback?: boolean) => boolean;
    getDate: (fieldName: string, fallback?: string | null) => string | null;
} => {
    const getValue = createValueExtractor(item);

    return {
        getString: (fieldName: string, fallback = ""): string => getValue(fieldName, fallback),
        getNumber: (fieldName: string, fallback = 0): number => getValue(fieldName, fallback),
        getBoolean: (fieldName: string, fallback = false): boolean => getValue(fieldName, fallback),
        getDate: (fieldName: string, fallback: string | null = null): string | null => getValue(fieldName, fallback)
    };
};

/**
 * Sanitizes a string to be safe for use as a CSS ID or similar identifier
 * Converts to lowercase, removes special characters, and handles edge cases
 */
export const sanitizeForCssId = (input: string): string => {
    if (!input || typeof input !== "string") {
        return "default";
    }

    return (
        input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric sequences with hyphens
            .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
            .replace(/-+/g, "-") || "default"
    ); // Collapse multiple hyphens and fallback if empty
};
