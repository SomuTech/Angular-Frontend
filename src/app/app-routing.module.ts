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
import { HomeComponent } from './home/home.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'update',
    component: UpdationComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'smiles',
    component: SmilesComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'register-ride',
    component: RegisterRideComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'update-ride',
    component: UpdateRideComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'bill',
    component: BillingComponent,
    canActivate: [RouteGuardService],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
