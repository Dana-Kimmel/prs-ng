import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css'],
})
export class RequestEditComponent implements OnInit {
  title = 'Request Edit';
  request: Request = null;
  requestId: number = 0;
  submitBtnTitle = 'Save';

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
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

  save() {
    // save the request to the DB
    this.requestSvc.update(this.request).subscribe(
      (resp) => {
        this.request= resp as Request;
        console.log('Request updated', this.request);
        // forward to the request list component
        this.router.navigateByUrl('/request-list');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
