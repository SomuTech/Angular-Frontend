import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { RideDto, RideProviderDto } from '../interfaces';

@Component({
  selector: 'app-register-ride',
  templateUrl: './register-ride.component.html',
  styleUrls: ['./register-ride.component.css'],
})
export class RegisterRideComponent implements OnInit {
  rideForm!: FormGroup;
  status!: boolean;
  statusResponse: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: RideProvidersDataService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.rideForm = this.formBuilder.group({
      createrUserId: ['', Validators.required],
      fromLoc: ['', Validators.required],
      rideDate: ['', Validators.required],
      rideStatus: ['', Validators.required],
      rideTime: ['', Validators.required],
      seatsFilled: ['', Validators.required],
      toLoc: ['', Validators.required],
      vehicleId: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.rideForm.invalid) {
      console.log('Invalid details');
      return;
    }
    this.saveRide();
  }

  saveRide(): void {
    const rideDto: RideDto = {
      rideId: '',
      tripId: '',
      createrUserId: this.rideForm.get('createrUserId')!.value,
      fromLoc: this.rideForm.get('fromLoc')!.value,
      rideDate: this.rideForm.get('rideDate')!.value,
      rideStatus: this.rideForm.get('rideStatus')!.value,
      rideTime: this.rideForm.get('rideTime')!.value,
      seatsFilled: this.rideForm.get('seatsFilled')!.value,
      toLoc: this.rideForm.get('toLoc')!.value,
      vehicleId: this.rideForm.get('vehicleId')!.value,
      numberOfSeats: this.rideForm.get('numberOfSeats')!.value,
    };
    this.service.registerRide(rideDto).subscribe(
      (response: RideDto) => {
        this.status = true;
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.log(error.message);
        this.status = false;
        this.statusResponse = error.error.message;
      }
    );
  }
}
