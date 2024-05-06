import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../interface/Task.modal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  fetchTasks() {
    throw new Error('Method not implemented.');
  }

  private apiurl="http://localhost:3000/Task"
  constructor(private _http:HttpClient) { }
  
  getTaskData(){
    return this._http.get<Task[]>(this.apiurl);
 }
 getTask(){
  return this._http.get<Task[]>(this.apiurl);
}

  addTask(data:Task){
  return this._http.post(this.apiurl,data)
  }
  deleteTask(id: number):Observable<any> {
    return this._http.delete(`${this.apiurl}/${id}`);
  }
  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiurl}/${task.id}`;
    return this._http.put<Task>(url, task);
  }
  getTasksByStatus(status: string): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.apiurl}?status=${status}`);
  }
  getchartinfoByPriority(priority: string): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.apiurl}?priority=${priority}`);
  }
  updateUserDetails(id: number, newData: any) {
    return this._http.put(`${this.apiurl}/${id}`, newData);
  }
  updateTaskData(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/Task/${id}`, data);
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${this.apiurl}/${id}`;
    return this._http.get<Task>(url);
  }
 

}
