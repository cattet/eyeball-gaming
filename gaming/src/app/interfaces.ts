/* #region Interfaces */
export interface Player {
    id: number
    jobId: number,
    subRole: SubRole,
    level: number
    name: string
    group: number
    maxHealth: number
    healthPercent: number
    shieldPercent: number
    shieldOverflowPercent: number
    manaPercent: number
    aggroPercent: number
    aggroOrder: number
    jobPriority: number
    groupPriority: number
    lineUpOrder: number
    statuses: Status[]
}
export interface Job {
    id: number
    name: string
    shortName: string
    subRole: SubRole
    personalStatuses: Status[]
    partyMits: Status[]
}
export interface Role {
    id: number
    name: string
}
export interface SubRole {
    id: number
    name: string,
    shortName: string,
    role: Role
}
export interface Status {
    id: number
    name: string
    jobId: number | null // This refers to the job of the player affected by the status
    iconUrl: string
    duration: number
}
export interface CustomName {
    // Old, deprecating
    id: number
    name: string
}
export interface CustomPartyData {
    // New version that will support more data points
    playerId: number
    name: string
    jobId: number
}
export interface EditPartyDialogData {
    party: Player[]
    defaultParty: Player[]
}
/* #endregion */