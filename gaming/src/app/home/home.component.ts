import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { xivNumberPipe } from './pipes/xivnumber.pipe';
import { xivDecimalPipe } from './pipes/xivdecimal.pipe';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { LocalStorageService } from '../services/local-storage.service';
import { EditPartyComponent } from '../edit-party/edit-party.component';

export interface player {
  id: number;
  job: string;
  level: number;
  name: string;
  group: number;
  maxHealth: number;
  healthPercent: number;
  manaPercent: number;
  aggroPercent: number;
  aggroOrder: number;
  jobPriority: number;
  groupPriority: number;
  lineUpOrder: number;
  debuffs: debuff[];
}
export interface debuff {
  id: number;
  name: string;
  iconUrl: string;
  duration: string;
}
export interface customName {
  id: number;
  name: string;
}
export interface EditPartyDialogData {
  party: player[];
  defaultParty: player[];
}

const LOCALSTORAGEKEYS = {
  'debugExpanded': 'debug-expanded',
  'partyListOrder': 'user-party-list-order',
  'partyListNames': 'user-party-list-names'
};
const BASEPLAYERDATA: player[] = [
  { id: 0, job: 'MCH', level: 90, name: 'Range Group1', group: 1, maxHealth: 66791, healthPercent: 1, manaPercent: 1, aggroPercent: 0.2, aggroOrder: 6, jobPriority: 2, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 1, job: 'WAR', level: 90, name: 'Tank Group1', group: 1, maxHealth: 94171, healthPercent: 0.8, manaPercent: 1, aggroPercent: 0.8, aggroOrder: 2, jobPriority: 4, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 2, job: 'PLD', level: 90, name: 'Tank Group2', group: 2, maxHealth: 96236, healthPercent: 0.65, manaPercent: 1, aggroPercent: 1, aggroOrder: 1, jobPriority: 4, groupPriority: 1, lineUpOrder: 0, debuffs: [] },
  { id: 3, job: 'WHM', level: 90, name: 'Healer Group1', group: 1, maxHealth: 61056, healthPercent: 1, manaPercent: .777, aggroPercent: 0.1, aggroOrder: 7, jobPriority: 3, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 4, job: 'SCH', level: 90, name: 'Healer Group2', group: 2, maxHealth: 61056, healthPercent: 1, manaPercent: .95, aggroPercent: 0.1, aggroOrder: 8, jobPriority: 3, groupPriority: 1, lineUpOrder: 0, debuffs: [] },
  { id: 5, job: 'DRG', level: 90, name: 'Melee Group1', group: 1, maxHealth: 67602, healthPercent: 1, manaPercent: 1, aggroPercent: 0.3, aggroOrder: 4, jobPriority: 1, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 6, job: 'SMN', level: 90, name: 'Melee Group2', group: 2, maxHealth: 58116, healthPercent: 1, manaPercent: .96, aggroPercent: 0.2, aggroOrder: 5, jobPriority: 1, groupPriority: 1, lineUpOrder: 0, debuffs: [] },
  { id: 7, job: 'PCT', level: 90, name: 'Range Group2', group: 2, maxHealth: 61081, healthPercent: 1, manaPercent: .95, aggroPercent: 0.4, aggroOrder: 3, jobPriority: 2, groupPriority: 1, lineUpOrder: 0, debuffs: [] }
]

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatDialogModule, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatSlideToggleModule, MatIconModule, MatProgressBarModule, MatExpansionModule, CdkDropListGroup, CdkDropList, CdkDrag, xivNumberPipe, xivDecimalPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService){
  }

  public wrothDebuffs: debuff[] = [
    {id: 0, name: 'spread', iconUrl: 'assets/spread.png', duration: '23' },
    {id: 0, name: 'spread', iconUrl: 'assets/spread.png', duration: '23' },
    {id: 0, name: 'spread', iconUrl: 'assets/spread.png', duration: '23' },
    {id: 0, name: 'spread', iconUrl: 'assets/spread.png', duration: '23' },
    {id: 1, name: 'stack', iconUrl: 'assets/stack.png', duration: '23' },
    {id: 1, name: 'stack', iconUrl: 'assets/stack.png', duration: '23' }
  ]

  public miscDebuffs: debuff[] = [
    {id: 2, name: 'passed-vow', iconUrl: 'assets/passed-vow.png', duration: '1m'},
    {id: 3, name: 'vow', iconUrl: 'assets/vow.png', duration: '30' }
  ]

  public partyList: player[] = [];
  public solvedPlayers: player[] = [];
  public showAnswer: boolean = false;
  public showLogs: boolean = false;
  public logs: string[] = [];
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.loadDebugPanelState();
    this.shuffleDebuffs();
    this.loadPartyListNames();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditPartyComponent, {
      data: { 
        party: this.partyList,
        defaultParty: BASEPLAYERDATA,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateParty(result);
    });
  }

  updateParty(updatedParty: player[]): void {
    updatedParty.forEach(updatedPlayer => {
      var partyListPlayer: player | undefined = this.partyList.find(player => player.id == updatedPlayer.id);
      // Right now, updates only consist of player names
      if(partyListPlayer && partyListPlayer.name && partyListPlayer.name.length) {
        partyListPlayer.name = updatedPlayer.name;
      }
    });
    this.savePartyListNames();
  }

  shuffleDebuffs(): void {
    this.assignDebuffs();
    this.solveSpots();
  }

  assignDebuffs(): void {
    // Clean out the debuffs
    if(!this.partyList.length) {
      var savedOrder: number[] | null = this.getPartyListOrder();
      if(savedOrder) {
        savedOrder.forEach((id, index) => {
          // Reorder based on player preferences in local storage
          this.partyList[index] = this.clone(BASEPLAYERDATA.find((p: player) => p.id == id));
        })
      } else {
        // Get a straight fresh clone of the base data
        this.partyList = this.clone(BASEPLAYERDATA);
      }
    }
    this.partyList.forEach(p => { p.debuffs = []});

    var workingPlayerIds: number[] = this.partyList.map(p => p.id);
   
    this.wrothDebuffs.forEach(debuff => {
      // Take a random player from our working players list
      const index = Math.floor(Math.random() * workingPlayerIds.length);
      var luckyPlayerId: number = workingPlayerIds[index];

      // Copy debuff into actual player data
      var partyPlayer = this.partyList.find(p => p.id == luckyPlayerId);
      if(partyPlayer) {
        partyPlayer.debuffs = [debuff];
      }

      // Remove the player from our working array to assign debuffs to other players only
      workingPlayerIds.splice(index, 1);
    });
  }

  solveSpots(){
    var allPlayers: player[] = this.clone(this.partyList);
    var spreadPlayers: player[] =  allPlayers.filter(p => p.debuffs.find(d => d.name == 'spread'));
    var stackPlayers: player[] =  allPlayers.filter(p => p.debuffs.find(d => d.name == 'stack'));
    var nothingPlayers: player[] =  allPlayers.filter(p => !p.debuffs.find(d => d.name == 'spread') && !p.debuffs.find(d => d.name == 'stack'));

    spreadPlayers = this.sortPlayersByPriority(spreadPlayers);
    stackPlayers = this.sortPlayersByPriority(stackPlayers);
    nothingPlayers = this.sortPlayersByPriority(nothingPlayers);
    
    this.solvedPlayers = [];
    this.solvedPlayers = this.solvedPlayers.concat(spreadPlayers);
    this.solvedPlayers.push(stackPlayers[0]);
    this.solvedPlayers.push(nothingPlayers[0]);
    this.solvedPlayers.push(stackPlayers[1]);
    this.solvedPlayers.push(nothingPlayers[1]);
  }

  drop(event: CdkDragDrop<player[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.savePartyListOrder();
  }

  sortPlayersByPriority(players: player[]): player[] {
    return players.sort((a, b) => {
      if (a.jobPriority > b.jobPriority) return 1;
      if (a.jobPriority < b.jobPriority) return -1;
      if (a.groupPriority > b.groupPriority) return 1;
      if (a.groupPriority < b.groupPriority) return -1;
      return 0;
    });
  }

  log(debugMessage: string): void {
    var timestamp: string = this.formatTimestamp(new Date());
    this.logs.push(`${timestamp}: ${debugMessage}`);
  }




  saveDebugPanelState(expanded: boolean): void {
    this.localStorageService.setItem(LOCALSTORAGEKEYS.debugExpanded, expanded);
  }
  loadDebugPanelState(): void {
    const debugExpanded: boolean | null = this.localStorageService.getItem<boolean>(
      LOCALSTORAGEKEYS.debugExpanded
    );
    if(debugExpanded){
      this.showLogs = debugExpanded;
    } else {
      this.showLogs = false;
    }
  }
  savePartyListNames(): void {
    const customNames: customName[] = [];
    this.partyList.forEach(p => {
      var name: customName = {id: p.id, name: p.name};
      customNames.push(name);
    });

    this.localStorageService.setItem(LOCALSTORAGEKEYS.partyListNames, customNames);
    this.log('Custom names saved.');
  }
  loadPartyListNames(): void {
    const customNames: customName[] | null = this.localStorageService.getItem<customName[]>(
      LOCALSTORAGEKEYS.partyListNames
    );
    customNames?.forEach(customName => {
      var player: player | undefined = this.partyList.find(p => p.id == customName.id);
      if(player) {
        player.name = customName.name;
      }
    });
  }
  savePartyListOrder(): void {
    const partyListOrder: number[] = this.partyList.map(p => p.id);
    const jobList: string[] = this.partyList.map(p => p.job);

    this.localStorageService.setItem(LOCALSTORAGEKEYS.partyListOrder, partyListOrder);
    this.log('Custom party list order saved. ' + jobList.toString());
  }
  getPartyListOrder(): number[] | null {
    const partyListOrder: number[] | null = this.localStorageService.getItem<number[]>(
      LOCALSTORAGEKEYS.partyListOrder
    );
    return partyListOrder;
  }

  clone(arrayToClone: any): any {
    return JSON.parse(JSON.stringify(arrayToClone)) as typeof arrayToClone;
  }
  convertTo2Digits(newNum: number) {
    return newNum.toString().padStart(2, '0');
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
      );
  }
}
