import { Component } from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzResultModule} from 'ng-zorro-antd/result'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NzButtonModule, NzResultModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

}
