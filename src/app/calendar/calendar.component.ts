import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {TaskFormComponent} from '../task-form/task-form.component';
import {TaskListComponent} from '../task-list/task-list.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [CommonModule,TaskFormComponent,TaskListComponent]
})
export class CalendarComponent {
  today: DateTime = DateTime.local();
  firstDayOfMonth: DateTime = this.today.startOf('month');
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  daysOfMonth: DateTime[] = [];
  tasks: { date: Date, task: string }[] = []; // Tablica przechowująca zadania

  constructor(public dialog: MatDialog) {
    this.generateDaysOfMonth();
  }

  //Generowanie kalendarza
  generateDaysOfMonth() {
    this.daysOfMonth = [];
    let start = this.firstDayOfMonth.startOf('week');
    let end = this.firstDayOfMonth.endOf('month').endOf('week');
    let current = start;

    while (current <= end) {
      this.daysOfMonth.push(current);
      current = current.plus({ days: 1 });
    }
  }
  //Zmiana koloru dni nastepnego miesiaca
  isCurrentMonth(date: DateTime): boolean {
    return date.hasSame(this.firstDayOfMonth, 'month');
  }

  //Poprzedni miesiac
  previousMonth(){
    this.firstDayOfMonth = this.firstDayOfMonth.minus({ months: 1 });
    this.generateDaysOfMonth();
  }

  //Nastepny miesiac
  nextMonth(){
    this.firstDayOfMonth = this.firstDayOfMonth.plus({ months: 1 });
    this.generateDaysOfMonth();
  }

  //Otwieranie dialogu
  openDialog(day: DateTime): void {
    console.log('Opening dialog for day:', day.toString());

    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        selectedDate: day.toJSDate()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks.push(result);
        console.log('Task added:', result);
      }
    });
  }
}
