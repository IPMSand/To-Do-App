import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = 'http://localhost:3000/todo';

  constructor(private http : HttpClient) { }

  // GET - TODO -> get all tasks
  getTodos(): Observable<any>{
    return this.http.get<any[]>(this.apiURL);
  }

  // POST -create a new task
  createTodo(todoData: {taskName: string;
    isCompleted: boolean; isCreatedDay: Date}
  ): Observable<any>{
    return this.http.post<any>(this.apiURL, todoData)
  }

  
  // UPDATE - update the taks as done
  updateTodoStatus(id: number, isCompleted: boolean):Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/${id}`, { isCompleted });
  };

  // Assign task to a user (Many tasks to One user relation)
  assignTask(todoId: number, userId: number): Observable<any> {
  const body = { userId: userId }; 
  return this.http.patch<any>(`${this.apiURL}/${todoId}/assign`, body);
 }

 // get tasks specific to the user
 getTodosByUser(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiURL}/${userId}/all-todos`);
 }

  // DELETE - remove the task
  deleteTodo(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
  }
