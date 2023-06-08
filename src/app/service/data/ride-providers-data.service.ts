import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RideProviderDto,
  RideDto,
  TripDto,
  BillDto,
  TripBookingDto,
} from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RideProvidersDataService {
  constructor(private http: HttpClient) {}

  private rideProviderUrl = 'http://localhost:8081/api/rideProviders';
  private smilesUrl = 'http://localhost:8081/api/smiles';

  registerRideProvider(data: RideProviderDto): Observable<RideProviderDto> {
    return this.http.post<RideProviderDto>(`${this.rideProviderUrl}/new`, data);
  }

  getBilling(): Observable<BillDto[]> {
    const url = `${this.rideProviderUrl}/billing?rpId=RPAM01&month=3`;
    return this.http.get<BillDto[]>(url);
  }

  generateBill(rideId: any): Observable<BillDto> {
    const url = `${this.rideProviderUrl}/generatebill?rideId=${rideId}`;
    return this.http.get<BillDto>(url);
  }

  registerRide(rideDto: RideDto): Observable<RideDto['rideId']> {
    console.log(
      this.http.post<RideDto['rideId']>(
        `${this.rideProviderUrl}/addbooking`,
        rideDto
      )
    );
    return this.http.post<RideDto['rideId']>(
      `${this.rideProviderUrl}/addbooking`,
      rideDto
    );
  }

  updateRideProvider(
    rpId: RideProviderDto['rpId'] | null,
    data: RideProviderDto
  ): Observable<RideProviderDto> {
    console.log(rpId);
    return this.http.put<RideProviderDto>(
      `${this.rideProviderUrl}/${rpId}/update`,
      data
    );
  }

  getRideProvider(
    rpId: RideProviderDto['rpId'] | null
  ): Observable<RideProviderDto> {
    const url = `${this.rideProviderUrl}/get/${rpId}`;
    return this.http.get<RideProviderDto>(url);
  }

  deleteRideProvider(rpId: RideProviderDto['rpId'] | null) {
    if (rpId) {
      const url = `${this.rideProviderUrl}/${rpId}/update`;
      return this.http.put(url, null);
    }
    throw new Error('not registered');
  }

  getSmilesReport(month: string, rpId: any): Observable<TripDto[]> {
    return this.http.get<TripDto[]>(`${this.smilesUrl}/${month}/${rpId}`);
  }

  getRides(rpId: RideProviderDto['rpId'] | null): Observable<RideProviderDto> {
    const url = `${this.rideProviderUrl}get/${rpId}`;
    return this.http.get<RideProviderDto>(url);
  }

  updateRides(tripId: any, data: RideDto): Observable<RideDto['rideId']> {
    const url = `${this.rideProviderUrl}/bookings/${tripId}`;
    return this.http.put<RideDto['rideId']>(url, data);
  }

  getBookingStatus(rideId: any): Observable<TripBookingDto[]> {
    console.log('gbdhdfg');
    const url = `${this.rideProviderUrl}/bookingStatus/${rideId}`;
    return this.http.get<TripBookingDto[]>(url);
  }
}
