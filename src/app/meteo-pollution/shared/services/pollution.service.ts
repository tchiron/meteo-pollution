import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { airVisual } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { airVisualModel } from '../models/air-visual.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  constructor(private http: HttpClient) { }

  get(address: Address): Observable<airVisualModel> {
    // return this.http.get<airVisualModel>(`https://api.airvisual.com/v2/city?city=${address.county}&state=${address.state}&country=${address.country}&key=${airVisual.key}`);
    return this.http.get<airVisualModel>(`https://api.airvisual.com/v2/city?city=${address.county}&state=Auvergne-Rhône-Alpes&country=France&key=${airVisual.key}`);
  }
}
