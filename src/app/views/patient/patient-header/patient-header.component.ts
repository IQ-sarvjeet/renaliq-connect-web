import { Component, ViewChild } from '@angular/core';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import { FilterModel } from 'src/app/interfaces/filter.model';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';

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
  constructor(  private _interactionService: InteractionService,){

  }
  filter: FilterModel = {
    currentPage: 1,
    pageSize: environment.pageSize,
    patientFilter :{
      searchKey:'',
      stage:'CKD Stage1',
      riskCategory:'Low',
      careMember:'',
      status:'Engaged',
      assignment:[],
      discharge:[]
    }
  };

  submit(){
  this._interactionService.setPatientFilter(this.filter);
  }
}
