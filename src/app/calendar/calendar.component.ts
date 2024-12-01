import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CalendarComponent {
  today: DateTime = DateTime.local();
  firstDayOfMonth: DateTime = this.today.startOf('month');
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  daysOfMonth: DateTime[] = [];

  constructor() {
    this.generateDaysOfMonth();
  }

  // Funkcja do generowania dni w miesiącu
  generateDaysOfMonth() {
    const start = this.firstDayOfMonth.startOf('week'); // Pierwszy dzień widoczny w kalendarzu
    const end = this.firstDayOfMonth.endOf('month').endOf('week'); // Ostatni dzień widoczny w kalendarzu
    let current = start;

    while (current <= end) {
      this.daysOfMonth.push(current);
      current = current.plus({ days: 1 }); // Przechodzimy do kolejnego dnia
    }
  }
}
