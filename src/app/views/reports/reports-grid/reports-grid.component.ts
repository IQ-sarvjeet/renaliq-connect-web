import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ClinicalQualityMatrixService } from 'src/app/api-client';
import { ClinicalPatientMetricFilterModel } from 'src/app/interfaces/clinicalPatientMetricFilter.model';
import { GridModel } from 'src/app/interfaces/grid.model';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss']
})
export class ReportsGridComponent implements OnInit  {
  @Input() metricId : any;
  @Input() periodId : any;
  _subscriptions = new Subscription();
  errorMsg: any = "";
  showLoading: boolean = false;
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
    filter: {
      patientName: '',
      metricId: 0,
      numerator: 0,
      periodId: 0,
      dateRange: []
    }
  };

  constructor(private _clinicalQualityMatrixService: ClinicalQualityMatrixService,
    private _interactionService: InteractionService) { }

  ngOnInit(): void {
    this.filterModel.filter.metricId=this.metricId;
    this.filterModel.filter.periodId=this.periodId;
    this.bindClinicalPatientMetricList();
    let sub = this._interactionService.getClinicalPatientMatrixFilter$.subscribe((model) => 
    {
      this.filterModel=model;
      this.filterModel.currentPage = 1;
      if(this.filterModel.filter.dateRange?.length == 2){
        let discharge =this.filterModel.filter.dateRange;
        this.filterModel.filter.dateRange[0] =this.GetDateWithOutTimeZone(discharge[0]);
        this.filterModel.filter.dateRange[1] = this.GetDateWithOutTimeZone(discharge[1]);
      }
      this.bindClinicalPatientMetricList();
     });
    this._subscriptions.add(sub);
  }
  public GetDateWithOutTimeZone(date :Date)
  {
   return new Date(date.getTime() +  Math.abs(date.getTimezoneOffset()*60000) );
  }
  public async bindClinicalPatientMetricList() {
    this.showLoading = true;
    try {
      var result =await this._clinicalQualityMatrixService.apiClinicalQualityMatrixPatientListPost(this.filterModel).toPromise();
      console.log('result:::', result);
      this.list = result?.data;
      this.gridData.items = result?.data;
      this.gridData.pagingModel = result?.pagingModel;
      this.showLoading = false;
    } 
    catch (ex: any) {
      this.errorMsg = ex.error?.message?.message;
      this.showLoading = false;
    }
  }
  getFormatDate(dob:Date){
    return moment(dob).format('MM/DD/YYYY');
  }
  getAge(dob:any){
    return moment().diff(dob, 'years');
  }
  public gotoPage(page: number): void {
    this.filterModel.currentPage = page;
    this.bindClinicalPatientMetricList();
  }
  reloadPage() {
    window.location.reload();
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
 
}
