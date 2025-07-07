import React, { createElement, useEffect, useRef } from "react";
import { Person, EventAssignment } from "../types/shiftScheduler";

export interface ContextMenuOption {
    label: string;
    icon?: string;
    action: () => void;
    disabled?: boolean;
    separator?: boolean;
}

export interface ContextMenuProps {
    x: number;
    y: number;
    options: ContextMenuOption[];
    onClose: () => void;
    visible: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, options, onClose, visible }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [visible, onClose]);

    if (!visible) {
        return null;
    }

    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{
                position: "fixed",
                left: x,
                top: y,
                zIndex: 1000
            }}
            onClick={e => e.stopPropagation()}
        >
            {options.map((option, index) =>
                option.separator ? (
                    <div key={index} className="context-menu-separator" />
                ) : (
                    <div
                        key={index}
                        className={`context-menu-item ${option.disabled ? "disabled" : ""}`}
                        onClick={() => {
                            if (!option.disabled) {
                                option.action();
                                onClose();
                            }
                        }}
                    >
                        {option.icon && <span className="context-menu-icon">{option.icon}</span>}
                        <span className="context-menu-label">{option.label}</span>
                    </div>
                )
            )}
        </div>
    );
};

// Context menu factory functions
export const createEmptyCellMenu = (
    person: Person,
    date: string,
    onCreateEvent: ((personId: string, date: string) => void) | null,
    createPermissionStatus?: "allowed" | "no-permission" | "not-configured"
): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [
        {
            label: `${person.name} - ${date}`,
            icon: "📅",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        },
        {
            label: "Empty Cell",
            icon: "⬜",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        }
    ];

    const hasAnyActions = onCreateEvent || createPermissionStatus;

    if (hasAnyActions) {
        options.push({ separator: true } as ContextMenuOption);

        // Create action
        if (createPermissionStatus === "not-configured") {
            // Don't show create option at all
        } else if (createPermissionStatus === "no-permission") {
            options.push({
                label: "Create Event (No Permission)",
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (onCreateEvent) {
            options.push({
                label: `Create event for ${person.name}`,
                icon: "➕",
                action: () => onCreateEvent(person.id, date)
            });
        }
    } else {
        options.push({ separator: true } as ContextMenuOption, {
            label: "No create action configured",
            icon: "❌",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        });
    }

    return options;
};

interface EventMenuConfig {
    event: EventAssignment;
    person: Person;
    isRequestEvent?: boolean;
    actions: {
        onEditEvent?: ((event: EventAssignment) => void) | null;
        onDeleteEvent?: ((event: EventAssignment) => void) | null;
        onApproveRequest?: ((event: EventAssignment) => void) | null;
        onRejectRequest?: ((event: EventAssignment) => void) | null;
        onMarkAsTBD?: ((event: EventAssignment) => void) | null;
    };
    permissions: {
        edit?: "allowed" | "no-permission" | "not-configured";
        delete?: "allowed" | "no-permission" | "not-configured";
        approve?: "allowed" | "no-permission" | "not-configured";
        reject?: "allowed" | "no-permission" | "not-configured";
        tbd?: "allowed" | "no-permission" | "not-configured";
    };
}

export const createExistingEventMenu = (config: EventMenuConfig): ContextMenuOption[] => {
    const { event, person, isRequestEvent, actions, permissions } = config;

    const options: ContextMenuOption[] = [
        {
            label: `${person.name} - ${event.date}`,
            icon: "📅",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        },
        {
            label: `${event.shift} ${isRequestEvent ? "Request" : "Event"}`,
            icon: getShiftIcon(event.shift),
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        }
    ];

    const hasAnyActions =
        actions.onEditEvent ||
        actions.onDeleteEvent ||
        permissions.edit ||
        permissions.delete ||
        actions.onApproveRequest ||
        actions.onRejectRequest ||
        actions.onMarkAsTBD ||
        permissions.approve ||
        permissions.reject ||
        permissions.tbd;

    if (hasAnyActions) {
        options.push({ separator: true } as ContextMenuOption);

        // For request events (pending/TBD), show approval workflow actions first
        if (isRequestEvent && (event.status === "pending" || event.status === "tbd")) {
            // Approve action
            if (permissions.approve === "not-configured") {
                // Don't show approve option at all
            } else if (permissions.approve === "no-permission") {
                options.push({
                    label: "Approve Request (No Permission)",
                    icon: "🔒",
                    action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                    disabled: true
                });
            } else if (actions.onApproveRequest) {
                options.push({
                    label: "Approve Request",
                    icon: "✅",
                    action: () => actions.onApproveRequest!(event)
                });
            }

            // Reject action
            if (permissions.reject === "not-configured") {
                // Don't show reject option at all
            } else if (permissions.reject === "no-permission") {
                options.push({
                    label: "Reject Request (No Permission)",
                    icon: "🔒",
                    action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                    disabled: true
                });
            } else if (actions.onRejectRequest) {
                options.push({
                    label: "Reject Request",
                    icon: "❌",
                    action: () => actions.onRejectRequest!(event)
                });
            }

            // Mark as TBD action
            if (permissions.tbd === "not-configured") {
                // Don't show TBD option at all
            } else if (permissions.tbd === "no-permission") {
                options.push({
                    label: event.status === "tbd" ? "Update TBD (No Permission)" : "Mark as TBD (No Permission)",
                    icon: "🔒",
                    action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                    disabled: true
                });
            } else if (actions.onMarkAsTBD) {
                options.push({
                    label: event.status === "tbd" ? "Update TBD" : "Mark as TBD",
                    icon: "📝",
                    action: () => actions.onMarkAsTBD!(event)
                });
            }

            // Add separator before edit/delete if they exist
            if (
                (permissions.edit && permissions.edit !== "not-configured") ||
                (permissions.delete && permissions.delete !== "not-configured")
            ) {
                options.push({ separator: true } as ContextMenuOption);
            }
        }

        // Edit action
        if (permissions.edit === "not-configured") {
            // Don't show edit option at all
        } else if (permissions.edit === "no-permission") {
            options.push({
                label: `Edit ${isRequestEvent ? "Request" : "Event"} (No Permission)`,
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (actions.onEditEvent) {
            options.push({
                label: `Edit ${isRequestEvent ? "Request" : "Event"}`,
                icon: "✏️",
                action: () => actions.onEditEvent!(event)
            });
        }

        // Delete action
        if (permissions.delete === "not-configured") {
            // Don't show delete option at all
        } else if (permissions.delete === "no-permission") {
            options.push({
                label: `Delete ${isRequestEvent ? "Request" : "Event"} (No Permission)`,
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (actions.onDeleteEvent) {
            options.push({
                label: `Delete ${isRequestEvent ? "Request" : "Event"}`,
                icon: isRequestEvent ? "❌" : "🗑️",
                action: () => actions.onDeleteEvent!(event)
            });
        }
    } else {
        options.push({ separator: true } as ContextMenuOption, {
            label: "No shift operations configured",
            icon: "🔒",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        });
    }

    return options;
};

export const createMultiSelectMenu = (
    selectedCount: number,
    onBatchCreate: (() => void) | null,
    onBatchEdit: (() => void) | null,
    onBatchDelete: (() => void) | null,
    onClearSelection: () => void,
    batchCreatePermissionStatus?: "allowed" | "no-permission" | "not-configured",
    batchEditPermissionStatus?: "allowed" | "no-permission" | "not-configured",
    batchDeletePermissionStatus?: "allowed" | "no-permission" | "not-configured"
): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [
        {
            label: `${selectedCount} cells selected`,
            icon: "📊",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        }
    ];

    const hasAnyBatchActions =
        batchCreatePermissionStatus ||
        batchEditPermissionStatus ||
        batchDeletePermissionStatus ||
        onBatchCreate ||
        onBatchEdit ||
        onBatchDelete;

    if (hasAnyBatchActions) {
        options.push({ separator: true } as ContextMenuOption);

        // Batch Create action
        if (batchCreatePermissionStatus === "not-configured") {
            // Don't show create option at all
        } else if (batchCreatePermissionStatus === "no-permission") {
            options.push({
                label: "Batch Create (No Permission)",
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (onBatchCreate) {
            options.push({
                label: "Batch Create",
                icon: "➕",
                action: onBatchCreate
            });
        }

        // Batch Edit action
        if (batchEditPermissionStatus === "not-configured") {
            // Don't show edit option at all
        } else if (batchEditPermissionStatus === "no-permission") {
            options.push({
                label: "Batch Edit (No Permission)",
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (onBatchEdit) {
            options.push({
                label: "Batch Edit",
                icon: "✏️",
                action: onBatchEdit
            });
        }

        // Batch Delete action
        if (batchDeletePermissionStatus === "not-configured") {
            // Don't show delete option at all
        } else if (batchDeletePermissionStatus === "no-permission") {
            options.push({
                label: "Batch Delete (No Permission)",
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (onBatchDelete) {
            options.push({
                label: "Batch Delete",
                icon: "🗑️",
                action: onBatchDelete
            });
        }
    } else {
        options.push({ separator: true } as ContextMenuOption, {
            label: "No batch operations configured",
            icon: "🔒",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        });
    }

    options.push({ separator: true } as ContextMenuOption, {
        label: "Clear Selection",
        icon: "❌",
        action: onClearSelection
    });

    return options;
};

function getShiftIcon(shiftType: string): string {
    switch (shiftType) {
        case "M":
            return "🌅";
        case "E":
            return "🌆";
        case "N":
            return "🌙";
        case "D":
            return "🏠";
        case "H":
            return "🏖️";
        case "T":
            return "📚";
        default:
            return "⏰";
    }
}
