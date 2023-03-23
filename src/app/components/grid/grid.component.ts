import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/api-client';
import { InteractionService } from 'src/app/shared/services/patient.interaction.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { GridModel } from 'src/app/interfaces/grid.model';
import { FilterModel } from 'src/app/interfaces/filter.model';
import { Messages } from 'src/app/shared/common-constants/messages';
declare const $: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  message: any = Messages;
  private _subscriptions = new Subscription();
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

  filterModel: FilterModel = {
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
  @Output() actionHandler: EventEmitter<any> = new EventEmitter();
  constructor(private _patientService: PatientService,private _interactionService: InteractionService) { }

  ngOnInit(): void {
    this.bindPatientList();
    let sub = this._interactionService.getpatientFilter$.subscribe((model) => 
    {
      this.filterModel=model;
      this.filterModel.currentPage = 1;

      if(this.filterModel.patientFilter.assignment?.length == 2){
        let assignmentDate =this.filterModel.patientFilter.assignment;
        this.filterModel.patientFilter.assignment[0] = this.GetDateWithOutTimeZone(assignmentDate[0]);
        this.filterModel.patientFilter.assignment[1] = this.GetDateWithOutTimeZone(assignmentDate[1]);
      }
      if(this.filterModel.patientFilter.discharge?.length == 2){
        let discharge =this.filterModel.patientFilter.discharge;
        this.filterModel.patientFilter.discharge[0] =this.GetDateWithOutTimeZone(discharge[0]);
        this.filterModel.patientFilter.discharge[1] = this.GetDateWithOutTimeZone(discharge[1]);
      }
      this.bindPatientList();
     });
    this._subscriptions.add(sub);
  }
 public GetDateWithOutTimeZone(date :Date)
 {
   return new Date(date.getTime() +  Math.abs(date.getTimezoneOffset()*60000) );
 }
  public async bindPatientList() {
    try {
      this.showLoading = true;
      var result = await this._patientService.apiPatientListPost(this.filterModel).toPromise();
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
  public gotoPage(page: number): void {
    this.filterModel.currentPage = page;
    this.bindPatientList();
  }
  getFormatDate(dob:Date){
    return moment(dob).format('MM/DD/YYYY');
  }
  getAge(dob:any){
    return moment().diff(dob, 'years');
  }
  patientHandler(detail: any, type: string) {
    this.actionHandler.emit({
      detail: detail,
      actionType: type
    });
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
