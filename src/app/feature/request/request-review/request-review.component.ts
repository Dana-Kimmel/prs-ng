import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css'],
})
export class RequestReviewComponent implements OnInit {
  title = 'PurchaseRequest Review';
  requests: Request[] = [];
  sortCriteria: string = 'id';
  sortOrder: string = 'asc';
  colClasses = 'btn btn-link font-weight-bold';

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    // populate list of requests by users that are not logged in
    this.requestSvc.getRequestsInReview(this.systemSvc.loggedInUser.id).subscribe(
      (resp) => {
        this.requests = resp as Request[];
        for (let r of this.requests){
          r.userName = r.user.userName;
        }
          },
      (err) => {
        console.log(err);
      }
    );
  }

  sortBy(column: string): void {
    console.log('movie list sortBy called');
    if (column == this.sortCriteria) {
      this.sortOrder = this.sortOrder == 'desc' ? 'asc' : 'desc';
    }
    this.sortCriteria = column;
  }
}
