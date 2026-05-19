import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = 'http://localhost:3000/todo';

  constructor(private http : HttpClient) { }

  // GET - TODO
  getTodos(): Observable<any>{
    return this.http.get<any[]>(this.apiURL);
  }

  // POST - TODO
  createTodo(todoData: {taskName: string;
    isCompleted: boolean; isCreatedDay: Date}
  ): Observable<any>{
    return this.http.post<any>(this.apiURL, todoData)
  }

  
  // UPDATE - TODO
  updateTodoStatus(id: number, isCompleted: boolean):Observable<any>{
    return this.http.patch<any>(`${this.apiURL}/${id}`, { isCompleted });
  };

  // DELETE - TODO
  deleteTodo(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
  }
