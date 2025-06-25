import { ObjectItem } from "mendix";

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