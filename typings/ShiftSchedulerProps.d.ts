/**
 * This file was generated from ShiftScheduler.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface ShiftSchedulerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    people: ListValue;
    personNameAttribute: ListAttributeValue<string>;
    personTeamAttribute: ListAttributeValue<string>;
    personLaneAttribute: ListAttributeValue<string>;
    events?: ListValue;
    eventDateAttribute?: ListAttributeValue<string>;
    eventPersonIdAttribute?: ListAttributeValue<string>;
    eventTypeAttribute?: ListAttributeValue<string>;
    eventStatusAttribute?: ListAttributeValue<string>;
    eventIsRequestAttribute?: ListAttributeValue<boolean>;
    eventReplacesEventIdAttribute?: ListAttributeValue<string>;
    teamCapacities?: ListValue;
    capacityTeamNameAttribute?: ListAttributeValue<string>;
    capacityIsNXTAttribute?: ListAttributeValue<boolean>;
    capacityDateAttribute?: ListAttributeValue<string>;
    capacityWeekNumberAttribute?: ListAttributeValue<Big>;
    capacityPercentageAttribute?: ListAttributeValue<Big>;
    capacityTargetAttribute?: ListAttributeValue<Big>;
    capacityMeetsTargetAttribute?: ListAttributeValue<boolean>;
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
    onApproveRequest?: ActionValue;
    onRejectRequest?: ActionValue;
    onMarkAsTBD?: ActionValue;
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
    personNameAttribute: string;
    personTeamAttribute: string;
    personLaneAttribute: string;
    events: {} | { caption: string } | { type: string } | null;
    eventDateAttribute: string;
    eventPersonIdAttribute: string;
    eventTypeAttribute: string;
    eventStatusAttribute: string;
    eventIsRequestAttribute: string;
    eventReplacesEventIdAttribute: string;
    teamCapacities: {} | { caption: string } | { type: string } | null;
    capacityTeamNameAttribute: string;
    capacityIsNXTAttribute: string;
    capacityDateAttribute: string;
    capacityWeekNumberAttribute: string;
    capacityPercentageAttribute: string;
    capacityTargetAttribute: string;
    capacityMeetsTargetAttribute: string;
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
    onApproveRequest: {} | null;
    onRejectRequest: {} | null;
    onMarkAsTBD: {} | null;
    onBatchCreate: {} | null;
    onBatchEdit: {} | null;
    onBatchDelete: {} | null;
}
