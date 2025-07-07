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
 * Determines the permission status of a Mendix action.
 *
 * Returns "not-configured" if the action is undefined, "allowed" if it can be executed, or "no-permission" otherwise.
 *
 * @returns The permission status of the action.
 */
export function getActionStatus(action?: ActionValue): ActionStatus {
    if (!action) {
        return "not-configured";
    }
    return action.canExecute === true ? "allowed" : "no-permission";
}

/**
 * Executes a Mendix action if it is allowed and not currently executing, setting all provided context variables beforehand.
 *
 * @param action - The Mendix action to execute
 * @param contextSetters - Context variable setters to apply before execution
 * @returns True if the action was executed; false otherwise
 */
export function executeAction(
    action: ActionValue | undefined,
    contextSetters: Record<string, ContextSetter> | ContextSetter[] = {}
): boolean {
    const status = getActionStatus(action);

    if (status === "allowed" && action && !action.isExecuting) {
        // Set all context variables before executing
        const setters = Array.isArray(contextSetters) ? contextSetters : Object.values(contextSetters);
        setters.forEach(({ setValue, value }) => {
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
 * Executes a Mendix action with a single context variable.
 *
 * Sets the provided context variable to the specified value before executing the action. Returns `true` if the action was executed, or `false` if execution was not permitted or possible.
 *
 * @param contextVariable - The context variable to set before execution
 * @param contextValue - The value to assign to the context variable
 * @returns Whether the action was executed
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
 * Executes a Mendix action with multiple context variables.
 *
 * Maps each provided context variable and value to a context setter, sets their values, and executes the action if permitted.
 *
 * @param contexts - An array of objects each containing a context variable and its corresponding value to set before execution
 * @returns `true` if the action was executed; `false` otherwise
 */
export function executeActionWithMultipleContext(
    action: ActionValue | undefined,
    contexts: Array<{ variable: EditableValue<string> | undefined; value: string }>
): boolean {
    const contextSetters: ContextSetter[] = contexts.map(context => ({
        setValue: context.variable?.setValue,
        value: context.value
    }));

    return executeAction(action, contextSetters);
}
