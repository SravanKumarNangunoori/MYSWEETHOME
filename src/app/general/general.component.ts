import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest.client.service';
import { environment } from 'src/environments/environment';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  geolocationPosition: Position;
  forecast: any;
  lat: number;
  lng: number;

  constructor(private restservice: RestClientService, private weather:WeatherService) { }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          this.lat=this.geolocationPosition.coords.latitude;
          this.lng=this.geolocationPosition.coords.longitude;
            // console.log(this.geolocationPosition)
          
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };


  }
  getForecast() {
  this.forecast = this.weather.currentForecast(this.lat, this.lng)
  .subscribe(data => {this.forecast=data})
}
  


/// Helper to make weather icons work
/// better solution is to map icons to an object 
weatherIcon(icon) {
switch (icon) {
  case 'partly-cloudy-day':
    return 'wi wi-day-cloudy'
  case 'clear-day':
    return 'wi wi-day-sunny'
  case 'partly-cloudy-night':
    return 'wi wi-night-partly-cloudy'
  default:
    return `wi wi-day-sunny`
}
}


}


