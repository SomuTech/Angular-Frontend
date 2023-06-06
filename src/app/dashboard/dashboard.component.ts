import { Component, OnInit } from '@angular/core';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { BillDto, RideDto, TripBookingDto } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rideBookings: TripBookingDto[] = [];
  tripBill!: BillDto;
  showTrips = false;
  tripStarted: boolean = false;

  constructor(
    private router: Router,
    private service: RideProvidersDataService
  ) {}

  ngOnInit(): void {}

  startTrip(): void {
    this.tripStarted = true;
  }

  endTrip(): void {
    if (this.tripStarted === true) {
      this.tripStarted = false;
      this.router.navigate(['/bill']);
    }
  }

  generateBill(){
    this.service.generateBill('RPAM01').subscribe(
      (response: BillDto) => {
        this.tripBill = response;
        this.showTrips = true;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  getBookingStatus() {
    this.service.getBookingStatus('Ride01').subscribe(
      (response: TripBookingDto[]) => {
        this.rideBookings = response;
        this.showTrips = true;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}
