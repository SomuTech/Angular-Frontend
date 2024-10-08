import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { RideProviderDto, RideInfoDto } from '../interfaces';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  rideProviderForm!: FormGroup;
  rideInfoForm!: FormGroup;

  registrationStatus!: boolean;
  registrationId: string = '';
  errorResponse: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: RideProvidersDataService
  ) {}

  ngOnInit(): void {
    this.rideProviderDetailsForm();
    this.rideInfoDetailsForm();
  }

  rideProviderDetailsForm(): void {
    this.rideProviderForm = this.formBuilder.group({
      adharCard: [
        '',
        [
          Validators.required,
          Validators.min(100000000000),
          Validators.max(999999999999),
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
          Validators.min(1000000000),
          Validators.max(9999999999),
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
    if (this.rideProviderForm.invalid || this.rideInfoForm.invalid) {
      console.log('invalid details');
      return;
    }

    const rideProviderDto: RideProviderDto = {
      ...this.rideProviderForm.value,
      rideInfos: this.rideInfoForm.value.rideInfos,
    };

    this.service.registerRideProvider(rideProviderDto).subscribe(
      (response: RideProviderDto) => {
        console.log('Success:', response);
        sessionStorage.setItem('rpId', response.rpId);
        this.registrationStatus = true;
        this.registrationId = response.rpId;
      },
      (error: any) => {
        console.log('Error:', error);
        this.registrationStatus = false;
        this.errorResponse = error?.error?.message || 'An error occurred';
      }
    );
  }
}
