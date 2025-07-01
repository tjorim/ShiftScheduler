/**
 * This file was generated from ShiftScheduler.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListReferenceValue, ListReferenceSetValue } from "mendix";
import { Big } from "big.js";

export interface ShiftSchedulerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    engineers: ListValue;
    shifts?: ListValue;
    filters?: ListValue;
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
    filterTeamAssociation?: ListReferenceValue | ListReferenceSetValue;
    teamDatasource?: ListValue;
    filterLaneAssociation?: ListReferenceValue | ListReferenceSetValue;
    laneDatasource?: ListValue;
    teamCapacities?: ListValue;
    capacityDateAttribute?: ListAttributeValue<Date>;
    capacityPercentageAttribute?: ListAttributeValue<Big>;
    isNXTAttribute?: ListAttributeValue<boolean>;
    targetPercentageAttribute?: ListAttributeValue<Big>;
    capacityTeamAssociation?: ListReferenceValue;
    capacityTargetAssociation?: ListReferenceValue;
    capacityTargetDatasource?: ListValue;
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
    filters: {} | { caption: string } | { type: string } | null;
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
    filterTeamAssociation: string;
    teamDatasource: {} | { caption: string } | { type: string } | null;
    filterLaneAssociation: string;
    laneDatasource: {} | { caption: string } | { type: string } | null;
    teamCapacities: {} | { caption: string } | { type: string } | null;
    capacityDateAttribute: string;
    capacityPercentageAttribute: string;
    isNXTAttribute: string;
    targetPercentageAttribute: string;
    capacityTeamAssociation: string;
    capacityTargetAssociation: string;
    capacityTargetDatasource: {} | { caption: string } | { type: string } | null;
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
