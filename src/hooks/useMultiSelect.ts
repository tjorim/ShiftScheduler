import { useState, useCallback } from "react";
import { Person } from "../types/shiftScheduler";

export interface SelectedCell {
    personId: string;
    date: string;
}

/**
 * Helper function to generate range cells for selection
 */
const generateRangeCells = (
    startPerson: number,
    endPerson: number,
    startDate: number,
    endDate: number,
    allPeople: Person[],
    dateColumns: Array<{ dateString: string }>
): SelectedCell[] => {
    const rangeCells: SelectedCell[] = [];
    const minPerson = Math.min(startPerson, endPerson);
    const maxPerson = Math.max(startPerson, endPerson);
    const minDate = Math.min(startDate, endDate);
    const maxDate = Math.max(startDate, endDate);

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
    return rangeCells;
};

/**
 * Helper function to update selection maintaining synchronization between array and set
 */
const updateSelection = (
    cells: SelectedCell[],
    setSelectedCells: (cells: SelectedCell[]) => void,
    setSelectedCellsSet: (set: Set<string>) => void
): void => {
    setSelectedCells(cells);
    setSelectedCellsSet(new Set(cells.map(cell => `${cell.personId}-${cell.date}`)));
};

export interface UseMultiSelectReturn {
    selectedCells: SelectedCell[];
    lastSelectedCell: SelectedCell | null;
    selectCell: (personId: string, date: string, ctrlKey: boolean, shiftKey: boolean) => void;
    isCellSelected: (personId: string, date: string) => boolean;
    clearSelection: () => void;
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
    const [selectedCellsSet, setSelectedCellsSet] = useState<Set<string>>(new Set());
    const [lastSelectedCell, setLastSelectedCell] = useState<SelectedCell | null>(null);

    const isCellSelected = useCallback(
        (personId: string, date: string) => {
            return selectedCellsSet.has(`${personId}-${date}`);
        },
        [selectedCellsSet]
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

                const rangeCells = generateRangeCells(
                    personStart,
                    personEnd,
                    dateStart,
                    dateEnd,
                    allPeople,
                    dateColumns
                );

                if (ctrlKey) {
                    // Ctrl+Shift: add range to existing selection
                    setSelectedCells(prev => {
                        const newSelection = [...prev];
                        rangeCells.forEach(cell => {
                            const cellKey = `${cell.personId}-${cell.date}`;
                            if (!selectedCellsSet.has(cellKey)) {
                                newSelection.push(cell);
                            }
                        });
                        return newSelection;
                    });
                    setSelectedCellsSet(prev => {
                        const newSet = new Set(prev);
                        rangeCells.forEach(cell => {
                            newSet.add(`${cell.personId}-${cell.date}`);
                        });
                        return newSet;
                    });
                } else {
                    // Shift only: replace selection with range
                    updateSelection(rangeCells, setSelectedCells, setSelectedCellsSet);
                }
            } else if (ctrlKey) {
                // Ctrl+click: toggle single cell
                const cellKey = `${personId}-${date}`;
                const isSelected = selectedCellsSet.has(cellKey);

                if (isSelected) {
                    const filtered = selectedCells.filter(cell => !(cell.personId === personId && cell.date === date));
                    updateSelection(filtered, setSelectedCells, setSelectedCellsSet);
                } else {
                    const updated = [...selectedCells, newCell];
                    updateSelection(updated, setSelectedCells, setSelectedCellsSet);
                }
                setLastSelectedCell(newCell);
            } else {
                // Regular click: select single cell
                updateSelection([newCell], setSelectedCells, setSelectedCellsSet);
                setLastSelectedCell(newCell);
            }
        },
        [lastSelectedCell, allPeople, dateColumns, selectedCellsSet, selectedCells]
    );

    const clearSelection = useCallback(() => {
        updateSelection([], setSelectedCells, setSelectedCellsSet);
        setLastSelectedCell(null);
    }, []);

    return {
        selectedCells,
        lastSelectedCell,
        selectCell,
        isCellSelected,
        clearSelection
    };
};
