import { CityGeocode } from './city-geocode.model';

export interface Geocode {
    length: number;
    results: CityGeocode[];
  }