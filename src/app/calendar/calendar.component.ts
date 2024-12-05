import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent]
})
export class CalendarComponent {
  today: DateTime = DateTime.local();
  firstDayOfMonth: DateTime = this.today.startOf('month');
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  daysOfMonth: DateTime[] = [];
  selectedDate: DateTime | null = null;
  tasks: { date: Date, task: string }[] = [];  // Przechowujemy wszystkie zadania

  constructor(public dialog: MatDialog) {
    this.generateDaysOfMonth();
  }

  // Generowanie dni w miesiącu
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

  // Wybór dnia i ustawienie na nim zadań
  selectDay(day: DateTime) {
    this.selectedDate = day;
  }

  // Dodawanie zadania do wybranego dnia
  addTaskToSelectedDay(task: { date: Date, task: string }) {
    if (this.selectedDate) {
      this.tasks.push({
        date: this.selectedDate.toJSDate(),  // Konwertujemy DateTime na Date
        task: task.task
      });
    }
  }

  // Otwarcie formularza do dodania zadania
  openDialog(): void {
    if (this.selectedDate) {
      const dialogRef = this.dialog.open(TaskFormComponent, {
        data: {
          selectedDate: this.selectedDate.toJSDate()  // Konwertujemy DateTime na Date
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addTaskToSelectedDay(result);
        }
      });
    }
  }

  // Sprawdzanie, czy dany dzień jest w tym miesiącu
  isCurrentMonth(date: DateTime): boolean {
    return date.hasSame(this.firstDayOfMonth, 'month');
  }

  // Przechodzenie do poprzedniego miesiąca
  previousMonth() {
    this.firstDayOfMonth = this.firstDayOfMonth.minus({ months: 1 });
    this.generateDaysOfMonth();
  }

  // Przechodzenie do następnego miesiąca
  nextMonth() {
    this.firstDayOfMonth = this.firstDayOfMonth.plus({ months: 1 });
    this.generateDaysOfMonth();
  }

  currentMonth(date: DateTime):boolean {
    return date.hasSame(this.firstDayOfMonth, 'month');
  }
}
