import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xiv-status',
  imports: [CommonModule],
  templateUrl: './xiv-status.component.html',
  styleUrl: './xiv-status.component.scss'
})
export class xivStatusComponent implements OnInit, OnDestroy {
  @Input() iconUrl: string = ''
  @Input() maxDuration: number = 0
  @Input() resetListener: EventEmitter<boolean> = new EventEmitter()
  @Output() expire = new EventEmitter()

  public duration: number = 0
  private timerId: any

  ngOnInit(): void {
    this.resetDuration()

    if(this.resetListener){
      this.resetListener.subscribe(data => {
        this.resetDuration()
      })
    }
  }

  ngOnDestroy(): void {
    this.resetDuration()
  }

  resetDuration(): void {
    clearInterval(this.timerId)
    this.duration = this.maxDuration;
    this.timerId = setInterval(() => {
      if(this.duration > 0) {
        this.duration--
      } else {
        this.expire.emit(true)
      }
    }, 1000)
  }
}
