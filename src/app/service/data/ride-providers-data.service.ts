import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RideDto {
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

@Injectable({
  providedIn: 'root',
})
export class RideProvidersDataService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8081/api/rideProviders/';

  registerRideProvider(formData: any): Observable<any> {
    const url = `${this.apiUrl}new`;
    return this.http.post(url, formData);
  }

  getBilling(): Observable<any[]> {
    return this.http.get<any[]>(
      'localhost:8081/api/rideProviders/billing?rpId=RPAM01&month=3'
    );
  }

  registerRide(rideDto: RideDto): Observable<any> {
    const url = `${this.apiUrl}addbooking`;
    return this.http.post(url, rideDto);
  }

  updateRideProvider(rpId: any, formData: any): Observable<any> {
    const url = `${this.apiUrl}${rpId}/update`; // Replace with the actual endpoint for updating user
    return this.http.put(url, formData);
  }

  getRideProvider(rpId: any): Observable<any> {
    const url = `${this.apiUrl}get/${rpId}`; // Replace with the actual endpoint for fetching user data
    console.log(this.http.get<any>(url));
    return this.http.get<any>(url);
  }
}
