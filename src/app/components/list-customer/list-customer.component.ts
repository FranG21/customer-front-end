import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ExportToCSV } from '@molteni/export-csv';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
})
export class ListCustomerComponent implements OnInit {
  listCustomer: Customer[] = [];
  id: string | null;
  @ViewChild('botonCerrar') buttonClose?: ElementRef;

  constructor(
    private _customerService: CustomerService,
    private autoroute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = this.autoroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.customers();
  }

  customers() {
    this._customerService.getCustomers().subscribe(
      (data) => {
        this.listCustomer = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCustomer(id: any) {
    this._customerService.removeCustomer(id).subscribe(
      (data) => {
        this.toastr.error(
          'El cliente fue eliminado con exito',
          'Cliente Eliminado'
        );
        this.customers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadTxt() {
    const exportToCSV = new ExportToCSV();
    exportToCSV.exportColumnsToCSV(this.listCustomer, 'filename.txt', [
      'first_name',
      'last_name',
      'birthday_date',
      'phone_number',
      'dui',
      'passport',
      'isss',
      'afp',
    ]);
  }

  downloadCSV() {
    const exportToCSV = new ExportToCSV();
    exportToCSV.exportColumnsToCSV(this.listCustomer, 'filename.csv', [
      'first_name',
      'last_name',
      'birthday_date',
      'phone_number',
      'dui',
      'passport',
      'isss',
      'afp',
    ]);
  }
}
