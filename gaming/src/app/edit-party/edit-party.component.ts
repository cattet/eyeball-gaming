import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import * as Sim from '../interfaces'


@Component({
  selector: 'app-edit-party',
  imports: [CommonModule, MatDialogModule, FormsModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule],
  templateUrl: './edit-party.component.html',
  styleUrl: './edit-party.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPartyComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<EditPartyComponent>) {}

  readonly data = inject<Sim.EditPartyDialogData>(MAT_DIALOG_DATA);
  public workingCopy: Sim.Player[] = [];
  public revertCopy: Sim.Player[] = [];
  public baseCopy: Sim.Player[] = [];
  public validGroups: boolean = true;
  public validation: string = '';
  public confirmSave: boolean = false;
  
  ngOnInit(): void {
    this.workingCopy = this.clone(this.data.party);
    this.revertCopy = this.clone(this.data.party);
    this.baseCopy = this.clone(this.data.defaultParty);
  }
  
  save(): void {
    this.validateNames()
    this.matDialogRef.close(this.workingCopy);
  }

  cancel(): void {
    this.matDialogRef.close(this.revertCopy);
  }

  validateNames(): void {
    this.workingCopy.forEach(p => {
      let basePlayer: Sim.Player | undefined = this.baseCopy.find(b => b.id == p.id)
      if(p.name == '' && basePlayer) {
        p.name = basePlayer.name
      }
    })
  }

  onGroupChange(e: MatSelectChange): void {
    var groupOneCount: number = this.workingCopy.filter(p => p.group == 1).length;
    var groupTwoCount: number = this.workingCopy.filter(p => p.group == 2).length;
    this.validGroups = groupOneCount == groupTwoCount;

    if(!this.validGroups){
      this.validation = 'Uneven player groups';
    } else {
      this.validation = '';
    }
  }

  clone(arrayToClone: any): any {
    return JSON.parse(JSON.stringify(arrayToClone)) as typeof arrayToClone;
  }
}
