import { Component } from '@angular/core';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { BillDto } from '../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent {
  selectedMonth: string = '';
  billings: BillDto[] = [];
  tripBill!: BillDto;
  showBill: boolean = false;
  showTrips: boolean = false;
  tripStarted: boolean = false;
  generateBillForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: RideProvidersDataService
  ) {
    this.buildForm();
  }

  onMonthSelected(month: string): void {
    this.selectedMonth = month;
  }

  buildForm(): void {
    this.generateBillForm = this.formBuilder.group({
      month: ['', Validators.required],
    });
  }

  generateBill() {
    this.service.generateBill(sessionStorage.getItem('rpId')).subscribe(
      (response: BillDto) => {
        this.tripBill = response;
        this.showTrips = false;
        this.showBill = true;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  generateReport() {
    this.showTrips = true;
    this.showBill = false;
  }

  onSubmit(): void {
    this.service.getBilling(sessionStorage.getItem('rpId'), this.generateBillForm.value.month).subscribe(
      (response: BillDto[]) => {
        this.showTrips = true;
        this.billings = response;
        this.showBill = false;
      },
      (error) => {
        console.log(
          'Error occurred while fetching bills:',
          error.error.message
        );
      }
    );
  }
}
