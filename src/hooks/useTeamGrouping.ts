import { useMemo } from "react";
import { Person } from "../types/shiftScheduler";

export interface TeamLaneStructure {
    teamName: string;
    teamId: string;
    lanes: Array<{
        name: string;
        people: Person[];
    }>;
}

export interface UseTeamGroupingProps {
    teamsData: { [team: string]: Person[] };
    debugInfo?: {
        microflowConfiguration?: {
            people: boolean;
        };
    };
}

export interface UseTeamGroupingReturn {
    teamLaneStructure: TeamLaneStructure[];
    allPeople: Person[];
    groupingDebugInfo: string[];
}

/**
 * Custom hook for processing team and lane grouping structure
 * Organizes people by Team → Lane → People with data-driven fallbacks
 */
export const useTeamGrouping = ({ teamsData, debugInfo }: UseTeamGroupingProps): UseTeamGroupingReturn => {
    // Group people by Team → Lane → People (data-driven with fallback)
    const { teamLaneStructure, allPeople, groupingDebugInfo } = useMemo(() => {
        const debugMessages: string[] = [];

        // Check if we have team/lane grouping configured
        // Both team and lane grouping are controlled by the people microflow configuration
        const hasGrouping = !!debugInfo && debugInfo.microflowConfiguration?.people;
        const hasTeamGrouping = hasGrouping;
        const hasLaneGrouping = hasGrouping;

        debugMessages.push(`Processing ${Object.keys(teamsData).length} team groups`);
        debugMessages.push(`Team grouping: ${hasTeamGrouping ? "✅" : "❌"}`);
        debugMessages.push(`Lane grouping: ${hasLaneGrouping ? "✅" : "❌"}`);

        if (!hasTeamGrouping) {
            // No team grouping - flat list of all people
            const flatPeople = Object.values(teamsData).flat();
            debugMessages.push("No team grouping - showing all people in single group");

            return {
                teamLaneStructure: [
                    {
                        teamName: "All People",
                        teamId: "all-people",
                        lanes: [
                            {
                                name: "General",
                                people: flatPeople
                            }
                        ]
                    }
                ],
                allPeople: flatPeople,
                groupingDebugInfo: debugMessages
            };
        }

        const structure = Object.entries(teamsData).map(([teamName, people]) => {
            debugMessages.push(`Team "${teamName}": ${people.length} people`);

            if (!hasLaneGrouping) {
                // Only team grouping - no lane grouping
                debugMessages.push(`  No lane grouping for ${teamName}`);
                return {
                    teamName,
                    teamId: teamName
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, ""),
                    lanes: [
                        {
                            name: "General",
                            people
                        }
                    ]
                };
            }

            // Both team and lane grouping
            const laneGroups: { [lane: string]: Person[] } = {};

            people.forEach((person, index) => {
                // Use person's lane, default to 'General' if not specified
                const personLane = person.lane || "General";

                if (!laneGroups[personLane]) {
                    laneGroups[personLane] = [];
                }
                laneGroups[personLane].push(person);

                // Debug first few people
                if (index < 2) {
                    debugMessages.push(`  Person ${index}: ${person.name} (${person.team}/${person.lane})`);
                }
            });

            // Sort lanes alphabetically (data-driven, no hardcoded order)
            const sortedLanes = Object.keys(laneGroups).sort();
            debugMessages.push(`  Lanes: ${sortedLanes.join(", ")}`);

            return {
                teamName,
                teamId: teamName.toLowerCase().replace(/\s+/g, "-"),
                lanes: sortedLanes.map(lane => ({
                    name: lane,
                    people: laneGroups[lane]
                }))
            };
        });

        const flatPeople: Person[] = structure.flatMap(team => team.lanes.flatMap(lane => lane.people));

        return { teamLaneStructure: structure, allPeople: flatPeople, groupingDebugInfo: debugMessages };
    }, [teamsData, debugInfo]);

    return {
        teamLaneStructure,
        allPeople,
        groupingDebugInfo
    };
};
