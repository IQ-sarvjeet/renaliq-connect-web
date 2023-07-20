import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';
import { PatientService } from 'src/app/api-client';
import { FilterModel } from 'src/app/interfaces/filter.model';
import { EventService } from 'src/app/services/event.service';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';

declare let $: any;

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent {
  moment: any = moment;
  @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
  @ViewChild('rangeDatepickerAssignment', { static: false }) rangeDatepickerAssignment!: any;


  stages: any = [
    'CKD Stage 3a',
    'CKD Stage 3b',
    'CKD Stage 4',
    'CKD Stage 5',
    'ESKD'
  ]
  statusList: any = [
    'New',
    'Outreach in Progress',
    'Reached',
    'Verbal Consent',
    'Written Consent',
    'Deceased',
    'On Hold'
  ]
  dateRangeFilter: any = "02/06/2023 - 02/14/2023";
  dateRangeOptionsAssignment: MbscDatepickerOptions = {
    theme: 'ios',
    controls: ['calendar'],
    select: 'range',
    // defaultValue: this.dateRangeFilter,
    onChange: (value: any) => {
      ////console.log('Date change value:', value);
    },
    onActiveDateChange: (event, inst) => {
      ////console.log('onActiveDateChange:', event, ':::event::', inst);
    },
    onClose: (event) => {
      let assignment = event.value.filter((x:any)=>x==null);
      if(assignment.length != 0)
      {
        this.filter.patientFilter.assignment = [];
      }
      //console.log('onClose:', event);
    }
  };
  fileNameExport: string = '';
  exportStatus: string = ''
  
  filter: FilterModel = {
    currentPage: 1,
    pageSize: environment.pageSize,
    patientFilter :{
      searchKey:'',
      stage:[],
      riskCategory:'',
      careMember:'',
      status:[],
      assignment:[],
      isAssessed:undefined,
      SortBy: '',
      SortDirection: ''
    }
  };
  displayFilter: any = {
    searchKey:'',
    stage:'',
    riskCategory:'',
    careMember:'',
    status:'',
    assignment:[],
    isAssessed:undefined
   
  }
  disabledExport: boolean = false;
  patients: any;
  constructor(  private _interactionService: InteractionService,
    private patientService: PatientService,
    private eventService: EventService){

  }
  submit(){
    console.log(this.filter);
    this.displayFilter = { ...this.filter.patientFilter }
    this._interactionService.setPatientFilter(this.filter);
  }
  exportClickHandler() {
    if (this.exportStatus === 'inprogress') {
      this.exportStatus = 'waitingForStatus';
    }
    this.patientService.apiPatientSummaryExportstatusGet().subscribe({
      next: (response: any) => {
        if (response.exportStatus === 4) {
          this.exportStatus = '';
        }
      }
    })
  }
  submitExport() {
    this.disabledExport = true;
    this.exportStatus = 'inprogress';
    this.patientService.apiPatientSummaryExportFilenameGet(this.fileNameExport).subscribe({
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
    })
  }
  clearFilterHandler() {
    this.filter.patientFilter = {
      searchKey:'',
      stage:[],
      riskCategory:'',
      careMember:'',
      status:[],
      assignment:[],
      isAssessed:undefined,
      SortBy: '',
      SortDirection: ''
    };
    this.displayFilter = {...this.filter.patientFilter};
    this.submit();
  }
  clearFilter(key: string) {
    if(key === 'searchKey') {
      this.displayFilter.searchKey = '';
      this.filter.patientFilter.searchKey = '';
    }
    if(key === 'stage') {
      this.displayFilter.stage = [];
      this.filter.patientFilter.stage = [];
    }
    if(key === 'riskCategory') {
      this.displayFilter.riskCategory = '';
      this.filter.patientFilter.riskCategory = '';
    }
    if(key === 'careMember') {
      this.displayFilter.careMember = '';
      this.filter.patientFilter.careMember = '';
    }
    if(key === 'assignment') {
      this.displayFilter.assignment = [];
      this.filter.patientFilter.assignment = [];
    }
    if(key === 'status') {
      this.displayFilter.status = [];
      this.filter.patientFilter.status = [];
    }
    if(key === 'assessed') {
      this.displayFilter.isAssessed=undefined;
      this.filter.patientFilter.isAssessed = undefined;
    }
    this.submit();
  }
}
