import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LineItem } from "../model/line-item.class";

const URL = 'http://localhost:8080/line-items';
@Injectable({
  providedIn: 'root',
})
export class LineItemService {
  constructor(private http: HttpClient) {}

  //service functions
  // getAll LineItems
  getAll(): Observable<LineItem[]> {
    return this.http.get(URL + '/') as Observable<LineItem[]>;
  }

  // get LineItem by ID
  getById(id): Observable<LineItem> {
    return this.http.get(URL + '/' + id) as Observable<LineItem>;
  }

  // create LineItem
  create(lineItem: LineItem): Observable<LineItem> {
    return this.http.post(URL + '/', lineItem) as Observable<LineItem>;
  }

  // update LineItem
  update(lineItem: LineItem): Observable<LineItem> {
    return this.http.put(URL + '/', lineItem) as Observable<LineItem>;
  }

  // delete LineItem
  delete(id): Observable<LineItem> {
    return this.http.delete(URL + '/' + id) as Observable<LineItem>;
  }

  /// List line items for a purchase request 
  getLineItemsByRequestId(id): Observable<LineItem[]> {
    return this.http.get(URL + '/lines-for-pr/' + id) as Observable<LineItem[]>;
  }
}