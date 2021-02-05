import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../../model/user.class';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  title = 'User List';
  users: User[] = [];
  isAdmin: boolean = this.systemSvc.isAdmin();

  constructor(private userSvc: UserService, private systemSvc: SystemService) {}

  ngOnInit(): void {
    // populate list of users
    this.userSvc.getAll().subscribe(
      (resp) => {
        this.users = resp as User[];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
