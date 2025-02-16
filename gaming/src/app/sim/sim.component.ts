/* #region Imports */
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, OnInit, inject } from '@angular/core'
import { Event } from '@angular/router'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'

import { LocalStorageService } from '../services/local-storage.service'
import { xivNumberPipe } from './pipes/xivnumber.pipe'
import { xivDecimalPipe } from './pipes/xivdecimal.pipe'
import { ArenaComponent } from '../arena/arena.component'
import { EditPartyComponent } from '../edit-party/edit-party.component'
import { xivStatusComponent } from '../xiv-status/xiv-status.component'
import * as Constants from '../constants'
import * as Sim from '../interfaces'
import { FaqComponent } from '../faq/faq.component'
/* #endregion */

@Component({
  selector: 'app-sim',
  imports: [
    CommonModule, MatDialogModule, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatSlideToggleModule, MatIconModule, MatProgressBarModule, MatExpansionModule, CdkDropListGroup, CdkDropList, CdkDrag,
    xivNumberPipe, xivDecimalPipe, xivStatusComponent, ArenaComponent ],
  templateUrl: './sim.component.html',
  styleUrls: [
    './stylesheets/sim.component.scss',
    './stylesheets/sim.component.party.scss',
    './stylesheets/sim.component.playerbars.scss']
})
export class SimComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService){}
  readonly dialog = inject(MatDialog)
  public statusResetEmitter: EventEmitter<boolean> = new EventEmitter()
  public selectedPlayer: number = 0;
  public partyList: Sim.Player[] = []
  public solvedPlayers: Sim.Player[] = []
  public showAnswer: boolean = false

  ngOnInit() {
    this.randomizePartyState()
    // Player customizations
    this.loadPartyListNames()
    this.loadSelectedPlayer()
  }

  /* #region Component logic */
  randomizePartyState(): void {
    this.clearStatuses()
    this.assignWrothDebuffs()
    this.assignVowDebuffs()
    this.assignAdditionalStatuses()
    this.randomizePlayerResources()
    this.resetStatusDurations()
    this.solveSpots()
  }

  randomizePlayerResources(): void {
    this.partyList.forEach(p => {
      p.healthPercent = this.getRandomPercent(85, 100)
      p.shieldPercent = this.getRandomPercent(40, 90)
      p.manaPercent = this.getRandomPercent(80, 100)
    })
  }

  solveSpots(): void {
    var allPlayers: Sim.Player[] = this.clone(this.partyList)
    var spreadPlayers: Sim.Player[] =  allPlayers.filter(p => p.statuses.find(d => d.name == 'spread'))
    var stackPlayers: Sim.Player[] =  allPlayers.filter(p => p.statuses.find(d => d.name == 'stack'))
    var nothingPlayers: Sim.Player[] =  allPlayers.filter(p => !p.statuses.find(d => d.name == 'spread') && !p.statuses.find(d => d.name == 'stack'))

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

  updatePartyCustomizations(updatedParty: Sim.Player[]): void {
    if(!updatedParty) return

    updatedParty.forEach(updatedPlayer => {
      var partyListPlayer: Sim.Player | undefined = this.partyList.find(player => player.id == updatedPlayer.id)
      // Right now, updates only consist of player names
      if(partyListPlayer && partyListPlayer.name && partyListPlayer.name.length) {
        partyListPlayer.name = updatedPlayer.name
      }
    })
    this.savePartyListNames()
  }
  /* #endregion */

  /* #region Component logic helpers */
  clearStatuses(): void {
    if(!this.partyList.length) {
      let savedOrder: number[] | null = this.getPartyListOrder()
      let baseData: Sim.Player[] = this.clone(Constants.BASE_PLAYER_DATA)

      if(savedOrder) {
        savedOrder.forEach((id, index) => {
          // Reorder based on player preferences in local storage
          this.partyList[index] = this.clone(baseData.find((p: Sim.Player) => p.id == id))
        })
      } else {
        // Get a straight fresh clone of the base data
        this.partyList = baseData
      }
    }
    this.partyList.forEach(p => { p.statuses = []})
  }

  assignStatusesToUniquePlayers(statuses: Sim.Status[], players: Sim.Player[]): void {
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

  sortPlayersByPriority(players: Sim.Player[]): Sim.Player[] {
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
    for(let key in Constants.STATUS){
      let status: Sim.Status = Constants.STATUS[key]
      let validPlayer: Sim.Player | undefined = this.partyList.filter(p => p.job == status.job)[0]
      if(validPlayer) validPlayer.statuses.push(status)
    }

    // Mitigation and healing for everyone
    this.partyList.forEach(p => {
      p.statuses.push(Constants.STATUS['galvanize']);
      p.statuses.push(Constants.STATUS['veil']);
      p.statuses.push(Constants.STATUS['tempera']);
      p.statuses.push(Constants.STATUS['medica']);
      p.statuses.push(Constants.STATUS['tactician']);
    });
  }

  assignWrothDebuffs(): void {
    this.assignStatusesToUniquePlayers(Constants.WROTH_DEBUFFS, this.partyList);
  }

  assignVowDebuffs(): void {
    // Main tank will always have the vow
    var mainTank: Sim.Player | undefined = this.partyList.find(p => p.job == 'WAR');
    if(mainTank) mainTank.statuses.push(Constants.STATUS['vow']);
    // The vow could have been passed to the MT by any DPS player
    var dpsPlayers: Sim.Player[] = this.partyList.filter(p => Constants.DPS_JOBS.includes(p.job))
    this.assignStatusesToUniquePlayers([Constants.STATUS['vowPassed']], dpsPlayers);
  }
  /* #endregion */

  /* #region Local storage */
  savePartyListNames(): void {
    const customNames: Sim.CustomName[] = []
    this.partyList.forEach(p => {
      var name: Sim.CustomName = {id: p.id, name: p.name}
      customNames.push(name)
    })

    this.localStorageService.setItem(Constants.LOCAL_STORAGE_KEY['partyListNames'], customNames)
  }
  loadPartyListNames(): void {
    const customNames: Sim.CustomName[] | null = this.localStorageService.getItem<Sim.CustomName[]>(
      Constants.LOCAL_STORAGE_KEY['partyListNames']
    )
    customNames?.forEach(customName => {
      var player: Sim.Player | undefined = this.partyList.find(p => p.id == customName.id)
      if(player) {
        player.name = customName.name
      }
    })
  }
  savePartyListOrder(): void {
    const partyListOrder: number[] = this.partyList.map(p => p.id)
    const jobList: string[] = this.partyList.map(p => p.job)

    this.localStorageService.setItem(Constants.LOCAL_STORAGE_KEY['partyListOrder'], partyListOrder)
  }
  getPartyListOrder(): number[] | null {
    const partyListOrder: number[] | null = this.localStorageService.getItem<number[]>(
      Constants.LOCAL_STORAGE_KEY['partyListOrder']
    )
    return partyListOrder
  }
  selectAndSavePlayer(playerId: number): void {
    this.selectedPlayer = playerId
    this.localStorageService.setItem(Constants.LOCAL_STORAGE_KEY['selectedPlayer'], playerId)
  }
  loadSelectedPlayer(): void {
    const savedSelectedPlayer: number | null = this.localStorageService.getItem<number>(
      Constants.LOCAL_STORAGE_KEY['selectedPlayer']
    )
    if(savedSelectedPlayer) this.selectedPlayer = savedSelectedPlayer;
  }
  /* #endregion */

  /* #region Event handlers and emitters */
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditPartyComponent, {
      data: { 
        party: this.partyList,
        defaultParty: Constants.BASE_PLAYER_DATA,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.updatePartyCustomizations(result)
    })
  }

  openFaqDialog() {
    this.dialog.open(FaqComponent);
  }

  resetStatusDurations(): void {
    this.statusResetEmitter.emit(true);
  }

  onStatusExpire(e: Event, playerId: number, statusId: number): void {
    if(e) {
      let player: Sim.Player | undefined = this.partyList.find(p => p.id == playerId )
      if(player) {
        // Remove the expired status
        let statusIndex: number = player.statuses.findIndex(s => s.id == statusId)
        player.statuses.splice(statusIndex, 1)
      }
    }
  }

  drop(event: CdkDragDrop<Sim.Player[]>): void {
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
    var percent: number = (Math.floor(Math.random() * (max - min + 1)) + min) / 100;
    if(percent > .95) percent = 1 // Almost full bars don't look good
    return percent
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
