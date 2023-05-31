import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RideProviderDto, RideDto } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RideProvidersDataService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8081/api/rideProviders';

  registerRideProvider(
    data: RideProviderDto
  ): Observable<RideProviderDto['rpId']> {
    return this.http.post<RideProviderDto['rpId']>(`${this.apiUrl}/new`, data);
  }

  getBilling(): Observable<any[]> {
    return this.http.get<any[]>(
      'localhost:8081/api/rideProviders/billing?rpId=RPAM01&month=3'
    );
  }

  registerRide(rideDto: RideDto): Observable<RideDto['rideId']> {
    const url = `${this.apiUrl}/addbooking`;
    return this.http.post<RideDto['rideId']>(url, rideDto);
  }

  updateRideProvider(
    rpId: RideProviderDto['rpId'] | null,
    data: RideProviderDto
  ): Observable<RideProviderDto['rpId']> {
    const url = `${this.apiUrl}/
    ${rpId}/update`;
    return this.http.put<RideProviderDto['rpId']>(url, data);
  }

  getRideProvider(
    rpId: RideProviderDto['rpId'] | null
  ): Observable<RideProviderDto> {
    const url = `${this.apiUrl}get/${rpId}`;
    return this.http.get<RideProviderDto>(url);
  }

  deleteRideProvider(rpId: RideProviderDto['rpId'] | null) {
    if (rpId) {
      const url = `${this.apiUrl}${rpId}/update`;
      return this.http.put(url, null);
    }
    throw new Error('not registered');
  }
}
