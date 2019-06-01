import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class WeatherService {

  readonly ROOT_URL = environment.weatherinfo;

  constructor(private http: HttpClient) { }

  currentForecast(lat: number, lng: number): Observable<any> {
    let params = new HttpParams()
    params = params.set('latitude', lat.toString() )
    params = params.set('longitude', lng.toString() )

    return this.http.post(this.ROOT_URL, { params:params })
  }

}