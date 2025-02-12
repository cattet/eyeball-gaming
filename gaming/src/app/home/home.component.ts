import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
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
  imports: [CommonModule, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, CdkDropListGroup, CdkDropList, CdkDrag ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public playerData: player[] = [
    { id: 0, job: 'MCH', level: 90, name: 'Range Group1', debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' }, {id: 1, name: 'passed-vow', iconUrl: '/assets/passed-vow.png', duration: '1m'} ] },
    { id: 1, job: 'WAR', level: 90, name: 'Tank Group1', debuffs: [ {id: 0, name: 'vow', iconUrl: '/assets/vow.png', duration: '27' } ] },
    { id: 2, job: 'PLD', level: 90, name: 'Tank Group2', debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' } ] },
    { id: 3, job: 'WHM', level: 90, name: 'Healer Group1', debuffs: [ {id: 3, name: 'stack', iconUrl: '/assets/stack.png', duration: '42' } ] },
    { id: 4, job: 'SCH', level: 90, name: 'Healer Group2', debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' } ] },
    { id: 5, job: 'DRG', level: 90, name: 'Melee Group1', debuffs: [ {id: 2, name: 'spread', iconUrl: '/assets/spread.png', duration: '42' } ] },
    { id: 6, job: 'SMN', level: 90, name: 'Melee Group2', debuffs: [] },
    { id: 7, job: 'PCT', level: 90, name: 'Range Group2', debuffs: [ {id: 3, name: 'stack', iconUrl: '/assets/stack.png', duration: '42' } ] }
  ]

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
