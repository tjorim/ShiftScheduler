import React, { createElement, useEffect, useRef } from "react";
import { Engineer, ShiftAssignment } from "../types/shiftScheduler";

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
    engineer: Engineer,
    date: string,
    onCreateShift: ((engineerId: string, date: string) => void) | null,
    createPermissionStatus?: "allowed" | "no-permission" | "not-configured"
): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [
        {
            label: `${engineer.name} - ${date}`,
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

    const hasAnyActions = onCreateShift || createPermissionStatus;

    if (hasAnyActions) {
        options.push({ separator: true } as ContextMenuOption);

        // Create action
        if (createPermissionStatus === "not-configured") {
            // Don't show create option at all
        } else if (createPermissionStatus === "no-permission") {
            options.push({
                label: "Create Shift (No Permission)",
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (onCreateShift) {
            options.push({
                label: `Create shift for ${engineer.name}`,
                icon: "➕",
                action: () => onCreateShift(engineer.id, date)
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

export const createExistingShiftMenu = (
    shift: ShiftAssignment,
    engineer: Engineer,
    onEditShift: ((shift: ShiftAssignment) => void) | null,
    onDeleteShift: ((shift: ShiftAssignment) => void) | null,
    editPermissionStatus?: "allowed" | "no-permission" | "not-configured",
    deletePermissionStatus?: "allowed" | "no-permission" | "not-configured"
): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [
        {
            label: `${engineer.name} - ${shift.date}`,
            icon: "📅",
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        },
        {
            label: `${shift.shift} Shift`,
            icon: getShiftIcon(shift.shift),
            action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        }
    ];

    const hasAnyActions = onEditShift || onDeleteShift || editPermissionStatus || deletePermissionStatus;

    if (hasAnyActions) {
        options.push({ separator: true } as ContextMenuOption);

        // Edit action
        if (editPermissionStatus === "not-configured") {
            // Don't show edit option at all
        } else if (editPermissionStatus === "no-permission") {
            options.push({
                label: "Edit Shift (No Permission)",
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (onEditShift) {
            options.push({
                label: "Edit Shift",
                icon: "✏️",
                action: () => onEditShift(shift)
            });
        }

        // Delete action
        if (deletePermissionStatus === "not-configured") {
            // Don't show delete option at all
        } else if (deletePermissionStatus === "no-permission") {
            options.push({
                label: "Delete Shift (No Permission)",
                icon: "🔒",
                action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
                disabled: true
            });
        } else if (onDeleteShift) {
            options.push({
                label: "Delete Shift",
                icon: "🗑️",
                action: () => onDeleteShift(shift)
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
