import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { MeteoPollutionComponent } from './meteo-pollution/meteo-pollution.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'meteo', component: MeteoPollutionComponent},
  { path: '**', redirectTo: 'settings' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
