/**
 * This file was generated from ModernScheduleBoard.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface ModernScheduleBoardContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSource: ListValue;
    resourcesSource: ListValue;
    startDateAttribute: ListAttributeValue<Date>;
    endDateAttribute: ListAttributeValue<Date>;
    titleAttribute: ListAttributeValue<string>;
    resourceIdAttribute: ListAttributeValue<string | Big>;
    enableDragDrop: boolean;
    enableResize: boolean;
    enableMultiSelect: boolean;
    onItemClick?: ActionValue;
    onItemMove?: ActionValue;
    onItemResize?: ActionValue;
}

export interface ModernScheduleBoardPreviewProps {
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
    dataSource: {} | { caption: string } | { type: string } | null;
    resourcesSource: {} | { caption: string } | { type: string } | null;
    startDateAttribute: string;
    endDateAttribute: string;
    titleAttribute: string;
    resourceIdAttribute: string;
    enableDragDrop: boolean;
    enableResize: boolean;
    enableMultiSelect: boolean;
    onItemClick: {} | null;
    onItemMove: {} | null;
    onItemResize: {} | null;
}
