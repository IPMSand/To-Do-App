import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-todo-add-btn',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzIconModule, NzRadioModule, NzGridModule],
  templateUrl: './todo-add-btn.component.html',
  styleUrls: ['./todo-add-btn.component.css']
})
export class TodoAddBtnComponent {
  size: NzButtonSize = 'large';

  @Output() btnClick = new EventEmitter<void>();
  onClick(): void{
    this.btnClick.emit();
  }
  
}
