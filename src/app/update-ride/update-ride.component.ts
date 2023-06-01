import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';

@Component({
  selector: 'app-update-ride',
  templateUrl: './update-ride.component.html',
  styleUrls: ['./update-ride.component.css'],
})
export class UpdateRideComponent implements OnInit {
  rideForm!: FormGroup;

  updationStatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: RideProvidersDataService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    // this.fetchUserData();
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

  // fetchUserData() {
  //   const id = sessionStorage.getItem('rpId');
  //   this.service.updateRides.subscribe(
  //     (data)=>{this.rideForm.patchValue({
  //       createrUserId: data.createrUserId,
  //       vehicleId: data.vehicleId,
  //       rideDate: data.rideDate,
  //       rideTime: data.rideTime,
  //       rideStatus: data.rideStatus,
  //       seatsFilled: data.seatsFilled,
  //       fromLoc: data.fromLoc,
  //       toLoc: data.toLoc,
  //       numberOfSeats: data.numberOfSeats}
  //     );
  //     (error) => {
  //       console.error('Failed to fetch data from the backend.');
  //     }
  //   );
  // }

  onSubmit(): void {
    if (this.rideForm.invalid) {
      console.log('Invalid details');
      return;
    }

    // Update the ride information
    // Replace this with your actual update logic or API call
    this.updateRide();

    // Display an acknowledgement upon successful update
    console.log('Ride information updated successfully');
  }

  updateRide(): void {
    // Implement your update logic here
    console.log('Ride information updated:', this.rideForm.value);
  }
}
