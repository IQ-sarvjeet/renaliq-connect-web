import { Component, Input } from '@angular/core';
import { AdmissionFilterModel, AdmissionService, SortOrder } from 'src/app/api-client';

@Component({
  selector: 'app-admissions-grid',
  templateUrl: './admissions-grid.component.html',
  styleUrls: ['./admissions-grid.component.scss']
})
export class AdmissionsGridComponent {
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
    this.filters.formDateTime = value.fromDate;
    this.filters.endDateTime = value.toDate;
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
