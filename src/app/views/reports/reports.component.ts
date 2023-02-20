import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClinicalQualityMatrixService } from 'src/app/api-client';
import { ClinicalPatientMetricFilterModel } from 'src/app/interfaces/clinicalPatientMetricFilter.model';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  numeratorList :any=[];
  metricList :any=[];
  metricId :any;
  metricName:string='';
  errorMsg: any = "";

  constructor(private _interactionService: InteractionService,public route: ActivatedRoute,private _clinicalQualityMatrixService: ClinicalQualityMatrixService,){
  }
  ngOnInit(): void {
    this.metricId= this.route.snapshot.params['id'];
    debugger;
    this.bindMetricList();
    this.bindNumeratorList();
    this.getMetric();
  }
  
  filterModel: ClinicalPatientMetricFilterModel = {
    currentPage: 1,
    pageSize: environment.pageSize,
    filter: {
      patientName: '',
      metricId: 0,
      numerator: 0,
      dateRange: []
    }
  };
  bindNumeratorList() {
    this.numeratorList = [
      { 'Id': 167, 'Name': '167' },
      { 'Id': 520, 'Name': '520' },
      { 'Id': 733, 'Name': '733' },
      { 'Id': 948, 'Name': '948' },
      { 'Id': 814, 'Name': '814' },
      { 'Id': 326, 'Name': '326' },
    ]    
  }
  public async bindMetricList() {
      try {
        var result =await this._clinicalQualityMatrixService.apiClinicalQualityMatrixMetricsGet().toPromise();
        console.log(result);
        if(result){
          this.metricList =result;
        }
      } 
      catch (ex: any) {
        this.errorMsg = ex.error?.message?.message;
      }
  }
  public async getMetric() {
    if(this.metricId){
      try {
        var result =await this._clinicalQualityMatrixService.apiClinicalQualityMatrixMetricMetricIdGet(this.metricId).toPromise();
        if(result){
          this.metricName = result?.name;
        }
      } 
      catch (ex: any) {
        this.errorMsg = ex.error?.message?.message;
      }
    }
  
  }
  onNumeratorSelected(event:any){
   this.filterModel.filter.numerator=event.value;
   this.setFilter();
  }
  onMetricSelected(event:any){
    let metric = this.metricList.filter((x:any) => x.id == event.value);
    if(metric){
    this.metricName = metric[0]?.name;
    }
    this.filterModel.filter.metricId=event.value;
    this.setFilter();
   }
   setFilter(){
     this._interactionService.setClinicalPatientMatrixFilter(this.filterModel);
   }
}
