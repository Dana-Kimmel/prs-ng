import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  title = 'Product Edit';
  product: Product = null;
  submitBtnTitle = 'Edit';
  vendors: Vendor[] = [];
  productId: number = 0;

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get id from URL
    this.route.params.subscribe((parms) => {
      this.productId = parms['id'];
    });

    //get product by id
    this.productSvc.getById(this.productId).subscribe(
      (resp) => {
        this.product = resp as Product;
      },
      (err) => {
        console.log(err);
      }
    );

    // get list of vendors
    this.vendorSvc.getAll().subscribe(
      (resp) => {
        this.vendors = resp as Vendor[];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save() {
    // save the product to the DB
    this.productSvc.create(this.product).subscribe(
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

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }

}
