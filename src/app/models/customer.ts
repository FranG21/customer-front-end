export class Customer {
  id?: number;
  first_name: string;
  last_name: string;
  birthday_date: Date;
  phone_number: string;
  dui: string;
  passport: string;
  isss: string;
  afp: string;

  constructor(
    first_name: string,
    last_name: string,
    birthday_date: Date,
    phone_number: string,
    dui: string,
    passport: string,
    isss: string,
    afp: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthday_date = birthday_date;
    this.phone_number = phone_number;
    this.dui = dui;
    this.passport = passport;
    this.isss = isss;
    this.afp = afp;
  }
}
