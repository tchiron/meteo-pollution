import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { openWeather } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Meteo } from '../models/meteo.model';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor(private http: HttpClient) { }

  get(address: Address): Observable<Meteo> {
    return this.http.get<Meteo>(`https://api.openweathermap.org/data/2.5/weather?q=${address.county},${address.country_code}&units=${openWeather.units}&appid=${openWeather.key}`);
  }
}
