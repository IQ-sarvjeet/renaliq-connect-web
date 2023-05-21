import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription, filter } from 'rxjs';
import { ClinicalQualityMatrixService } from 'src/app/api-client';
import { ClinicalPatientMetricFilterModel } from 'src/app/interfaces/clinicalPatientMetricFilter.model';
import { ClinicalPatientMatrixExportFilterModel } from 'src/app/api-client';
import { GridModel } from 'src/app/interfaces/grid.model';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';
import { EventService } from 'src/app/services/event.service';

declare let $: any;

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss']
})
export class ReportsGridComponent implements OnInit  {
  @Input() metricId : any;
  @Input() periodId : any;
  moment = moment;
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
  fileNameExport: string = '';
  exportStatus: string = ''
  disabledExport: boolean = false;
  
  filterModel: ClinicalPatientMetricFilterModel = {
    currentPage: 1,
    pageSize: environment.pageSize,
    filter: {
      patientName: '',
      metricId: 0,
      numerator: 0,
      denominator :0,
      stage : '',
      status : '',
      periodId: 0,
      dateRange: []
    }
  };
  displayFilter: any = {
    denominator :0,
    stage : '',
    status : '',
    metricId:0,
    numerator:0,
    periodId:0,
  }

  filterExportModel: ClinicalPatientMatrixExportFilterModel ={};
  
  constructor(private _clinicalQualityMatrixService: ClinicalQualityMatrixService,
    private _interactionService: InteractionService,
    private eventService: EventService,private route: Router) { }

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
  
  submit(){
    this.displayFilter = { ...this.filterModel.filter }
    this._interactionService.setClinicalPatientMatrixFilter(this.filterModel);
  }
exportClickHandler() {
    if (this.exportStatus === 'inprogress') {
      this.exportStatus = 'waitingForStatus';
    }
   /* this.patientService.apiPatientSummaryExportstatusGet().subscribe({
      next: (response: any) => {
        if (response.exportStatus === 4) {
          this.exportStatus = '';
        }
      }
    }) */
  }

  submitExport() {
    console.log("Submitting export ..");
    this.filterExportModel = this.filterModel;
    this.filterExportModel.fileName = this.fileNameExport;
    console.log(this.filterExportModel);
    this.disabledExport = true;
    this.exportStatus = 'inprogress';
    this._clinicalQualityMatrixService.apiClinicalQualityMatrixPatientExportPost(this.filterExportModel).subscribe({
      next: (response: any) => {
        this.fileNameExport = '';
        $('#exportFilter').modal('hide');
        this.eventService.openToaster({
          showToster: true,
          message: `Patient - Export requested submitted successfully.`,
          type: 'success',
        });
        this.disabledExport = false;
        this.eventService.notificationEventUpdate(true);
      },
      error: (error) => {
        this.exportStatus = 'error';
        this.disabledExport = false;
        this.fileNameExport = '';
      }
    });
  }
  

  clearFilterHandler() {
    this.filterModel.filter = {
      stage:'',
      metricId:0,
      numerator:0,
      periodId:0,
      status:'',
      sortBy: '',
      sortDirection: '',
      denominator :0,
    };
    this.displayFilter = {...this.filterModel.filter};
    this.submit();
  }
  clearFilter(key: string) {
    if(key === 'searchKey') {
      this.displayFilter.status = '';
      this.filterModel.filter.status = '';
    }
    if(key === 'stage') {
      this.displayFilter.stage = '';
      this.filterModel.filter.stage = '';
    }
    if(key === 'metricId') {
      this.displayFilter.metricId = 0;
      this.filterModel.filter.metricId = 0;
    }
    if(key === 'numerator') {
      this.displayFilter.numerator = 0;
      this.filterModel.filter.numerator = 0;
    }
    if(key === 'denominator') {
      this.displayFilter.denominator = 0;
      this.filterModel.filter.denominator = 0;
    }
    if(key === 'status') {
      this.displayFilter.status = '';
      this.filterModel.filter.status = '';
    }
    if(key === 'periodId') {
      this.displayFilter.periodId = 0;
      this.filterModel.filter.periodId = 0;
    }
    this.submit();
  }

  public GetDateWithOutTimeZone(date :Date)
  {
   return new Date(date.getTime() +  Math.abs(date.getTimezoneOffset()*60000) );
  }
  public async bindClinicalPatientMetricList() {
    this.showLoading = true;
    try {
      var result =await this._clinicalQualityMatrixService.apiClinicalQualityMatrixPatientListPost(this.filterModel).toPromise();
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
  openProfile(patient: any) {
    this.route.navigate([`/patient-profile/${patient.patientId}`, {
        patientId: patient.patientId ? patient.patientId: '',
        enrollmentNo: patient.enrollmentNo ? patient.enrollmentNo: ''
      }
    ])
  }
  
  applySort(columnName: string) {
    const prevSortBy = this.filterModel.filter.sortBy;
    if(prevSortBy === columnName && this.filterModel.filter.sortDirection === '') {
      this.filterModel.filter.sortDirection = 'asc';
    } else {
      this.filterModel.filter.sortDirection= '';
    }
    this.filterModel.filter.sortBy = columnName;
    this.bindClinicalPatientMetricList();
  }
  renderArrowIcon(columnName: string) {
    if(columnName === this.filterModel.filter.sortBy && this.filterModel.filter.sortDirection  === 'asc') {
      return 'table-header-asc';
    } else if(columnName === this.filterModel.filter.sortBy) {
      return 'table-header-desc';
    }
    return '';
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
 
}
