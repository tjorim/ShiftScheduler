import React, { createElement, useEffect, useState, useMemo, useRef, useCallback } from "react";
import { addDays, getDurationInMinutes, formatDateForShift } from "../utils/dateHelpers";
import { useInView } from "react-intersection-observer";
import DayCell from "./DayCell";
import { Engineer, ShiftAssignment } from "../types";

interface ShiftSchedulerComponentProps {
    engineers: Engineer[];
    shifts: ShiftAssignment[];
    getShiftsForEngineer: (engineerId: string) => ShiftAssignment[];
    getEngineersByTeam: () => { [team: string]: Engineer[] };
    onEdit: (mxObject: any) => void;
    onCellClick: (engineerId: string, date: string) => void;
    readOnly?: boolean;
    className?: string;
    debugInfo?: {
        attributesConfigured: {
            name: boolean;
            team: boolean;
            email: boolean;
            spUserAssociation: boolean;
        };
    };
}

const ShiftScheduler: React.FC<ShiftSchedulerComponentProps> = ({
    engineers: _engineers,
    shifts,
    getShiftsForEngineer: _getShiftsForEngineer,
    getEngineersByTeam,
    onEdit,
    onCellClick,
    readOnly = false,
    className = "",
    debugInfo
}) => {
    // Calculate date range from actual shift data
    const dateRange = useMemo(() => {
        if (shifts.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }
        
        const shiftDates = shifts.map(shift => new Date(shift.date)).filter(date => !isNaN(date.getTime()));
        if (shiftDates.length === 0) {
            return {
                start: new Date(),
                end: addDays(new Date(), 30)
            };
        }
        
        const earliestDate = new Date(Math.min(...shiftDates.map(d => d.getTime())));
        const latestDate = new Date(Math.max(...shiftDates.map(d => d.getTime())));
        
        return {
            start: earliestDate,
            end: latestDate
        };
    }, [shifts]);

    const [startDate] = useState(dateRange.start);
    const [endDate, setEndDate] = useState(dateRange.end);
    const [selectedCell, setSelectedCell] = useState<{ engineerId: string; date: string } | null>(null);

    // Refs for scroll synchronization
    const headerScrollRef = useRef<HTMLDivElement>(null);
    const contentScrollRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    const { ref, inView } = useInView({ rootMargin: "0px", threshold: 1 });
    useEffect(() => {
        if (inView) {
            setEndDate(d => addDays(d, 15));
        }
    }, [inView]);

    // Scroll synchronization between header and content
    const syncScroll = useCallback((source: HTMLDivElement, target: HTMLDivElement) => {
        if (isScrolling.current) return;
        isScrolling.current = true;
        target.scrollLeft = source.scrollLeft;
        setTimeout(() => {
            isScrolling.current = false;
        }, 10);
    }, []);

    useEffect(() => {
        const headerEl = headerScrollRef.current;
        const contentEl = contentScrollRef.current;
        
        if (!headerEl || !contentEl) return;

        const handleHeaderScroll = () => syncScroll(headerEl, contentEl);
        const handleContentScroll = () => syncScroll(contentEl, headerEl);

        headerEl.addEventListener('scroll', handleHeaderScroll, { passive: true });
        contentEl.addEventListener('scroll', handleContentScroll, { passive: true });

        return () => {
            headerEl.removeEventListener('scroll', handleHeaderScroll);
            contentEl.removeEventListener('scroll', handleContentScroll);
        };
    }, [syncScroll]);

    // Memoize teams data for performance
    const teamsData = useMemo(() => {
        try {
            return getEngineersByTeam();
        } catch (error) {
            console.warn("Error getting engineers by team:", error);
            return {};
        }
    }, [getEngineersByTeam]);

    // Group engineers by Team → Lane → Engineers (data-driven)
    const { teamLaneStructure, allEngineers } = useMemo(() => {
        // Force console output
        window.console?.log("🔍 SHIFT SCHEDULER DEBUG - Processing teams data:", Object.keys(teamsData).length, "teams");
        
        const structure = Object.entries(teamsData).map(([teamName, engineers]) => {
            window.console?.log(`🔍 Team ${teamName}:`, engineers.length, "engineers");
            
            // Group engineers by their primary lane
            const laneGroups: { [lane: string]: Engineer[] } = {};
            
            engineers.forEach((engineer, index) => {
                // Use first lane as primary, default to 'General' if no lanes specified
                const primaryLane = engineer.lanes && engineer.lanes.length > 0 ? engineer.lanes[0] : 'General';
                
                if (!laneGroups[primaryLane]) {
                    laneGroups[primaryLane] = [];
                }
                laneGroups[primaryLane].push(engineer);
                
                // Debug first few engineers
                if (index < 2) {
                    window.console?.log(`🔍 Engineer ${index}:`, {
                        id: engineer.id,
                        name: engineer.name,
                        lanes: engineer.lanes,
                        primaryLane: primaryLane
                    });
                }
            });
            
            // Sort lanes alphabetically (data-driven, no hardcoded order)
            const sortedLanes = Object.keys(laneGroups).sort();
            
            return {
                teamName,
                teamId: teamName.toLowerCase().replace(/\s+/g, '-'),
                lanes: sortedLanes.map(lane => ({
                    name: lane,
                    engineers: laneGroups[lane]
                }))
            };
        });
        
        const flatEngineers: Engineer[] = structure.flatMap(team => 
            team.lanes.flatMap(lane => lane.engineers)
        );
        
        return { teamLaneStructure: structure, allEngineers: flatEngineers };
    }, [teamsData]);

    // Generate date columns
    const dateColumns = useMemo(() => {
        const daysCount = Math.ceil(getDurationInMinutes(startDate, endDate) / (60 * 24));
        return Array.from({ length: daysCount }, (_, idx) => {
            const date = addDays(startDate, idx);
            return {
                date,
                dateString: formatDateForShift(date),
                isToday: formatDateForShift(date) === formatDateForShift(new Date()),
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            };
        });
    }, [startDate, endDate]);

    // Create shift lookup for performance with targeted debugging
    const shiftLookup = useMemo(() => {
        const lookup: Record<string, ShiftAssignment> = {};
        
        // Force console output for critical debugging
        console.log("🔍 SHIFTS DEBUG - Total shifts:", shifts.length);
        
        shifts.forEach((shift, index) => {
            const key = `${shift.engineerId}-${shift.date}`;
            lookup[key] = shift;
            
            // Debug only first 2 shifts due to large dataset
            if (index < 2) {
                console.log(`🔍 SHIFT ${index}:`, {
                    engineerId: shift.engineerId,
                    date: shift.date,
                    shift: shift.shift,
                    type: typeof shift.date,
                    key: key
                });
            }
        });
        
        console.log("🔍 LOOKUP DEBUG - Total keys:", Object.keys(lookup).length);
        console.log("🔍 SAMPLE KEYS:", Object.keys(lookup).slice(0, 3));
        
        return lookup;
    }, [shifts]);

    // Calculate shift statistics
    const shiftStats = useMemo(() => {
        const stats = {
            M: 0, E: 0, N: 0, D: 0, H: 0, T: 0, total: shifts.length
        };
        shifts.forEach(shift => {
            const shiftType = shift.shift.charAt(0); // Get first character (M, E, N, D, H, T)
            if (stats.hasOwnProperty(shiftType)) {
                stats[shiftType as keyof typeof stats]++;
            }
        });
        return stats;
    }, [shifts]);

    // Error handling for empty data
    if (teamLaneStructure.length === 0 || allEngineers.length === 0) {
        return (
            <div className={`shift-scheduler-component-empty ${className}`}>
                <p>No engineers found. Please check your data configuration.</p>
            </div>
        );
    }

    // Helper function to get shift for engineer and date
    const getShift = (engineerId: string, dateString: string): ShiftAssignment | undefined => {
        const key = `${engineerId}-${dateString}`;
        const shift = shiftLookup[key];
        
        // Debug first few lookups only
        if (Math.random() < 0.001) { // Sample 0.1% of lookups
            console.log("🔍 LOOKUP TEST:", {
                engineerId,
                dateString,
                key,
                found: !!shift,
                shift: shift ? `${shift.shift}` : "none"
            });
        }
        
        return shift;
    };

    // Enhanced cell click handler with selection
    const handleCellClick = useCallback((engineerId: string, dateString: string) => {
        setSelectedCell({ engineerId, date: dateString });
        try {
            onCellClick(engineerId, dateString);
        } catch (error) {
            console.error(`Error in cell click for engineer ${engineerId} on ${dateString}:`, error);
        }
    }, [onCellClick]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedCell || allEngineers.length === 0 || dateColumns.length === 0) return;

            const currentEngineerIndex = allEngineers.findIndex(eng => eng.id === selectedCell.engineerId);
            const currentDateIndex = dateColumns.findIndex(col => col.dateString === selectedCell.date);
            
            if (currentEngineerIndex === -1 || currentDateIndex === -1) return;

            let newEngineerIndex = currentEngineerIndex;
            let newDateIndex = currentDateIndex;

            switch (e.key) {
                case 'ArrowUp':
                    newEngineerIndex = Math.max(0, currentEngineerIndex - 1);
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    newEngineerIndex = Math.min(allEngineers.length - 1, currentEngineerIndex + 1);
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    newDateIndex = Math.max(0, currentDateIndex - 1);
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    newDateIndex = Math.min(dateColumns.length - 1, currentDateIndex + 1);
                    e.preventDefault();
                    break;
                case 'Enter':
                case ' ':
                    try {
                        const shift = getShift(selectedCell.engineerId, selectedCell.date);
                        onEdit(shift?.mendixObject || null);
                    } catch (error) {
                        console.error('Error in keyboard edit:', error);
                    }
                    e.preventDefault();
                    break;
                default:
                    return;
            }

            if (newEngineerIndex !== currentEngineerIndex || newDateIndex !== currentDateIndex) {
                setSelectedCell({
                    engineerId: allEngineers[newEngineerIndex].id,
                    date: dateColumns[newDateIndex].dateString
                });
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, allEngineers, dateColumns, getShift, onEdit]);

    return (
        <div className={`shift-scheduler-unified ${className}`}>
            {/* Enhanced debug info panel */}
            <div style={{ 
                background: '#e0f2fe', 
                padding: '12px', 
                fontSize: '11px', 
                borderBottom: '1px solid #0284c7',
                color: '#0c4a6e',
                fontFamily: 'monospace'
            }}>
                <div>🔍 Debug: Teams: {teamLaneStructure.length}, Engineers: {allEngineers.length}, Shifts: {shifts.length}</div>
                <div>📊 Shift Lookup Keys: {Object.keys(shiftLookup).length}</div>
                {debugInfo && (
                    <div>⚙️ Attributes: Name={debugInfo.attributesConfigured.name ? '✅' : '❌'}, Team={debugInfo.attributesConfigured.team ? '✅' : '❌'}, SPUser={debugInfo.attributesConfigured.spUserAssociation ? '✅' : '❌'}</div>
                )}
                {shifts.length > 0 && (
                    <div>
                        <div>🎯 First Shift: ID={shifts[0]?.engineerId}, Date={shifts[0]?.date}, Type={typeof shifts[0]?.date}, Shift={shifts[0]?.shift}</div>
                        <div>🔑 Sample Keys: {Object.keys(shiftLookup).slice(0, 3).join(', ')}</div>
                    </div>
                )}
                {allEngineers.length > 0 && (
                    <div>👤 First Engineer: ID={allEngineers[0]?.id}, Name={allEngineers[0]?.name}</div>
                )}
                {dateColumns.length > 0 && (
                    <div>📅 Timeline: {dateColumns[0]?.dateString} to {dateColumns[dateColumns.length-1]?.dateString} ({dateColumns.length} days)</div>
                )}
                <div>🔍 Test Lookup: Key="{allEngineers[0]?.id}-{dateColumns[0]?.dateString}" Found={!!shiftLookup[`${allEngineers[0]?.id}-${dateColumns[0]?.dateString}`]}</div>
                <div>🔍 Engineer ID Types: Engineer={typeof allEngineers[0]?.id}, Shift={typeof shifts[0]?.engineerId}</div>
                <div>🔍 Date Match Test: Timeline="{dateColumns[0]?.dateString}", Shift="{shifts[0]?.date}"</div>
                <div>📈 Performance: {Object.keys(shiftLookup).length} lookup keys, {allEngineers.length * dateColumns.length} total cells</div>
                <div>📊 Shift Stats: M:{shiftStats.M} E:{shiftStats.E} N:{shiftStats.N} D:{shiftStats.D} H:{shiftStats.H} T:{shiftStats.T}</div>
                {selectedCell && (
                    <div>🎯 Selected: {allEngineers.find(e => e.id === selectedCell.engineerId)?.name} on {selectedCell.date} (Use arrows to navigate, Enter/Space to edit)</div>
                )}
                <div style={{ marginTop: '8px', fontSize: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                    <div><strong>🔍 Find engineers with shifts:</strong></div>
                    <pre style={{ fontSize: '9px', overflow: 'auto', maxHeight: '80px' }}>
                        {(() => {
                            const engineersWithShifts = allEngineers.filter(eng => {
                                const hasShift = shiftLookup[`${eng.id}-${dateColumns[0]?.dateString}`];
                                return hasShift;
                            }).slice(0, 3);
                            
                            return JSON.stringify(engineersWithShifts.map(eng => ({
                                id: eng.id,
                                name: eng.name,
                                email: eng.email,
                                hasShiftOnFirstDate: !!shiftLookup[`${eng.id}-${dateColumns[0]?.dateString}`]
                            })), null, 2);
                        })()}
                    </pre>
                    <div style={{ marginTop: '4px' }}><strong>🔍 Sample shift engineer IDs:</strong></div>
                    <pre style={{ fontSize: '9px', overflow: 'auto', maxHeight: '80px' }}>
                        {JSON.stringify(shifts.slice(0, 5).map(shift => ({
                            shiftId: shift.id,
                            engineerId: shift.engineerId,
                            shift: shift.shift,
                            date: shift.date
                        })), null, 2)}
                    </pre>
                    <div style={{ marginTop: '4px' }}><strong>💡 Check: Do any engineer IDs match shift engineer IDs?</strong></div>
                    <pre style={{ fontSize: '9px', overflow: 'auto', maxHeight: '60px' }}>
                        {(() => {
                            const shiftEngineerIds = new Set(shifts.map(s => s.engineerId));
                            const engineerIds = new Set(allEngineers.map(e => e.id));
                            const matches = [...shiftEngineerIds].filter(id => engineerIds.has(id));
                            const totalShiftEngineers = shiftEngineerIds.size;
                            const totalEngineers = engineerIds.size;
                            
                            return JSON.stringify({
                                matchingIds: matches.slice(0, 3),
                                totalMatches: matches.length,
                                totalShiftEngineers,
                                totalEngineers,
                                sampleShiftIds: [...shiftEngineerIds].slice(0, 3),
                                sampleEngineerIds: [...engineerIds].slice(0, 3)
                            }, null, 2);
                        })()}
                    </pre>
                    
                    <div style={{ marginTop: '8px' }}><strong>🔍 Raw SPUser Object Properties:</strong></div>
                    <pre style={{ fontSize: '9px', overflow: 'auto', maxHeight: '80px' }}>
                        {allEngineers.length > 0 ? JSON.stringify({
                            id: allEngineers[0].mendixObject.id,
                            allOwnProperties: Object.getOwnPropertyNames(allEngineers[0].mendixObject),
                            allPrototypeProperties: Object.getOwnPropertyNames(Object.getPrototypeOf(allEngineers[0].mendixObject)),
                            objectKeys: Object.keys(allEngineers[0].mendixObject),
                            directAccess: {
                                Username: (allEngineers[0].mendixObject as any).Username,
                                Name: (allEngineers[0].mendixObject as any).Name,
                                Email: (allEngineers[0].mendixObject as any).Email,
                                Abbreviation: (allEngineers[0].mendixObject as any).Abbreviation,
                                id: (allEngineers[0].mendixObject as any).id
                            },
                            typeofCheck: typeof allEngineers[0].mendixObject,
                            constructorName: allEngineers[0].mendixObject.constructor.name
                        }, null, 2) : 'No engineers'}
                    </pre>
                    
                    <div style={{ marginTop: '8px' }}><strong>🔍 Raw CalendarEvent Object Properties:</strong></div>
                    <pre style={{ fontSize: '9px', overflow: 'auto', maxHeight: '80px' }}>
                        {shifts.length > 0 ? JSON.stringify({
                            id: shifts[0].mendixObject.id,
                            allProperties: Object.keys(shifts[0].mendixObject),
                            directAccess: {
                                SPUser: (shifts[0].mendixObject as any).SPUser,
                                CalendarEvents_SPUser: (shifts[0].mendixObject as any).CalendarEvents_SPUser,
                                Engineer: (shifts[0].mendixObject as any).Engineer,
                                User: (shifts[0].mendixObject as any).User
                            }
                        }, null, 2) : 'No shifts'}
                    </pre>
                </div>
            </div>
            <div className="scheduler-container">
                {/* Header Row */}
                <div className="scheduler-header">
                    <div className="engineer-column-header">Engineer</div>
                    <div className="timeline-container" ref={headerScrollRef}>
                        <div className="timeline-header">
                            {dateColumns.map((col, idx) => (
                                <div 
                                    key={idx} 
                                    className={`date-header ${
                                        col.isToday ? 'date-header-today' : ''
                                    } ${
                                        col.isWeekend ? 'date-header-weekend' : ''
                                    }`}
                                >
                                    <div className="date-day">{col.date.getDate()}</div>
                                    <div className="date-month">
                                        {col.date.toLocaleDateString('en', { month: 'short' })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="scheduler-content">
                    <div className="engineer-names-column">
                        {teamLaneStructure.map(teamData => (
                            <div key={teamData.teamId}>
                                <div className="team-name-cell">{teamData.teamName}</div>
                                {teamData.lanes.map(lane => (
                                    <div key={`${teamData.teamId}-${lane.name}`}>
                                        <div className="lane-name-cell">{lane.name}</div>
                                        {lane.engineers.map(engineer => (
                                            <div key={engineer.id} className="engineer-name-cell" title={`${engineer.name} (${teamData.teamName} - ${lane.name})`}>
                                                {engineer.name}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="timeline-container" ref={contentScrollRef}>
                        <div className="timeline-content">
                            {teamLaneStructure.map(teamData => (
                                <div key={teamData.teamId}>
                                    <div className="team-timeline-row">
                                        {dateColumns.map((_, idx) => (
                                            <div key={idx} className="team-timeline-cell"></div>
                                        ))}
                                    </div>
                                    {teamData.lanes.map(lane => (
                                        <div key={`${teamData.teamId}-${lane.name}`}>
                                            <div className="lane-timeline-row">
                                                {dateColumns.map((_, idx) => (
                                                    <div key={idx} className="lane-timeline-cell"></div>
                                                ))}
                                            </div>
                                            {lane.engineers.map(engineer => (
                                        <div key={engineer.id} className="engineer-timeline-row">
                                            {dateColumns.map((col, idx) => {
                                                const shift = getShift(engineer.id, col.dateString);
                                                return (
                                                    <DayCell
                                                        key={`${engineer.id}-${idx}`}
                                                        date={col.date}
                                                        engineer={engineer}
                                                        shift={shift}
                                                        isToday={col.isToday}
                                                        isWeekend={col.isWeekend}
                                                        isSelected={selectedCell?.engineerId === engineer.id && selectedCell?.date === col.dateString}
                                                        onEdit={() => {
                                                            try {
                                                                onEdit(shift?.mendixObject || null);
                                                            } catch (error) {
                                                                console.error(`Error in onEdit for ${engineer.name}:`, error);
                                                            }
                                                        }}
                                                        onCellClick={() => handleCellClick(engineer.id, col.dateString)}
                                                        readOnly={readOnly}
                                                    />
                                                );
                                            })}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={ref} className="sentinel" style={{ height: '20px', visibility: 'hidden' }} />
        </div>
    );
};

export default ShiftScheduler;
