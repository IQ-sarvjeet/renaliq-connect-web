import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/api-client';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
declare const $: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  private _subscriptions = new Subscription();
  errorMsg: any = "";
  gridData: any = {
    items: [],
    pagingModel: { 
      pageSize: environment.pageSize,
      totalRecords:0,
      currentPage: 1,
      totalPages: 0
    }
  }
  
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
      assignment: [],
      discharge: []
    }
  };
  constructor(private _patientService: PatientService,private _interactionService: InteractionService) { }

  ngOnInit(): void {
    this.bindPatientList();
    let sub = this._interactionService.getpatientFilter$.subscribe((model) => 
    {
      this.filterModel=model;
      this.filterModel.currentPage = 1;
      this.bindPatientList();
     });
    this._subscriptions.add(sub);
  }

  public async bindPatientList() {
    try {
      var result = await this._patientService.apiPatientListPost(this.filterModel).toPromise();
      console.log(result);
      this.list = result?.data;
      this.gridData.items = result?.data;
      this.gridData.pagingModel = result?.pagingModel;
    } 
    catch (ex: any) {
      this.errorMsg = ex.error?.message?.message;
    }
  }
  public gotoPage(page: number): void {
    this.filterModel.currentPage = page;
    this.bindPatientList();
  }
  getFormatDob(dob:Date){
    return moment(dob).format('YY/MM/DD');
  }
  getAge(dob:any){
    return moment().diff(dob, 'years');
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
