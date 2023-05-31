import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-smiles',
  templateUrl: './smiles.component.html',
  styleUrls: ['./smiles.component.css']
})
export class SmilesComponent implements OnInit {
  generateSmilesForm!: FormGroup;
  smilesReport: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.generateSmilesForm = this.formBuilder.group({
      month: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.generateSmilesForm.invalid) {
      console.log('Invalid details');
      return;
    }

    // Simulate fetching the smiles report from a service
    // Replace this with your actual service call to retrieve the smiles report for the selected month
    this.fetchSmilesReport(this.generateSmilesForm.value.month).then((report: any[]) => {
      this.smilesReport = report;
    });
  }

  fetchSmilesReport(month: string): Promise<any[]> {
    // Simulate API call and return a promise
    return new Promise<any[]>((resolve, reject) => {
      // Replace this with your actual API call to fetch the smiles report for the selected month
      // Example response data format: [{ name: 'Ride Provider 1', smiles: 5 }, { name: 'Ride Provider 2', smiles: 3 }]
      const report = [
        { name: 'Ride Provider 1', smiles: 5 },
        { name: 'Ride Provider 2', smiles: 3 },
        // Add more data as needed
      ];

      // Simulate delay for API response
      setTimeout(() => {
        resolve(report);
      }, 1000);
    });
  }
}