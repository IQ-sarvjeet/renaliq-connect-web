import { Component } from '@angular/core';
import { AdmissionService } from 'src/app/api-client';
import { AdmissionHeaders } from './interfaces/admission';

declare const $: any;
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
})
export class AdmissionComponent {
  admissionHeaders: AdmissionHeaders = {
    admissionBy: 19,
    dischargeBy: 19,
    dischargeByPercentage: 100,
    admissionLastNinetyDays: 20,
    dischargeLastNinetyDays: 20,
    dischargeLastNinetyDaysPercentage: 30
  }
  dateRange: any = {
    fromDate: '2023-10-01',
    toDate: "2023-10-03"
  }
  constructor(private admissionService: AdmissionService) {}
  ngOnInit(): void {
    this.getAdmissionSummary();
  }
  getAdmissionSummary() {
    this.admissionService.apiAdmissionSummaryFromdateTodateGet(this.dateRange.fromDate, this.dateRange.toDate).subscribe((data: any) => {
      this.admissionHeaders = data;
    })
  }
}