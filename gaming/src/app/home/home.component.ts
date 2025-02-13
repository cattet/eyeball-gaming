import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
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
  group: number;
  lineUpOrder: number;
  debuffs: debuff[];
}
export interface debuff {
  id: number;
  name: string;
  iconUrl: string;
  duration: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatProgressBarModule, CdkDropListGroup, CdkDropList, CdkDrag, xivNumberPipe, xivDecimalPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public playerData: player[] = [
    { id: 0, job: 'MCH', level: 90, name: 'Range Group1', maxHealth: 66791, healthPercent: 1, manaPercent: 1, aggroPercent: 0.2, aggroOrder: 6, group: 1, lineUpOrder: 0, debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' }, {id: 1, name: 'passed-vow', iconUrl: '/assets/passed-vow.png', duration: '1m'} ] },
    { id: 1, job: 'WAR', level: 90, name: 'Tank Group1', maxHealth: 94171, healthPercent: 0.8, manaPercent: 1, aggroPercent: 0.8, aggroOrder: 2, group: 1, lineUpOrder: 0, debuffs: [ {id: 0, name: 'vow', iconUrl: '/assets/vow.png', duration: '27' } ] },
    { id: 2, job: 'PLD', level: 90, name: 'Tank Group2', maxHealth: 96236, healthPercent: 0.65, manaPercent: 1, aggroPercent: 1, aggroOrder: 1, group: 2, lineUpOrder: 0, debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' } ] },
    { id: 3, job: 'WHM', level: 90, name: 'Healer Group1', maxHealth: 61056, healthPercent: 1, manaPercent: .777, aggroPercent: 0.1, aggroOrder: 7, group: 1, lineUpOrder: 0, debuffs: [ {id: 3, name: 'stack', iconUrl: '/assets/stack.png', duration: '42' } ] },
    { id: 4, job: 'SCH', level: 90, name: 'Healer Group2', maxHealth: 61056, healthPercent: 1, manaPercent: .95, aggroPercent: 0.1, aggroOrder: 8, group: 2, lineUpOrder: 0, debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' } ] },
    { id: 5, job: 'DRG', level: 90, name: 'Melee Group1', maxHealth: 67602, healthPercent: 1, manaPercent: 1, aggroPercent: 0.3, aggroOrder: 4, group: 1, lineUpOrder: 0, debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' } ] },
    { id: 6, job: 'SMN', level: 90, name: 'Melee Group2', maxHealth: 58116, healthPercent: 1, manaPercent: .96, aggroPercent: 0.2, aggroOrder: 5, group: 2, lineUpOrder: 0, debuffs: [] },
    { id: 7, job: 'PCT', level: 90, name: 'Range Group2', maxHealth: 61081, healthPercent: 1, manaPercent: .95, aggroPercent: 0.4, aggroOrder: 3, group: 2, lineUpOrder: 0, debuffs: [ {id: 3, name: 'stack', iconUrl: '/assets/stack.png', duration: '42' } ] }
  ]
  public solvedPlayers: player[] = [];

  ngOnInit() {
    this.assignSpots();
  }

  assignSpots(): void {
    this.solvedPlayers = this.playerData.slice();
    this.shuffle(this.solvedPlayers);
    console.log(this.solvedPlayers);
  }

  shuffle(array: player[]): void {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  calculateSpots(): void {
    this.playerData.forEach(player => {
      switch(player.lineUpOrder){
        case 1: 
          this.solvedPlayers[1] = player;
          break;
        case 2:
          this.solvedPlayers[2] = player;
          break;
        case 3:
          this.solvedPlayers[3] = player;
          break;
        case 4:
          this.solvedPlayers[4] = player;
          break;
        case 5:
          this.solvedPlayers[5] = player;
          break;
        case 6:
          this.solvedPlayers[6] = player;
          break;
        case 7:
          this.solvedPlayers[7] = player;
          break;
        case 8:
          this.solvedPlayers[8] = player;
          break;
        default:
          break;
      }
    });
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

}
