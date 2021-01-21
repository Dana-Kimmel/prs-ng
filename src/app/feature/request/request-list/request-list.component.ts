import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Request } from '../../../model/request.class';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent implements OnInit {
  title = 'Request List';
  requests: Request[] = [];

  constructor(private requestSvc: RequestService) {}

  ngOnInit(): void {
    //if coming from login we should have an authenticated user inside sysSvc
    //  console.log('loggedInUser?', this.sysSvc.loggedInUser);

    // populate list of requests
    this.requestSvc.getAll().subscribe(
      (resp) => {
        this.requests = resp as Request[];
        console.log('Requests', this.requests);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
