import { Job, Player, Role, Status, SubRole } from './interfaces'

/* #region Constants */
export const STATUS:{[index: string]:any} = {
    'wrothSpread':  {id: 0, name: 'spread', job: null, iconUrl: 'assets/p6/spread.png', duration: 23 },
    'wrothStack':   {id: 1, name: 'stack', job: null, iconUrl: 'assets/p6/stack.png', duration: 23 },
    'vow':          {id: 2, name: 'vow', job: null, iconUrl: 'assets/p6/vow.png', duration: 30 },
    'vowPassed':    {id: 3, name: 'passed vow', job: null, iconUrl: 'assets/p6/vow-passed.png', duration: 60 },
  
    'galvanize':    {id: 4, name: 'galvanize', job: null, iconUrl: 'assets/status/galvanize.png', duration: 27 },
    'veil':         {id: 5, name: 'divine veil', job: null, iconUrl: 'assets/status/veil.png', duration: 24 },
    'tempera':      {id: 6, name: 'tempera grassa', job: null, iconUrl: 'assets/status/tempera.png', duration: 10 },
    'medica':       {id: 7, name: 'medica 2', job: null, iconUrl: 'assets/status/medica.png', duration: 13 },
    'tactician':    {id: 8, name: 'tactician', job: null, iconUrl: 'assets/status/tactician.png', duration: 14 },
  
    'storm':        {id: 9, name: 'storm\'s eye', job: 'WAR', iconUrl: 'assets/status/storm.png', duration: 48 },
    'benison':      {id: 10, name: 'divine benison', job: 'WAR', iconUrl: 'assets/status/benison.png', duration: 8 },
    'flight':       {id: 11, name: 'everlasting flight', job: 'PLD', iconUrl: 'assets/status/flight.png', duration: 20 },
    'catalyze':     {id: 12, name: 'catalyze', job: 'SCH', iconUrl: 'assets/status/catalyze.png', duration: 27 },
    'rekindle':     {id: 13, name: 'rekindle', job:  'SMN', iconUrl: 'assets/status/rekindle.png', duration: 29 },
    'aegis':        {id: 14, name: 'radiant aegis', job:  'SMN', iconUrl: 'assets/status/aegis.png', duration: 23 },
    'hammer3':      {id: 15, name: 'hammer 3', job:  'PCT', iconUrl: 'assets/status/hammer3.png', duration: 27 }
} as const
export const DPS_JOBS: string[] = ['MCH', 'DRG', 'SMN', 'PCT'] as const // TODO

