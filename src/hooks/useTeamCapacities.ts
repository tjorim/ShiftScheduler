import { useCallback } from "react";
import { ListValue, ObjectItem } from "mendix";
import { TeamCapacity } from "../types/shiftScheduler";

export interface UseTeamCapacitiesProps {
    teamCapacitiesSource?: ListValue;
    capacityTeamNameAttribute?: any;
    capacityIsNXTAttribute?: any;
    capacityDateAttribute?: any;
    capacityWeekNumberAttribute?: any;
    capacityPercentageAttribute?: any;
    capacityTargetAttribute?: any;
    capacityMeetsTargetAttribute?: any;
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
    capacityTeamNameAttribute,
    capacityIsNXTAttribute,
    capacityDateAttribute,
    capacityWeekNumberAttribute,
    capacityPercentageAttribute,
    capacityTargetAttribute,
    capacityMeetsTargetAttribute,
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
            const capacities = teamCapacitiesSource.items
                .map((item: ObjectItem, index: number): TeamCapacity | null => {
                    try {
                        // Extract team capacity data using attribute references
                        const teamName = capacityTeamNameAttribute?.get(item).value ?? "";
                        const isNXT = capacityIsNXTAttribute?.get(item).value ?? false;
                        const date = capacityDateAttribute?.get(item).value ?? "";
                        const weekNumberValue = capacityWeekNumberAttribute?.get(item).value;
                        const percentageValue = capacityPercentageAttribute?.get(item).value;
                        const targetValue = capacityTargetAttribute?.get(item).value;
                        
                        // Convert Big.js values to numbers
                        const weekNumber = weekNumberValue ? Number(weekNumberValue.toString()) : 0;
                        const percentage = percentageValue ? Number(percentageValue.toString()) : 0;
                        const target = targetValue ? Number(targetValue.toString()) : 0;
                        const meetsTarget = capacityMeetsTargetAttribute?.get(item).value ?? (percentage >= target);

                        // Data quality checks
                        if (showDebugInfo) {
                            if (!teamName || teamName.trim() === "") {
                                trackDataQualityIssue(`Team capacity ${item.id} has empty or missing teamName`);
                            }
                            if (!date || date.trim() === "") {
                                trackDataQualityIssue(
                                    `Team capacity ${item.id} (${teamName}) has empty or missing date`
                                );
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

                        // Return null to exclude failed items from final results
                        return null;
                    }
                })
                .filter((capacity): capacity is TeamCapacity => capacity !== null);

            return capacities;
        } catch (error) {
            const errorMsg = `Failed to process team capacities: ${
                error instanceof Error ? error.message : "Unknown error"
            }`;
            trackProcessingError(errorMsg);
            return [];
        }
    }, [teamCapacitiesSource, capacityTeamNameAttribute, capacityIsNXTAttribute, capacityDateAttribute, capacityWeekNumberAttribute, capacityPercentageAttribute, capacityTargetAttribute, capacityMeetsTargetAttribute, showDebugInfo, trackProcessingError, trackDataQualityIssue]);

    return { getAllTeamCapacities };
};
