import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Platform} from '@ionic/angular';
import { ApifruitsService } from '../services/apifruits.service';
import { Base64 } from '@ionic-native/base64/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  public isBrowser: Boolean = false

  public res;

  constructor(private camera: Camera, private platform: Platform, private apifruitsservice : ApifruitsService, private base64: Base64, public alertController: AlertController) {
    this.isBrowser = false;

  }

  ngOnInit() {

    if(this.platform.is("android")){
      console.log("android");
      this.openCamera();
    }
    else if (this.platform.is("ios")){
      console.log("ios");
      this.openCamera();
    }
    else{
      console.log("desktop");
      this.openURL();
    }

}

loadImageOnURL(event){

  const file = event.target.files[0]
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);

  reader.onload = () => {
    //get image as a blob
    let blob : Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

    //create a location for te blob
    let blobURL : string = URL.createObjectURL(blob);
    console.log("blob url",blobURL);
    this.callAPI(blobURL);
  }

  reader.onerror = (error) => {
    //handle errors
    console.log("error", "There was an error", error);
  }
}

public getContentType(base64Data: any) {  
  let block = base64Data.split(";");  
  let contentType = block[0].split(":")[1];  
  return contentType;  
} 

public base64toBlob(b64Data, contentType) {  
  contentType = contentType || '';  
  let sliceSize = 512;  
  let byteCharacters = atob(b64Data);  
  let byteArrays = [];  
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {  
      let slice = byteCharacters.slice(offset, offset + sliceSize);  
      let byteNumbers = new Array(slice.length);  
      for (let i = 0; i < slice.length; i++) {  
          byteNumbers[i] = slice.charCodeAt(i);  
      }  
      var byteArray = new Uint8Array(byteNumbers);  
      byteArrays.push(byteArray);  
  }  
  let blob = new Blob(byteArrays, {  
      type: contentType  
  });  
  return blob;  
}

openURL(){
  this.isBrowser = true
}

openCamera(){
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URL
    // If it's base64 (DATA_URL):
    //console.log("file uri location",imageData)
    //let byteimage = imageData as ArrayBuffer;
    //console.log(byteimage);
    let base64Image = 'data:image/jpeg;base64,' + imageData;

    let contentType = this.getContentType(base64Image);  
    let DataBlob = this.base64toBlob(imageData, contentType); 

    this.callAPI(DataBlob);
   }, (err) => {
     console.log("error",err)
    // Handle error
   });
}

callAPI(blobURL){
  //let value = this.api.getFruits("application/octet-stream").then(
    //result => {
      //console.log(result);
      this.apifruitsservice.customVisionService(blobURL).subscribe(res=>{
        console.log(res);
        var gaga = res["predictions"][0]["tagName"]
        this.alertController.create({
          header: 'RESULT',
          message: 'The following signature is : ' + '<b>' + gaga + '</b>',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                console.log('Okay');
              }
            }
          ]
        }).then(res => {
          res.present();
        });
        //this.res = res
      }, (err)=>{
        console.log(err);
      });
    //}
  //);
//}
  }
}
