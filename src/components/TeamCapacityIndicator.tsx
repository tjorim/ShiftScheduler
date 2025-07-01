import React, { createElement } from "react";
import { TeamCapacity, CapacityColorConfig } from "../types/shiftScheduler";

interface TeamCapacityIndicatorProps {
    capacity: TeamCapacity;
    colorConfig?: CapacityColorConfig;
    showTooltip?: boolean;
    compact?: boolean;
}

const defaultColorConfig: CapacityColorConfig = {
    aboveTarget: "#22c55e", // Green
    belowTarget: "#ef4444", // Red
    neutral: "#6b7280" // Gray
};

const TeamCapacityIndicator: React.FC<TeamCapacityIndicatorProps> = ({
    capacity,
    colorConfig = defaultColorConfig,
    showTooltip = true,
    compact = false
}) => {
    const getIndicatorColor = (): string => {
        if (capacity.target === 0) {
            return colorConfig.neutral;
        }
        return capacity.meetsTarget ? colorConfig.aboveTarget : colorConfig.belowTarget;
    };

    const getTooltipText = (): string => {
        const targetText =
            capacity.target > 0 ? `Target: ${capacity.target}% (Week ${capacity.weekNumber})` : "No target set";
        const countText = `${capacity.workingCount}/${capacity.totalEligible} people working`;
        return `${targetText}\n${countText}`;
    };

    const indicatorStyle: React.CSSProperties = {
        color: getIndicatorColor(),
        fontWeight: capacity.meetsTarget ? "600" : "500",
        fontSize: compact ? "0.75rem" : "0.875rem",
        padding: compact ? "2px 4px" : "4px 6px",
        borderRadius: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        border: `1px solid ${getIndicatorColor()}`,
        display: "inline-block",
        minWidth: compact ? "auto" : "50px",
        textAlign: "center",
        cursor: showTooltip ? "help" : "default"
    };

    const percentageText = `${capacity.percentage}%`;

    const indicator = (
        <span
            className="team-capacity-indicator"
            style={indicatorStyle}
            title={showTooltip ? getTooltipText() : undefined}
        >
            {percentageText}
        </span>
    );

    return indicator;
};

export default TeamCapacityIndicator;
