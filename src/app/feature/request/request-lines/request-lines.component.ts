import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css'],
})
export class RequestLinesComponent implements OnInit {
  requestTitle = 'PurchaseRequest Line Items';
  request: Request = new Request();
  requestId: number = 0;
  linesTitle = 'Lines';
  lineItems: LineItem[] = [];
  submitBtnTitle = 'Submit For Review';

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // delete line item
    this.route.params.subscribe((parms) => {
      if (parms['rid'] && parms['liid']) {
        this.lineItemSvc.delete(parms['liid']).subscribe((resp) => {
          this.router.navigateByUrl('/request-lines/' + parms['rid']);
        });
      }
      if (parms['id']) {
        this.requestId = parms['id'];
      }
    });
    // get request by id
    this.requestSvc.getById(this.requestId).subscribe(
      (resp) => {
        this.request = resp as Request;
      },
      (err) => {
        console.log(err);
      }
    );

    // get lineitems by request ID
    this.lineItemSvc.getLineItemsByRequestId(this.requestId).subscribe(
      (resp) => {
        this.lineItems = resp as LineItem[];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  submitForReview() {
    this.requestSvc.submitForReview(this.request).subscribe((resp) => {
      this.router.navigateByUrl('/request-list');
    });
  }
}
