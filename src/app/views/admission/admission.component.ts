import { Component } from '@angular/core';
import { AdmissionService } from 'src/app/api-client';

declare const $: any;
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
})
export class AdmissionComponent {
  admissionHeaders: any = {
    admissionBy: 19,
    dischargeBy: 19,
    dischargeByPercentage: 100,
    admissionLastNinetyDays: 20,
    dischargeLastNinetyDays: 20,
    dischargeLastNinetyDaysPercentage: 30
  }
  dateRange: any = {
    fromDate: new Date('2023-10-01'),
    toDate: new Date("2023-10-03")
  }
  constructor(private admissionService: AdmissionService) {}
  ngOnInit(): void {
    //______Data-Table
    // $('#admissionTable').DataTable({
    //   language: {
    //     searchPlaceholder: 'Search...',
    //     sSearch: '',
    //     lengthMenu: '_MENU_',
    //   },
    //   searching: false,
    //   lengthChange: false,
    //   columnDefs: [
    //     {
    //       targets: [0, 9],
    //       orderable: false,
    //     },
    //   ],
    // });
    this.getAdmissionSummary();
  }
  getAdmissionSummary() {
    this.admissionService.apiAdmissionSummaryFromdateTodateGet(this.dateRange.fromDate, this.dateRange.toDate).subscribe((data: any) => {
      console.log('Addmission summary:', data);
    })
  }
}
