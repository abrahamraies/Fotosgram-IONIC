import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { FileTransfer} from '@awesome-cordova-plugins/file-transfer/ngx';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [Geolocation,Camera,ImagePicker,FileTransfer,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
