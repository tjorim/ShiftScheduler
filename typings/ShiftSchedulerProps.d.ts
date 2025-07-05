/**
 * This file was generated from ShiftScheduler.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue } from "mendix";

export interface ShiftSchedulerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    people: ListValue;
    events?: ListValue;
    teamCapacities?: ListValue;
    startDateAttribute?: EditableValue<Date>;
    endDateAttribute?: EditableValue<Date>;
    showDebugInfo: boolean;
    contextEventId?: EditableValue<string>;
    contextPersonId?: EditableValue<string>;
    contextDate?: EditableValue<string>;
    contextSelectedCells?: EditableValue<string>;
    onEditEvent?: ActionValue;
    onCreateEvent?: ActionValue;
    onDeleteEvent?: ActionValue;
    onBatchCreate?: ActionValue;
    onBatchEdit?: ActionValue;
    onBatchDelete?: ActionValue;
}

export interface ShiftSchedulerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    people: {} | { caption: string } | { type: string } | null;
    events: {} | { caption: string } | { type: string } | null;
    teamCapacities: {} | { caption: string } | { type: string } | null;
    startDateAttribute: string;
    endDateAttribute: string;
    showDebugInfo: boolean;
    contextEventId: string;
    contextPersonId: string;
    contextDate: string;
    contextSelectedCells: string;
    onEditEvent: {} | null;
    onCreateEvent: {} | null;
    onDeleteEvent: {} | null;
    onBatchCreate: {} | null;
    onBatchEdit: {} | null;
    onBatchDelete: {} | null;
}
