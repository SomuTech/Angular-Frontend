import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-ride',
  templateUrl: './update-ride.component.html',
  styleUrls: ['./update-ride.component.css']
})
export class UpdateRideComponent implements OnInit {
  rideForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.rideForm = this.formBuilder.group({
      rideId: ['', Validators.required],
      // Add more form controls for updating ride information
    });
  }

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