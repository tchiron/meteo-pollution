import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { City } from '../shared/models/city.model';
import { MeteoService } from "../shared/services/meteo.service";
import { MatSnackBar } from '@angular/material';
import { Meteo } from '../shared/models/meteo.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mp-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnChanges {

  @Input() city: City;

  private cardinal: string;
  private speed: number;
  private timeData: string;
  private sunrise: string;
  private sunset: string;

  constructor(
    private meteoService: MeteoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.city && !changes.city.isFirstChange()) {
      this.findMeteo();
    }
  }

  findMeteo(): Subscription {
    return this.meteoService.get(this.city.address).subscribe(
      (meteo: Meteo) => {
        this.city.meteo = meteo;
        this.city.meteo.weather = this.city.meteo.weather[0];
        this.cardinal = this.defineCardinal(this.city.meteo.wind.deg);
        this.speed = this.defineSpeed(this.city.meteo.wind.speed);
        this.timeData = this.defineTime(this.city.meteo.dt);
        this.sunrise = this.defineTime(this.city.meteo.sys.sunrise);
        this.sunset = this.defineTime(this.city.meteo.sys.sunset);
      },
      (error: HttpErrorResponse) => this.snackBar.open('Meteo Error', 'Retry !').onAction().subscribe(() => this.findMeteo())
    )
  }

  defineSpeed(speed: number) {
    return speed * 3.6;
  }

  defineCardinal(deg: number) {
    let card: string;
    if (348.75 <= deg || deg <= 11.25) {
      card = 'Nord';
    }
    else if (11.25 < deg && deg < 33.75) {
      card = 'Nord-Nord-Est';
    }
    else if (33.75 <= deg && deg <= 56.25) {
      card = 'Nord-Est';
    }
    else if (56.25 < deg && deg < 78.75) {
      card = 'Est-Nord-Est';
    }
    else if (78.75 <= deg && deg <= 101.25) {
      card = 'Est';
    }
    else if (101.25 < deg && deg < 123.75) {
      card = 'Est-Sud-Est';
    }
    else if (123.75 <= deg && deg <= 146.25) {
      card = 'Sud-Est';
    }
    else if (146.25 < deg && deg < 168.75) {
      card = 'Sud-Sud-Est';
    }
    else if (168.75 <= deg && deg <= 191.25) {
      card = 'Sud';
    }
    else if (191.25 < deg && deg < 213.75) {
      card = 'Sud-Sud-Ouest';
    }
    else if (213.75 <= deg && deg <= 236.25) {
      card = 'Sud-Ouest';
    }
    else if (236.25 < deg && deg < 258.75) {
      card = 'Ouest-Sud-Ouest';
    }
    else if (258.75 <= deg && deg <= 281.25) {
      card = 'Ouest';
    }
    else if (281.25 < deg && deg < 303.75) {
      card = 'Ouest-Nord-Ouest';
    }
    else if (303.75 <= deg && deg <= 326.25) {
      card = 'Nord-Ouest';
    }
    else if (326.25 < deg && deg < 348.75) {
      card = 'Nord-Nord-Ouest';
    }
    else {
      card = 'ERROR';
    }
    return card;
  }

  defineTime(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
}
