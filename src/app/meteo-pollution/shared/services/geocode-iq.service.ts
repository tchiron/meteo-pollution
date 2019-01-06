import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { locationIQ } from 'src/environments/environment';
import { Geocode } from '../models/geocode.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodeIqService {

  constructor(private http: HttpClient) { }

  get(county: string): Observable<Geocode> {
    return this.http.get<Geocode>(`https://eu1.locationiq.com/v1/search.php?key=${locationIQ.key}&q=${county}&format=json`);
  }
}
