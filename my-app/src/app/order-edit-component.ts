import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from './order.service';

@Component({
  templateUrl: './order-edit-component.html'
})
export class OrderEditComponent implements OnInit {
  pageTitle: string = 'Order Edit';
  order: any;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private productService: OrderService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.getOrder();
    
  }
  
  getOrder(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getOrder(id)
      .subscribe(prod => this.order = prod);
  }


  saveOrder(): void {
    this.productService.updateOrder(this.order)
      .subscribe(ordr => {
        this.order = ordr;
        this.errorMessage = "Updated";
        this.goBack();
      });
    
  }

  addOrder(): void {
    this.order.customerID = this.route.snapshot.paramMap.get('custId');
    this.order.orderDate = new Date().toLocaleDateString();
    this.order.shippedDate = new Date().toLocaleDateString();
  
    this.productService.addOrder(this.order)
      .subscribe(ordr => {
        this.order = ordr;
        this.errorMessage = "Added";
        this.goBack();
      });

  }


  goBack(): void {
    this.router.navigate(['']);
  }

}

