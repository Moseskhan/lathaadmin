
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar'
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

export class dialogs {
    constructor(public snackBar: MatSnackBar){

    }
showsnackDialog(message){
    this.snackBar.open(message, 'Undo', {
        duration: 3000
      });
}
static showSweetDialogSuccess(message){
    swal(message, {
        icon: "success",
      });
}
static showSweetDialogFail(message){
    swal(message, {
        icon: "error",
        
      });
}
}