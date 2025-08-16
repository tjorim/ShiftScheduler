import { ActionValue, Option } from "mendix";

/**
 * Permission status for Mendix actions
 */
export type ActionStatus = "not-configured" | "allowed" | "no-permission";

/**
 * Union type for all possible action variable parameter structures used in the widget
 */
export type ActionParameters =
    | { eventId: Option<string> }
    | { personId: Option<string>; date: Option<string> }
    | { selectedCellsJson: Option<string> };

/**
 * Determines the permission status of a Mendix action.
 *
 * Returns "not-configured" if the action is undefined, "allowed" if it can be executed, or "no-permission" otherwise.
 *
 * @returns The permission status of the action.
 */
export function getActionStatus(action?: ActionValue<ActionParameters>): ActionStatus {
    if (!action) {
        return "not-configured";
    }
    return action.canExecute === true ? "allowed" : "no-permission";
}
