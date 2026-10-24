import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = 'http://localhost:3000/user';
  constructor(private http : HttpClient) { }

  // GET - USERS
  getUsers(): Observable<any>{
    return this.http.get<any[]>(this.apiURL);
  }

  // GET - Task-Count
  getTaskCount(): Observable<Array<{ id: number; taskCount: number }>> {
  return this.http.get<Array<{ id: number; taskCount: number }>>(`${this.apiURL}/task-count`);
}

  // GET - Find user via id
  getUserById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiURL}/${id}`);
}

  // POST - Create new user
  createUser(userData: {userName: string; email: string;}): Observable<any>{
    return this.http.post<any>(this.apiURL, userData)
  }

  // Delete user (only if all the assigned tasks are done || or assigned task empty)
  deleteUser(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }
}
