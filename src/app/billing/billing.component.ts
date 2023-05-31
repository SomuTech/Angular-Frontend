import { Component } from '@angular/core';
import { RideProvidersDataService } from '../service/data/ride-providers-data.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  selectedMonth: string = ''; 
  billings: any[] = []; 

  constructor(private service: RideProvidersDataService){}

  onMonthSelected(month: string): void {
    this.selectedMonth = month;
  }

  generateReport(): void {
    console.log("rule...");
    // if (!this.selectedMonth) {
    //   console.log('Please select a month.');
    //   return;
    // }
      this.service.getBilling().subscribe(
        (data: any[]) => {
          this.billings = data;
          console.log(data);
        },
        (error) => {
          console.log('Error occurred while fetching bills:', error);
        }
      );
    }
}

