import React, { useState, useCallback, useEffect } from "react";
import { ActionValue, Option } from "mendix";
import { Person, EventAssignment } from "../types/shiftScheduler";
import { SelectedCell } from "./useMultiSelect";
import {
    ContextMenuOption,
    createEmptyCellMenu,
    createExistingEventMenu,
    createMultiSelectMenu
} from "../components/ContextMenu";
import { getActionStatus, ActionStatus } from "../utils/actionHelpers";

export interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    options: ContextMenuOption[];
}

export interface UseContextMenuProps {
    selectedCells: SelectedCell[];
    onCreateEvent?: ActionValue<{ personId: Option<string>; date: Option<string> }>;
    onEditEvent?: ActionValue<{ eventId: Option<string> }>;
    onDeleteEvent?: ActionValue<{ eventId: Option<string> }>;
    onApproveRequest?: ActionValue<{ eventId: Option<string> }>;
    onRejectRequest?: ActionValue<{ eventId: Option<string> }>;
    onMarkAsTBD?: ActionValue<{ eventId: Option<string> }>;
    onBatchCreate?: ActionValue<{ selectedCellsJson: Option<string> }>;
    onBatchEdit?: ActionValue<{ selectedCellsJson: Option<string> }>;
    onBatchDelete?: ActionValue<{ selectedCellsJson: Option<string> }>;
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
                const createBatchHandler = (
                    action: ActionValue<{ selectedCellsJson: Option<string> }> | undefined,
                    status: ActionStatus
                ): (() => void) | null => {
                    return status === "allowed"
                        ? () => {
                              if (action && !action.isExecuting) {
                                  action.execute({ selectedCellsJson: JSON.stringify(selectedCells) });
                              }
                          }
                        : null;
                };

                // Multi-selection context menu with simplified action handlers
                options = createMultiSelectMenu(
                    selectedCells.length,
                    createBatchHandler(onBatchCreate, getActionStatus(onBatchCreate)),
                    createBatchHandler(onBatchEdit, getActionStatus(onBatchEdit)),
                    createBatchHandler(onBatchDelete, getActionStatus(onBatchDelete)),
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

                // Helper function to create event action handlers with consistent pattern
                const createEventActionHandler = (
                    action: ActionValue<{ eventId: Option<string> }> | undefined,
                    status: ActionStatus
                ): ((event: EventAssignment) => void) | null => {
                    return status === "allowed"
                        ? (event: EventAssignment) => {
                              if (action && !action.isExecuting) {
                                  action.execute({ eventId: event.id });
                              }
                          }
                        : null;
                };

                // Different context menu options based on event type
                const isRequestEvent = eventType === "request" || event.isRequest;

                options = createExistingEventMenu({
                    event,
                    person,
                    isRequestEvent,
                    actions: {
                        onEditEvent: createEventActionHandler(onEditEvent, editStatus),
                        onDeleteEvent: createEventActionHandler(onDeleteEvent, deleteStatus),
                        onApproveRequest: createEventActionHandler(onApproveRequest, approveStatus),
                        onRejectRequest: createEventActionHandler(onRejectRequest, rejectStatus),
                        onMarkAsTBD: createEventActionHandler(onMarkAsTBD, tbdStatus)
                    },
                    permissions: {
                        edit: editStatus,
                        delete: deleteStatus,
                        approve: approveStatus,
                        reject: rejectStatus,
                        tbd: tbdStatus
                    }
                });
            } else {
                // Empty cell context menu
                const createStatus = getActionStatus(onCreateEvent);

                options = createEmptyCellMenu(
                    person,
                    date,
                    createStatus === "allowed"
                        ? (personId, date) => {
                              if (onCreateEvent && !onCreateEvent.isExecuting) {
                                  onCreateEvent.execute({ personId, date });
                              }
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
