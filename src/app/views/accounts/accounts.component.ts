import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  sampleJSON: any = {
    summary: {
      attributed: 294,
      engaged: 145,
      assessed: 343,
      lastPayment: 3434,
    },
    categories: ['August 2022', 'September 2022', 'October 2022', 'November 2022', 'December 2022',
      'January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023', 'June 2023', 'July 2023'],
    series: [
      {
        type: 'column',
        name: 'Engaged',
        data: [3, 2, 1, 3, 4, 2, 1, 3, 4, 9, 2, 5]
      },
      {
        type: 'column',
        name: 'Patient Count',
        data: [2, 3, 5, 7, 6, 2, 1, 3, 4, 9, 5, 2]
      },
      {
        type: 'line',
        name: 'PMPM Payment Amount',
        data: [3, 2, 1, 3, 4, 2, 1, 3, 4, 9, 2, 5]
      },
      {
        type: 'line',
        name: 'Incentive at 80%',
        data: [2, 3, 5, 7, 6, 2, 1, 3, 4, 9, 5, 2]
      },
      {
        type: 'line',
        name: 'Incentive at 100%',
        data: [2, 10, 5, 8, 4, 9, 1, 3, 6, 3, 7, 8]
      }
    ],
    tableData: [
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      },
      {
        reportingPeriod: "August 2020",
        practiceName: "Kidney Care center - Multistate",
        attributedPatients: 315,
        engaged: 117,
        assessed: 111,
        pmpmAmount: "$15",
        pmpmPaymentAmt: "$1,755",
        incentiveAtEightyPercent: 3780,
        incentiveAtHunderedPercent: 4725,
        ReportDate: "09/01/2022"
      }
    ]
  }
}
