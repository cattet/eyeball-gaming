import { Job, Player, Role, Status, SubRole } from './interfaces'

/* #region Constants */
export const ROLE: {[index:string]: Role} = {
    'tank': { id: 0, name: 'tank' },
    'healer': { id: 1, name: 'healer' },
    'dps': { id: 2, name: 'dps' }
} as const
export const SUBROLE: {[index:string]: SubRole} = {
    'tank': { id: 0, name: 'tank', shortName: 't', role: ROLE['tank'] },
    'healer': { id: 1, name: 'healer', shortName: 'h', role: ROLE['healer'] },
    'melee': { id: 2, name: 'melee', shortName: 'm', role: ROLE['dps'] },
    'caster': { id: 3, name: 'caster', shortName: 'r', role: ROLE['dps'] },
    'prange': { id: 4, name: 'physrange', shortName: 'r', role: ROLE['dps'] }
}
export const STATUS:{[index: string]:Status} = {
    'wrothSpread':  {id: 0,  jobId: -1,  duration: 23, applyTo: 'party',      shortName: 'wrothSpread', name: 'spread' },
    'wrothStack':   {id: 1,  jobId: -1,  duration: 23, applyTo: 'party',      shortName: 'wrothStack',  name: 'stack' },
    'vow':          {id: 2,  jobId: -1,  duration: 30, applyTo: 'party',      shortName: 'vow',         name: 'vow' },
    'vowPassed':    {id: 3,  jobId: -1,  duration: 60, applyTo: 'party',      shortName: 'vowPassed',   name: 'passed vow' },
  
    // Self buffs and role buffs first so they get rendered first on the list
    'storm':        {id: 9,  jobId: 3,  duration: 48, applyTo: 'self',       shortName: 'storm',       name: 'storm\'s eye' },
    'catalyze':     {id: 12, jobId: 5,  duration: 27, applyTo: 'self',       shortName: 'catalyze',    name: 'catalyze' },
    'rekindle':     {id: 13, jobId: 17, duration: 29, applyTo: 'self',       shortName: 'rekindle',    name: 'rekindle' },
    'aegis':        {id: 14, jobId: 17, duration: 23, applyTo: 'self',       shortName: 'aegis',       name: 'radiant aegis' },
    'hammer3':      {id: 15, jobId: 15, duration: 27, applyTo: 'self',       shortName: 'hammer3',     name: 'hammer 3' },

    // Role buffs (for tanks, for DPS, etc)
    'benison':      {id: 10, jobId: 7,  duration: 8,  applyTo: ROLE['tank'], shortName: 'benison',     name: 'divine benison' },
    'flight':       {id: 11, jobId: 17, duration: 20, applyTo: ROLE['tank'], shortName: 'flight',      name: 'everlasting flight' },

    // Party mitigation
    'galvanize':    {id: 4,  jobId: 5,  duration: 27, applyTo: 'party',      shortName: 'galvanize',   name: 'galvanize' },
    'veil':         {id: 5,  jobId: 2,  duration: 24, applyTo: 'party',      shortName: 'veil',        name: 'divine veil' },
    'tempera':      {id: 6,  jobId: 15, duration: 10, applyTo: 'party',      shortName: 'tempera',     name: 'tempera grassa' },
    'medica':       {id: 7,  jobId: 7,  duration: 13, applyTo: 'party',      shortName: 'medica',      name: 'medica 2' },
    'tactician':    {id: 8,  jobId: 20, duration: 14, applyTo: 'party',      shortName: 'tactician',   name: 'tactician' }
} as const
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