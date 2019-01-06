import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { City } from '../shared/models/city.model';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PollutionService } from '../shared/services/pollution.service';
import { airVisualModel } from '../shared/models/air-visual.model';

@Component({
  selector: 'mp-pollution',
  templateUrl: './pollution.component.html',
  styleUrls: ['./pollution.component.scss']
})
export class PollutionComponent implements OnChanges {

  @Input() city: City;

  constructor(
    private pollutionService: PollutionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.city && !changes.city.isFirstChange()) {
      this.findPollution();
    }
  }

  findPollution(): Subscription {
    return this.pollutionService.get(this.city.address).subscribe(
      (pollution: airVisualModel) => {
        this.city.pollution = pollution.data.current.pollution;
      },
      (error: HttpErrorResponse) => this.snackBar.open('Pollution Error', 'Retry !').onAction().subscribe(() => this.findPollution())
    )
  }
}
