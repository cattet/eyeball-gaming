/* #region Interfaces */
export interface Player {
    id: number
    job: string
    subRole: SubRole,
    level: number
    name: string
    group: number
    maxHealth: number
    healthPercent: number
    shieldPercent: number
    manaPercent: number
    aggroPercent: number
    aggroOrder: number
    jobPriority: number
    groupPriority: number
    lineUpOrder: number
    statuses: Status[]
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
    job: string | null // This refers to the job of the player affected by the status
    iconUrl: string
    duration: number
}
export interface CustomName {
    id: number
    name: string
}
export interface EditPartyDialogData {
    party: Player[]
    defaultParty: Player[]
}
/* #endregion */