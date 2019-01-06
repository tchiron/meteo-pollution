import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoPollutionComponent } from './meteo-pollution.component';

describe('MeteoPollutionComponent', () => {
  let component: MeteoPollutionComponent;
  let fixture: ComponentFixture<MeteoPollutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoPollutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoPollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
