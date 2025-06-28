import { useState, useEffect, useMemo, useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue, ListReferenceValue } from "mendix";
import { UseShiftDataReturn, Engineer, ShiftAssignment, ShiftType, ValidationError } from "../types/shiftScheduler";

interface DataState {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    shiftsLoading: boolean;
    error: ValidationError | null;
}

interface UseShiftDataProps {
    engineersSource: ListValue;
    shiftsSource?: ListValue;
    nameAttribute?: ListAttributeValue<string>;
    headerAttribute?: ListAttributeValue<string>;
    subheaderAttribute?: ListAttributeValue<string>;
    startTimeAttribute?: ListAttributeValue<Date>;
    dayTypeAttribute?: ListAttributeValue<string>;
    statusAttribute?: ListAttributeValue<string>;
    spUserAssociation?: ListReferenceValue;
    shiftAssociation?: ListReferenceValue;
    shiftDateAttribute?: ListAttributeValue<Date>;
}

export const useShiftData = ({
    engineersSource,
    shiftsSource,
    nameAttribute,
    headerAttribute,
    subheaderAttribute,
    startTimeAttribute,
    dayTypeAttribute,
    statusAttribute,
    spUserAssociation,
    shiftAssociation,
    shiftDateAttribute
}: UseShiftDataProps): UseShiftDataReturn => {
    const [dataState, setDataState] = useState<DataState>({
        engineers: [],
        shifts: [],
        shiftsLoading: true,
        error: null
    });

    // Validation helper
    const validateConfiguration = useCallback((): ValidationError | null => {
        if (!engineersSource) {
            return { message: "Engineers data source is required", property: "engineers" };
        }

        if (engineersSource.status === "unavailable") {
            return { message: "Engineers data source is unavailable", property: "engineers" };
        }

        if (!nameAttribute) {
            return { message: "Name attribute is required for engineers", property: "nameAttribute" };
        }

        if (!headerAttribute) {
            return { message: "Header attribute is required for engineers", property: "headerAttribute" };
        }

        // Validate shifts configuration if provided
        if (shiftsSource && shiftsSource.status === "unavailable") {
            return { message: "Shifts data source is unavailable", property: "shifts" };
        }

        if (shiftsSource && !startTimeAttribute) {
            return {
                message: "Start time attribute is required when shifts data source is provided",
                property: "startTimeAttribute"
            };
        }

        return null;
    }, [engineersSource, shiftsSource, nameAttribute, headerAttribute, startTimeAttribute]);

    // Transform Mendix engineers data with error handling
    const transformedEngineers = useMemo((): Engineer[] => {
        try {
            if (engineersSource.status !== "available" || !engineersSource.items) {
                return [];
            }

            return engineersSource.items.map((item: ObjectItem) => {
                try {
                    // Debug: Check attribute configuration (will be shown in main debug panel)

                    // Store debug info to be displayed in main panel (no floating debug box)

                    // Access SPUser properties through configured attributes
                    const name = nameAttribute
                        ? nameAttribute.get(item).status === "available"
                            ? nameAttribute.get(item).value || "Unknown"
                            : "Unknown"
                        : "Unknown";

                    const header = headerAttribute
                        ? headerAttribute.get(item).status === "available"
                            ? headerAttribute.get(item).value || "All Engineers"
                            : "All Engineers"
                        : "All Engineers";

                    const subheader = subheaderAttribute
                        ? subheaderAttribute.get(item).status === "available"
                            ? subheaderAttribute.get(item).value || "General"
                            : "General"
                        : "General";

                    return {
                        id: item.id,
                        name,
                        header,
                        subheader,
                        mendixObject: item
                    } as Engineer;
                } catch (error) {
                    return {
                        id: item.id,
                        name: "Unknown",
                        header: "Error",
                        subheader: "General",
                        mendixObject: item
                    } as Engineer;
                }
            });
        } catch (error) {
            return [];
        }
    }, [engineersSource, nameAttribute, headerAttribute, subheaderAttribute]);

    // Transform Mendix shifts data with error handling
    const transformedShifts = useMemo((): ShiftAssignment[] => {
        try {
            if (!shiftsSource || shiftsSource.status !== "available" || !shiftsSource.items) {
                return [];
            }

            // Debug counters (will be shown in debug panel if needed)
            // let successfulAssociations = 0;
            // let totalShifts = 0;

            const shifts = shiftsSource.items
                .map((item: ObjectItem) => {
                    try {
                        const startTime = startTimeAttribute?.get(item).value;
                        const dayType = dayTypeAttribute?.get(item).value || "";
                        const status = statusAttribute?.get(item).value;

                        // Try to get the actual shift date from CalendarEvents_Shift/Shift/Date
                        let shiftDate: Date | undefined;
                        if (shiftAssociation && shiftDateAttribute) {
                            const shiftRef = shiftAssociation.get(item);
                            if (shiftRef.status === "available" && shiftRef.value) {
                                const shiftDateValue = shiftDateAttribute.get(shiftRef.value);
                                if (shiftDateValue.status === "available" && shiftDateValue.value) {
                                    shiftDate = shiftDateValue.value;
                                }
                            }
                        }

                        // Debug: Association access (will be shown in main debug panel)

                        // Try to get engineer ID through the SPUser association
                        let engineerId: string | undefined;

                        // Use the spUserAssociation to get the referenced SPUser
                        if (spUserAssociation) {
                            const spUserRef = spUserAssociation.get(item);
                            if (spUserRef.status === "available" && spUserRef.value) {
                                // Get the SPUser ID from the association
                                engineerId = spUserRef.value.id;
                                // successfulAssociations++;

                                // Debug: Association successful (will be shown in main debug panel)
                            }
                        }

                        // Fallback to shift ID if no association found
                        if (!engineerId) {
                            engineerId = item.id;
                        }

                        // totalShifts++;

                        // Use shiftDate if available, otherwise fall back to startTime
                        // If neither is available, skip this shift (don't show undefined events)
                        const finalDate = shiftDate || startTime;
                        if (!finalDate) {
                            // Skip shifts without proper dates - don't show them
                            return null;
                        }

                        return {
                            id: item.id,
                            date: finalDate.toISOString().split("T")[0],
                            engineerId: engineerId || item.id,
                            shift: (dayType as ShiftType) || "M",
                            status,
                            shiftDate: finalDate, // The actual shift date from CalendarEvents_Shift/Shift/Date
                            mendixObject: item
                        } as ShiftAssignment;
                    } catch (error) {
                        // Skip invalid shifts - don't show them with fake dates
                        return null;
                    }
                })
                .filter((shift): shift is ShiftAssignment => shift !== null);

            // Debug: Association success rate (will be shown in main debug panel)

            return shifts;
        } catch (error) {
            return [];
        }
    }, [
        shiftsSource,
        startTimeAttribute,
        dayTypeAttribute,
        statusAttribute,
        spUserAssociation,
        shiftAssociation,
        shiftDateAttribute
    ]);

    // Main data processing effect with validation
    useEffect(() => {
        const validationError = validateConfiguration();

        if (validationError) {
            setDataState({
                engineers: [],
                shifts: [],
                shiftsLoading: false,
                error: validationError
            });
            return;
        }

        const shiftsLoading = shiftsSource?.status === "loading" || false;

        setDataState({
            engineers: transformedEngineers,
            shifts: transformedShifts,
            shiftsLoading,
            error: null
        });
    }, [validateConfiguration, transformedEngineers, transformedShifts, engineersSource.status, shiftsSource?.status]);

    // Enhanced helper methods with error handling
    const getShiftsForEngineer = useCallback(
        (engineerId: string): ShiftAssignment[] => {
            try {
                return dataState.shifts.filter(shift => shift.engineerId === engineerId);
            } catch (error) {
                return [];
            }
        },
        [dataState.shifts]
    );

    const getEngineersByTeam = useCallback((): { [header: string]: Engineer[] } => {
        try {
            const headerGroups: { [header: string]: Engineer[] } = {};
            dataState.engineers.forEach(engineer => {
                const headerName = engineer.header;
                if (!headerGroups[headerName]) {
                    headerGroups[headerName] = [];
                }
                headerGroups[headerName].push(engineer);
            });
            return headerGroups;
        } catch (error) {
            return {};
        }
    }, [dataState.engineers]);

    const getShiftForDate = useCallback(
        (engineerId: string, date: string): ShiftAssignment | undefined => {
            try {
                return dataState.shifts.find(shift => shift.engineerId === engineerId && shift.date === date);
            } catch (error) {
                return undefined;
            }
        },
        [dataState.shifts]
    );

    const updateShift = useCallback((shiftId: string, updates: Partial<ShiftAssignment>) => {
        try {
            setDataState(prev => ({
                ...prev,
                shifts: prev.shifts.map(shift => (shift.id === shiftId ? { ...shift, ...updates } : shift))
            }));
        } catch (error) {
            // Silently fail
        }
    }, []);

    const getEngineerById = useCallback(
        (engineerId: string): Engineer | undefined => {
            try {
                return dataState.engineers.find(engineer => engineer.id === engineerId);
            } catch (error) {
                return undefined;
            }
        },
        [dataState.engineers]
    );

    const getShiftsByDateRange = useCallback(
        (startDate: string, endDate: string): ShiftAssignment[] => {
            try {
                return dataState.shifts.filter(shift => shift.date >= startDate && shift.date <= endDate);
            } catch (error) {
                return [];
            }
        },
        [dataState.shifts]
    );

    const refreshData = useCallback(() => {
        try {
            // Force re-evaluation of data sources
            setDataState(prev => ({ ...prev, loading: true, error: null }));
            // In a real implementation, this would trigger data refresh
            setTimeout(() => {
                const validationError = validateConfiguration();
                setDataState(prev => ({
                    ...prev,
                    loading: false,
                    engineersLoading: false,
                    shiftsLoading: false,
                    error: validationError
                }));
            }, 100);
        } catch (error) {
            setDataState(prev => ({
                ...prev,
                loading: false,
                error: { message: "Failed to refresh data" }
            }));
        }
    }, [validateConfiguration]);

    // Calculate loading state when needed
    const engineersLoading = engineersSource.status === "loading";
    const loading = engineersLoading || dataState.shiftsLoading;

    return {
        engineers: dataState.engineers,
        shifts: dataState.shifts,
        loading,
        shiftsLoading: dataState.shiftsLoading,
        error: dataState.error,
        getShiftsForEngineer,
        getEngineersByTeam,
        getShiftForDate,
        updateShift,
        getEngineerById,
        getShiftsByDateRange,
        refreshData,
        debugInfo: {
            attributesConfigured: {
                name: !!nameAttribute,
                header: !!headerAttribute,
                subheader: !!subheaderAttribute,
                spUserAssociation: !!spUserAssociation,
                shiftAssociation: !!shiftAssociation,
                shiftDate: !!shiftDateAttribute
            }
        }
    };
};
