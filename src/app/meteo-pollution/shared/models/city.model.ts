import { Address } from './address.model';
import { Meteo } from './meteo.model';
import { Pollution } from './pollution.model';

export class City {
    public address: Address;
    public position: Position;
    public meteo: Meteo;
    public pollution: Pollution;
}