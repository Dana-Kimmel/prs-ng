import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  title = 'Product Detail';
  product: Product = null;
  productId: number = 0;
  isAdmin: boolean = this.systemSvc.isAdmin();

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    // get the id from the url
    this.route.params.subscribe((parms) => {
      this.productId = parms['id'];
    });
    // get cproduct by id
    this.productSvc.getById(this.productId).subscribe(
      (resp) => {
        this.product = resp as Product;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete() {
    // delete the cproduct from the DB
    this.productSvc.delete(this.product.id).subscribe(
      (resp) => {
        this.product = resp as Product;
        // forward to the product list component
        this.router.navigateByUrl('/product-list');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
