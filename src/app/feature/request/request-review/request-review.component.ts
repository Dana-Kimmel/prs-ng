import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css'],
})
export class RequestReviewComponent implements OnInit {
  title = 'PurchaseRequest Review';
  requests: Request[] = [];
  requestId: number = 0;
  
  constructor(private requestSvc: RequestService) {}

  ngOnInit(): void {
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
