import { Component, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../shared/models/city.model';
import { LocationIqService } from '../shared/services/location-iq.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { LocationIQ } from '../shared/models/location-iq.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Address } from '../shared/models/address.model';

@Component({
  selector: 'mp-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {

  @Input() city: City;

  @Output() onCity: EventEmitter<City>;

  constructor(
    private locationIQService: LocationIqService,
    private snackBar: MatSnackBar
  ) {
    this.findLocation();
    this.onCity = new EventEmitter;
  }

  findLocation() {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => this.findCityName(position),
      (error: PositionError) => this.snackBar.open('Geolocation Error', 'Retry !').onAction().subscribe(() => this.findLocation())        // .subscribe(this.findLocation.bind(this))
    );
  }

  findCityName(position: Position): Subscription {
    return this.locationIQService.get(position).subscribe(
      (location: LocationIQ) => {
        const city = new City;
        city.position = position;
        city.address = new Address;
        city.address = location.address;
        this.onCity.emit(city);
      },
      (error: HttpErrorResponse) => this.snackBar.open('City Location Error', 'Retry !').onAction().subscribe(() => this.findCityName(position))
    )
  }
}
