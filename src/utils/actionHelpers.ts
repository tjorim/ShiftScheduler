import { ActionValue } from "mendix";

/**
 * Permission status for Mendix actions
 */
export type ActionStatus = "not-configured" | "allowed" | "no-permission";

/**
 * Determines the permission status of a Mendix action.
 *
 * Returns "not-configured" if the action is undefined, "allowed" if it can be executed, or "no-permission" otherwise.
 *
 * @returns The permission status of the action.
 */
export function getActionStatus(action?: ActionValue<any>): ActionStatus {
    if (!action) {
        return "not-configured";
    }
    return action.canExecute === true ? "allowed" : "no-permission";
}
