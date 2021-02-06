import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title = 'Product List';
  products: Product[] = [];
  isAdmin: boolean = this.systemSvc.isAdmin();

  constructor(private productSvc: ProductService, private systemSvc: SystemService) {}

  ngOnInit(): void {
    // populate list of products
    this.productSvc.getAll().subscribe(
      (resp) => {
        this.products = resp as Product[];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
