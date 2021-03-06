import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Request } from '../../../model/request.class';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent implements OnInit {
  title = 'Request List';
  requests: Request[] = [];
  newRequests: Request[] = [];
  sortCriteria: string = 'id';
  sortOrder: string = 'asc';
  colClasses = 'btn btn-link font-weight-bold';

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService
  ) {}
  user: User = this.systemSvc.loggedInUser;

  ngOnInit(): void {
    this.systemSvc.checkLogin();

    // populate list of requests
    this.requestSvc.getAll().subscribe(
      (resp) => {
        this.requests = resp as Request[];
        for (let r of this.requests) {
          r.userName = r.user.userName;
        }
        // if user is not reviewer and not admin loop through request, filter down to only user request
        if (
          !this.systemSvc.loggedInUser.reviewer &&
          !this.systemSvc.loggedInUser.admin
        ) {
          for (let request of this.requests) {
            if (
              request.user.userName === this.systemSvc.loggedInUser.userName
            ) {
              this.newRequests.push(request);
            }
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  sortBy(column: string): void {
    console.log('vendor list sortBy called');
    if (column == this.sortCriteria) {
      this.sortOrder = this.sortOrder == 'desc' ? 'asc' : 'desc';
    }
    this.sortCriteria = column;
  }
}
