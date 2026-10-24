import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list-view',
  standalone: true,
  // encapsulation: ViewEncapsulation.None,
  imports: [NzListModule, NzTypographyModule, NzMessageModule, CommonModule],
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.css']
})
export class TodoListViewComponent {

  @Input() todoData: any[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onToggleComplete = new EventEmitter<any>();

  constructor(public msg: NzMessageService) {}
  
  emitDelete(id: number){
    this.msg.warning('Item deleted');
    this.onDelete.emit(id);
  }

  emitToggle(item: any){
    this.msg.info(item.isCompleted? 'Marked active' : 'Marked Completd');
    this.onToggleComplete.emit(item);
  }
}
