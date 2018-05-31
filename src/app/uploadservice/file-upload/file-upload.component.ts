import { ProductsService } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage,AngularFireUploadTask } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
declare var $:any;
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  implements OnInit{
  listUrl:any[];
  productID;
  photoUrlsObject:any;
  productDetails:any;
// Main task 
task: AngularFireUploadTask;

// Progress monitoring
percentage: Observable<number>;

snapshot: Observable<any>;

// Download URL
downloadURL: Observable<string>;

// State for dropzone CSS toggling
isHovering: boolean;
unitSize: string;
constructor(private storage: AngularFireStorage, private db: AngularFirestore, private route: ActivatedRoute, private photoService: ProductsService,private router: Router) { }
ngOnInit(){
  $('select').material_select();
  this.route.paramMap
    .subscribe(params=>{
    this.productID= params.get('id');
    
    
    //alert(this.id);
    
    });
    
this.photoUrlsObject=this.photoService.getProductPhotoUrls(this.productID);
this.productDetails=this.photoService.getSingleProduct(this.productID);


console.log(this.productDetails)
}
  
toggleHover(event: boolean) {
  this.isHovering = event;
}


startUpload(event: FileList, unitSize) {
  // The File object
  const file = event.item(0)

  // Client-side validation example
  if (file.type.split('/')[0] !== 'image') { 
    console.error('unsupported file type :( ')
    return;
  }

  // The storage path
  const path = `test/${new Date().getTime()}_${file.name}`;

  // Totally optional metadata
  const customMetadata = { app: 'My AngularFire-powered PWA!' };

  // The main task
  this.task = this.storage.upload(path, file, { customMetadata })

  // Progress monitoring
  this.percentage = this.task.percentageChanges();
  this.snapshot   = this.task.snapshotChanges().pipe(
    tap(snap => {
      console.log(snap)
      if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
        
      }
    })
  )


  // The file's download URL
  this.downloadURL = this.task.downloadURL(); 
  let URL;
  this.downloadURL.subscribe(url=>{
    URL=url;
    this.db.collection('photos').add({ path: URL , product: this.productID, productUnitSize: unitSize.value})
    
  })
  

}
isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
}
previewProduct(){
  this.router.navigate(['/viewProduct',this.productID ]);
}
getValue(selectOptions: HTMLSelectElement){

}
deleteImage(photoID){
  this.photoService.deleteImage(photoID);
}


}
