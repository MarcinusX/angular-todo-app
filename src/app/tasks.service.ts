import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Task } from './Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = 'http://localhost:9000/api/task';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  postTask(task: Task):Observable<Task> {
    return this.http.post<Task>(this.url, task, this.httpOptions);
  }

  updateTask(task: Task):Observable<Task> {
  return this.http.put<Task>(this.url, task, this.httpOptions);
  }

  getTasksWithParams(text: string, fromDate: Date, toDate: Date): Observable<Task[]> {
    let params = new HttpParams();
    if (text) {
      params.set("text", text);
    }
    if (fromDate) {
      params.set("fromDate", fromDate.getTime.toString());
    }
    if (toDate) {
      params.set("toDate", toDate.getTime.toString());
    }
    return this.http.get<Task[]>(this.url, {params: params});
  }
}
