import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { Router } from '@angular/router';
import { RideDto } from '../interfaces';

@Component({
  selector: 'app-update-ride',
  templateUrl: './update-ride.component.html',
  styleUrls: ['./update-ride.component.css'],
})
export class UpdateRideComponent implements OnInit {
  rideForm!: FormGroup;
  status: boolean = false;
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
      rideId: ['', Validators.required],
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
      rideId: this.rideForm.get('rideId')!.value,
      createrUserId: '',
      fromLoc: this.rideForm.get('fromLoc')!.value,
      rideDate: this.rideForm.get('rideDate')!.value,
      rideStatus: this.rideForm.get('rideStatus')!.value,
      rideTime: this.rideForm.get('rideTime')!.value,
      seatsFilled: this.rideForm.get('seatsFilled')!.value,
      toLoc: this.rideForm.get('toLoc')!.value,
      vehicleId: this.rideForm.get('vehicleId')!.value,
      numberOfSeats: this.rideForm.get('numberOfSeats')!.value,
    };
    this.service.updateRides(rideDto['rideId'], rideDto).subscribe(
      (response: RideDto['rideId']) => {
        this.status = true;
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.statusResponse = error.error.message;
      }
    );
  }
}
