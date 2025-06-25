import React from "react";
import { ObjectItem, ListValue, ListAttributeValue, ActionValue } from "mendix";

export interface SchedulerItem {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resourceId: string;
    mendixObject: ObjectItem;
}

export interface SchedulerResource {
    id: string;
    title: string;
    mendixObject: ObjectItem;
}

export interface ModernScheduleBoardContainerProps {
    name: string;
    class: string;
    style?: React.CSSProperties;
    tabIndex?: number;

    // Data sources
    dataSource: ListValue;
    resourcesSource: ListValue;

    // Attributes
    startDateAttribute: ListAttributeValue<Date>;
    endDateAttribute: ListAttributeValue<Date>;
    titleAttribute: ListAttributeValue<string>;
    resourceIdAttribute: ListAttributeValue<string>;

    // Behavior
    enableDragDrop: boolean;
    enableResize: boolean;
    enableMultiSelect: boolean;

    // Events
    onItemClick?: ActionValue;
    onItemMove?: ActionValue;
    onItemResize?: ActionValue;
}

export interface ModernScheduleBoardPreviewProps {
    className: string;
    style: string;
    styleObject?: React.CSSProperties;
    readOnly: boolean;

    // Preview properties
    dataSource: string;
    resourcesSource: string;
    enableDragDrop: boolean;
    enableResize: boolean;
    enableMultiSelect: boolean;
}

export interface SchedulerViewProps {
    items: SchedulerItem[];
    resources: SchedulerResource[];
    onItemClick?: (item: SchedulerItem) => void;
    onItemMove?: (item: SchedulerItem, newStart: Date, newEnd: Date, newResourceId: string) => void;
    onItemResize?: (item: SchedulerItem, newStart: Date, newEnd: Date) => void;
    enableDragDrop: boolean;
    enableResize: boolean;
    enableMultiSelect: boolean;
}
