import { Component, OnInit } from '@angular/core';
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

  constructor(private requestSvc: RequestService, private systemSvc: SystemService) {}

  ngOnInit(): void {
    this.systemSvc.checkLogin();

    // populate list of requests
    this.requestSvc.getAll().subscribe(
      (resp) => {
        this.requests = resp as Request[];
        // if user is not reviewer and not admin loop through request, filter down to only user request
if (!this.systemSvc.loggedInUser.reviewer && !this.systemSvc.loggedInUser.admin) {
  for(let requests of this.Request[]) {
    if (this.requests.user.id ) {

    }
  }
}
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
