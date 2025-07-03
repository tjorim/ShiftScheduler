/**
 * This file was generated from ShiftScheduler.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListReferenceValue } from "mendix";
import { Big } from "big.js";

export interface ShiftSchedulerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    engineers: ListValue;
    shifts?: ListValue;
    teamCapacities?: ListValue;
    startDateAttribute?: EditableValue<Date>;
    endDateAttribute?: EditableValue<Date>;
    nameAttribute?: ListAttributeValue<string>;
    teamAttribute?: ListAttributeValue<string>;
    laneAttribute?: ListAttributeValue<string>;
    showDebugInfo: boolean;
    dayTypeAttribute?: ListAttributeValue<string>;
    eventTypeAttribute?: ListAttributeValue<string>;
    statusAttribute?: ListAttributeValue<string>;
    spUserAssociation?: ListReferenceValue;
    spUserDatasource?: ListValue;
    eventDateAttribute?: ListAttributeValue<Date>;
    capacityDateAttribute?: ListAttributeValue<Date>;
    capacityPercentageAttribute?: ListAttributeValue<Big>;
    isNXTAttribute?: ListAttributeValue<boolean>;
    targetPercentageAttribute?: ListAttributeValue<Big>;
    contextShiftId?: EditableValue<string>;
    contextEngineerId?: EditableValue<string>;
    contextDate?: EditableValue<string>;
    contextSelectedCells?: EditableValue<string>;
    onEditShift?: ActionValue;
    onCreateShift?: ActionValue;
    onDeleteShift?: ActionValue;
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
    engineers: {} | { caption: string } | { type: string } | null;
    shifts: {} | { caption: string } | { type: string } | null;
    teamCapacities: {} | { caption: string } | { type: string } | null;
    startDateAttribute: string;
    endDateAttribute: string;
    nameAttribute: string;
    teamAttribute: string;
    laneAttribute: string;
    showDebugInfo: boolean;
    dayTypeAttribute: string;
    eventTypeAttribute: string;
    statusAttribute: string;
    spUserAssociation: string;
    spUserDatasource: {} | { caption: string } | { type: string } | null;
    eventDateAttribute: string;
    capacityDateAttribute: string;
    capacityPercentageAttribute: string;
    isNXTAttribute: string;
    targetPercentageAttribute: string;
    contextShiftId: string;
    contextEngineerId: string;
    contextDate: string;
    contextSelectedCells: string;
    onEditShift: {} | null;
    onCreateShift: {} | null;
    onDeleteShift: {} | null;
    onBatchCreate: {} | null;
    onBatchEdit: {} | null;
    onBatchDelete: {} | null;
}
