import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
categoryID:any= Math.floor(Math.random()*1000);;
productCategories:any;
  constructor(private productService: ProductsService ) { }

  ngOnInit() {
   
    console.log(this.categoryID);
    this.productCategories=this.productService.getCategories();
  }
  formCategories=new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
    categoryID: new FormControl(this.categoryID,[Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });
  generateCategoryID(){
    this.categoryID=Math.floor(Math.random()*1000);
  }
  postCategory(){
    //alert('posting')
    if (this.formCategories.invalid){
      console.log(this.formCategories)
      this.formCategories.setErrors({
        invaliddata: true
      });
    }else{
      this.productService.addCategory(this.formCategories.value);
    }
  }
  editCategories(docID, input: HTMLInputElement){
this.productService.updateCategory(docID,input.value);

  }
  deleteCategories(docID){
   if(this.productService.deleteCategory(docID)){


   }
   ;
  }

}
