import { Time } from '@angular/common';

export interface RideProviderDto {
  rpId: string;
  adharCard: string;
  emailId: string;
  phone: number;
  firstName: string;
  lastName: string;
  dlNo: string;
  validUpto: string;
  status: string;
  dateOfBirth: string;
  rideInfos: RideInfoDto[];
}

export interface RideInfoDto {
  vehicleNo: string;
  carType: string;
  carName: string;
  fualType: string;
  noOfSeats: number;
  rpId: string;
}

export interface RideDto {
  rideId: string;
  createrUserId: string;
  vehicleId: string;
  rideDate: string;
  rideTime: string;
  rideStatus: string;
  seatsFilled: number;
  fromLoc: string;
  toLoc: string;
  numberOfSeats: number;
}