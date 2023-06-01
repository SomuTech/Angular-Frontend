import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RideProviderDto, RideDto, TripDto, BillDto } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RideProvidersDataService {
  constructor(private http: HttpClient) {}

  private rideProviderUrl = 'http://localhost:8081/api/rideProviders';
  private smilesUrl = 'http://localhost:8081/api/smiles';

  registerRideProvider(
    data: RideProviderDto
  ): Observable<RideProviderDto['rpId']> {
    return this.http.post<RideProviderDto['rpId']>(
      `${this.rideProviderUrl}/new`,
      data
    );
  }

  getBilling(): Observable<BillDto[]> {
    return this.http.get<BillDto[]>(
      'localhost:8081/api/rideProviders/billing?rpId=RPAM01&month=3'
    );
  }

  registerRide(rideDto: RideDto): Observable<RideDto['rideId']> {
    const url = `${this.rideProviderUrl}/addbooking`;
    return this.http.post<RideDto['rideId']>(url, rideDto);
  }

  updateRideProvider(
    rpId: RideProviderDto['rpId'] | null,
    data: RideProviderDto
  ): Observable<RideProviderDto['rpId']> {
    const url = `${this.rideProviderUrl}/
    ${rpId}/update`;
    return this.http.put<RideProviderDto['rpId']>(url, data);
  }

  getRideProvider(
    rpId: RideProviderDto['rpId'] | null
  ): Observable<RideProviderDto> {
    const url = `${this.rideProviderUrl}get/${rpId}`;
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

  updateRides(
    tripId: RideDto['rideId'] | null,
    data: RideDto
  ): Observable<RideDto['rideId']> {
    return this.http.put<RideDto['rideId']>(
      `localhost:8081/api/rideProviders/bookings/${tripId}`,
      data
    );
  }
}
