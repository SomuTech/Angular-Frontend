import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { Time } from '@angular/common';

interface RideDto{
  createrUserId: string;
	vehicleId: string;
	rideDate: Date;
	rideTime: Time;
	rideStatus: string;
	seatsFilled: number;
	fromLoc: string;
	toLoc: string;
	numberOfSeats: number;
}

@Component({
  selector: 'app-register-ride',
  templateUrl: './register-ride.component.html',
  styleUrls: ['./register-ride.component.css']
})
export class RegisterRideComponent implements OnInit {
  rideForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: RideProvidersDataService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.rideForm = this.formBuilder.group({
      createrUserId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      rideDate: ['', Validators.required],
      rideTime: ['', Validators.required],
      rideStatus: ['', Validators.required],
      seatsFilled: ['', Validators.required],
      fromLoc: ['', Validators.required],
      toLoc: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.rideForm.invalid) {
      console.log('Invalid details');
      return;
    }
    this.saveRide();
    this.router.navigate(['dashboard']);
  }

  saveRide(): void {
    const rideDto: RideDto = this.rideForm.value as RideDto;
    this.service.registerRide(rideDto).subscribe(
      (response: any) => {
        console.log(response.message);
        console.log(response.id);
        this.router.navigate(['dashboard']);
        // console.log(response.message);
        // console.log(response.id);
      },
      (error)=>{
        console.error(error.message);
      });
  }
}