import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = 'http://localhost:3000/todo';

  constructor(private http : HttpClient) { }

  // fetch data from nestjs
  getTodos(): Observable<any>{
    return this.http.get<any[]>(this.apiURL);
  }
}
