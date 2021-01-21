import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  title = 'Product Detail';
  product: Product = null;
  productId: number = 0;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the id from the url
    this.route.params.subscribe((parms) => {
      this.productId = parms['id'];
      console.log('productID = ' + this.product);
    });
    // get cproduct by id
    this.productSvc.getById(this.productId).subscribe(
      (resp) => {
        this.product = resp as Product;
        console.log('Product', this.product);
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
        console.log('CProduct deleted', this.product);
        // forward to the product list component
        this.router.navigateByUrl('/product-list');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
