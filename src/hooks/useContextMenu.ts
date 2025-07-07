import React, { useState, useCallback, useEffect } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Person, EventAssignment } from "../types/shiftScheduler";
import { SelectedCell } from "./useMultiSelect";
import {
    ContextMenuOption,
    createEmptyCellMenu,
    createExistingEventMenu,
    createMultiSelectMenu
} from "../components/ContextMenu";
import { getActionStatus, executeActionWithContext, executeActionWithMultipleContext } from "../utils/actionHelpers";

export interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    options: ContextMenuOption[];
}

export interface UseContextMenuProps {
    selectedCells: SelectedCell[];
    onCreateEvent?: ActionValue;
    onEditEvent?: ActionValue;
    onDeleteEvent?: ActionValue;
    onApproveRequest?: ActionValue;
    onRejectRequest?: ActionValue;
    onMarkAsTBD?: ActionValue;
    onBatchCreate?: ActionValue;
    onBatchEdit?: ActionValue;
    onBatchDelete?: ActionValue;
    contextEventId?: EditableValue<string>;
    contextPersonId?: EditableValue<string>;
    contextDate?: EditableValue<string>;
    contextSelectedCells?: EditableValue<string>;
    clearSelection: () => void;
}

export interface UseContextMenuReturn {
    contextMenu: ContextMenuState;
    handleCellContextMenu: (
        e: React.MouseEvent,
        person: Person,
        date: string,
        event?: EventAssignment,
        eventType?: "active" | "request"
    ) => void;
    closeContextMenu: () => void;
}

/**
 * Custom hook for managing context menu functionality in the schedule grid
 * Handles right-click context menu with different options based on cell state
 */
export const useContextMenu = ({
    selectedCells,
    onCreateEvent,
    onEditEvent,
    onDeleteEvent,
    onApproveRequest,
    onRejectRequest,
    onMarkAsTBD,
    onBatchCreate,
    onBatchEdit,
    onBatchDelete,
    contextEventId,
    contextPersonId,
    contextDate,
    contextSelectedCells,
    clearSelection
}: UseContextMenuProps): UseContextMenuReturn => {
    // Context menu state
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({
        visible: false,
        x: 0,
        y: 0,
        options: []
    });

    // Context menu handlers
    const handleCellContextMenu = useCallback(
        (
            e: React.MouseEvent,
            person: Person,
            date: string,
            event?: EventAssignment,
            eventType?: "active" | "request"
        ) => {
            e.preventDefault();
            e.stopPropagation();

            let options: ContextMenuOption[];

            // Check permissions before showing context menu options
            if (selectedCells.length > 1) {
                // Helper function to create batch action handler
                const createBatchHandler = (action: ActionValue | undefined): (() => boolean) | null => {
                    return getActionStatus(action) === "allowed"
                        ? () => executeActionWithContext(action, contextSelectedCells, JSON.stringify(selectedCells))
                        : null;
                };

                // Multi-selection context menu with simplified action handlers
                options = createMultiSelectMenu(
                    selectedCells.length,
                    createBatchHandler(onBatchCreate),
                    createBatchHandler(onBatchEdit),
                    createBatchHandler(onBatchDelete),
                    clearSelection,
                    getActionStatus(onBatchCreate),
                    getActionStatus(onBatchEdit),
                    getActionStatus(onBatchDelete)
                );
            } else if (event) {
                // Existing event context menu (check edit/delete permissions)
                const editStatus = getActionStatus(onEditEvent);
                const deleteStatus = getActionStatus(onDeleteEvent);

                // Check approval action permissions
                const approveStatus = getActionStatus(onApproveRequest);
                const rejectStatus = getActionStatus(onRejectRequest);
                const tbdStatus = getActionStatus(onMarkAsTBD);

                // Different context menu options based on event type
                const isRequestEvent = eventType === "request" || event.isRequest;

                options = createExistingEventMenu(
                    event,
                    person,
                    editStatus === "allowed"
                        ? event => executeActionWithContext(onEditEvent, contextEventId, event.id)
                        : null,
                    deleteStatus === "allowed"
                        ? event => executeActionWithContext(onDeleteEvent, contextEventId, event.id)
                        : null,
                    editStatus,
                    deleteStatus,
                    isRequestEvent,
                    approveStatus === "allowed"
                        ? event => executeActionWithContext(onApproveRequest, contextEventId, event.id)
                        : null,
                    rejectStatus === "allowed"
                        ? event => executeActionWithContext(onRejectRequest, contextEventId, event.id)
                        : null,
                    tbdStatus === "allowed"
                        ? event => executeActionWithContext(onMarkAsTBD, contextEventId, event.id)
                        : null,
                    approveStatus,
                    rejectStatus,
                    tbdStatus
                );
            } else {
                // Empty cell context menu
                const createStatus = getActionStatus(onCreateEvent);

                options = createEmptyCellMenu(
                    person,
                    date,
                    createStatus === "allowed"
                        ? (personId, date) => {
                              executeActionWithMultipleContext(onCreateEvent, [
                                  { variable: contextPersonId, value: personId },
                                  { variable: contextDate, value: date }
                              ]);
                          }
                        : null,
                    createStatus
                );
            }

            setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                options
            });
        },
        [
            onCreateEvent,
            onEditEvent,
            onDeleteEvent,
            onApproveRequest,
            onRejectRequest,
            onMarkAsTBD,
            contextEventId,
            contextPersonId,
            contextDate,
            contextSelectedCells,
            selectedCells,
            onBatchCreate,
            onBatchEdit,
            onBatchDelete,
            clearSelection
        ]
    );

    const closeContextMenu = useCallback(() => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    }, []);

    // Global click handler to close context menu
    useEffect(() => {
        const handleGlobalClick = (): void => {
            closeContextMenu();
        };

        if (contextMenu.visible) {
            document.addEventListener("click", handleGlobalClick);
        }

        return () => {
            document.removeEventListener("click", handleGlobalClick);
        };
    }, [contextMenu.visible, closeContextMenu]);

    return {
        contextMenu,
        handleCellContextMenu,
        closeContextMenu
    };
};
