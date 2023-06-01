import { Component } from '@angular/core';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';
import { BillDto } from '../interfaces';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent {
  selectedMonth: string = '';
  billings: BillDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: RideProvidersDataService
  ) {}

  onMonthSelected(month: string): void {
    this.selectedMonth = month;
  }

  generateReport(): void {
    this.service.getBilling().subscribe(
      (response: BillDto[]) => {
        this.billings = response;
        console.log(response);
      },
      (error) => {
        console.log('Error occurred while fetching bills:', error);
      }
    );
  }
}
