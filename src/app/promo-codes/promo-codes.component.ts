import { dialogs } from './../custom/dialogs';
import { ProductsService } from './../services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: ['./promo-codes.component.css']
})
export class PromoCodesComponent implements OnInit {
postPromoStatus:boolean;
promoCodes:any;
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.promoCodes=this.productService.getPromoCodes();
  }
formPromoCode=new FormGroup({
  promoCode: new FormControl(this.generateCoupon(),[Validators.required]),
  amount: new FormControl('', [Validators.required]),
  type: new FormControl(true,[Validators.required])

})
generateCoupon(){
  let length=6;
  let code = "";
		
			let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			
			for(var i = 0; i < length; i++) {
			
				code += possible.charAt(Math.floor(Math.random() * possible.length));
			
			}
			
			return code;
}
postPromoCode(){
if(this.formPromoCode.invalid){
this.formPromoCode.setErrors({
  invalidForm: true
});
}else{
  if(this.productService.addPromoCode(this.formPromoCode.value)){
this.postPromoStatus=true;
  }else{
    this.postPromoStatus=false;
  }

}
}
deletePromoCode(promoCodeID){
  if(this.productService.deletePromoCode(promoCodeID)){
    dialogs.showSweetDialogSuccess("Promo Code was deleted successfully");
  }else{
    dialogs.showSweetDialogFail("promoCode was not deleted, try again later")
  }
  
}
}
