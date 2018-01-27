import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';

import { OrderEditComponent } from './order-edit-component';
import { OrdertListComponent } from './order-list.component';
import { OrderService } from './order.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    
    AlertModule.forRoot(),
    RouterModule.forRoot([
      
      { path: 'orderEdit/:id', component: OrderEditComponent },
      { path: 'orderAdd/:custId', component: OrderEditComponent },
      { path: '', component: OrdertListComponent },
      { path: '**', component: OrdertListComponent }
    ])
  ],
  declarations: [
    AppComponent,    
    OrderEditComponent,
    OrdertListComponent
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
