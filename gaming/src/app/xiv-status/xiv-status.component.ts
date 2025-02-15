import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'xiv-status',
  imports: [],
  templateUrl: './xiv-status.component.html',
  styleUrl: './xiv-status.component.scss'
})
export class xivStatusComponent implements OnInit {
  @Input() iconUrl: string = ''
  @Input() maxDuration: number = 0
  @Output() expire = new EventEmitter();

  public duration: number = 0

  ngOnInit(): void {
    this.duration = this.maxDuration
    setInterval(() => {
      if(this.duration > 0) {
        this.duration--;
      } else {
        this.expire.emit(true);
      }
    }, 1000)
  }
}
