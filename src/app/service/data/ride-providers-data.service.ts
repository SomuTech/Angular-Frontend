import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideProvidersDataService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:8081/api/rideProviders/new"; // Replace with your backend API URL

  registerRideProvider(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }


  getRideProviders(){
    return this.http.get("http://localhost:8081/api/rideProviders/get");
  }

}
