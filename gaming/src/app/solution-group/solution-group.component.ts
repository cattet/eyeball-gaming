import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../interfaces';

@Component({
  selector: 'solution-group',
  imports: [CommonModule, MatIconModule],
  templateUrl: './solution-group.component.html',
  styleUrl: './solution-group.component.scss'
})
export class SolutionGroupComponent {
  @Input() type: 'spread' | 'stack' = 'spread'
  @Input() location: number = 0
  @Input() players: Player[] = []
  @Input() selectedLocation: number = 0
  @Input() selectedPlayer: number = 0
  @Input() showSolution: boolean = false
}

