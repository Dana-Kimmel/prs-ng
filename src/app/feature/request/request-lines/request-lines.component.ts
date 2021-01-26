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
  request: Request = null;
  requestId: number = 0;
  linesTitle = 'Lines';
  lineitem: LineItem = new LineItem();
  lineitems: LineItem[] = [];

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the id from the url
    this.route.params.subscribe((parms) => {
      this.requestId = parms['id'];
      console.log('RequestID = ' + this.requestId);
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
  }
}
