import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NzGridModule} from 'ng-zorro-antd/grid'
import { NzInputModule } from 'ng-zorro-antd/input';
import { TodoAddBtnComponent } from '../todo-add-btn/todo-add-btn.component';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzGridModule, TodoAddBtnComponent],
  templateUrl: './todo-input.component.html'
})
export class TodoInputComponent {
  value: string = '';
  
}
