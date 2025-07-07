import { useCallback } from "react";
import { ListValue, ObjectItem } from "mendix";
import { TeamCapacity } from "../types/shiftScheduler";
import { createTypedValueExtractor } from "../utils/mendixDataExtraction";

export interface UseTeamCapacitiesProps {
    teamCapacitiesSource?: ListValue;
    showDebugInfo?: boolean;
    trackProcessingError: (error: string) => void;
    trackDataQualityIssue: (issue: string) => void;
}

export interface UseTeamCapacitiesReturn {
    getAllTeamCapacities: () => TeamCapacity[];
}

/**
 * Custom hook for managing team capacity data with comprehensive error handling
 * Expects microflow to return objects with standardized field names: teamName, isNXT, date, weekNumber, percentage, target, meetsTarget
 */
export const useTeamCapacities = ({
    teamCapacitiesSource,
    showDebugInfo = false,
    trackProcessingError,
    trackDataQualityIssue
}: UseTeamCapacitiesProps): UseTeamCapacitiesReturn => {
    // Get all team capacities with comprehensive error tracking
    const getAllTeamCapacities = useCallback((): TeamCapacity[] => {
        if (!teamCapacitiesSource || teamCapacitiesSource.status !== "available" || !teamCapacitiesSource.items) {
            if (showDebugInfo && teamCapacitiesSource && teamCapacitiesSource.status !== "loading") {
                trackProcessingError(`Team capacities source not available: ${teamCapacitiesSource.status}`);
            }
            return [];
        }

        try {
            const capacities = teamCapacitiesSource.items.map((item: ObjectItem, index: number) => {
                try {
                    // Extract team capacity data from microflow using utility function
                    const { getString, getBoolean, getNumber } = createTypedValueExtractor(item);

                    const teamName = getString("teamName", "");
                    const isNXT = getBoolean("isNXT", false);
                    const date = getString("date", "");
                    const weekNumber = getNumber("weekNumber", 0);
                    const percentage = getNumber("percentage", 0);
                    const target = getNumber("target", 0);
                    const meetsTarget = getBoolean("meetsTarget", percentage >= target);

                    // Data quality checks
                    if (showDebugInfo) {
                        if (!teamName || teamName.trim() === "") {
                            trackDataQualityIssue(`Team capacity ${item.id} has empty or missing teamName`);
                        }
                        if (!date || date.trim() === "") {
                            trackDataQualityIssue(`Team capacity ${item.id} (${teamName}) has empty or missing date`);
                        }
                        if (percentage < 0 || percentage > 100) {
                            trackDataQualityIssue(
                                `Team capacity ${item.id} (${teamName}) has invalid percentage: ${percentage}`
                            );
                        }
                        if (target < 0 || target > 100) {
                            trackDataQualityIssue(
                                `Team capacity ${item.id} (${teamName}) has invalid target: ${target}`
                            );
                        }
                        if (weekNumber < 1 || weekNumber > 53) {
                            trackDataQualityIssue(
                                `Team capacity ${item.id} (${teamName}) has invalid weekNumber: ${weekNumber}`
                            );
                        }

                        // Parse date for additional validation
                        const capacityDate = new Date(date);
                        if (isNaN(capacityDate.getTime())) {
                            trackDataQualityIssue(
                                `Team capacity ${item.id} (${teamName}) has invalid date format: ${date}`
                            );
                        }
                    }

                    return {
                        teamName,
                        isNXT,
                        date,
                        weekNumber,
                        percentage,
                        target,
                        meetsTarget
                    } as TeamCapacity;
                } catch (error) {
                    const errorMsg = `Failed to process team capacity ${index}: ${
                        error instanceof Error ? error.message : "Unknown error"
                    }`;
                    trackProcessingError(errorMsg);

                    // Return minimal fallback capacity
                    return {
                        teamName: "Unknown",
                        isNXT: false,
                        date: "",
                        weekNumber: 0,
                        percentage: 0,
                        target: 0,
                        meetsTarget: false
                    } as TeamCapacity;
                }
            });

            return capacities;
        } catch (error) {
            const errorMsg = `Failed to process team capacities: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
            trackProcessingError(errorMsg);
            return [];
        }
    }, [teamCapacitiesSource, showDebugInfo, trackProcessingError, trackDataQualityIssue]);

    return { getAllTeamCapacities };
};
