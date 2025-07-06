import { ObjectItem } from "mendix";

/**
 * Creates a value extractor function for Mendix object items
 * Provides consistent data extraction with fallback handling
 */
export const createValueExtractor = (item: ObjectItem) => {
    return <T = any>(fieldName: string, fallback: T): T => {
        try {
            // Access Mendix object attributes
            const attr = (item as any)[fieldName];
            return attr?.value || attr || fallback;
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
