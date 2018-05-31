import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
 id;
 product;
 photoUrls;
 slideIndex = 1;
  constructor(private route: ActivatedRoute,private productService: ProductsService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params=>{
    this.id= params.get('id');
    
    this.product=this.productService.getSingleProduct(this.id);
    
    //alert(this.id);
    this.photoUrls=this.productService.getProductPhotoUrls(this.id);
    
    });
    
    
     
  }
  

}
