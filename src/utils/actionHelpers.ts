import { ActionValue, EditableValue } from "mendix";

/**
 * Permission status for Mendix actions
 */
export type ActionStatus = "not-configured" | "allowed" | "no-permission";

/**
 * Context variable setter for passing data to microflows
 */
export interface ContextSetter {
    setValue?: (value: string) => void;
    value: string;
}

/**
 * Gets the permission status of a Mendix action
 */
export function getActionStatus(action?: ActionValue): ActionStatus {
    if (!action) {
        return "not-configured";
    }
    return action.canExecute === true ? "allowed" : "no-permission";
}

/**
 * Executes a Mendix action with context variables if permissions allow
 *
 * @param action - The Mendix ActionValue to execute
 * @param contextSetters - Object mapping context variable names to their values
 * @returns true if action was executed, false otherwise
 */
export function executeAction(
    action: ActionValue | undefined,
    contextSetters: Record<string, ContextSetter> = {}
): boolean {
    const status = getActionStatus(action);

    if (status === "allowed" && action && !action.isExecuting) {
        // Set all context variables before executing
        Object.entries(contextSetters).forEach(([, { setValue, value }]) => {
            if (setValue && value) {
                setValue(value);
            }
        });

        action.execute();
        return true;
    }

    return false;
}

/**
 * Simplified action execution for common single-context scenarios
 */
export function executeActionWithContext(
    action: ActionValue | undefined,
    contextVariable: EditableValue<string> | undefined,
    contextValue: string
): boolean {
    return executeAction(action, {
        context: { setValue: contextVariable?.setValue, value: contextValue }
    });
}

/**
 * Executes an action with multiple context variables
 */
export function executeActionWithMultipleContext(
    action: ActionValue | undefined,
    contexts: Array<{ variable: EditableValue<string> | undefined; value: string }>
): boolean {
    const contextSetters: Record<string, ContextSetter> = {};

    contexts.forEach((context, index) => {
        contextSetters[`context${index}`] = {
            setValue: context.variable?.setValue,
            value: context.value
        };
    });

    return executeAction(action, contextSetters);
}
