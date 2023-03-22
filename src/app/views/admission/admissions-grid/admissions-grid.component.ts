import { Component, Input } from '@angular/core';
import { AdmissionFilterModel, AdmissionService } from 'src/app/api-client';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admissions-grid',
  templateUrl: './admissions-grid.component.html',
  styleUrls: ['./admissions-grid.component.scss']
})
export class AdmissionsGridComponent {
  moment = moment;
  showLoading: boolean = false;
  admissionList: any = {
    items: [],
    pagingModel: {
      pageSize: 10,
      totalRecords: 0,
      currentPage: 1,
      totalPages: 9
    }
  }
  filters: AdmissionFilterModel = {
    formDateTime: new Date(),
    endDateTime: new Date(),
    currentPage: 1,
    pageSize: this.admissionList.pagingModel.pageSize,
    sortBy: 'AdmissionDate',
    sortOrderBy: 0
  }
  @Input() set dateRange(value: any) {
    this.filters.formDateTime = new Date(value.fromDate);
    this.filters.endDateTime = new Date(value.toDate);
    this.getAdmissionList();
  }
  constructor(private admissionService: AdmissionService, private route: Router) {}
  ngOnInit() {}
  private getAdmissionList() {
    this.showLoading = true;
    this.admissionService.apiAdmissionListPost({...this.filters}).subscribe((data: any) => {
      this.admissionList = data;
      this.showLoading = false;
    })
  }
  public gotoPage(page: number): void {
    this.admissionList.pagingModel.currentPage = page;
    this.filters = {
      ...this.filters,
      currentPage: page,
      pageSize: this.admissionList.pagingModel.pageSize,
    };
    this.getAdmissionList();
  }
  redirectOnPatientProfileHandler(patient: any) {
    this.route.navigateByUrl(`/patient-profile/${patient.patientId}`, {state: {
      patientId: patient.patientId,
      enrollmentNo: patient.admissionId
    }})
  }
}
