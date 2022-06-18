import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { City } from 'src/app/models/city';
import { Customer } from 'src/app/models/customer';
import { State } from 'src/app/models/state';
import { AddressService } from 'src/app/services/address.service';
import { CityService } from 'src/app/services/city.service';
import { CustomerService } from 'src/app/services/customer.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  titulo = 'Crear Cliente';
  customerForm: FormGroup;
  stateSelected?: string;
  listState: State[] = [];
  listCity: City[] = [];
  customer_id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _customerService: CustomerService,
    private _stateService: StateService,
    private _cityService: CityService,
    private _addressService: AddressService
  ) {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday_date: ['', Validators.required],
      phone_number: ['', Validators.required],
      description: ['', Validators.required],
      dui: ['', Validators.required],
      passport: ['', Validators.required],
      isss: ['', Validators.required],
      afp: ['', Validators.required],
      state_id: [''],
      city_id: [''],
    });
  }

  ngOnInit(): void {
    this.states();
  }

  states() {
    this._stateService.getStates().subscribe(
      (data) => {
        this.listState = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addCustomer() {
    const customer: Customer = {
      first_name: this.customerForm.get('first_name')?.value,
      last_name: this.customerForm.get('last_name')?.value,
      birthday_date: this.customerForm.get('birthday_date')?.value,
      phone_number: this.customerForm.get('phone_number')?.value,
      dui: this.customerForm.get('dui')?.value,
      passport: this.customerForm.get('passport')?.value,
      isss: this.customerForm.get('isss')?.value,
      afp: this.customerForm.get('afp')?.value,
    };

    this._customerService.createCustomer(customer).subscribe(
      (data) => {
        this.customer_id = data.data.id;

        const address: Address = {
          description: this.customerForm.get('description')?.value,
          customer_id: this.customer_id,
          city_id: this.customerForm.get('city_id')?.value,
        };

        this._addressService.createAddress(address).subscribe(
          (data) => {
            this.toastr.success(
              'El cliente fue registado con exito',
              'Cliente'
            );
            this.router.navigate(['/list-customer']);
          },
          (error) => {
            console.log(error);
            this.customerForm.reset();
          }
        );
      },
      (error) => {
        console.log(error);
        this.customerForm.reset();
      }
    );
  }

  cities(id: Event) {
    const state_id = (id.target as HTMLInputElement).value;

    this._cityService.getCities(state_id).subscribe((data) => {
      this.listCity = data.data;
    });
  }
}
