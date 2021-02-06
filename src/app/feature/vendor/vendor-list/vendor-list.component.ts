import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css'],
})
export class VendorListComponent implements OnInit {
  title = 'Vendor List';
  vendors: Vendor[] = [];
  isAdmin: boolean = this.systemSvc.isAdmin();

  constructor(
    private vendorSvc: VendorService,
    private systemSvc: SystemService
  ) {}

  ngOnInit(): void {
    // populate list of vendors
    this.vendorSvc.getAll().subscribe(
      (resp) => {
        this.vendors = resp as Vendor[];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
