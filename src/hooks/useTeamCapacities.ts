import { useCallback } from "react";
import { ListValue, ObjectItem, ListAttributeValue } from "mendix";
import { Big } from "big.js";
import { TeamCapacity } from "../types/shiftScheduler";
import dayjs from "../utils/dateHelpers";

export interface UseTeamCapacitiesProps {
    teamCapacitiesSource?: ListValue;
    capacityTeamNameAttribute?: ListAttributeValue<string>;
    capacityIsNXTAttribute?: ListAttributeValue<boolean>;
    capacityDateAttribute?: ListAttributeValue<Date>;
    capacityWeekNumberAttribute?: ListAttributeValue<Big>;
    capacityPercentageAttribute?: ListAttributeValue<Big>;
    capacityTargetAttribute?: ListAttributeValue<Big>;
    // capacityMeetsTargetAttribute removed - now calculated from percentage >= target
    showDebugInfo?: boolean;
    trackProcessingError: (error: string) => void;
    trackDataQualityIssue: (issue: string) => void;
}

export interface UseTeamCapacitiesReturn {
    getAllTeamCapacities: () => TeamCapacity[];
}

/**
 * Custom hook for managing team capacity data with comprehensive error handling
 * Expects microflow to return objects with standardized field names: teamName, isNXT, date, weekNumber, percentage, target
 * meetsTarget is calculated as percentage >= target
 */
export const useTeamCapacities = ({
    teamCapacitiesSource,
    capacityTeamNameAttribute,
    capacityIsNXTAttribute,
    capacityDateAttribute,
    capacityWeekNumberAttribute,
    capacityPercentageAttribute,
    capacityTargetAttribute,
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
                        const teamName = capacityTeamNameAttribute?.get(item)?.value ?? "";
                        const isNXT = capacityIsNXTAttribute?.get(item)?.value ?? false;
                        const dateValue = capacityDateAttribute?.get(item)?.value;
                        const date = dateValue ? dayjs(dateValue).format("YYYY-MM-DD") : "";
                        const weekNumberValue = capacityWeekNumberAttribute?.get(item)?.value;
                        const percentageValue = capacityPercentageAttribute?.get(item)?.value;
                        const targetValue = capacityTargetAttribute?.get(item)?.value;

                        // Convert Big.js values to numbers
                        const weekNumber = weekNumberValue ? Number(weekNumberValue.toString()) : 0;
                        const percentage = percentageValue ? Number(percentageValue.toString()) : 0;
                        const target = targetValue ? Number(targetValue.toString()) : 0;
                        // Calculate meetsTarget based on percentage >= target
                        const meetsTarget = percentage >= target;

                        // Data quality checks
                        if (showDebugInfo) {
                            if (!teamName || teamName.trim() === "") {
                                trackDataQualityIssue(`Team capacity ${item.id} has empty or missing teamName`);
                            }
                            if (!date) {
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

                            // Validate the original Date object instead of parsing the formatted string
                            if (dateValue && Number.isNaN(dateValue.getTime())) {
                                trackDataQualityIssue(`Team capacity ${item.id} (${teamName}) has invalid Date value`);
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
    }, [
        teamCapacitiesSource,
        capacityTeamNameAttribute,
        capacityIsNXTAttribute,
        capacityDateAttribute,
        capacityWeekNumberAttribute,
        capacityPercentageAttribute,
        capacityTargetAttribute,
        showDebugInfo,
        trackProcessingError,
        trackDataQualityIssue
    ]);

    return { getAllTeamCapacities };
};
