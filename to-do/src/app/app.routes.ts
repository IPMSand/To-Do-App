import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoAddBtnComponent } from './todo-add-btn/todo-add-btn.component';

export const routes: Routes = [
    {path: '', component:TodoComponent},
    // // {path: '', component:TodoInputComponent}
    // {path: '', component:TodoAddBtnComponent}
];
