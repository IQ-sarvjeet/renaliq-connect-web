import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFilterModel, UserService } from 'src/app/api-client';
import { UserEventService } from '../services/user-event.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
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
      email: '',
      name: '',
      sortBy: '',
      sortDirection: ''
    },
    currentPage: 1,
    pageSize: 10,
  };
  updateUserForm: FormGroup = this.fb.group({
    loginUserId: [0, Validators.required],
    firstName: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private userEventService: UserEventService){}
  ngOnInit(): void {
    this.loadUsersList();
    this.userEventService.userIdSubscription().subscribe((userId: number) => {
      this.loadUsersList();
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
        }
        this.showLoading = false;
      },
      error: (error: any) => {
        this.showLoading = false;
      }
    });
  }
  getUser(userEmail: string, action: string){
    this.IsDeleteAction = action === 'update' ? false : true;
    this.filters = {
      ...this.filters,
      userFilter: {
        ...this.filters.userFilter,
        email: userEmail
      }
    };
    this.userService.apiUserListPost(this.filters).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.updateUserForm.patchValue({
            loginUserId: response.data[0].id,
            firstName: response.data[0].firstName,
            lastname: response.data[0].lastname,
            email: response.data[0].emailAddress,
            phoneNumber: response.data[0].phoneNumber,
          });
        }
      },
      error: (error: any) => {
      }
    });
  }
  submit(){
    if(this.updateUserForm.valid) {
      this.userService.apiUserUpdatePut(this.updateUserForm.value).subscribe({
        next: (response: boolean) => {
          if(response) {
            this.IsDeleteAction = false;
            this.filters = {
              ...this.filters,
              userFilter: {
                ...this.filters.userFilter,
                email: '',
                name: '',
                sortBy: '',
                sortDirection: ''
              }
            };
            this.updateUserForm.reset();
            this.loadUsersList();
          }
        },
        error: (error: any) => {

        }
      });
    }
  }
  deleteUser(){
    if(this.IsDeleteAction){
      this.userService.apiUserDeleteLoginUserIdDelete(this.updateUserForm.value.loginUserId).subscribe({
        next: (response: boolean) => {
          if(response) {
            this.IsDeleteAction = false;
            this.filters = {
              ...this.filters,
              userFilter: {
                ...this.filters.userFilter,
                email: '',
                name: '',
                sortBy: '',
                sortDirection: ''
              }
            };
            this.updateUserForm.reset();
            this.loadUsersList();
          }
        },
        error: (error: any) => {
  
        }
      });
    }
  }
  public gotoPage(page: number): void {
    this.filters.currentPage = page;
    this.loadUsersList();
  }
}
