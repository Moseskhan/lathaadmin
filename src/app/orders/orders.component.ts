import { Alert } from 'selenium-webdriver';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
orders:any;
sortedOrders:any;
  constructor(private ProductsService: ProductsService) { }

  ngOnInit() {
    this.ProductsService.getOrders().subscribe(ordersList=>{
  this.orders=ordersList;
this.sortedOrders=this.orders;
    });
  
  }
  searchOrder(input){
    //alert(input);
    this.sortedOrders=[];
         for (let order of this.orders){
              let orderID=order.data.orderID;
             // console.log(orderID);
              let customerName=order.data.args.billing_name;
              //console.log(customerName);
              let customerEmail=order.data.token.email;
//console.log(customerEmail);
              if(orderID.toLowerCase().includes(input.toLowerCase()) || customerName.toLowerCase().includes(input.toLowerCase()) || customerEmail.toLowerCase().includes(input.toLowerCase()) ){
                this.sortedOrders.push(order);
               }
         }
  }
  shipOrder(orderID,docID){
    alert(orderID + docID);
  }
  viewOrder(orderID,docID){
    alert(orderID+docID)
  }

}
