import React, { useCallback } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { SchedulerItem, SchedulerResource, SchedulerViewProps } from '../../types/SchedulerTypes';

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
        start_time: item.start,
        end_time: item.end
    }));

    // Transform resources to timeline groups
    const timelineGroups = resources.map(resource => ({
        id: resource.id,
        title: resource.title,
        rightTitle: resource.title
    }));

    const handleItemClick = useCallback((itemId: string | number) => {
        if (onItemClick) {
            const item = items.find(i => i.id === itemId);
            if (item) {
                onItemClick(item);
            }
        }
    }, [onItemClick, items]);

    const handleItemMove = useCallback((itemId: string | number, dragTime: number, newGroupOrder: number) => {
        if (onItemMove && enableDragDrop) {
            const item = items.find(i => i.id === itemId);
            const newGroup = timelineGroups[newGroupOrder];
            
            if (item && newGroup) {
                const duration = item.end.getTime() - item.start.getTime();
                const newStart = new Date(dragTime);
                const newEnd = new Date(dragTime + duration);
                
                onItemMove(item, newStart, newEnd, newGroup.id.toString());
            }
        }
    }, [onItemMove, enableDragDrop, items, timelineGroups]);

    const handleItemResize = useCallback((itemId: string | number, time: number, edge: 'left' | 'right') => {
        if (onItemResize && enableResize) {
            const item = items.find(i => i.id === itemId);
            
            if (item) {
                let newStart = new Date(item.start);
                let newEnd = new Date(item.end);
                
                if (edge === 'left') {
                    newStart = new Date(time);
                } else {
                    newEnd = new Date(time);
                }
                
                onItemResize(item, newStart, newEnd);
            }
        }
    }, [onItemResize, enableResize, items]);

    const today = new Date();
    const defaultTimeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const defaultTimeEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    return (
        <div className="modern-schedule-board-timeline">
            <Timeline
                groups={timelineGroups}
                items={timelineItems}
                defaultTimeStart={defaultTimeStart}
                defaultTimeEnd={defaultTimeEnd}
                canMove={enableDragDrop}
                canResize={enableResize ? 'both' : false}
                itemTouchSendsClick={false}
                stackItems
                itemHeightRatio={0.75}
                onItemClick={handleItemClick}
                onItemMove={handleItemMove}
                onItemResize={handleItemResize}
                lineHeight={60}
            />
        </div>
    );
};