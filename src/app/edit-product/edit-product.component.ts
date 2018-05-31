import { Router, ActivatedRoute } from '@angular/router';
import { dialogs } from './../custom/dialogs';

import { product } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { productsValidation } from '../validators/validators';

@Component({
  selector: 'edit-products',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
productsList;
singleProduct:any;

form=new FormGroup({
  productName: new FormControl('',[
    Validators.required,
    Validators.minLength(5),
  ]),
  productID:new FormControl(Math.random()),
  SKU: new FormControl('',[
    Validators.required,
    Validators.minLength(6),
  ]),
  productDescription: new FormControl('',[
    Validators.required,
    Validators.minLength(20),

  ]),
  categoryID:new FormControl(1, [
    Validators.required
  ]),
  
  displayPrice: new FormControl(
    '',
    [
      Validators.required,
      productsValidation.validateNumeric
    ]
  ),
  availableSizes: new FormArray([]),
  discount: new FormControl('',
  [
    Validators.required,
    productsValidation.validateNumeric
  ]),
 unitsInStock: new FormControl(
   '',
   [
     Validators.required,
     productsValidation.validateNumeric
     
   ]
 ),
 unitsOnOrder: new FormControl(0),
  productAvailable:new FormControl(true,Validators.required),
  discountAvailable: new FormControl(true,Validators.required),
  
  ranking: new FormControl('',Validators.required),
 

})
productCategories:any;
  constructor(private afsservice: ProductsService,private router: Router, private routerParams: ActivatedRoute) { }
id
  ngOnInit() {
    this.productsList=this.afsservice.getAllProducts();
    this.productCategories=this.afsservice.getCategories();
    this.routerParams.paramMap
    .subscribe(params=>{
      this.id=params.get('id');
      this.singleProduct=this.afsservice.getSingleProduct(this.id);
      this.singleProduct.then(result=>{
        this.form.patchValue(
          {
            productName: result.productName,
            SKU: result.SKU,
            productDescription:result.productDescription,
            categoryID: result.categoryID,
            displayPrice: result.displayPrice,
            unitsInStock: result.unitsInStock,
            discount: result.discount,
            discountAvailable: result.discountAvailable,
            productAvailable:result.productAvailable,
            ranking:result.ranking
          }
       );
       for(let i=0; i<result.availableSizes.length; i++){
        
        this.sizes.push(
          new FormGroup({
            unit: new FormControl( result.availableSizes[i].unit, Validators.required),
            price: new FormControl( result.availableSizes[i].price,Validators.required)
          }));

    }
      
      });
     
      
      
    })
  }
  addSizes(unitsize: HTMLInputElement, priceperunit: HTMLInputElement){
   //alert(unitsize.value);
   //alert(priceperunit.value);
    this.sizes.push(new FormGroup({
      unit: new FormControl(unitsize.value, Validators.required),
      price: new FormControl(priceperunit.value,Validators.required)
    }));
    unitsize.value='';
    priceperunit.value='';
  }
  get sizes(){
    return this.form.get('availableSizes') as FormArray
  }
  removeSizes(productSize: FormControl )
  {
let index= this.sizes.controls.indexOf(productSize);
 this.sizes.removeAt(index);
  }
  get productName(){
    return this.form.get('productName');
  }
  get SKU(){
    return this.form.get('SKU');
  }
  get productDescription(){
    return this.form.get('productDescription');
  }
  get categoryID(){
    return this.form.get('categoryID');
  }
  get displayPrice(){
    return this.form.get('displayPrice');
  }
  get discount(){
    return this.form.get('discount');
  }
  get unitsInStock(){
    return this.form.get('unitsInStock');
  }
  get ranking(){
    return this.form.get('ranking');
  }
  updateProduct(){
    console.log(this.form);
    if(this.form.invalid){
     this.form.setErrors({
       invalidDetails: true
     })
     dialogs.showSweetDialogFail('please fill all the fields correctly to continue');
    }else{

      this.afsservice.updateProduct(this.id,this.form)
      .then(document=>{
        let message=""+this.productName.value+ " Details was  Updated successfully,Proceed to adding Photos";
        dialogs.showSweetDialogSuccess(message);
        
        this.router.navigate(['/upload', this.id]);
      }).catch(error=>{

        dialogs.showSweetDialogFail('There was an error processing the new product try again later');
      });

      
      }
      
    }
    cancelEdit(){
      this.router.navigate(['/products'])
    }
  }
