import { SingleProductComponent } from './single-product/single-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {RouterModule} from '@angular/router'
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';
import { ViewProductsComponent } from './view-products/view-products.component';

import {AngularFireStorageModule} from 'angularfire2/storage';
import { DropZoneDirective } from './uploadservice/drop-zone.directive';
import { FileUploadComponent } from './uploadservice/file-upload/file-upload.component';

import {MatButtonModule, MatCheckboxModule, MatChipsModule} from '@angular/material';
import { CategoriesComponent } from './categories/categories.component';
import { PromoCodesComponent } from './promo-codes/promo-codes.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ViewProductsComponent,
    SingleProductComponent,
    DropZoneDirective,
    FileUploadComponent,
   EditProductComponent,
   CategoriesComponent,
   PromoCodesComponent
    
   
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    MatChipsModule,

    ReactiveFormsModule,
    
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'viewProducts', component: ViewProductsComponent},
      {path: 'viewProduct/:id',component: SingleProductComponent},
      {path: 'upload/:id', component: FileUploadComponent},
      {path: 'products/edit/:id', component: EditProductComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'generatePromoCodes', component: PromoCodesComponent}
    ])
    
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
