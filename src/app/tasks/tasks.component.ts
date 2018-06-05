import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Task';
import { TasksService } from '../tasks.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  task = new Task();
  tasks: Task[];
  date = new FormControl();// = new FormControl(new Date());
  search = "";
  searchFromDate = new FormControl();
  searchToDate = new FormControl();

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.getTasks();
  }


  getTasks() {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.tasks.sort((a, b) => a.completed - b.completed);
    });
  }

  onTaskCheck(task: Task) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task).subscribe(result => {
      this.getTasks();
    })
    // this.tasks.find(t => t === task).completed = !task.completed;
    // alert(JSON.stringify(this.tasks));
  }

  onSubmit() {
    // alert("Thanks for submitting! Data: " + JSON.stringify(this.task));
    this.task.completed = false;
    if (this.date.value) {
      this.task.deadline = (this.date.value as Date).getTime();
    }
    console.log(this.date.value);
    this.tasksService.postTask(this.task).subscribe(result => {
      this.getTasks();
    })
  }

  onSubmitSearch() {
    this.tasksService
      .getTasksWithParams(this.search, this.searchFromDate.value, this.searchToDate.value)
      .subscribe(tasks => {
        this.tasks = tasks;
        this.tasks.sort((a, b) => a.completed - b.completed);
      })
  }

  clear() {
    this.getTasks();
    this.search = "";
    this.searchFromDate = new FormControl();
    this.searchToDate = new FormControl();
  }

}
