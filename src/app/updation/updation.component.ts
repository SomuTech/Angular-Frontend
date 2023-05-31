import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';

interface RideProviderDto {
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

interface RideInfoDto {
  vehicleNo: string;
  carType: string;
  carName: string;
  fualType: string;
  noOfSeats: number;
}

@Component({
  selector: 'app-updation',
  templateUrl: './updation.component.html',
  styleUrls: ['./updation.component.css'],
})
export class UpdationComponent implements OnInit {
  rideProviderForm!: FormGroup;
  rideInfoForm!: FormGroup;

  registrationStatus: boolean = false;
  registrationId: string = '';

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

  onSubmit(): void {
    if (this.rideProviderForm.invalid) {
      console.log('Invalid details');
      return;
    }
  }

  fetchUserData() {
    const id = sessionStorage.getItem('rpId');
    this.service.getRideProvider(id).subscribe(
      (userData) => {
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

          // Clear existing ride info form groups
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

  // saveUserData() {
  //   const rideProviderDto: RideProviderDto= {
  //     ...this.rideProviderForm.value,
  //     rideInfoDetails: this.rideInfoForm.value
  //   }

  //   if (this.rideProviderForm.valid) {
  //     const userData = this.rideProviderForm.value;
  //     this.service
  //       .updateRideProvider(sessionStorage.getItem('rpId'), userData)
  //       .subscribe(
  //         (response) => {
  //           console.log('success'); // Assuming the backend returns the updated user ID
  //         },
  //         (error) => {
  //           console.error('Error updating user data:', error);
  //         }
  //       );
  //   }
  // }
}
