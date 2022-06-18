import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  titulo = 'Editar Cliente';
  customerForm: FormGroup;
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _customerService: CustomerService,
    private autoroute: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday_date: ['', Validators.required],
      phone_number: ['', Validators.required],
      dui: ['', Validators.required],
      passport: ['', Validators.required],
      isss: ['', Validators.required],
      afp: ['', Validators.required],
    });
    this.id = this.autoroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
  }

  editCustomer() {
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

    if (this.id !== null) {
      this._customerService.editCustomer(this.id, customer).subscribe(
        (data) => {
          this.toastr.success('El cliente fue modificado con exito', 'Cliente');
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.customerForm.reset();
        }
      );
    }
  }

  isEdit() {
    if (this.id !== null) {
      this._customerService.getCustomer(this.id).subscribe((data) => {
        this.customerForm.setValue({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          birthday_date: data.data.birthday_date,
          phone_number: data.data.phone_number,
          dui: data.data.dui,
          passport: data.data.passport,
          isss: data.data.isss,
          afp: data.data.afp,
        });
      });
    }
  }
}
