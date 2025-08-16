import { useEffect } from "react";
import { ActionValue, Option } from "mendix";
import { Person, EventAssignment } from "../types/shiftScheduler";
import { SelectedCell } from "./useMultiSelect";

export interface UseKeyboardNavigationProps {
    selectedCells: SelectedCell[];
    lastSelectedCell: SelectedCell | null;
    allPeople: Person[];
    dateColumns: Array<{ dateString: string }>;
    getEvent: (personId: string, dateString: string) => EventAssignment | undefined;
    onEditEvent?: ActionValue<{ eventId: Option<string> }>;
    selectCell: (personId: string, date: string, ctrlKey: boolean, shiftKey: boolean) => void;
    clearSelection: () => void;
}

/**
 * Custom hook for keyboard navigation in the schedule grid
 * Handles arrow keys, enter, escape, and space key interactions
 */
export const useKeyboardNavigation = ({
    selectedCells,
    lastSelectedCell,
    allPeople,
    dateColumns,
    getEvent,
    onEditEvent,
    selectCell,
    clearSelection
}: UseKeyboardNavigationProps): void => {
    // Keyboard navigation with multi-select support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (selectedCells.length === 0 || allPeople.length === 0 || dateColumns.length === 0) {
                return;
            }

            // Use the last selected cell for navigation
            const currentCell = lastSelectedCell || selectedCells[selectedCells.length - 1];
            const currentPersonIndex = allPeople.findIndex(person => person.id === currentCell.personId);
            const currentDateIndex = dateColumns.findIndex(col => col.dateString === currentCell.date);

            if (currentPersonIndex === -1 || currentDateIndex === -1) {
                return;
            }

            let newPersonIndex = currentPersonIndex;
            let newDateIndex = currentDateIndex;

            switch (e.key) {
                case "ArrowUp":
                    newPersonIndex = Math.max(0, currentPersonIndex - 1);
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    newPersonIndex = Math.min(allPeople.length - 1, currentPersonIndex + 1);
                    e.preventDefault();
                    break;
                case "ArrowLeft":
                    newDateIndex = Math.max(0, currentDateIndex - 1);
                    e.preventDefault();
                    break;
                case "ArrowRight":
                    newDateIndex = Math.min(dateColumns.length - 1, currentDateIndex + 1);
                    e.preventDefault();
                    break;
                case "Enter":
                case " ":
                    if (selectedCells.length === 1) {
                        // Single selection: edit the selected cell
                        try {
                            const event = getEvent(currentCell.personId, currentCell.date);
                            if (onEditEvent && event && onEditEvent.canExecute && !onEditEvent.isExecuting) {
                                onEditEvent.execute({ eventId: event.id });
                            }
                        } catch (error) {
                            // Silently handle keyboard edit errors
                        }
                    }
                    // Multi-selection: Enter/Space performs no action (users should use right-click for batch operations)
                    e.preventDefault();
                    break;
                case "Escape":
                    clearSelection();
                    e.preventDefault();
                    break;
                default:
                    return;
            }

            if (newPersonIndex !== currentPersonIndex || newDateIndex !== currentDateIndex) {
                selectCell(
                    allPeople[newPersonIndex].id,
                    dateColumns[newDateIndex].dateString,
                    e.ctrlKey || e.metaKey,
                    e.shiftKey
                );
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedCells, lastSelectedCell, allPeople, dateColumns, getEvent, onEditEvent, selectCell, clearSelection]);
};
