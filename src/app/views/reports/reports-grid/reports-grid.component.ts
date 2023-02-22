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
  _subscriptions = new Subscription();
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
    filter: {
      patientName: '',
      metricId: 0,
      numerator: 0,
      dateRange: []
    }
  };

  constructor(private _clinicalQualityMatrixService: ClinicalQualityMatrixService,
    private _interactionService: InteractionService) { }

  ngOnInit(): void {
    this.filterModel.filter.metricId=this.metricId;
    this.bindClinicalPatientMetricList();
    let sub = this._interactionService.getClinicalPatientMatrixFilter$.subscribe((model) => 
    {
      this.filterModel=model;
      this.filterModel.currentPage = 1;
      this.bindClinicalPatientMetricList();
     });
    this._subscriptions.add(sub);
  }
  
  public async bindClinicalPatientMetricList() {
    try {
      var result =await this._clinicalQualityMatrixService.apiClinicalQualityMatrixListPost(this.filterModel).toPromise();
      this.list = result?.data;
      this.gridData.items = result?.data;
      this.gridData.pagingModel = result?.pagingModel;
    } 
    catch (ex: any) {
      this.errorMsg = ex.error?.message?.message;
    }
  }
  getFormatDate(dob:Date){
    return moment(dob).format('YY/MM/DD');
  }
  getAge(dob:any){
    return moment().diff(dob, 'years');
  }
  public gotoPage(page: number): void {
    this.filterModel.currentPage = page;
    this.bindClinicalPatientMetricList();
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
 
}
