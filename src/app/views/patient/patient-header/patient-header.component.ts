import { Component } from '@angular/core';
import { FilterModel } from 'src/app/interfaces/filter.model';
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
}
