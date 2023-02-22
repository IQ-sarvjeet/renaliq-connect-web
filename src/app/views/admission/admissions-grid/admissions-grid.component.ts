import { Component, Input } from '@angular/core';
import { AdmissionFilterModel, AdmissionService } from 'src/app/api-client';
import * as moment from 'moment';

@Component({
  selector: 'app-admissions-grid',
  templateUrl: './admissions-grid.component.html',
  styleUrls: ['./admissions-grid.component.scss']
})
export class AdmissionsGridComponent {
  moment = moment;
  admissionList: any = {
    items: [],
    pagingModel: {
      pageSize: 2,
      totalRecords: 19,
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
  constructor(private admissionService: AdmissionService) {}
  ngOnInit() {}
  private getAdmissionList() {
    this.admissionService.apiAdmissionListPost({...this.filters}).subscribe((data: any) => {
      this.admissionList = data;
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
}
