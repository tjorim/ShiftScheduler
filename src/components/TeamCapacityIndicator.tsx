import React, { createElement } from "react";
import { TeamCapacity } from "../types/shiftScheduler";

interface TeamCapacityIndicatorProps {
    capacity: TeamCapacity;
    showTooltip?: boolean;
    compact?: boolean;
}

const TeamCapacityIndicator: React.FC<TeamCapacityIndicatorProps> = ({
    capacity,
    showTooltip = true,
    compact = false
}) => {
    const getTooltipText = (): string | undefined => {
        // Only show tooltip if there's a target set
        if (capacity.target <= 0) {
            return undefined;
        }
        return `Target: ${capacity.target}% (Week ${capacity.weekNumber})`;
    };

    const getClassName = (): string => {
        const baseClass = "team-capacity-indicator";
        const compactClass = compact ? "team-capacity-indicator--compact" : "";

        // Handle all three states: neutral (no target), meets target, below target
        let statusClass = "";
        if (capacity.target === 0) {
            statusClass = "team-capacity-indicator--neutral";
        } else if (capacity.meetsTarget) {
            statusClass = "team-capacity-indicator--meets-target";
        } else {
            statusClass = "team-capacity-indicator--below-target";
        }

        const tooltipClass = showTooltip ? "team-capacity-indicator--tooltip" : "";

        return [baseClass, compactClass, statusClass, tooltipClass].filter(Boolean).join(" ");
    };

    const percentageText = `${capacity.percentage}%`;

    const tooltipText = showTooltip ? getTooltipText() : undefined;

    const indicator = (
        <span className={getClassName()} title={tooltipText}>
            {percentageText}
        </span>
    );

    return indicator;
};

export default TeamCapacityIndicator;
