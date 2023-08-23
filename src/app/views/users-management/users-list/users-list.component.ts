import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PracticeService, RoleService, UserFilterModel, UserService } from 'src/app/api-client';
import { UserEventService } from '../services/user-event.service';
import { EventService } from 'src/app/services/event.service';
import * as moment from 'moment';
import { Status } from 'src/app/enums/status';
import { StoreService } from 'src/app/services/store.service';
import { UserInfo } from 'src/app/interfaces/user';
import { Roles } from 'src/app/enums/roles';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  practicesList: any = [];
  rolesList: any = [];
  Userstatus = Status;
  userToUpdate: any = '';
  moment = moment;
  userLoading: boolean = false;
  userInfo: UserInfo = {
    fullName: '',
    roleName: '',
    role: Roles.PRACTICE_USER
  };
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
  filters: any = {
    userFilter: {
      searchKey: '',
      userRole: [],
      userStatus: [],
      sortBy: '',
      sortDirection: '',
      fromDate: '',
      toDate: ''
    },
    currentPage: 1,
    pageSize: 10,
  };
  updateUserForm: FormGroup = this.fb.group({
    loginUserId: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    title: [''],
    phoneNumber: ['', [Validators.pattern('^[0-9]{10,15}$')]],
    roleId: ['', Validators.required],
    practiceId: [[], Validators.required],
    isTermed: [false],
    emailAddress: ['']
  });
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private storeService: StoreService,
    private userEventService: UserEventService,
    private eventService: EventService,
    private practiceService: PracticeService,
    private roleService: RoleService) { }
  ngOnInit(): void {
    this.loadUsersList();
    this.loadPractices();
    this.loadRoles();
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;
    });
    this.userEventService.userIdSubscription().subscribe((userId: number) => {
      this.loadUsersList();
    });
    this.userEventService.userFilterSubscription().subscribe({
      next: (value: any) => {
        this.filters = {
          ...this.filters,
          userFilter: {
            ...this.filters.userFilter,
            searchKey: value.searchKey,
            userRole: value.userRole,
            userStatus: value.userStatus,
            fromDate: value.fromDate,
            toDate: value.toDate
          }
        };
        this.loadUsersList();
      }
    })
  }
  loadUsersList() {
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
            let userRoles: string[] = [];
            user.roles.forEach((role: any) => {
              userRoles.push(role.name);
            });
            user.userPractices = userPractices.join(', ');
            user.userRoles = userRoles.join(', ');
          });
        }
        this.showLoading = false;
      },
      error: (error: any) => {
        this.showLoading = false;
      }
    });
  }
  getUser(user: any) {
    this.userToUpdate = user;
    let userPractices: number[] = [];
    user.practices.forEach((practice: any) => {
      userPractices.push(practice.id);
    });
    this.updateUserForm.patchValue({
      loginUserId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      title: user.title,
      roleId: user.roles[0].id,
      practiceId: userPractices,
      isTermed: user.userStatus === this.Userstatus.TERMED,
      emailAddress: user.emailAddress
    });
  }
  submit() {
    if (this.updateUserForm.valid) {
      this.updateUserForm.value.isTermed = this.updateUserForm.value.isTermed === 'true' ? true : false;
      this.userService.apiUserUpdatePut(this.updateUserForm.value).subscribe({
        next: (response: boolean) => {
          if (response) {
            this.eventService.openToaster({
              showToster: true,
              message: `User updated successfully.`,
              type: 'success',
            });
            // this.resetFilters();
            this.resetValues();
            this.loadUsersList();
            if (this.updateUserForm.value.loginUserId === this.userInfo.userLoginId) {
              window.location.reload();
            }
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
  deleteUser() {
    this.updateUserForm.patchValue({
      isTermed: true
    });
    this.userService.apiUserUpdatePut(this.updateUserForm.value).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.eventService.openToaster({
            showToster: true,
            message: `User deleted successfully.`,
            type: 'success',
          });
          this.resetFilters();
          this.resetValues();
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
  resetValues() {
    this.updateUserForm.reset();
    this.userToUpdate = '';
  }
  public gotoPage(page: number): void {
    this.filters.currentPage = page;
    this.loadUsersList();
  }
  loadPractices() {
    this.practicesList = [];
    this.practiceService.apiPracticeListAllGet().subscribe({
      next: (response: any) => {
        if (response.length) {
          const data: any = [];
          response.map((item: any, index: number) => {
            data.push({ text: item.name, value: item.id, avatar: 'm' + index });
          });
          this.practicesList = [...data];
        }
      },
      error: (error: any) => {
      }
    });
  }
  loadRoles() {
    this.rolesList = [];
    this.roleService.apiRolesGet().subscribe({
      next: (response: any) => {
        if (response.length) {
          this.rolesList = response;
        }
      },
      error: (error: any) => {
      }
    });
  }
  applySort(columnName: string) {
    const prevSortBy = this.filters.userFilter?.sortBy;
    if (prevSortBy === columnName && this.filters.userFilter?.sortDirection === '') {
      this.filters.userFilter.sortDirection = 'asc';
    } else {
      this.filters.userFilter!.sortDirection = '';
    }
    this.filters.userFilter!.sortBy = columnName;
    this.loadUsersList();
  }
  resetFilters() {
    this.filters = {
      ...this.filters,
      userFilter: {
        ...this.filters.userFilter,
        searchKey: '',
        sortBy: '',
        sortDirection: ''
      }
    };
  }
}
