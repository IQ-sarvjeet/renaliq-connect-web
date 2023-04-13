import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';
import { ClinicalQualityMatrixService } from 'src/app/api-client';
import { ClinicalPatientMetricFilterModel } from 'src/app/interfaces/clinicalPatientMetricFilter.model';
import { EventService } from 'src/app/services/event.service';
import { Messages } from 'src/app/shared/common-constants/messages';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  moment = moment;
  numeratorList :any=[];
  metricList :any=[];
  metricName:string='';
  dateRange:any=[];
  errorMsg: any = "";
  dateList: any = [];
  constructor(private _interactionService: InteractionService,
    public route: ActivatedRoute,
    private _clinicalQualityMatrixService: ClinicalQualityMatrixService){
  }
  ngOnInit(): void {
    this.filterModel.filter.metricId = this.route.snapshot.params['id'];
    this.filterModel.filter.periodId = Number(this.route.snapshot.params['periodId']);
    this.bindMetricList();
    this.bindNumeratorList();
    this.getMetric();
    this._clinicalQualityMatrixService.apiClinicalQualityMatrixAvailablePeriodGet().subscribe({
      next: (response: any) => {
        if(response.length > 0) {
          this.dateList = response;
        }
      }
    })
  }
  
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
  bindNumeratorList() {
    this.numeratorList = [
      { 'Id': 167, 'Name': '167' },
      { 'Id': 172, 'Name': '172' },
      { 'Id': 244, 'Name': '244' },
      { 'Id': 309, 'Name': '309' },
      { 'Id': 326, 'Name': '326' },
      { 'Id': 338, 'Name': '338' },
      { 'Id': 520, 'Name': '520' },
      { 'Id': 733, 'Name': '733' },
      { 'Id': 814, 'Name': '814' },
      { 'Id': 948, 'Name': '948' },
      { 'Id': 986, 'Name': '986' },
    ]    
  }
  public async bindMetricList() {
      try {
        var result =await this._clinicalQualityMatrixService.apiClinicalQualityMatrixMetricsGet().toPromise();
        if(result){
          this.metricList =result;
        }
      } 
      catch (ex: any) {
        this.errorMsg = ex.error?.message?.message;
      }
  }
  public async getMetric() {
    if(this.filterModel.filter.metricId){
      try {
        var result =await this._clinicalQualityMatrixService.apiClinicalQualityMatrixMetricMetricIdGet(this.filterModel.filter.metricId).toPromise();
        if(result){
          this.metricName = result?.name;
        }
      } 
      catch (ex: any) {
        this.errorMsg = ex.error?.message?.message;
      }
    }
    else{
      this.errorMsg = Messages.metricId;
      console.log(this.errorMsg);
    }
  }
  onNumeratorSelected(){
   this.setFilter();
  }
  onMetricSelected(event:any){
    let metric = this.metricList.filter((x:any) => x.id == event.value);
    if(metric){
    this.metricName = metric[0]?.name;
    }
    this.setFilter();
   }
   setFilter(){
     this._interactionService.setClinicalPatientMatrixFilter(this.filterModel);
   }
  dateSelectionHandler($event: any) {
    this.filterModel.filter.periodId = $event.target.value;
    this.setFilter();
  }
}
