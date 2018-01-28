import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class OrderService {
  private baseCustUrl = 'http://localhost:52037/api/customers';
  private baseOrdersUrl = 'http://localhost:52037/api/orders';

  constructor( private http: HttpClient) { }

  getCustomers(): Observable<any[]> {
    var custUrl = this.baseCustUrl;
    return this.http.get<any[]>(custUrl).pipe();
  }

  getCustomer(custid: any): Observable<any> {
    var custUrl = this.baseCustUrl +"?custId=" + custid;
    return this.http.get<any[]>(custUrl).pipe();
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseOrdersUrl).pipe();
  }

  getOrder(id: number): Observable<any> {
    const url = `${this.baseOrdersUrl}/${id}`;
    return this.http.get<any>(url).pipe();    
  }

   
  deleteOrder(obj: any | number): Observable<any> {
    const id = typeof obj === 'number' ? obj : obj.orderID;
    const url = `${this.baseOrdersUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe();
  }

  addOrder(obj: any): Observable<any> {
    const id = typeof obj === 'number' ? obj : obj.orderID;    
    return this.http.post(this.baseOrdersUrl, obj, httpOptions).pipe();
  }

  updateOrder(obj: any): Observable<any> {
    const id = typeof obj === 'number' ? obj : obj.orderID;
    const url = `${this.baseOrdersUrl}/${id}`;
    return this.http.put(url, obj, httpOptions).pipe();
  }
  
}
