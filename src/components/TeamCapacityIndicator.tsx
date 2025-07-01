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
        const targetClass = capacity.meetsTarget
            ? "team-capacity-indicator--meets-target"
            : "team-capacity-indicator--below-target";
        const tooltipClass = showTooltip ? "team-capacity-indicator--tooltip" : "";

        return [baseClass, compactClass, targetClass, tooltipClass].filter(Boolean).join(" ");
    };

    const dynamicStyle: React.CSSProperties = {
        color: getIndicatorColor(),
        borderColor: getIndicatorColor()
    };

    const percentageText = `${capacity.percentage}%`;

    const tooltipText = showTooltip ? getTooltipText() : undefined;

    const indicator = (
        <span className={getClassName()} style={dynamicStyle} title={tooltipText}>
            {percentageText}
        </span>
    );

    return indicator;
};

export default TeamCapacityIndicator;
