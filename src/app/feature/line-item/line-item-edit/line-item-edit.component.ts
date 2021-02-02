import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css'],
})
export class LineItemEditComponent implements OnInit {
  title = 'Line Item Edit';
  submitBtnTitle = 'Change';
  lineItem: LineItem = null;
  lineItemId = 0;

  constructor(
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the id from the url
    this.route.params.subscribe((parms) => {
      this.lineItemId = parms['id'];
    });
    this.lineItemSvc.getById(this.lineItemId).subscribe(
      (resp) => {
        this.lineItem = resp as LineItem;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    // save the line item to the DB
    this.lineItemSvc.create(this.lineItem).subscribe(
      (resp) => {
        this.lineItem = resp as LineItem;
        // forward to the line item list component
        this.router.navigateByUrl('/request-lines/' + this.lineItem.request.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
