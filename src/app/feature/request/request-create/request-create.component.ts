import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css'],
})
export class RequestCreateComponent implements OnInit {
  title = 'Request Create';
  submitBtnTitle = 'Create';
  request: Request = new Request();
  user: User = new User();

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.systemSvc.loggedInUser;
  }

  save() {
    // set the user of this request to currently loggedin user
    this.request.user = this.user;
    // save the request to the DB
    this.requestSvc.create(this.request).subscribe(
      (resp) => {
        this.request = resp as Request;
        // forward to the requestt list component
        this.router.navigateByUrl('/request-list');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
