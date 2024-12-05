import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: { date: Date, task: string }[] = [];
  @Input() selectedDate: DateTime | null = null;
  @Output() taskAdded = new EventEmitter<{ date: Date, task: string }>();

  // Filtrowanie zadań na podstawie wybranego dnia
  get filteredTasks() {
    return this.tasks.filter(task =>
      new Date(task.date).toDateString() === new Date(this.selectedDate?.toJSDate() || '').toDateString()
    );
  }

  constructor(public dialog: MatDialog) {

  }

  // Otwarcie formularza do dodania zadania
  openDialog() {
    if (this.selectedDate) {
      const dialogRef = this.dialog.open(TaskFormComponent, {
        data: { selectedDate: this.selectedDate.toJSDate() }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.taskAdded.emit(result);
        }
      });
    }
  }

  // Usuwanie zadania
  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  sortTasks(ascending: boolean) {
    const compareFn = (a: { date: Date; task: string }, b: { date: Date; task: string }) => {
      const valueA = a.task.charAt(0).toLowerCase();
      const valueB = b.task.charAt(0).toLowerCase();
      if (valueA < valueB) {
        return ascending ? -1 : 1;
      }
      if (valueA > valueB) {
        return ascending ? 1 : -1;
      }
      return 0;
    };
    this.tasks.sort(compareFn);
  }
}
