/**
 * This file was generated from ShiftScheduler.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue, ListReferenceValue } from "mendix";

export interface ShiftSchedulerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    engineers: ListValue;
    shifts?: ListValue;
    nameAttribute?: ListAttributeValue<string>;
    headerAttribute?: ListAttributeValue<string>;
    subheaderAttribute?: ListAttributeValue<string>;
    showDebugInfo: boolean;
    startTimeAttribute?: ListAttributeValue<Date>;
    endTimeAttribute?: ListAttributeValue<Date>;
    dayTypeAttribute?: ListAttributeValue<string>;
    eventTypeAttribute?: ListAttributeValue<string>;
    statusAttribute?: ListAttributeValue<string>;
    spUserAssociation?: ListReferenceValue;
    spUserDatasource?: ListValue;
    shiftAssociation?: ListReferenceValue;
    shiftDatasource?: ListValue;
    shiftDateAttribute?: ListAttributeValue<Date>;
    onEdit?: ActionValue;
    onCellClick?: ActionValue;
    onCreateShift?: ActionValue;
    onEditShift?: ActionValue;
    onDeleteShift?: ActionValue;
    onCopyShift?: ActionValue;
    onBatchEdit?: ActionValue;
    onBatchCopy?: ActionValue;
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
    nameAttribute: string;
    headerAttribute: string;
    subheaderAttribute: string;
    showDebugInfo: boolean;
    startTimeAttribute: string;
    endTimeAttribute: string;
    dayTypeAttribute: string;
    eventTypeAttribute: string;
    statusAttribute: string;
    spUserAssociation: string;
    spUserDatasource: {} | { caption: string } | { type: string } | null;
    shiftAssociation: string;
    shiftDatasource: {} | { caption: string } | { type: string } | null;
    shiftDateAttribute: string;
    onEdit: {} | null;
    onCellClick: {} | null;
    onCreateShift: {} | null;
    onEditShift: {} | null;
    onDeleteShift: {} | null;
    onCopyShift: {} | null;
    onBatchEdit: {} | null;
    onBatchCopy: {} | null;
    onBatchDelete: {} | null;
}
