import { ReactElement, createElement } from "react";
import { ShiftSchedulerPreviewProps } from "../typings/ShiftSchedulerProps";

export function preview(_props: ShiftSchedulerPreviewProps): ReactElement {
    return <div>Shift Scheduler Widget Preview</div>;
}

export function getPreviewCss(): string {
    return require("./ui/ShiftScheduler.css");
}
