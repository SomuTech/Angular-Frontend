import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: RideProvidersDataService) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      adharCard: [
        '',
        [Validators.required, Validators.min(1), Validators.max(999999999999)],
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
        [Validators.required, Validators.min(1), Validators.max(9999999999)],
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

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }
  
    const formData = this.registrationForm.value;
  
    this.service.registerRideProvider(formData).subscribe(
      response => {
        // Handle success response from the backend

        console.log(response.message);
        console.log('Registration successful', response.message);
      },
      error => {
        // Handle error response from the backend
        console.error('Registration failed', error.message);
      }
    );
  }

}
