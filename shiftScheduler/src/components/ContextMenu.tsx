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
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
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
    onCreateShift: (engineerId: string, date: string, shiftType: string) => void
): ContextMenuOption[] => [
        {
            label: `Create shift for ${engineer.name}`,
            icon: "👤",
            action: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true,
            separator: false
        },
        { separator: true } as ContextMenuOption,
        {
            label: "Morning Shift (M)",
            icon: "🌅",
            action: () => onCreateShift(engineer.id, date, "M")
        },
        {
            label: "Evening Shift (E)",
            icon: "🌆",
            action: () => onCreateShift(engineer.id, date, "E")
        },
        {
            label: "Night Shift (N)",
            icon: "🌙",
            action: () => onCreateShift(engineer.id, date, "N")
        },
        {
            label: "Day Off (D)",
            icon: "🏠",
            action: () => onCreateShift(engineer.id, date, "D")
        },
        {
            label: "Holiday (H)",
            icon: "🏖️",
            action: () => onCreateShift(engineer.id, date, "H")
        },
        {
            label: "Training (T)",
            icon: "📚",
            action: () => onCreateShift(engineer.id, date, "T")
        }
    ];

export const createExistingShiftMenu = (
    shift: ShiftAssignment,
    engineer: Engineer,
    onEditShift: (shift: ShiftAssignment) => void,
    onCopyShift: (shift: ShiftAssignment) => void,
    onDeleteShift: (shift: ShiftAssignment) => void
): ContextMenuOption[] => [
        {
            label: `${engineer.name} - ${shift.date}`,
            icon: "📅",
            action: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        },
        {
            label: `${shift.shift} Shift`,
            icon: getShiftIcon(shift.shift),
            action: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        },
        { separator: true } as ContextMenuOption,
        {
            label: "Edit Shift",
            icon: "✏️",
            action: () => onEditShift(shift)
        },
        {
            label: "Copy Shift",
            icon: "📋",
            action: () => onCopyShift(shift)
        },
        { separator: true } as ContextMenuOption,
        {
            label: "Delete Shift",
            icon: "🗑️",
            action: () => onDeleteShift(shift)
        }
    ];

export const createMultiSelectMenu = (
    selectedCount: number,
    onBatchEdit: () => void,
    onBatchCopy: () => void,
    onBatchDelete: () => void,
    onClearSelection: () => void
): ContextMenuOption[] => [
        {
            label: `${selectedCount} cells selected`,
            icon: "📊",
            action: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
            disabled: true
        },
        { separator: true } as ContextMenuOption,
        {
            label: "Batch Edit",
            icon: "✏️",
            action: onBatchEdit
        },
        {
            label: "Batch Copy",
            icon: "📋",
            action: onBatchCopy
        },
        { separator: true } as ContextMenuOption,
        {
            label: "Batch Delete",
            icon: "🗑️",
            action: onBatchDelete
        },
        { separator: true } as ContextMenuOption,
        {
            label: "Clear Selection",
            icon: "❌",
            action: onClearSelection
        }
    ];

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
