import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { Camera} from '@ionic-native/camera/ngx';
//import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ApifruitsService} from '../app/services/apifruits.service';
import { Base64 } from '@ionic-native/base64/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [ Base64 ],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera, HttpClientModule, ApifruitsService, Base64],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
