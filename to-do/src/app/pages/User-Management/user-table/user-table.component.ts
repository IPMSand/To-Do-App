import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message'; // Optional but great for feedback
import { UserService } from '../../../services/user.service';
 // Adjust path if necessary

// Interface matching your NestJS backend structure
interface UserTableItem {
  id: number;
  userName: string;
  email: string;
  taskCount: number;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    NzButtonModule, 
    NzDropDownModule, 
    NzIconModule, 
    NzInputModule, 
    NzTableModule
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  searchValue = '';
  visible = false;
  
  listOfData: UserTableItem[] = [];
  listOfDisplayData: UserTableItem[] = [];
  loading = false;

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.loading = true;
    
    // Fetch both users and counts in parallel
    forkJoin({
      users: this.userService.getUsers(),
      counts: this.userService.getTaskCount()
    }).subscribe({
      next: ({ users, counts }) => {
        // Map data together using userId as the link
        this.listOfData = users.map((user: any) => {
        const countObj = counts.find(c => c.id === user.id);
          return {
            userId: user.id,
            userName: user.userName,
            email: user.email,
            taskCount: countObj ? countObj.taskCount : 0
          };
        });
        
        
        this.listOfDisplayData = [...this.listOfData];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load user data', err);
        this.message.error('Could not load user list.');
        this.loading = false;
      }
    });
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.message.success('User deleted successfully');
        this.loadUserData(); // Reload list to update UI
      },
      error: (err) => {
        // This captures your backend restriction (e.g., if tasks aren't empty)
        console.error(err);
        this.message.error('Cannot delete user. Ensure all assigned tasks are completed.');
      }
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: UserTableItem) => item.userName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }
}