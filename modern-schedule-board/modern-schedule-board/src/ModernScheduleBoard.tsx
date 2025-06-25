import React, { useCallback } from 'react';
import { ModernScheduleBoardContainerProps } from './types/SchedulerTypes';
import { useSchedulerData } from './hooks/useSchedulerData';
import { TimelineContainer } from './components/Timeline/TimelineContainer';
import './ModernScheduleBoard.css';

export const ModernScheduleBoard: React.FC<ModernScheduleBoardContainerProps> = ({
    name,
    class: className,
    style,
    tabIndex,
    dataSource,
    resourcesSource,
    startDateAttribute,
    endDateAttribute,
    titleAttribute,
    resourceIdAttribute,
    enableDragDrop,
    enableResize,
    enableMultiSelect,
    onItemClick,
    onItemMove,
    onItemResize
}) => {
    const {
        items,
        resources,
        loading,
        updateItem,
        getItemById,
        getResourceById
    } = useSchedulerData({
        dataSource,
        resourcesSource,
        startDateAttribute,
        endDateAttribute,
        titleAttribute,
        resourceIdAttribute
    });

    const handleItemClick = useCallback((item: any) => {
        if (onItemClick && onItemClick.canExecute) {
            onItemClick.execute();
        }
    }, [onItemClick]);

    const handleItemMove = useCallback((item: any, newStart: Date, newEnd: Date, newResourceId: string) => {
        // Update the item optimistically
        updateItem(item.id, {
            start: newStart,
            end: newEnd,
            resourceId: newResourceId
        });

        // Update the Mendix object
        const mendixObject = item.mendixObject;
        if (mendixObject) {
            startDateAttribute.get(mendixObject).setValue(newStart);
            endDateAttribute.get(mendixObject).setValue(newEnd);
            resourceIdAttribute.get(mendixObject).setValue(newResourceId);
        }

        // Execute the action
        if (onItemMove && onItemMove.canExecute) {
            onItemMove.execute();
        }
    }, [onItemMove, updateItem, startDateAttribute, endDateAttribute, resourceIdAttribute]);

    const handleItemResize = useCallback((item: any, newStart: Date, newEnd: Date) => {
        // Update the item optimistically
        updateItem(item.id, {
            start: newStart,
            end: newEnd
        });

        // Update the Mendix object
        const mendixObject = item.mendixObject;
        if (mendixObject) {
            startDateAttribute.get(mendixObject).setValue(newStart);
            endDateAttribute.get(mendixObject).setValue(newEnd);
        }

        // Execute the action
        if (onItemResize && onItemResize.canExecute) {
            onItemResize.execute();
        }
    }, [onItemResize, updateItem, startDateAttribute, endDateAttribute]);

    if (loading) {
        return (
            <div className={`modern-schedule-board ${className}`} style={style} tabIndex={tabIndex}>
                <div className="modern-schedule-board-loading">
                    Loading scheduler...
                </div>
            </div>
        );
    }

    return (
        <div 
            className={`modern-schedule-board ${className}`} 
            style={style} 
            tabIndex={tabIndex}
            data-widget-name={name}
        >
            <TimelineContainer
                items={items}
                resources={resources}
                onItemClick={handleItemClick}
                onItemMove={handleItemMove}
                onItemResize={handleItemResize}
                enableDragDrop={enableDragDrop}
                enableResize={enableResize}
                enableMultiSelect={enableMultiSelect}
            />
        </div>
    );
};

export default ModernScheduleBoard;