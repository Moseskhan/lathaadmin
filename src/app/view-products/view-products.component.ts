import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
productList;
  constructor(private afsservice: ProductsService, private router: Router) { }

  ngOnInit() {
   this.productList= this.afsservice.getAllProducts();
  console.log(this.productList);
  }
  editProduct(productID){
    this.router.navigate(['/products/edit',productID]);
  }
  viewProduct(product){
    this.router.navigate(['/viewProduct',product.id])
  }
  deleteProduct(product){
    let message="This product will be removed from products";
    swal(message,{
      icon: "warning",
      buttons: [true],
      dangerMode: true,
      title: 'Are you sure?'
      })
    .then((willDelete) => {
      if (willDelete) {
        this.afsservice.deleteProduct(product).then(()=>{
          swal("Product  was removed successfully", {
            icon: "success",
          });
        });
        
      } else {
        swal("Product was not removed");
      }
    });
  }

}
