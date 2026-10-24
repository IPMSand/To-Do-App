import { Routes } from '@angular/router';
import { UserComponent } from './pages/User-Management/user/user.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { TodoComponent } from './pages/Todo-Management/todo/todo.component';
// import { UserComponent } from './user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: 'todos', pathMatch: 'full' },
      { path: 'todos', component: TodoComponent },
      { path: 'users', component: UserComponent }
    ]
  }
];