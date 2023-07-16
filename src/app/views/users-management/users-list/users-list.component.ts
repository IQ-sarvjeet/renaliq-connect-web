import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PracticeService, RoleService, UserFilterModel, UserService } from 'src/app/api-client';
import { UserEventService } from '../services/user-event.service';
import { EventService } from 'src/app/services/event.service';
import * as moment from 'moment';
import { Status } from 'src/app/enums/status';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  practicesList: any = [];
  rolesList: any = [];
  Userstatus = Status;
  moment = moment;
  userToDelete!: string;
  userLoading:boolean = false;
  usersList: any = {
    data: [],
    pagingModel: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 0
    }
  };
  showLoading: boolean = true;
  IsDeleteAction: boolean = false;
  filters: UserFilterModel = {
    userFilter: {
      searchKey: '',
      sortBy: '',
      sortDirection: ''
    },
    currentPage: 1,
    pageSize: 10,
  };
  updateUserForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    email: ['', [Validators.required, Validators.email]],
    title: [''],
    phoneNumber: ['', [Validators.pattern('^[0-9]{10,15}$')]],
    roleId: ['', Validators.required],
    practiceId: ['', Validators.required],
  });
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private userEventService: UserEventService,
    private eventService: EventService,
    private practiceService: PracticeService,
    private roleService: RoleService){}
  ngOnInit(): void {
    this.loadUsersList();
    this.loadPractices();
    this.loadRoles();
    this.userEventService.userIdSubscription().subscribe((userId: number) => {
      this.loadUsersList();
    });
    this.userEventService.userSearchSubscription().subscribe({
      next: (value: any) => {
        this.filters = {
          ...this.filters,
          userFilter: {
            ...this.filters.userFilter,
            searchKey: value,
          }
        };
        this.loadUsersList();
      }
    })
  }
  loadUsersList(){
    this.showLoading = true;
    this.usersList = {
      ...this.usersList,
      data: []
    };
    this.userService.apiUserListPost(this.filters).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.usersList = response;
          this.usersList.data.forEach((user: any) => {
            let userPractices: string[] = [];
            user.practices.forEach((practice: any) => {
              userPractices.push(practice.name);
            });
            user.practices = userPractices.join(', ');

            let userRoles: string[] = [];
            user.roles.forEach((role: any) => {
              userRoles.push(role.name);
            });
            user.roles = userRoles.join(', ');
          });
        }
        this.showLoading = false;
      },
      error: (error: any) => {
        this.showLoading = false;
      }
    });
  }
  getUser(userEmail: string, action: string){
    this.userLoading = true;
    this.IsDeleteAction = action === 'update' ? false : true;
    this.filters = {
      ...this.filters,
      userFilter: {
        ...this.filters.userFilter,
        searchKey: userEmail
      }
    };
    this.userService.apiUserListPost(this.filters).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.userLoading = false;
          this.userToDelete = response.data[0].firstName + ' ' + response.data[0].lastname;
          this.updateUserForm.patchValue({
            firstName:response.data[0].firstName,
            lastName: response.data[0].lastName,
            email: response.data[0].emailAddress,
            phoneNumber: response.data[0].phoneNumber,
            title: response.data[0].title,
            roleId: response.data[0].roles[0].id,
            practiceId: response.data[0].practices,
          });
        }
      },
      error: (error: any) => {
        this.userLoading = false;
      }
    });
  }
  submit(){
    if(this.updateUserForm.valid) {
      this.userService.apiUserUpdatePut(this.updateUserForm.value).subscribe({
        next: (response: boolean) => {
          if(response) {
            this.eventService.openToaster({
              showToster: true,
              message: `User updated successfully.`,
              type: 'success',
            });
            this.IsDeleteAction = false;
            this.filters = {
              ...this.filters,
              userFilter: {
                ...this.filters.userFilter,
                searchKey: '',
                sortBy: '',
                sortDirection: ''
              }
            };
            this.userToDelete = '';
            this.updateUserForm.reset();
            this.loadUsersList();
          }
        },
        error: (error: any) => {
          this.eventService.openToaster({
            showToster: true,
            message: `Error while updating user.`,
            type: 'danger',
          });
        }
      });
    }
  }
  deleteUser(){
    if(this.IsDeleteAction){
      this.userService.apiUserDeleteLoginUserIdDelete(this.updateUserForm.value.loginUserId).subscribe({
        next: (response: boolean) => {
          if(response) {
            this.eventService.openToaster({
              showToster: true,
              message: `User deleted successfully.`,
              type: 'success',
            });
            this.IsDeleteAction = false;
            this.filters = {
              ...this.filters,
              userFilter: {
                ...this.filters.userFilter,
                searchKey: '',
                sortBy: '',
                sortDirection: ''
              }
            };
            this.userToDelete = '';
            this.updateUserForm.reset();
            this.loadUsersList();
          }
        },
        error: (error: any) => {
          this.eventService.openToaster({
            showToster: true,
            message: `Error while deleting user.`,
            type: 'danger',
          });
        }
      });
    }
  }
  resetValues(){
    this.updateUserForm.reset();
    this.userToDelete = '';
  }
  public gotoPage(page: number): void {
    this.filters.currentPage = page;
    this.loadUsersList();
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
        }
      },
      error: (error: any) => {
      }
    });
  }
  applySort(columnName: string) {
    const prevSortBy = this.filters.userFilter?.sortBy;
    if(prevSortBy === columnName && this.filters.userFilter?.sortDirection === '') {
      this.filters.userFilter.sortDirection = 'asc';
    } else {
      this.filters.userFilter!.sortDirection = '';
    }
    this.filters.userFilter!.sortBy = columnName;
    this.loadUsersList();
  }
  // changeStatus($event){

  // }
}
