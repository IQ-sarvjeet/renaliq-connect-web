import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, PracticeService, RoleService } from 'src/app/api-client';
import { UserEventService } from '../services/user-event.service';
import { EventService } from 'src/app/services/event.service';
import { Status } from 'src/app/enums/status';
import { MbscDatepickerOptions } from '@mobiscroll/angular';
import * as moment from 'moment';

const todayDate = new Date();
const datePrior365 = new Date(new Date().setDate(todayDate.getDate() - 365));

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit{
  moment = moment;
  submitFilter: boolean = false;
  statusFilter: string[] = [];
  practiceFilter: string[] = [];
  rolesFilter: string[] = [];
  practicesList: any = [];
  rolesList: any = [];
  rolesListForFilter: any[] = [];
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
    practice: '',
    practiceId: 0,
    fromDate: undefined,
    toDate: undefined
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
            this.practiceFilter.push(item.name);
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
            this.rolesListForFilter.push({ value: role.id, text: role.name });
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
    this.submitFilter = true;
    if(this.userFilter.userStatus.length) {
      this.statusFilter = [];
      this.statusFilter = this.userFilter.userStatus.map((status: number) => {
        return status === -1 ? 'Ready' : status === 0 ? 'Termed' : 'Active';
      });
    }
    if(this.userFilter.userRole.length) {
      this.rolesFilter = [];
      this.rolesFilter = this.userFilter.userRole.map((role: number) => {
        return role === 1 ? 'System Admin' : role === 2 ? 'Document Manager' : role === 3 ? 'Somatus User' : 'Practice User';
      });      
    }
    this.userEventService.userFilterEvent(this.userFilter);
  }
  itemSelected($event: any) {
    this.userFilter = {
      ...this.userFilter,
      practice: $event
    };
  }
  resetFilterPopup(){
    this.userFilter = {
      ...this.userFilter,
      userRole: [],
      userStatus: [],
      practice: '',
      practiceId: 0,
      fromDate: undefined,
      toDate: undefined
    };
  }
  clearFilter(key: string) {
    if(key === 'userRole') {
      this.userFilter = {
        ...this.userFilter,
        userRole: []
      };
      this.rolesFilter = [];
    }
    if(key === 'userStatus') {
      this.userFilter = {
        ...this.userFilter,
        userStatus: []
      };
      this.statusFilter = [];
    }
    if(key === 'userPractice') {
      this.userFilter = {
        ...this.userFilter,
        practice: '',
        practiceId: 0,
      };
    }
    if(key === 'filterDate') {
      this.submitFilter = false;
      this.userFilter = {
        ...this.userFilter,
        fromDate: undefined,
        toDate: undefined
      };
    }
    this.filterUsers();
  }
  clearFilterHandler() {
    this.submitFilter = false;
    this.userFilter = {
      ...this.userFilter,
      searchKey: '',
      userRole: [],
      userStatus: [],
      sortBy: '',
      fromDate: undefined,
      toDate: undefined
    };
    this.statusFilter = [];
    this.rolesFilter = [];
    this.filterUsers();
  }
}
