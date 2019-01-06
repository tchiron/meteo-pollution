import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeteoPollutionComponent } from './meteo-pollution.component';
import { CityComponent } from './city/city.component';
import { CitiesComponent } from './cities/cities.component';
import { SharedModule } from '../shared/shared.module';
import { MeteoComponent } from './meteo/meteo.component';
import { PollutionComponent } from './pollution/pollution.component';

@NgModule({
  declarations: [
    MeteoPollutionComponent,
    CityComponent,
    CitiesComponent,
    MeteoComponent,
    PollutionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MeteoPollutionComponent,
  ]
})
export class MeteoPollutionModule { }
