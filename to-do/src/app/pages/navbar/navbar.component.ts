import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TodoComponent } from '../Todo-Management/todo/todo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, TodoComponent, RouterLink,RouterLinkActive, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {}
