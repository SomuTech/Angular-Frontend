import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { RideInfoDto, RideProviderDto } from '../interfaces';

@Component({
  selector: 'app-updation',
  templateUrl: './updation.component.html',
  styleUrls: ['./updation.component.css'],
})
export class UpdationComponent implements OnInit {
  rideProviderForm!: FormGroup;
  rideInfoForm!: FormGroup;

  updationStatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: RideProvidersDataService
  ) {}

  ngOnInit(): void {
    this.rideProviderDetailsForm();
    this.rideInfoDetailsForm();
    this.fetchUserData();
  }

  rideProviderDetailsForm(): void {
    this.rideProviderForm = this.formBuilder.group({
      adharCard: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],

      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('.+@cognizant\\.com'),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]*$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]*$'),
        ],
      ],
      dlNo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$'
          ),
        ],
      ],
      validUpto: ['', Validators.required],
      status: [
        '',
        [
          Validators.required,
          Validators.pattern('^(Registered|Un-Registered)$'),
        ],
      ],
      dateOfBirth: ['', [Validators.required]],
    });
  }
  rideInfoDetailsForm(): void {
    this.rideInfoForm = this.formBuilder.group({
      rideInfos: this.formBuilder.array([]),
    });
  }

  get rideInfos(): FormArray {
    return this.rideInfoForm.get('rideInfos') as FormArray;
  }

  addRideInfo(): void {
    const rideInfoGroup = this.formBuilder.group({
      vehicleNo: ['', Validators.required],
      carType: ['', Validators.required],
      carName: ['', Validators.required],
      fualType: ['', Validators.required],
      noOfSeats: ['', [Validators.required, Validators.min(0)]],
    });
    this.rideInfos.push(rideInfoGroup);
  }

  removeRideInfo(index: number): void {
    this.rideInfos.removeAt(index);
  }

  fetchUserData() {
    const id = sessionStorage.getItem('rpId');
    this.service.getRideProvider(id).subscribe(
      (userData: RideProviderDto) => {
        if (userData) {
          this.rideProviderForm.patchValue({
            adharCard: userData.adharCard,
            emailId: userData.emailId,
            phone: userData.phone,
            firstName: userData.firstName,
            lastName: userData.lastName,
            dlNo: userData.dlNo,
            validUpto: userData.validUpto,
            status: userData.status,
            dateOfBirth: userData.dateOfBirth,
          });

          this.rideInfos.clear();

          userData.rideInfos.forEach((rideInfo: RideInfoDto) => {
            const rideInfoGroup = this.formBuilder.group({
              vehicleNo: [rideInfo.vehicleNo, Validators.required],
              carType: [rideInfo.carType, Validators.required],
              carName: [rideInfo.carName, Validators.required],
              fualType: [rideInfo.fualType, Validators.required],
              noOfSeats: [
                rideInfo.noOfSeats,
                [Validators.required, Validators.min(0)],
              ],
            });
            this.rideInfos.push(rideInfoGroup);
          });
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  saveUserData() {
    if (this.rideProviderForm.invalid || this.rideInfoForm.invalid) {
      console.log('invalid details');
      return;
    }
    const rideProviderDto: RideProviderDto = {
      ...this.rideProviderForm.value,
      rideInfoDetails: this.rideInfoForm.value,
    };

    this.service
      .updateRideProvider(sessionStorage.getItem('rpId'), rideProviderDto)
      .subscribe(
        (response: any) => {
          sessionStorage.setItem('rpId', response.rpId);
          this.updationStatus = true;
        },
        (error: any) => {
          console.error(error.message);
        }
      );
  }

  deleteRideProvider() {
    console.log('ssff');
    this.service.deleteRideProvider(sessionStorage.getItem('rpId')).subscribe(
      (response: any) => {
        this.updationStatus = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
