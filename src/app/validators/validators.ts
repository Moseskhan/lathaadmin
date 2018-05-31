import { AbstractControl, ValidationErrors } from "@angular/forms";

export class productsValidation{
    static validateNumericAndDecimal(control: AbstractControl): ValidationErrors | null {
        if(control.value.match(/^\d+(?:\.\d+)?$/))
        return {validateNumeric: true}
        return null;
  }
  static validateNumeric(control: AbstractControl): ValidationErrors | null {
    
    var result = (control.value - Math.floor(control.value)) !== 0; 
   
  if (result)
    return  {validateNumeric: true}
   else
     return null
  }
   

}