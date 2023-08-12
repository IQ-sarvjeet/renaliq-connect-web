import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';
import { AdmissionService } from 'src/app/api-client';
import { AdmissionHeaders } from '../interfaces/admission';
import { FilterModel } from 'src/app/interfaces/filter.model';
import { environment } from 'src/environments/environment';
import { EventService } from 'src/app/services/event.service';

//const startOfWeek = moment().startOf('week').toDate();
//const endOfWeek   = moment().endOf('week').toDate();
const todayDate = new Date();
const datePrior90 = new Date(new Date().setDate(todayDate.getDate() - 90));

@Component({
  selector: 'app-admission-header',
  templateUrl: './admission-header.component.html',
  styleUrls: ['./admission-header.component.scss']
})
export class AdmissionHeaderComponent {
  @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
  dateRangeFilter: any = `${moment(datePrior90).format('MM/DD/YYYY')} - ${moment(todayDate).format('MM/DD/YYYY')}`;

  dateRangeOptions: MbscDatepickerOptions = {
      theme: 'ios',
      dateFormat: 'MM/DD/YYYY',
      controls: ['calendar'],
      select: 'range',
      defaultValue: this.dateRangeFilter,
      onChange: (value: any) => {
      },
      onActiveDateChange: (event, inst) => {
      },
      onClose: (event) => {
        this.dateRangeFilter = event.valueText;
        this.dateRangeChangeHandler.emit(event.valueText);
        this.renderSummary();
      }
  };
  admissionHeaders: AdmissionHeaders = {} as AdmissionHeaders;
  filter: any = {
    searchKey:'',
    stage:[],
    caseCategory:[],
    diagnosis: '',
    facilityName: ''
  };
  displayFilter: any = {
    searchKey:'',
    stage:[],
    caseCategory:[],
    diagnosis: '',
    facilityName: ''
  }
  diagnosis: any = [];
  facilityName: any = [];
  stages: any = [
    'CKD Stage 3a',
    'CKD Stage 3b',
    'CKD Stage 4',
    'CKD Stage 5',
    'ESKD'
  ]
  caseCategory: any = [
    'Acute inpatient',
    'Inpatient',
    'Medical',
    'Emergency',
    'Skilled Nursing'
  ]
  @Output() dateRangeChangeHandler: EventEmitter<string> = new EventEmitter();
  constructor(private admissionService: AdmissionService,
    private eventService: EventService) {}
  ngOnInit() {
    this.dateRangeChangeHandler.emit(this.dateRangeFilter);
    this.renderSummary();
  }
  private renderSummary() {
    const dateRange: any = {
      fromDate: moment(datePrior90).format('YYYY-MM-DD'),
      toDate: moment(todayDate).format('YYYY-MM-DD')
    }
    this.admissionService.apiAdmissionSummaryFromdateTodateGet(dateRange.fromDate, dateRange.toDate).subscribe((data: any) => {
      this.admissionHeaders = data;
    })
  }
  public diagnosisSelectHandler($event: any) {
    this.filter.diagnosis = $event;
  }
  public facilityNameSelectHandler($event: any) {
    this.filter.facilityName = $event;
  }
  submit(){
    this.displayFilter = { ...this.filter }
    this.eventService.admissionFilterSet({ ...this.filter });
  }
  clearFilterHandler() {
    this.filter = {
      searchKey:'',
      stage:[],
      caseCategory:[],
      diagnosis: '',
      facilityName: ''
    };
    this.displayFilter = {...this.filter};
    this.submit();
  }
  clearFilter(key: string) {
    if(key === 'searchKey') {
      this.displayFilter.searchKey = '';
      this.filter.searchKey = '';
    }
    if(key === 'stage') {
      this.displayFilter.stage = [];
      this.filter.stage = [];
    }
    if(key === 'caseCategory') {
      this.displayFilter.caseCategory = [];
      this.filter.caseCategory = [];
    }
    if(key === 'diagnosis') {
      this.displayFilter.diagnosis = [];
      this.filter.diagnosis = [];
    }
    if(key === 'facilityName') {
      this.displayFilter.facilityName = [];
      this.filter.facilityName = [];
    }
    this.submit();
  }
}
