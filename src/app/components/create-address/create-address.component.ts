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
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css'],
})
export class CreateAddressComponent implements OnInit {
  titulo = 'Agregar Direccion';
  addressForm: FormGroup;
  stateSelected?: string;
  listState: State[] = [];
  listCity: City[] = [];
  customer_id;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _stateService: StateService,
    private _cityService: CityService,
    private _addressService: AddressService,
    private autoroute: ActivatedRoute
  ) {
    this.addressForm = this.fb.group({
      description: ['', Validators.required],
      state_id: [''],
      city_id: [''],
    });
    this.customer_id = this.autoroute.snapshot.paramMap.get('customer_id');
    this.id = this.autoroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.states();
    this.isEdit();
  }

  addAddress() {
    const address: Address = {
      description: this.addressForm.get('description')?.value,
      customer_id: this.customer_id,
      city_id: this.addressForm.get('city_id')?.value,
    };

    this._addressService.createAddress(address).subscribe(
      (data) => {
        this.toastr.success(
          'Se registro exitosamente una nuva direccion para el cliente cliente',
          'Cliente'
        );
        this.router.navigate(['/list-address', this.customer_id]);
      },
      (error) => {
        console.log(error);
        this.addressForm.reset();
      }
    );
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

  cities(id: Event) {
    const state_id = (id.target as HTMLInputElement).value;

    this._cityService.getCities(state_id).subscribe((data) => {
      this.listCity = data.data;
    });
  }

  isEdit() {
    if (this.id !== null) {
      this._addressService.getAddress(this.id).subscribe((data) => {
        this.addressForm.setValue({
          description: data.data.description,
          city_id: data.data.city_id,
        });
      });
    }
  }
}
