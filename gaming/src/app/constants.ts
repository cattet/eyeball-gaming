import { Player, Status } from './interfaces'

/* #region Constants */
export const STATUS:{[index: string]:any} = {
    'wrothSpread': {id: 0, name: 'spread', job: null, iconUrl: 'assets/p6/spread.png', duration: 23 },
    'wrothStack':  {id: 1, name: 'stack', job: null, iconUrl: 'assets/p6/stack.png', duration: 23 },
    'vow':          {id: 2, name: 'vow', job: null, iconUrl: 'assets/p6/vow.png', duration: 30 },
    'vowPassed':   {id: 3, name: 'passed vow', job: null, iconUrl: 'assets/p6/vow-passed.png', duration: 60 },
  
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
}

export const LOCAL_STORAGE_KEY: {[index:string]:string} = {
    'partyListOrder': 'user-party-list-order',
    'partyListNames': 'user-party-list-names',
    'selectedPlayer': 'user-selected-player'
} as const

export const WROTH_DEBUFFS: Status[] = [ 
    STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothStack'], STATUS['wrothStack']
] as const

export const BASE_PLAYER_DATA: Player[] = [
    { id: 0, job: 'MCH', level: 90, name: 'Range One', group: 1, maxHealth: 66791, healthPercent: 1, shieldPercent: .7, manaPercent: 1, aggroPercent: 0.2, aggroOrder: 6, jobPriority: 2, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 1, job: 'WAR', level: 90, name: 'Tank One', group: 1, maxHealth: 94171, healthPercent: 0.8, shieldPercent: .3, manaPercent: 1, aggroPercent: 0.8, aggroOrder: 2, jobPriority: 4, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 2, job: 'PLD', level: 90, name: 'Tank Two', group: 2, maxHealth: 96236, healthPercent: 0.65, shieldPercent: .3, manaPercent: 1, aggroPercent: 1, aggroOrder: 1, jobPriority: 4, groupPriority: 1, lineUpOrder: 0, statuses: [] },
    { id: 3, job: 'WHM', level: 90, name: 'Healer One', group: 1, maxHealth: 61056, healthPercent: 1, shieldPercent: .6, manaPercent: .777, aggroPercent: 0.1, aggroOrder: 7, jobPriority: 3, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 4, job: 'SCH', level: 90, name: 'Healer Two', group: 2, maxHealth: 61056, healthPercent: 1, shieldPercent: .95, manaPercent: .95, aggroPercent: 0.1, aggroOrder: 8, jobPriority: 3, groupPriority: 1, lineUpOrder: 0, statuses: [] },
    { id: 5, job: 'DRG', level: 90, name: 'Melee One', group: 1, maxHealth: 67602, healthPercent: 1, shieldPercent: .6, manaPercent: 1, aggroPercent: 0.3, aggroOrder: 4, jobPriority: 1, groupPriority: 2, lineUpOrder: 0, statuses: [] },
    { id: 6, job: 'SMN', level: 90, name: 'Melee Two', group: 2, maxHealth: 58116, healthPercent: 1, shieldPercent: .8, manaPercent: .96, aggroPercent: 0.2, aggroOrder: 5, jobPriority: 1, groupPriority: 1, lineUpOrder: 0, statuses: [] },
    { id: 7, job: 'PCT', level: 90, name: 'Range Two', group: 2, maxHealth: 61081, healthPercent: 1, shieldPercent: .75, manaPercent: .95, aggroPercent: 0.4, aggroOrder: 3, jobPriority: 2, groupPriority: 1, lineUpOrder: 0, statuses: [] }
]

export const DPS_JOBS: string[] = ['MCH', 'DRG', 'SMN', 'PCT'] as const
/* #endregion */