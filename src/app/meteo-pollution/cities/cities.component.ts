import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { City } from '../shared/models/city.model';
import { CitiesService } from '../shared/services/cities.service';
import { GeocodeIqService } from '../shared/services/geocode-iq.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { switchMap, debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Geocode } from '../shared/models/geocode.model';

@Component({
  selector: 'mp-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {

  @Input() city: City;

  @Output() onCity: EventEmitter<City>;

  public cityForm: FormGroup;
  public cities: City[];
  public cityGeocode: Observable<Geocode>;

  constructor(
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private geocodeIQService: GeocodeIqService,
    private snackBar: MatSnackBar,
  ) {
    this.onCity = new EventEmitter;
    
    this.cityForm = this.formBuilder.group({
      cityName: ["", [
        Validators.minLength(2),
        Validators.maxLength(32),
      ]]
    });

    this.cityGeocode = fromEvent(window, 'input').pipe(
      map((event: KeyboardEvent) => event.target.value),
      filter(text => text.length >= 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => this.geocodeIQService.get(this.cityForm.get('cityName').value))
    );

    this.cityGeocode.subscribe(
      (geocodes: Geocode) => {
        console.log(geocodes);
        console.log(geocodes[0].display_name);
      },
      (error: HttpErrorResponse) => this.snackBar.open('City Error')
    )

    this.citiesService.get().subscribe(
      (cities: City[]) => {
        this.cities = cities;
      }
    )
  }

  onSubmit(event: MSInputMethodContext) {
    const input = event.target;

    /**
     * @type (FormControl)
     * C'est notre input (le modèle intermédiaire)
     */
    const cityName: AbstractControl = this.cityForm.get('cityName');


    if (cityName.valid) {
      // this.findGeocode(cityName.value);
      // const city: City = new City;
      // city.address = new Address;
      // city.address.county = cityName.value;
      cityName.setValue("");
      // this.onCity.emit(city);
    }
  }

  findGeocode(county: string): Subscription {
    return this.geocodeIQService.get(county).subscribe(
      (geocode: Geocode) => {
        console.log(geocode);
        console.log(geocode[0].display_name);
      },
      (error: HttpErrorResponse) => this.snackBar.open('City Error', 'Retry !').onAction().subscribe(() => this.findGeocode(county))
    )
  }
}
