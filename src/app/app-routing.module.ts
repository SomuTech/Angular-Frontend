import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { UpdationComponent } from './updation/updation.component';
import { SmilesComponent } from './smiles/smiles.component';
import { RegisterRideComponent } from './register-ride/register-ride.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateRideComponent } from './update-ride/update-ride.component';
import { BillingComponent } from './billing/billing.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'update', component: UpdationComponent },
  { path: 'smiles', component: SmilesComponent },
  { path: 'register-ride', component: RegisterRideComponent },
  { path: 'update-ride', component: UpdateRideComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bill', component: BillingComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
