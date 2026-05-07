import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzResultModule} from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TodoInputComponent } from '../todo-input/todo-input.component';
import { TodoAddBtnComponent } from '../todo-add-btn/todo-add-btn.component';





@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,NzButtonModule, NzResultModule, NzIconModule, NzInputModule, TodoInputComponent, TodoAddBtnComponent ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  
})
export class TodoComponent {
  value: string = '';

  onSearch(value:string): void{
    console.log('okk', value)
  }
}
