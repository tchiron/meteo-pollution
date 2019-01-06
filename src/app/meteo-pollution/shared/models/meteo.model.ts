import { Main } from './main.model';
import { Weather } from './weather.model';
import { Clouds } from './clouds.model';
import { Wind } from './wind.model';
import { Sys } from './sys.model';

export class Meteo {
    main: Main;
    weather: Weather;
    clouds: Clouds;
    wind: Wind;
    sys: Sys;
    dt: number;
}