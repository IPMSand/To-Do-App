import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzResultModule} from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TodoInputComponent } from '../todo-input/todo-input.component';
import { TodoAddBtnComponent } from '../todo-add-btn/todo-add-btn.component';
import { TodoListViewComponent } from '../todo-list-view/todo-list-view.component';
import { TodoService } from '../services/todo.service';




@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,NzButtonModule, NzResultModule, NzIconModule, NzInputModule, TodoInputComponent, TodoAddBtnComponent ,TodoListViewComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  
})
export class TodoComponent implements OnInit {
  value: string = '';
  todos: any[] = [];
  addTodo(text: string){
    console.log(text);
  }
  constructor(private todoService: TodoService){}
  ngOnInit(): void{
    this.todoService.getTodos().subscribe({
      next: (response) =>{
        this.todos =response;
      },
      error: (err) =>{
        console.error('failed to fetch todo from nestjs')
      }
    })
  }

  // addTodo(text: string){
  //   console.log(text)
  // }
  
}
