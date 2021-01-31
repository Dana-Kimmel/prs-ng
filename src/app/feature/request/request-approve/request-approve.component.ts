import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css'],
})
export class RequestApproveComponent implements OnInit {
  requestTitle = 'PurchaseRequest Line Items';
  request: Request = new Request();
  requestId: number = 0;
  linesTitle = 'Lines';
  lineItems: LineItem[] = [];
  submitBtnTitle = 'Approve';

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the id from the url
    this.route.params.subscribe((parms) => {
      if (parms['rid'] && parms['liid']) {
        this.lineItemSvc.delete(parms['liid']).subscribe((resp) => {
          this.router.navigateByUrl('/request-lines/' + parms['rid']);
        });
      }
      if (parms['id']) {
        this.requestId = parms['id'];
        console.log('RequestID = ' + this.requestId);
      }
    });
    // get request by id
    this.requestSvc.getById(this.requestId).subscribe(
      (resp) => {
        this.request = resp as Request;
        console.log('Request', this.request);
      },
      (err) => {
        console.log(err);
      }
    );

    // get lineitems by request ID
    this.lineItemSvc.getLineItemsByRequestId(this.requestId).subscribe(
      (resp) => {
        console.log('li resp: ', resp);
        this.lineItems = resp as LineItem[];
        console.log('LineItems', this.lineItems);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  rejectRequest() {
    this.requestSvc.submitForReview(this.request).subscribe((resp) => {
      this.router.navigateByUrl('/request-review');
    });
  }

  approveRequest() {
    this.requestSvc.submitForReview(this.request).subscribe((resp) => {
      this.router.navigateByUrl('/request-review');
    });
  }
}
