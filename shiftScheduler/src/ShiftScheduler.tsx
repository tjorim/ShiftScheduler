import { ReactElement, createElement } from "react";
import ShiftScheduler from "./components/ShiftSchedulerComponent";
import { ShiftSchedulerContainerProps } from "../typings/ShiftSchedulerProps";
import "./ui/ShiftScheduler.css";

export function ShiftSchedulerWidget({ engineers, onEdit }: ShiftSchedulerContainerProps): ReactElement {
    // TODO: Map actual Mendix ObjectItem data to Engineer interface
    const engineerData: shiftScheduler.Engineer[] = [];

    // Suppress unused variable warning for engineers during development
    console.log("Engineers data source:", engineers);
    const handleEdit = (_mxObject: any) => {
        if (onEdit && onEdit.canExecute) {
            onEdit.execute();
        }
    };

    return <ShiftScheduler engineers={engineerData} onEdit={handleEdit} />;
}
