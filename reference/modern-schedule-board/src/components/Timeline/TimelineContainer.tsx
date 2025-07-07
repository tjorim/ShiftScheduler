import React, { useCallback, createElement } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { SchedulerViewProps } from "../../types/SchedulerTypes";

export const TimelineContainer: React.FC<SchedulerViewProps> = ({
    items,
    resources,
    onItemClick,
    onItemMove,
    onItemResize,
    enableDragDrop,
    enableResize,
    enableMultiSelect
}) => {
    // Transform scheduler items to timeline items
    const timelineItems = items.map(item => ({
        id: item.id,
        group: item.resourceId,
        title: item.title,
        start_time: item.start.getTime(),
        end_time: item.end.getTime(),
        itemProps: {
            onDoubleClick: () => onItemClick?.(item)
        }
    }));

    // Transform resources to timeline groups
    const timelineGroups = resources.map(resource => ({
        id: resource.id,
        title: resource.title
    }));

    const handleItemMove = useCallback(
        (itemId: any, dragTime: number, newGroupOrder: number) => {
            if (!enableDragDrop || !onItemMove) {
                return;
            }

            const item = items.find(i => i.id === itemId);
            const newGroup = timelineGroups[newGroupOrder];

            if (item && newGroup) {
                const duration = item.end.getTime() - item.start.getTime();
                const newStart = new Date(dragTime);
                const newEnd = new Date(dragTime + duration);
                onItemMove(item, newStart, newEnd, newGroup.id);
            }
        },
        [enableDragDrop, onItemMove, items, timelineGroups]
    );

    const handleItemResize = useCallback(
        (itemId: any, time: number, edge: "left" | "right") => {
            if (!enableResize || !onItemResize) {
                return;
            }

            const item = items.find(i => i.id === itemId);
            if (item) {
                const newStart = edge === "left" ? new Date(time) : item.start;
                const newEnd = edge === "right" ? new Date(time) : item.end;
                onItemResize(item, newStart, newEnd);
            }
        },
        [enableResize, onItemResize, items]
    );

    return (
        <div className="modern-schedule-board-timeline">
            <Timeline
                groups={timelineGroups}
                items={timelineItems}
                defaultTimeStart={new Date(Date.now() - 24 * 60 * 60 * 1000)}
                defaultTimeEnd={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                canMove={enableDragDrop}
                canResize={enableResize ? "both" : false}
                onItemMove={handleItemMove}
                onItemResize={handleItemResize}
                lineHeight={50}
                itemHeightRatio={0.8}
                sidebarWidth={150}
                traditionalZoom
            />
        </div>
    );
};
