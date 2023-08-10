import { Component, OnInit } from '@angular/core';
import { PaymentReportService } from 'src/app/api-client';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  loadingPymentReport: boolean = false;
  paymentReport: any = {
    summary: {},
    categories: [],
    series: [
      {
        type: 'column',
        name: 'Patient Count',
        data: []
      },
      {
        type: 'column',
        name: 'Engaged Patients',
        data: []
      },
      {
        type: 'line',
        name: 'PMPM Payment Amount',
        data: []
      },
      {
        type: 'line',
        name: 'Incentive at 80%',
        data: []
      },
      {
        type: 'line',
        name: 'Incentive at 100%',
        data: []
      }
    ],
    data: []
  }

  constructor(private paymentReportService: PaymentReportService) { }

  ngOnInit(): void {
    this.loadPaymentReport()
  }

  loadPaymentReport() {
    this.loadingPymentReport = true;
    this.paymentReportService.apiPaymentReportGet().subscribe({
      next: (response: any) => {
        if (response.data) {
          this.paymentReport.data = response.data;
          this.paymentReport.summary = response.summary;
          response.data.forEach((data: any) => {
            this.paymentReport.series[0].data.push(data.patientCount);
            this.paymentReport.series[1].data.push(data.engaged);
            this.paymentReport.series[2].data.push(data.pmpmPaymentAmount);
            this.paymentReport.series[3].data.push(data.incentiveAtEightyPercent);
            this.paymentReport.series[4].data.push(data.incentiveAtHundredPercent);
            this.paymentReport.categories.push(data.reportingPeriod);
          });
          this.loadingPymentReport = false;
        }
      },
      error: (error: any) => {
        this.loadingPymentReport = false;
      }
    });
  }
}
