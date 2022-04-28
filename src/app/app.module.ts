import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PusherService } from './pusher.service';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDGT6veGalms2ex0izXCg8OHjYh-CdCZnY',
    }),
    HttpClientModule
  ],
  providers: [PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
