import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialLoginModule,  AuthServiceConfig,  GoogleLoginProvider,} from "angular-6-social-login";
import { FullCalendarModule } from 'ng-fullcalendar';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; 
import { RestClientService } from './rest.client.service';
import { DataShareService } from './datashare.service';
import { GeneralComponent } from './general/general.component';
import { WeatherService } from './weather.service';
import { CalendarlocalComponent } from './calendar/calendar.component';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("323609165869-5gm5offv0o185b81orktsc1nam84d0ol.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GeneralComponent,
    CalendarlocalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,SocialLoginModule,HttpClientModule,FormsModule,ReactiveFormsModule,FullCalendarModule
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },RestClientService,DataShareService,WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
