import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { TripDto } from '../interfaces';

@Component({
  selector: 'app-smiles',
  templateUrl: './smiles.component.html',
  styleUrls: ['./smiles.component.css'],
})
export class SmilesComponent implements OnInit {
  generateSmilesForm!: FormGroup;
  smilesReport: TripDto[] = [];
  status: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: RideProvidersDataService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.generateSmilesForm = this.formBuilder.group({
      month: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.generateSmilesForm.invalid) {
      console.log('Invalid details');
      return;
    }
    this.service
      .getSmilesReport(
        this.generateSmilesForm.value.month,
        sessionStorage.getItem('rpId')
      )
      .subscribe(
        (response: TripDto[]) => {
          this.smilesReport = response;
          this.status = true;
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
}
