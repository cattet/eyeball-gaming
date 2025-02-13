import { ChangeDetectionStrategy, Component, inject, Input, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditPartyDialogData, player } from '../home/home.component';

@Component({
  selector: 'app-edit-party',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './edit-party.component.html',
  styleUrl: './edit-party.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPartyComponent implements OnInit {
  readonly data = inject<EditPartyDialogData>(MAT_DIALOG_DATA);
  public workingCopy: player[] = [];
  
  ngOnInit(): void {
    console.log('ng on init dialog!');
    this.workingCopy = this.clone(this.data.party);
  }

  onNameChange(e: Event) {
    console.log(e);
  }

  clone(arrayToClone: any): any {
    return JSON.parse(JSON.stringify(arrayToClone)) as typeof arrayToClone;
  }
}
