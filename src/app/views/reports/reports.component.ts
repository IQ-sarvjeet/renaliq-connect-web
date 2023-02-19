import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ClinicalQualityMatrixService } from 'src/app/api-client';
import { ClinicalPatientMetricFilterModel } from 'src/app/interfaces/clinicalPatientMetricFilter.model';
import { GridModel } from 'src/app/interfaces/grid.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  private _subscriptions = new Subscription();
  errorMsg: any = "";
  gridData: GridModel = {
    items: [],
    pagingModel:{ 
      pageSize: environment.pageSize,
      totalRecords:0,
      currentPage: 1,
      totalPages: 0
    }
  }
  list: any = [];
  filterModel: ClinicalPatientMetricFilterModel = {
    currentPage: 1,
    pageSize: environment.pageSize,
    patientFilter: {
      patientName: '',
      metricId: 0,
      numerator: null,
      dateRange: []
    }
  };
  constructor(private _clinicalQualityMatrixService: ClinicalQualityMatrixService) { }

  ngOnInit(): void {
    this.bindClinicalPatientMetricList();
    // let sub = this._interactionService.getpatientFilter$.subscribe((model) => 
    // {
    //   this.filterModel=model;
    //   this.filterModel.currentPage = 1;
    //   this.bindPatientList();
    //  });
    // this._subscriptions.add(sub);
  }

  public async bindClinicalPatientMetricList() {
    try {
      // var result =//await this._clinicalQualityMatrixService.apiPatientListPost(this.filterModel).toPromise();
      // console.log(result);
      // this.list = result?.data;
      // this.gridData.items = result?.data;
      // this.gridData.pagingModel = result?.pagingModel;
    } 
    catch (ex: any) {
      this.errorMsg = ex.error?.message?.message;
    }
  }
  public gotoPage(page: number): void {
    this.filterModel.currentPage = page;
    this.bindClinicalPatientMetricList();
  }
  getFormatDate(dob:Date){
    return moment(dob).format('YY/MM/DD');
  }
  getAge(dob:any){
    return moment().diff(dob, 'years');
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
