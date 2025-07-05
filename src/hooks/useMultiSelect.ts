import React, { useState, useCallback } from "react";
import { Person } from "../types/shiftScheduler";

export interface SelectedCell {
    personId: string;
    date: string;
}

export interface UseMultiSelectReturn {
    selectedCells: SelectedCell[];
    lastSelectedCell: SelectedCell | null;
    selectCell: (personId: string, date: string, ctrlKey: boolean, shiftKey: boolean) => void;
    isCellSelected: (personId: string, date: string) => boolean;
    clearSelection: () => void;
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCell[]>>;
    setLastSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell | null>>;
}

/**
 * Custom hook for managing multi-select functionality in the schedule grid
 * Supports single click, Ctrl+click (toggle), Shift+click (range), and Ctrl+Shift+click (add range)
 */
export const useMultiSelect = (
    allPeople: Person[],
    dateColumns: Array<{ dateString: string }>
): UseMultiSelectReturn => {
    const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
    const [lastSelectedCell, setLastSelectedCell] = useState<SelectedCell | null>(null);

    const isCellSelected = useCallback(
        (personId: string, date: string) => {
            return selectedCells.some(cell => cell.personId === personId && cell.date === date);
        },
        [selectedCells]
    );

    const selectCell = useCallback(
        (personId: string, date: string, ctrlKey: boolean, shiftKey: boolean) => {
            const newCell = { personId, date };

            if (shiftKey && lastSelectedCell) {
                // Shift+click: select range from last selected to current
                const personStart = allPeople.findIndex(e => e.id === lastSelectedCell.personId);
                const personEnd = allPeople.findIndex(e => e.id === personId);
                const dateStart = dateColumns.findIndex(d => d.dateString === lastSelectedCell.date);
                const dateEnd = dateColumns.findIndex(d => d.dateString === date);

                const minPerson = Math.min(personStart, personEnd);
                const maxPerson = Math.max(personStart, personEnd);
                const minDate = Math.min(dateStart, dateEnd);
                const maxDate = Math.max(dateStart, dateEnd);

                const rangeCells: SelectedCell[] = [];
                for (let e = minPerson; e <= maxPerson; e++) {
                    for (let d = minDate; d <= maxDate; d++) {
                        if (allPeople[e] && dateColumns[d]) {
                            rangeCells.push({
                                personId: allPeople[e].id,
                                date: dateColumns[d].dateString
                            });
                        }
                    }
                }

                if (ctrlKey) {
                    // Ctrl+Shift: add range to existing selection
                    setSelectedCells(prev => {
                        const newSelection = [...prev];
                        rangeCells.forEach(cell => {
                            if (
                                !newSelection.some(
                                    existing => existing.personId === cell.personId && existing.date === cell.date
                                )
                            ) {
                                newSelection.push(cell);
                            }
                        });
                        return newSelection;
                    });
                } else {
                    // Shift only: replace selection with range
                    setSelectedCells(rangeCells);
                }
            } else if (ctrlKey) {
                // Ctrl+click: toggle single cell
                setSelectedCells(prev => {
                    const isSelected = prev.some(cell => cell.personId === personId && cell.date === date);
                    if (isSelected) {
                        return prev.filter(cell => !(cell.personId === personId && cell.date === date));
                    } else {
                        return [...prev, newCell];
                    }
                });
                setLastSelectedCell(newCell);
            } else {
                // Regular click: select single cell
                setSelectedCells([newCell]);
                setLastSelectedCell(newCell);
            }
        },
        [lastSelectedCell, allPeople, dateColumns]
    );

    const clearSelection = useCallback(() => {
        setSelectedCells([]);
        setLastSelectedCell(null);
    }, []);

    return {
        selectedCells,
        lastSelectedCell,
        selectCell,
        isCellSelected,
        clearSelection,
        setSelectedCells,
        setLastSelectedCell
    };
};
