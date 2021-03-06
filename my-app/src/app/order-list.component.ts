import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';


import { OrderService } from './order.service';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrdertListComponent implements OnInit {
  pageTitle: string = 'Customer Orders';

  listFilter: string;
  errorMessage: string;

  custId: string;
  customer: any;
  customers: any;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
    this.getCustomers();
  }


  ngOnInit(): void {
    this.getCustomers();
    var v = 0;

  }

  getCustomers(): void {
    this.orderService.getCustomers()
      .subscribe(custs => this.customers = custs,
      error => this.errorMessage = <any>error);
  }

  getCustomer(): void {
    this.orderService.getCustomer(this.custId)
      .subscribe(cust => this.customer = cust,
      error => this.errorMessage = <any>error);
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id)
      .subscribe(() => {        
        this.getCustomer();
      });

  }
}
