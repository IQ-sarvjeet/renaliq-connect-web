import { Component } from '@angular/core';
import * as moment from 'moment';
import { AdmissionService } from 'src/app/api-client';
import { AdmissionHeaders } from './interfaces/admission';

declare const $: any;
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
})
export class AdmissionComponent {
  showLoading: boolean = false;
  showNoData: boolean = false;
  admissionHeaders: AdmissionHeaders = {
    admissionBy: 0,
    dischargeBy: 0,
    dischargeByPercentage: 0,
    admissionLastNinetyDays: 0,
    dischargeLastNinetyDays: 0,
    dischargeLastNinetyDaysPercentage: 0
  }
  dateRange: any = {
    fromDate: '2023-10-01',
    toDate: "2023-10-03"
  }
  constructor(private admissionService: AdmissionService) {}
  ngOnInit(): void {
  }
  getAdmissionSummary() {
    this.showLoading = true;
    this.admissionService.apiAdmissionSummaryFromdateTodateGet(this.dateRange.fromDate, this.dateRange.toDate).subscribe((data: any) => {
      this.admissionHeaders = data;
      this.showLoading = false;
      if(data && data.admissionBy && data.dischargeBy) {
        this.showNoData = false;
      } else {
        this.showNoData = true;
      }
    })
  }
  dateRangeChangeHandler($event: string) {
    const dates: any = $event.split(' - ');

    const fromDate = dates[0].replaceAll('/', '-').split('-');
    const toDate = dates[1].replaceAll('/', '-').split('-');
    this.dateRange = {
      fromDate: `${fromDate[2]}-${fromDate[1]}-${fromDate[0]}`,
      toDate: `${toDate[2]}-${toDate[1]}-${toDate[0]}`
    }
    this.getAdmissionSummary();
  }
}