import React, { useCallback } from 'react';
import { Calendar, momentLocalizer, Event, View } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { SchedulerItem, SchedulerResource, SchedulerViewProps } from '../../types/SchedulerTypes';

// Create localizer using dayjs
const localizer = momentLocalizer(dayjs as any);

interface TimelineEvent extends Event {
    resource?: string;
    item: SchedulerItem;
}

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
    // Transform scheduler items to calendar events
    const events = items.map((item): TimelineEvent => ({
        id: item.id,
        title: item.title,
        start: item.start,
        end: item.end,
        resource: item.resourceId,
        item: item
    }));

    // Transform resources for the calendar
    const calendarResources = resources.map(resource => ({
        resourceId: resource.id,
        resourceTitle: resource.title
    }));

    const handleSelectEvent = useCallback((event: TimelineEvent) => {
        if (onItemClick) {
            onItemClick(event.item);
        }
    }, [onItemClick]);

    const handleEventDrop = useCallback(({ event, start, end, resourceId }: any) => {
        if (onItemMove && enableDragDrop) {
            const item = (event as TimelineEvent).item;
            onItemMove(item, start, end, resourceId || item.resourceId);
        }
    }, [onItemMove, enableDragDrop]);

    const handleEventResize = useCallback(({ event, start, end }: any) => {
        if (onItemResize && enableResize) {
            const item = (event as TimelineEvent).item;
            onItemResize(item, start, end);
        }
    }, [onItemResize, enableResize]);

    const eventStyleGetter = useCallback((event: TimelineEvent) => {
        return {
            style: {
                backgroundColor: '#3174ad',
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    }, []);

    return (
        <div className="modern-schedule-board-timeline">
            <Calendar
                localizer={localizer}
                events={events}
                resources={calendarResources}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                defaultView="week"
                views={['month', 'week', 'day'] as View[]}
                step={30}
                timeslots={2}
                onSelectEvent={handleSelectEvent}
                onEventDrop={enableDragDrop ? handleEventDrop : undefined}
                onEventResize={enableResize ? handleEventResize : undefined}
                eventPropGetter={eventStyleGetter}
                resizable={enableResize}
                selectable={enableMultiSelect}
                popup
                style={{ height: 600 }}
            />
        </div>
    );
};