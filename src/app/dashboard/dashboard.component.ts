import { Component, OnInit } from '@angular/core';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { TripBookingDto } from '../interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rideBookings: any[] = []; // Array to store ride booking information
  tripBills: any[] = []; // Array to store trip bill details per person
  showTripBill = false; // Flag to control visibility of trip bill section

  constructor(private service: RideProvidersDataService) {}

  ngOnInit(): void {}

  startTrip(): void {
    // Implement start trip logic here
    console.log('Trip started');
  }

  endTrip(): void {
    // Implement end trip logic here

    // Display trip bill per person
    this.showTripBill = true;

    // Populate trip bill details (replace with actual data)
    this.tripBills = [
      { seekerName: 'Rider 1', amount: 50 },
      { seekerName: 'Rider 2', amount: 40 },
      { seekerName: 'Rider 3', amount: 30 },
    ];
  }

  getBookingStatus() {
    this.service.getBookingStatus('Ride01').subscribe(
      (response: TripBookingDto[]) => {
        console.log(response);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}
