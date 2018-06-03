import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export interface product{
  productID: number,
  SKU:string,
  productName:string,
  productDescription:string,
  categoryID: number,
  displayPrice: number;
  availableSizes:any,
  discount:number,
  unitsInStock: number,
  unitsOnOrder: number,
  productAvailable:boolean,
  discountAvailable:boolean,
  pictures:any,
  ranking: number,
  reviews:any

}
interface productID extends product{
  id: string;
}
interface photos{

}
@Injectable()
export class ProductsService {
   
  productCollection: AngularFirestoreCollection<product>;
products:any;
product:any;
photoCollection: any;
photoUrl: Observable<photos[]>;
productCategories:any;
  constructor(private firestore: AngularFirestore ) { }
categoryCollection=this.firestore.collection('ProductCategories');
promoCodeCollection=this.firestore.collection('promoCodes');
ordersCollection=this.firestore.collection('chargedOrders');
  getAllProducts(){
    this.productCollection=this.firestore.collection('products');
   this.products=this.productCollection.snapshotChanges().map(actions => {
    
    return actions.map(a => {
      if (a.payload.doc.exists==false){
           return null;
      }else{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data};
      }
     
    });
  
  });
  return this.products;
}
AddNewProduct(product: product){
   

      
      

      return this.firestore.collection('products').add(product);

      
  

}
deleteProduct(product: any){
 return  this.productCollection.doc(product.id).delete()
}
getSingleProduct(productID){
this.product=this.firestore.collection('products').doc(productID).ref.get().then((doc)=>{ 
    if (doc.exists) {
    console.log(doc.data());
      return  (doc.data());
    
    } else {
      return null
    }
  }).catch(function (error) {
    console.log(error)
  });
  
  return this.product;
}
getProductPhotoUrls(productID){
  this.photoCollection = this.firestore.collection<photos>('photos', ref => {
    
    return ref
            .where('product', '==', productID)
           
  });
  this.photoUrl=this.photoCollection.snapshotChanges().map(actions => {
    
    return actions.map(a => {
      if (a.payload.doc.exists==false){
           return null;
      }else{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data};
      }
     
    });
  
  });
  return this.photoUrl;
}
updateProduct(productID,form:FormGroup){
return this.productCollection.doc(productID).update(form.value);
  
}
deleteImage(photoID){
  if(this.photoCollection.doc(photoID).delete())
  return  true;
  else
  return false;

  //remember to write code to explicitly remove the image from storage
}
getCategories(){
  return this.firestore.collection('ProductCategories').snapshotChanges().map(actions => {
    
    return actions.map(a => {
      if (a.payload.doc.exists==false){
           return null;
      }else{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data};
      }
     
    });
  
  });
}
addCategory(category){
  return this.categoryCollection.add(category);
}
updateCategory(docID, categoryName){
  return this.categoryCollection.doc(docID).update(
    {
      categoryName: categoryName
    }
  );

    
  }
  deleteCategory(docID){
    if(this.categoryCollection.doc(docID).delete())
  return  true;
  else
  return false;
  }
  addPromoCode(promoCodeDetails){
    return this.promoCodeCollection.add(promoCodeDetails);
  }
  getPromoCodes(){
    return this.promoCodeCollection.snapshotChanges().map(actions => {
    
      return actions.map(a => {
        if (a.payload.doc.exists==false){
             return null;
        }else{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data};
        }
       
      });
    
    });
  }
  deletePromoCode(docID){
    if(this.promoCodeCollection.doc(docID).delete())
  return  true;
  else
  return false;
  
  }
  getOrders(){
    return this.ordersCollection.snapshotChanges().map(actions => {
    
      return actions.map(a => {
        if (a.payload.doc.exists==false){
             return null;
        }else{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data};
        }
       
      });
    
    });
  }

}