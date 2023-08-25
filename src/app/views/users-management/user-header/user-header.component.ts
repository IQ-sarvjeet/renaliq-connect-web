import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, PracticeService, RoleService } from 'src/app/api-client';
import { UserEventService } from '../services/user-event.service';
import { EventService } from 'src/app/services/event.service';
import { Status } from 'src/app/enums/status';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit{
  moment = moment;
  statusFilter: string[] = [];
  practicesList: any = [];
  rolesList: any = [];
  rolesListForFilter: string[] = [];
  userStatus: any[] = [
    { value: -1, text: 'Ready' },
    { value: 0, text: 'Termed' },
    { value: 1, text: 'Active' }
  ];
 dateRangeFilter: any ='';
 userFilter: any = {
  searchKey: '',
  userRole: [],
  userStatus: [],
  sortBy: '',
  fromDate: '',
  toDate: ''
}
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
      this.userFilter = {
        ...this.userFilter,
        fromDate: event.value[0],
        toDate: event.value[1]
      }
    }
};
  addUserForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    email: ['', [Validators.required, Validators.email]],
    title: [''],
    phoneNumber: ['', [Validators.pattern('^[0-9]{10,15}$')]],
    roleId: ['', Validators.required],
    practiceId: ['', Validators.required],
  });
  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private userEventService: UserEventService,
    private practiceService: PracticeService,
    private eventService: EventService,
    private roleService: RoleService){}
  ngOnInit(): void {
    this.loadPractices();
    this.loadRoles();
  }
  submit(){
    if(this.addUserForm.valid) {
      this.accountService.apiAccountRegisterPost(this.addUserForm.value).subscribe({
        next: (response: number) => {
          if(response) {
            this.eventService.openToaster({
              showToster: true,
              message: `User Added successfully.`,
              type: 'success',
            });
            this.userEventService.setNewUserID(response);
          }
        },
        error: (error: any) => {
          this.eventService.openToaster({
            showToster: true,
            message: error.error.message.message,
            type: 'danger',
          });
        }
      });
      this.addUserForm.reset();
    }
  }
  loadPractices(){
    this.practicesList = [];
    this.practiceService.apiPracticeListAllGet().subscribe({
      next: (response: any) => {
        if(response.length) {
          const data: any = [];
          response.map((item: any, index: number ) => {
            data.push({text: item.name, value: item.id, avatar: 'm' + index});
          });
          this.practicesList = [...data];
        }
      },
      error: (error: any) => {
      }
    });
  }
  loadRoles(){
    this.rolesList = [];
    this.roleService.apiRolesGet().subscribe({
      next: (response: any) => {
        if(response.length) {
          this.rolesList = response;
          this.rolesList.forEach((role: any) => {
            this.rolesListForFilter.push(role.name);
          });
        }
      },
      error: (error: any) => {
      }
    });
  }
  resetForm(){
    this.addUserForm.reset();
  }
  filterUsers(){
    if(this.userFilter.userStatus.length) {
      this.statusFilter = [];
      this.statusFilter = this.userFilter.userStatus.map((status: number) => {
        return status === -1 ? 'Ready' : status === 0 ? 'Termed' : 'Active';
      });
    }
    this.userEventService.userFilterEvent(this.userFilter);
  }
  clearFilter(key: string) {
    if(key === 'userRole') {
      this.userFilter.userRole = [];
    }
    if(key === 'userStatus') {
      this.userFilter.userStatus = [];
      this.statusFilter = [];
    }
    if(key === 'filterDate') {
      this.userFilter.fromDate = '';
      this.userFilter.toDate = '';
    }
    this.filterUsers();
  }
  clearFilterHandler() {
    this.userFilter = {
      searchKey: '',
      userRole: [],
      userStatus: [],
      sortBy: '',
      fromDate: '',
      toDate: ''
    };
    this.statusFilter = [];
    this.filterUsers();
  }
}
