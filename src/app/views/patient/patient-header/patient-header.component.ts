import { Component } from '@angular/core';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent {
  constructor(  private _interactionService: InteractionService,){

  }
  filter: any = {
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
    debugger;
  this._interactionService.setPatientFilter(this.filter);
  }
}
