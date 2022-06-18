import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css'],
})
export class ListAddressComponent implements OnInit {
  listAddress: Address[] = [];
  id: string | null;

  constructor(
    private _addressService: AddressService,
    private toastr: ToastrService,
    private autoroute: ActivatedRoute
  ) {
    this.id = this.autoroute.snapshot.paramMap.get('customer_id');
  }

  ngOnInit(): void {
    this.addresses();
  }

  addresses() {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer' + token);

    this._addressService.getAddresses(this.id).subscribe(
      (data) => {
        this.listAddress = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAddress(id: any) {
    this._addressService.removeAddress(id).subscribe(
      (data) => {
        this.toastr.error(
          'El la direccion del cliente fue eliminada con exito',
          'Cliente'
        );
        this.addresses();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
