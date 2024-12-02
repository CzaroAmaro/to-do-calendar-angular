import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TaskFormComponent {
  selectedDate: Date; // Typ Date
  task: string = '';

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedDate: Date }
  ) {
    if (data && data.selectedDate) {
      this.selectedDate = new Date(data.selectedDate);
    } else {
      this.selectedDate = new Date();
    }
  }

  submitForm(event: Event) {
    event.preventDefault();
    console.log('Zapisano zadanie na dzień:', this.selectedDate);
    this.dialogRef.close({ date: this.selectedDate, task: this.task });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
