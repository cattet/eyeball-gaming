
import { Component, EventEmitter, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import * as Sim from '../interfaces'
import { SolutionGroupComponent } from "../solution-group/solution-group.component";


@Component({
  selector: 'arena',
  imports: [CommonModule, MatIconModule, MatSlideToggleModule, SolutionGroupComponent],
  templateUrl: './arena.component.html',
  styleUrls: [
    './arena.component.scss'
  ]
})
export class ArenaComponent implements OnInit {
  @Input() selectedPlayer: number = 0;
  @Input() solvedPlayers: Sim.Player[] = []
  @Input() resetListener: EventEmitter<boolean> = new EventEmitter()
  public showSolution: boolean = false;
  public selectedLocation: number = 0;
  public selectedLoat: number = 1;
  public showWaymarks: boolean = false;

  ngOnInit(): void {
    if(this.resetListener){
      this.resetListener.subscribe(data => {
        this.resetSelection()
      })
    }
  }

  resetSelection(): void {
    this.selectedLocation = 0
    this.showSolution = false
  }

  selectLocation(location: number): void {
    this.selectedLocation = location
    this.showSolution = true
  }
}