import {Component, Input, Output} from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: { date: Date, task: string }[] = [];

  removeTask(index: number){
    this.tasks.splice(index, 1);
  }


}
