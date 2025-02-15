/* #region Imports */
import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { xivNumberPipe } from './pipes/xivnumber.pipe'
import { xivDecimalPipe } from './pipes/xivdecimal.pipe'
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop'
import { LocalStorageService } from '../services/local-storage.service'
import { EditPartyComponent } from '../edit-party/edit-party.component'
import { xivStatusComponent } from '../xiv-status/xiv-status.component'
import { Event } from '@angular/router'
/* #endregion */

/* #region Interfaces */
export interface player {
  id: number
  job: string
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
  statuses: status[]
}
export interface status {
  id: number
  name: string
  job: string | null // This refers to the job of the player affected by the status
  iconUrl: string
  duration: number
}
export interface customName {
  id: number
  name: string
}
export interface EditPartyDialogData {
  party: player[]
  defaultParty: player[]
}
/* #endregion */

/* #region Constants */
const LOCAL_STORAGE_KEY = {
  'debugExpanded': 'debug-expanded',
  'partyListOrder': 'user-party-list-order',
  'partyListNames': 'user-party-list-names'
}
const STATUS: {[index: string]:any} = {
  'wrothSpread': {id: 0, name: 'spread', job: null, iconUrl: 'assets/p6/spread.png', duration: 23 },
  'wrothStack':  {id: 1, name: 'stack', job: null, iconUrl: 'assets/p6/stack.png', duration: 23 },
  'vow':          {id: 2, name: 'vow', job: null, iconUrl: 'assets/p6/vow.png', duration: 30 },
  'vowPassed':   {id: 3, name: 'passed vow', job: null, iconUrl: 'assets/p6/vow-passed.png', duration: 60 },

  'galvanize':    {id: 4, name: 'galvanize', job: null, iconUrl: 'assets/status/galvanize.png', duration: 26 },
  'veil':         {id: 5, name: 'divine veil', job: null, iconUrl: 'assets/status/veil.png', duration: 24 },
  'tempera':      {id: 6, name: 'tempera grassa', job: null, iconUrl: 'assets/status/tempera.png', duration: 10 },
  'medica':       {id: 7, name: 'medica 2', job: null, iconUrl: 'assets/status/medica.png', duration: 15 },
  'tactician':    {id: 8, name: 'tactician', job: null, iconUrl: 'assets/status/tactician.png', duration: 15 },

  'storm':        {id: 9, name: 'storm\'s eye', job: 'WAR', iconUrl: 'assets/status/storm.png', duration: 48 },
  'benison':      {id: 10, name: 'divine benison', job: 'WAR', iconUrl: 'assets/status/benison.png', duration: 7 },
  'flight':       {id: 11, name: 'everlasting flight', job: 'PLD', iconUrl: 'assets/status/flight.png', duration: 20 },
  'catalyze':     {id: 12, name: 'catalyze', job: 'SCH', iconUrl: 'assets/status/catalyze.png', duration: 25 },
  'rekindle':     {id: 13, name: 'rekindle', job:  'SMN', iconUrl: 'assets/status/rekindle.png', duration: 29 },
  'aegis':        {id: 14, name: 'radiant aegis', job:  'SMN', iconUrl: 'assets/status/aegis.png', duration: 23 },
  'hammer3':      {id: 15, name: 'hammer 3', job:  'PCT', iconUrl: 'assets/status/hammer3.png', duration: 27 }
}
const WROTH_DEBUFFS: status[] = [ STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothSpread'], STATUS['wrothStack'], STATUS['wrothStack'] ]
const BASE_PLAYER_DATA: player[] = [
  { id: 0, job: 'MCH', level: 90, name: 'Range GroupOne', group: 1, maxHealth: 66791, healthPercent: 1, shieldPercent: .7, manaPercent: 1, aggroPercent: 0.2, aggroOrder: 6, jobPriority: 2, groupPriority: 2, lineUpOrder: 0, statuses: [] },
  { id: 1, job: 'WAR', level: 90, name: 'Tank GroupOne', group: 1, maxHealth: 94171, healthPercent: 0.8, shieldPercent: .3, manaPercent: 1, aggroPercent: 0.8, aggroOrder: 2, jobPriority: 4, groupPriority: 2, lineUpOrder: 0, statuses: [] },
  { id: 2, job: 'PLD', level: 90, name: 'Tank GroupTwo', group: 2, maxHealth: 96236, healthPercent: 0.65, shieldPercent: .3, manaPercent: 1, aggroPercent: 1, aggroOrder: 1, jobPriority: 4, groupPriority: 1, lineUpOrder: 0, statuses: [] },
  { id: 3, job: 'WHM', level: 90, name: 'Healer GroupOne', group: 1, maxHealth: 61056, healthPercent: 1, shieldPercent: .6, manaPercent: .777, aggroPercent: 0.1, aggroOrder: 7, jobPriority: 3, groupPriority: 2, lineUpOrder: 0, statuses: [] },
  { id: 4, job: 'SCH', level: 90, name: 'Healer GroupTwo', group: 2, maxHealth: 61056, healthPercent: 1, shieldPercent: .95, manaPercent: .95, aggroPercent: 0.1, aggroOrder: 8, jobPriority: 3, groupPriority: 1, lineUpOrder: 0, statuses: [] },
  { id: 5, job: 'DRG', level: 90, name: 'Melee GroupOne', group: 1, maxHealth: 67602, healthPercent: 1, shieldPercent: .6, manaPercent: 1, aggroPercent: 0.3, aggroOrder: 4, jobPriority: 1, groupPriority: 2, lineUpOrder: 0, statuses: [] },
  { id: 6, job: 'SMN', level: 90, name: 'Melee GroupTwo', group: 2, maxHealth: 58116, healthPercent: 1, shieldPercent: .8, manaPercent: .96, aggroPercent: 0.2, aggroOrder: 5, jobPriority: 1, groupPriority: 1, lineUpOrder: 0, statuses: [] },
  { id: 7, job: 'PCT', level: 90, name: 'Range GroupTwo', group: 2, maxHealth: 61081, healthPercent: 1, shieldPercent: .75, manaPercent: .95, aggroPercent: 0.4, aggroOrder: 3, jobPriority: 2, groupPriority: 1, lineUpOrder: 0, statuses: [] }
]
const DPS_JOBS: string[] = ['MCH', 'DRG', 'SMN', 'PCT']
/* #endregion */

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatDialogModule, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatSlideToggleModule, MatIconModule, MatProgressBarModule, MatExpansionModule, CdkDropListGroup, CdkDropList, CdkDrag, xivNumberPipe, xivDecimalPipe, xivStatusComponent ],
  templateUrl: './home.component.html',
  styleUrls: ['./stylesheets/home.component.scss', './stylesheets/home.component.party.scss', './stylesheets/home.component.arena.scss']
})
export class HomeComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService){}

  readonly dialog = inject(MatDialog)
  public partyList: player[] = []
  public solvedPlayers: player[] = []
  public logs: string[] = []
  public showAnswer: boolean = false
  public showLogs: boolean = false

  ngOnInit() {
    this.randomizePartyState()
    // Player customizations
    this.loadDebugPanelState()
    this.loadPartyListNames()
  }

  /* #region Component logic */
  randomizePartyState(): void {
    this.clearStatuses()
    this.assignWrothDebuffs()
    this.assignVowDebuffs()
    this.assignAdditionalStatuses()
    this.randomizePlayerResources()
    this.solveSpots()
  }

  randomizePlayerResources(): void {
    this.partyList.forEach(p => {
      p.healthPercent = this.getRandomPercent(85, 100)
      p.shieldPercent = this.getRandomPercent(40, 90)
      p.manaPercent = this.getRandomPercent(80, 100)
    })
  }

  updatePartyCustomizations(updatedParty: player[]): void {
    updatedParty.forEach(updatedPlayer => {
      var partyListPlayer: player | undefined = this.partyList.find(player => player.id == updatedPlayer.id)
      // Right now, updates only consist of player names
      if(partyListPlayer && partyListPlayer.name && partyListPlayer.name.length) {
        partyListPlayer.name = updatedPlayer.name
      }
    })
    this.savePartyListNames()
  }

  solveSpots(): void {
    var allPlayers: player[] = this.clone(this.partyList)
    var spreadPlayers: player[] =  allPlayers.filter(p => p.statuses.find(d => d.name == 'spread'))
    var stackPlayers: player[] =  allPlayers.filter(p => p.statuses.find(d => d.name == 'stack'))
    var nothingPlayers: player[] =  allPlayers.filter(p => !p.statuses.find(d => d.name == 'spread') && !p.statuses.find(d => d.name == 'stack'))

    spreadPlayers = this.sortPlayersByPriority(spreadPlayers)
    stackPlayers = this.sortPlayersByPriority(stackPlayers)
    nothingPlayers = this.sortPlayersByPriority(nothingPlayers)
    
    this.solvedPlayers = []
    this.solvedPlayers = this.solvedPlayers.concat(spreadPlayers)
    this.solvedPlayers.push(stackPlayers[0])
    this.solvedPlayers.push(nothingPlayers[0])
    this.solvedPlayers.push(stackPlayers[1])
    this.solvedPlayers.push(nothingPlayers[1])
  }
  /* #endregion */

  /* #region Component logic helpers */
  clearStatuses(): void {
    if(!this.partyList.length) {
      var savedOrder: number[] | null = this.getPartyListOrder()
      if(savedOrder) {
        savedOrder.forEach((id, index) => {
          // Reorder based on player preferences in local storage
          this.partyList[index] = this.clone(BASE_PLAYER_DATA.find((p: player) => p.id == id))
        })
      } else {
        // Get a straight fresh clone of the base data
        this.partyList = this.clone(BASE_PLAYER_DATA)
      }
    }
    this.partyList.forEach(p => { p.statuses = []})
  }

  assignStatusesToUniquePlayers(statuses: status[], players: player[]): void {
    var workingPlayerIds: number[] = players.map(p => p.id)
    statuses.forEach(status => {
      // Take a random player from our working players list
      const index = Math.floor(Math.random() * workingPlayerIds.length)
      var luckyPlayerId: number = workingPlayerIds[index]
      // Copy status into actual player data
      var partyPlayer = this.partyList.find(p => p.id == luckyPlayerId)
      if(partyPlayer) partyPlayer.statuses.push(status)
      // Remove the player from our working array to assign statuses to other players only
      workingPlayerIds.splice(index, 1)
    })
  }

  sortPlayersByPriority(players: player[]): player[] {
    return players.sort((a, b) => {
      if (a.jobPriority > b.jobPriority) return 1
      if (a.jobPriority < b.jobPriority) return -1
      if (a.groupPriority > b.groupPriority) return 1
      if (a.groupPriority < b.groupPriority) return -1
      return 0
    })
  }

  assignAdditionalStatuses(): void {
    // Personal statuses
    for(let key in STATUS){
      let status: status = STATUS[key]
      let validPlayer: player | undefined = this.partyList.filter(p => p.job == status.job)[0]
      if(validPlayer) validPlayer.statuses.push(status)
    }

    // Mitigation and healing for everyone
    this.partyList.forEach(p => {
      p.statuses.push(STATUS['galvanize']);
      p.statuses.push(STATUS['veil']);
      p.statuses.push(STATUS['tempera']);
      p.statuses.push(STATUS['medica']);
      p.statuses.push(STATUS['tactician']);
      // Remove extras (beyond 5)
      // p.statuses = p.statuses.slice(0, 5);
    });
  }

  assignWrothDebuffs(): void {
    this.assignStatusesToUniquePlayers(WROTH_DEBUFFS, this.partyList);
  }

  assignVowDebuffs(): void {
    // Main tank will always have the vow
    var mainTank: player | undefined = this.partyList.find(p => p.job == 'WAR');
    if(mainTank) mainTank.statuses.push(STATUS['vow']);
    // The vow could have been passed to the MT by any DPS player
    var dpsPlayers: player[] = this.partyList.filter(p => DPS_JOBS.includes(p.job))
    this.assignStatusesToUniquePlayers([STATUS['vowPassed']], dpsPlayers);
  }
  /* #endregion */

  /* #region Local storage */
  saveDebugPanelState(expanded: boolean): void {
    this.showLogs = !this.showLogs
    this.localStorageService.setItem(LOCAL_STORAGE_KEY.debugExpanded, this.showLogs)
  }
  loadDebugPanelState(): void {
    const debugExpanded: boolean | null = this.localStorageService.getItem<boolean>(
      LOCAL_STORAGE_KEY.debugExpanded
    )
    if(debugExpanded){
      this.showLogs = debugExpanded
    } else {
      this.showLogs = false
    }
  }
  savePartyListNames(): void {
    const customNames: customName[] = []
    this.partyList.forEach(p => {
      var name: customName = {id: p.id, name: p.name}
      customNames.push(name)
    })

    this.localStorageService.setItem(LOCAL_STORAGE_KEY.partyListNames, customNames)
    this.log('Custom names saved.')
  }
  loadPartyListNames(): void {
    const customNames: customName[] | null = this.localStorageService.getItem<customName[]>(
      LOCAL_STORAGE_KEY.partyListNames
    )
    customNames?.forEach(customName => {
      var player: player | undefined = this.partyList.find(p => p.id == customName.id)
      if(player) {
        player.name = customName.name
      }
    })
  }
  savePartyListOrder(): void {
    const partyListOrder: number[] = this.partyList.map(p => p.id)
    const jobList: string[] = this.partyList.map(p => p.job)

    this.localStorageService.setItem(LOCAL_STORAGE_KEY.partyListOrder, partyListOrder)
    this.log('Custom party list order saved. ' + jobList.toString())
  }
  getPartyListOrder(): number[] | null {
    const partyListOrder: number[] | null = this.localStorageService.getItem<number[]>(
      LOCAL_STORAGE_KEY.partyListOrder
    )
    return partyListOrder
  }
  /* #endregion */

  /* #region Event handlers */
  openDialog() {
    const dialogRef = this.dialog.open(EditPartyComponent, {
      data: { 
        party: this.partyList,
        defaultParty: BASE_PLAYER_DATA,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.updatePartyCustomizations(result)
    })
  }

  onStatusExpire(e: Event, playerId: number, statusId: number) {
    if(e) {
      let player: player | undefined = this.partyList.find(p => p.id == playerId )
      if(player) {
        // Remove the expired status
        let statusIndex: number = player.statuses.findIndex(s => s.id == statusId)
        player.statuses.splice(statusIndex, 1)
      }
    }
  }

  drop(event: CdkDragDrop<player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      )
    }
    this.savePartyListOrder()
  }
  /* #endregion */

  /* #region Generic helpers */
  getRandomPercent(min: number, max: number): number {
    return (Math.floor(Math.random() * (max - min + 1)) + min) / 100
  }

  log(debugMessage: string): void {
    var timestamp: string = this.formatTimestamp(new Date())
    this.logs.push(`${timestamp}: ${debugMessage}`)
  }

  clone(arrayToClone: any): any {
    return JSON.parse(JSON.stringify(arrayToClone)) as typeof arrayToClone
  }
  convertTo2Digits(newNum: number) {
    return newNum.toString().padStart(2, '0')
  }
  formatTimestamp(timestamp: Date) {
    return (
        [
          timestamp.getFullYear(),
          this.convertTo2Digits(timestamp.getMonth() + 1),
          this.convertTo2Digits(timestamp.getDate()),
        ].join('-') + ' ' +
        [
          this.convertTo2Digits(timestamp.getHours()),
          this.convertTo2Digits(timestamp.getMinutes()),
          this.convertTo2Digits(timestamp.getSeconds()),
        ].join(':')
      )
  }
  /* #endregion */
}
