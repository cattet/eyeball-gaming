import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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

export interface player {
  id: number;
  job: string;
  level: number;
  name: string;
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

const basePlayerData: player[] = [
  { id: 0, job: 'MCH', level: 90, name: 'Range Group1', maxHealth: 66791, healthPercent: 1, manaPercent: 1, aggroPercent: 0.2, aggroOrder: 6, jobPriority: 2, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 1, job: 'WAR', level: 90, name: 'Tank Group1', maxHealth: 94171, healthPercent: 0.8, manaPercent: 1, aggroPercent: 0.8, aggroOrder: 2, jobPriority: 4, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 2, job: 'PLD', level: 90, name: 'Tank Group2', maxHealth: 96236, healthPercent: 0.65, manaPercent: 1, aggroPercent: 1, aggroOrder: 1, jobPriority: 4, groupPriority: 1, lineUpOrder: 0, debuffs: [] },
  { id: 3, job: 'WHM', level: 90, name: 'Healer Group1', maxHealth: 61056, healthPercent: 1, manaPercent: .777, aggroPercent: 0.1, aggroOrder: 7, jobPriority: 3, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 4, job: 'SCH', level: 90, name: 'Healer Group2', maxHealth: 61056, healthPercent: 1, manaPercent: .95, aggroPercent: 0.1, aggroOrder: 8, jobPriority: 3, groupPriority: 1, lineUpOrder: 0, debuffs: [] },
  { id: 5, job: 'DRG', level: 90, name: 'Melee Group1', maxHealth: 67602, healthPercent: 1, manaPercent: 1, aggroPercent: 0.3, aggroOrder: 4, jobPriority: 1, groupPriority: 2, lineUpOrder: 0, debuffs: [] },
  { id: 6, job: 'SMN', level: 90, name: 'Melee Group2', maxHealth: 58116, healthPercent: 1, manaPercent: .96, aggroPercent: 0.2, aggroOrder: 5, jobPriority: 1, groupPriority: 1, lineUpOrder: 0, debuffs: [] },
  { id: 7, job: 'PCT', level: 90, name: 'Range Group2', maxHealth: 61081, healthPercent: 1, manaPercent: .95, aggroPercent: 0.4, aggroOrder: 3, jobPriority: 2, groupPriority: 1, lineUpOrder: 0, debuffs: [] }
]

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatSlideToggleModule, MatIconModule, MatProgressBarModule, CdkDropListGroup, CdkDropList, CdkDrag, xivNumberPipe, xivDecimalPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public wrothDebuffs: debuff[] = [
    {id: 0, name: 'spread', iconUrl: '/assets/spread.png', duration: '23' },
    {id: 0, name: 'spread', iconUrl: '/assets/spread.png', duration: '23' },
    {id: 0, name: 'spread', iconUrl: '/assets/spread.png', duration: '23' },
    {id: 0, name: 'spread', iconUrl: '/assets/spread.png', duration: '23' },
    {id: 1, name: 'stack', iconUrl: '/assets/stack.png', duration: '23' },
    {id: 1, name: 'stack', iconUrl: '/assets/stack.png', duration: '23' }
  ]

  public miscDebuffs: debuff[] = [
    {id: 2, name: 'passed-vow', iconUrl: '/assets/passed-vow.png', duration: '1m'},
    {id: 3, name: 'vow', iconUrl: '/assets/vow.png', duration: '30' }
  ]

  public partyList: player[] = [];
  public solvedPlayers: player[] = [];
  public showAnswer: boolean = false;

  ngOnInit() {
    this.shuffleDebuffs();
  }

  shuffleDebuffs(): void {
    this.assignDebuffs();
    this.solveSpots();
  }

  assignDebuffs(): void {
    // Get a fresh copy of player data
    this.partyList = this.clone(basePlayerData);
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

    console.log(this.solvedPlayers);
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

  clone(arrayToClone: any): any {
    return JSON.parse(JSON.stringify(arrayToClone)) as typeof arrayToClone;
  }

}
