import { City } from './city';

export class Address {
  id?: number;
  description: string;
  customer_id: number;
  city_id: number;
  city?: City;

  constructor(
    description: string,
    customer_id: number,
    city_id: number,
    city: City
  ) {
    this.description = description;
    this.customer_id = customer_id;
    this.city_id = city_id;
    this.city = city;
  }
}