export const ROLE: {[index:string]: Role} = {
    'tank': { id: 0, name: 'tank' },
    'healer': { id: 1, name: 'healer' },
    'DPS': { id: 2, name: 'DPS' }
} as const
export const SUBROLE: {[index:string]: SubRole} = {
    'tank': { id: 0, name: 'tank', shortName: 't', role: ROLE['tank'] },
    'healer': { id: 1, name: 'healer', shortName: 'h', role: ROLE['healer'] },
    'melee': { id: 2, name: 'melee', shortName: 'm', role: ROLE['DPS'] },
    'caster': { id: 3, name: 'caster', shortName: 'r', role: ROLE['DPS'] },
    'prange': { id: 4, name: 'physrange', shortName: 'r', role: ROLE['DPS'] }
}
export const WROTH_DEBUFFS: Status[] = [ 
    STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothStack'], STATUS['wrothStack']
] as const
export const JOBS: Job[] = [
    { id: 0,  name: 'Dark Knight',  shortName: 'DRK', subRole: SUBROLE['tank'],     personalStatuses: [], partyMits: []},
    { id: 1,  name: 'Gunbreaker',   shortName: 'GNB', subRole: SUBROLE['tank'],     personalStatuses: [], partyMits: []},
    { id: 2,  name: 'Paladin',      shortName: 'PLD', subRole: SUBROLE['tank'],     personalStatuses: [], partyMits: []},
    { id: 3,  name: 'Warrior',      shortName: 'WAR', subRole: SUBROLE['tank'],     personalStatuses: [], partyMits: []},
   
    { id: 4,  name: 'Astrologian',  shortName: 'AST', subRole: SUBROLE['healer'],   personalStatuses: [], partyMits: []},
    { id: 5,  name: 'Scholar',      shortName: 'SCH', subRole: SUBROLE['healer'],   personalStatuses: [], partyMits: []},
    { id: 6,  name: 'Sage',         shortName: 'SGE', subRole: SUBROLE['healer'],   personalStatuses: [], partyMits: []},
    { id: 7,  name: 'White Mage',   shortName: 'WHM', subRole: SUBROLE['healer'],   personalStatuses: [], partyMits: []},
   
    { id: 8,  name: 'Dragoon',      shortName: 'DRG', subRole: SUBROLE['melee'],    personalStatuses: [], partyMits: []},
    { id: 9,  name: 'Monk',         shortName: 'MNK', subRole: SUBROLE['melee'],    personalStatuses: [], partyMits: []},
    { id: 10, name: 'Ninja',        shortName: 'NIN', subRole: SUBROLE['melee'],    personalStatuses: [], partyMits: []},
    { id: 11, name: 'Reaper',       shortName: 'RPR', subRole: SUBROLE['melee'],    personalStatuses: [], partyMits: []},
    { id: 12, name: 'Samurai',      shortName: 'SAM', subRole: SUBROLE['melee'],    personalStatuses: [], partyMits: []},
    { id: 13, name: 'Viper',        shortName: 'VPR', subRole: SUBROLE['melee'],    personalStatuses: [], partyMits: []},

    { id: 14, name: 'Black Mage',   shortName: 'BLM', subRole: SUBROLE['caster'],   personalStatuses: [], partyMits: []},
    { id: 15, name: 'Pictomancer',  shortName: 'PCT', subRole: SUBROLE['caster'],   personalStatuses: [], partyMits: []},
    { id: 16, name: 'Red Mage',     shortName: 'RDM', subRole: SUBROLE['caster'],   personalStatuses: [], partyMits: []},
    { id: 17, name: 'Summoner',     shortName: 'SMN', subRole: SUBROLE['caster'],   personalStatuses: [], partyMits: []},

    { id: 18, name: 'Bard',         shortName: 'BRD', subRole: SUBROLE['prange'],   personalStatuses: [], partyMits: []},
    { id: 19, name: 'Dancer',       shortName: 'DNC', subRole: SUBROLE['prange'],   personalStatuses: [], partyMits: []},
    { id: 20, name: 'Machinist',    shortName: 'MCH', subRole: SUBROLE['prange'],   personalStatuses: [], partyMits: []}
] as const
export const BASE_PLAYER_DATA: Player[] = [
    { id: 1, jobId: 3, subRole: SUBROLE['tank'], level: 90, name: 'Tank One', group: 1, maxHealth: 94171, healthPercent: 0.8, shieldOverflowPercent: 1, shieldPercent: .3, manaPercent: 1, aggroPercent: 0.8, aggroOrder: 2, jobPriority: 4, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 2, jobId: 2, subRole: SUBROLE['tank'], level: 90, name: 'Tank Two', group: 2, maxHealth: 96236, healthPercent: 0.65, shieldOverflowPercent: 1, shieldPercent: .3, manaPercent: 1, aggroPercent: 1, aggroOrder: 1, jobPriority: 4, groupPriority: 1, lineUpOrder: 0, statuses: [] },
    { id: 3, jobId: 7, subRole: SUBROLE['healer'], level: 90, name: 'Healer One', group: 1, maxHealth: 61056, healthPercent: 1, shieldOverflowPercent: 1, shieldPercent: .6, manaPercent: .777, aggroPercent: 0.1, aggroOrder: 7, jobPriority: 3, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 4, jobId: 5, subRole: SUBROLE['healer'], level: 90, name: 'Healer Two', group: 2, maxHealth: 61056, healthPercent: 1, shieldOverflowPercent: 1, shieldPercent: .95, manaPercent: .95, aggroPercent: 0.1, aggroOrder: 8, jobPriority: 3, groupPriority: 1, lineUpOrder: 0, statuses: [] },
    { id: 5, jobId: 8, subRole: SUBROLE['melee'], level: 90, name: 'Melee One', group: 1, maxHealth: 67602, healthPercent: 1, shieldOverflowPercent: 1, shieldPercent: .6, manaPercent: 1, aggroPercent: 0.3, aggroOrder: 4, jobPriority: 1, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 6, jobId: 17, subRole: SUBROLE['melee'], level: 90, name: 'Melee Two', group: 2, maxHealth: 58116, healthPercent: 1, shieldOverflowPercent: 1, shieldPercent: .8, manaPercent: .96, aggroPercent: 0.2, aggroOrder: 5, jobPriority: 1, groupPriority: 1, lineUpOrder: 0, statuses: [] },
    { id: 0, jobId: 20, subRole: SUBROLE['prange'], level: 90, name: 'Range One', group: 1, maxHealth: 66791, healthPercent: 1, shieldOverflowPercent: 1, shieldPercent: .7, manaPercent: 1, aggroPercent: 0.2, aggroOrder: 6, jobPriority: 2, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 7, jobId: 15, subRole: SUBROLE['caster'], level: 90, name: 'Range Two', group: 2, maxHealth: 61081, healthPercent: 1, shieldOverflowPercent: 1, shieldPercent: .75, manaPercent: .95, aggroPercent: 0.4, aggroOrder: 3, jobPriority: 2, groupPriority: 1, lineUpOrder: 0, statuses: [] }
] as const
export const LOCAL_STORAGE_KEY: {[index:string]:string} = {
    'partyListOrder': 'user-party-list-order',
    'partyListNames': 'user-party-list-names',
    'partyListData': 'user-party-list-data',
    'selectedPlayer': 'user-selected-player'
} as const
/* #endregion */