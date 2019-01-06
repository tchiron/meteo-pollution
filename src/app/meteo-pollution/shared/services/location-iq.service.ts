import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { locationIQ } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LocationIQ } from '../models/location-iq.model';

@Injectable({
  providedIn: 'root'
})
export class LocationIqService {

  constructor(private http: HttpClient) { }

  get(position: Position): Observable<LocationIQ> {
    return this.http.get<LocationIQ>(`https://eu1.locationiq.com/v1/reverse.php?key=${locationIQ.key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
  }
}
