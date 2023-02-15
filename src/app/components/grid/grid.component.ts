import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/api-client';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  private _subscriptions = new Subscription();
  errorMsg: any = "";
  list: any = [];
  filterModel: any = {
    currentPage: 1,
    pageSize: environment.pageSize,
    patientFilter: {
      searchKey: '',
      stage: '',
      riskCategory: '',
      careMember: '',
      status: '',
      assignment: null,
      discharge: null
    }
  };
  constructor(private _patientService: PatientService,private _interactionService: InteractionService) { }

  ngOnInit(): void {
    this.bindPatientList(this.filterModel);
    let sub = this._interactionService.getpatientFilter$.subscribe((model) => {this.bindPatientList(model); });
    this._subscriptions.add(sub);
  }

  public async bindPatientList(model: any) {
    try {
      var result = await this._patientService.apiPatientListPost(model).toPromise();
      console.log(result);
      this.list = result?.data;
    } 
    catch (ex: any) {
      this.errorMsg = ex.error?.message?.message;
    }
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
