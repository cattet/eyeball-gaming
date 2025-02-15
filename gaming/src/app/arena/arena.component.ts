
import { Component, EventEmitter, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { player } from '../sim/sim.component';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-arena',
  imports: [CommonModule, MatIconModule],
  templateUrl: './arena.component.html',
  styleUrls: [
    './arena.component.scss'
  ]
})
export class ArenaComponent implements OnInit {
  @Input() selectedPlayer: number = 0;
  @Input() solvedPlayers: player[] = []
  @Input() resetListener: EventEmitter<boolean> = new EventEmitter()
  public showSolution: boolean = false;
  public selectedLocation: number = 0;

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