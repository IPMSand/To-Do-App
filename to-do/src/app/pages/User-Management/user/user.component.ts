import { Component } from '@angular/core'; // a page to act as User- amangement all component page
import { UserTableComponent } from '../user-table/user-table.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
