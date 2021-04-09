import { Injectable } from '@angular/core';
//import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApifruitsService {

  constructor(private http: HttpClient) { }

    public customVisionService(image){

      //let url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/c7960beb-79c3-4a4f-a14e-d358ee5ed36f/classify/iterations/Fruits%20Classification/url"
      let url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/c7960beb-79c3-4a4f-a14e-d358ee5ed36f/classify/iterations/Fruits%20Classification/image"
      //let body = {
        //"url" : ""
      //}
      const headers = new HttpHeaders({
        //'Content-Type': 'application/json',
        'Content-Type': 'application/octet-stream',
        'Prediction-Key': 'a2afa492040d4454925a9e8ce4c271b3'
      });
      return this.http.post(url, image, {headers: headers})
  }
}
