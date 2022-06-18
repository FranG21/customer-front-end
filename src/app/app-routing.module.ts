import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddressComponent } from './components/create-address/create-address.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { ListAddressComponent } from './components/list-address/list-address.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { ListLogsComponent } from './components/list-logs/list-logs.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'list-customer', component: ListCustomerComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'list-address/:customer_id', component: ListAddressComponent },
  { path: 'create-address/:customer_id', component: CreateAddressComponent },
  { path: 'edit-address/:id', component: EditAddressComponent },
  { path: 'list-logs', component: ListLogsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
