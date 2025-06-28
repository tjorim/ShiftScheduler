import { useMemo } from "react";
import { Engineer, ShiftAssignment } from "../types/shiftScheduler";

export type UserRole = "engineer" | "team_leader" | "manager" | "admin";

export interface TeamAccessConfig {
    userRole: UserRole;
    userTeam?: string;
    userId?: string;
    allowCrossTeamView?: boolean;
    allowShiftEditing?: boolean;
    allowBatchOperations?: boolean;
}

export interface UseTeamAccessReturn {
    filteredEngineers: Engineer[];
    filteredShifts: ShiftAssignment[];
    canEditShift: (shift: ShiftAssignment) => boolean;
    canCreateShift: (engineerId: string) => boolean;
    canDeleteShift: (shift: ShiftAssignment) => boolean;
    canViewTeam: (teamName: string) => boolean;
    canPerformBatchOperations: boolean;
    userPermissions: {
        readOnly: boolean;
        canEdit: boolean;
        canCreate: boolean;
        canDelete: boolean;
        canBatch: boolean;
        crossTeamAccess: boolean;
    };
}

/**
 * Custom hook for managing team-based access control and role-based filtering
 * Handles permissions for engineers vs team leaders vs managers
 */
export const useTeamAccess = (
    engineers: Engineer[],
    shifts: ShiftAssignment[],
    config: TeamAccessConfig
): UseTeamAccessReturn => {
    // Determine user permissions based on role
    const userPermissions = useMemo(() => {
        const basePermissions = {
            readOnly: false,
            canEdit: false,
            canCreate: false,
            canDelete: false,
            canBatch: false,
            crossTeamAccess: false
        };

        switch (config.userRole) {
            case "admin":
                return {
                    ...basePermissions,
                    canEdit: true,
                    canCreate: true,
                    canDelete: true,
                    canBatch: true,
                    crossTeamAccess: true
                };

            case "manager":
                return {
                    ...basePermissions,
                    canEdit: true,
                    canCreate: true,
                    canDelete: true,
                    canBatch: true,
                    crossTeamAccess: config.allowCrossTeamView ?? true
                };

            case "team_leader":
                return {
                    ...basePermissions,
                    canEdit: config.allowShiftEditing ?? true,
                    canCreate: true,
                    canDelete: config.allowShiftEditing ?? true,
                    canBatch: config.allowBatchOperations ?? true,
                    crossTeamAccess: config.allowCrossTeamView ?? false
                };

            case "engineer":
            default:
                return {
                    ...basePermissions,
                    readOnly: true,
                    crossTeamAccess: false
                };
        }
    }, [config]);

    // Filter engineers based on team access
    const filteredEngineers = useMemo(() => {
        if (userPermissions.crossTeamAccess || !config.userTeam) {
            return engineers;
        }

        // Filter to user's team only
        return engineers.filter(engineer => engineer.header === config.userTeam);
    }, [engineers, userPermissions.crossTeamAccess, config.userTeam]);

    // Filter shifts based on accessible engineers
    const filteredShifts = useMemo(() => {
        const accessibleEngineerIds = new Set(filteredEngineers.map(e => e.id));
        return shifts.filter(shift => accessibleEngineerIds.has(shift.engineerId));
    }, [shifts, filteredEngineers]);

    // Permission check functions
    const canViewTeam = (teamName: string): boolean => {
        if (userPermissions.crossTeamAccess) {
            return true;
        }
        return teamName === config.userTeam;
    };

    const canEditShift = (shift: ShiftAssignment): boolean => {
        if (!userPermissions.canEdit) {
            return false;
        }

        // Check if shift belongs to an accessible engineer
        const engineer = filteredEngineers.find(e => e.id === shift.engineerId);
        if (!engineer) {
            return false;
        }

        // Team leaders can only edit shifts in their team
        if (config.userRole === "team_leader") {
            return engineer.header === config.userTeam;
        }

        return true;
    };

    const canCreateShift = (engineerId: string): boolean => {
        if (!userPermissions.canCreate) {
            return false;
        }

        // Check if engineer is accessible
        const engineer = filteredEngineers.find(e => e.id === engineerId);
        if (!engineer) {
            return false;
        }

        // Team leaders can only create shifts for their team
        if (config.userRole === "team_leader") {
            return engineer.header === config.userTeam;
        }

        return true;
    };

    const canDeleteShift = (shift: ShiftAssignment): boolean => {
        if (!userPermissions.canDelete) {
            return false;
        }

        // Same logic as edit
        return canEditShift(shift);
    };

    return {
        filteredEngineers,
        filteredShifts,
        canEditShift,
        canCreateShift,
        canDeleteShift,
        canViewTeam,
        canPerformBatchOperations: userPermissions.canBatch,
        userPermissions
    };
};

/**
 * Helper function to determine user role from Mendix user context
 * This would typically integrate with Mendix user roles/attributes
 */
export const getUserRoleFromMendix = (
    userObject?: any, // Mendix user object
    teamAttribute?: string,
    roleAttribute?: string
): TeamAccessConfig => {
    // Default configuration for engineers
    const defaultConfig: TeamAccessConfig = {
        userRole: "engineer",
        allowCrossTeamView: false,
        allowShiftEditing: false,
        allowBatchOperations: false
    };

    if (!userObject) {
        return defaultConfig;
    }

    try {
        // Extract role from Mendix user object
        const role = roleAttribute ? userObject[roleAttribute] : undefined;
        const team = teamAttribute ? userObject[teamAttribute] : undefined;
        const userId = userObject.id || userObject.Id;

        // Map Mendix roles to our role system
        let userRole: UserRole = "engineer";
        if (role) {
            const roleLower = role.toLowerCase();
            if (roleLower.includes("admin")) {
                userRole = "admin";
            } else if (roleLower.includes("manager")) {
                userRole = "manager";
            } else if (roleLower.includes("leader") || roleLower.includes("tl")) {
                userRole = "team_leader";
            }
        }

        return {
            userRole,
            userTeam: team,
            userId,
            allowCrossTeamView: userRole === "manager" || userRole === "admin",
            allowShiftEditing: userRole !== "engineer",
            allowBatchOperations: userRole !== "engineer"
        };
    } catch (error) {
        console.warn("Error determining user role from Mendix:", error);
        return defaultConfig;
    }
};
