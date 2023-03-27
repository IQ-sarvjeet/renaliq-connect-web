import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
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
  @ViewChild('rangeDatepicker', { static: false }) rangeDatepicker!: any;
  @ViewChild('rangeDatepickerAssignment', { static: false }) rangeDatepickerAssignment!: any;
  dateRangeFilter: any = "02/06/2023 - 02/14/2023";
  dateRangeOptions: MbscDatepickerOptions = {
    theme: 'ios',
    controls: ['calendar'],
    select: 'range',
    // defaultValue: this.dateRangeFilter,
    onChange: (value: any) => {
      //console.log('Date change value:', value);
    },
    onActiveDateChange: (event, inst) => {
      //console.log('onActiveDateChange:', event, ':::event::', inst);
    },
    onClose: (event) => {
      let discharge = event.value.filter((x:any)=>x==null);
      if(discharge.length  != 0) 
      {
        this.filter.patientFilter.discharge = [];
      }
      console.log('onClose:', event);
    }
  };
  dateRangeOptionsAssignment: MbscDatepickerOptions = {
    theme: 'ios',
    controls: ['calendar'],
    select: 'range',
    // defaultValue: this.dateRangeFilter,
    onChange: (value: any) => {
      //console.log('Date change value:', value);
    },
    onActiveDateChange: (event, inst) => {
      //console.log('onActiveDateChange:', event, ':::event::', inst);
    },
    onClose: (event) => {
      let assignment = event.value.filter((x:any)=>x==null);
      if(assignment.length != 0)
      {
        this.filter.patientFilter.assignment = [];
      }
      console.log('onClose:', event);
    }
  };
  fileNameExport: string = '';
  exportStatus: string = ''
  constructor(  private _interactionService: InteractionService,
    private patientService: PatientService,
    private eventService: EventService){

  }
  filter: FilterModel = {
    currentPage: 1,
    pageSize: environment.pageSize,
    patientFilter :{
      searchKey:'',
      stage:'',
      riskCategory:'',
      careMember:'',
      status:'',
      assignment:[],
      discharge:[]
    }
  };

  submit(){
  this._interactionService.setPatientFilter(this.filter);
  }
  exportClickHandler() {
    // this.patientService.apiPatientSummaryExportstatusGet().subscribe({
    //   next: (response: any) => {
    //     // console.log('submit export:', response);
    //     console.log('exportClickHandler', response);
    //   }
    // })
  }
  submitExport() {
    this.patientService.apiPatientSummaryExportFilenameGet(this.fileNameExport).subscribe({
      next: (response: any) => {
        $('#exportFilter').modal('hide');
        this.eventService.openToaster({
          showToster: true,
          message: `Report submitted successfully.`,
          type: 'success',
        });
      }
    })
  }
}
