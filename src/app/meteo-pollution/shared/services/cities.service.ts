import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  public cities: City[];

  constructor() {
    this.cities = [];
  }

  get(): Observable<City[]> {
    return of(this.cities);
  }

  post(city: City): Observable<City[]> {
    
    const foundCity = this.cities.find((
      current: City) => current.address.county === city.address.county
    );

    if (!foundCity) {
      this.cities.push(city);
    }
    return this.get();
  }
}
