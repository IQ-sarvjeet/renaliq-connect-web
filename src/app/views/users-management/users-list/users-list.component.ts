import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFilterModel, UserService } from 'src/app/api-client';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  usersList: any = [];
  showLoading: boolean = true;
  deleteId: number = 0;
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
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });
  constructor(private userService: UserService,
    private fb: FormBuilder){}
  ngOnInit(): void {
    this.loadUsersList();
  }
  loadUsersList(){
    this.showLoading = true;
    this.userService.apiUserListPost(this.filters).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.usersList = response.data;
        }
        this.showLoading = false;
      },
      error: (error: any) => {
        this.showLoading = false;
      }
    });
  }
  getUser(userEmail: string){
    this.filters = {
      ...this.filters,
      userFilter: {
        ...this.filters.userFilter,
        email: userEmail
      }
    }
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
    })
  }
  submit(){
    this.userService.apiUserUpdatePut(this.updateUserForm.value).subscribe({
      next: (response: boolean) => {
        if(response) {
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
          this.usersList = [];
          this.loadUsersList();
        }
      },
      error: (error: any) => {

      }
    });
  }
  deleteUserId(userId: number){
    this.deleteId = userId;
  }
  deleteUser(){
    this.userService.apiUserDeleteLoginUserIdDelete(this.deleteId).subscribe({
      next: (response: boolean) => {
        if(response) {
          this.deleteId = 0;
          this.usersList = [];
          this.loadUsersList();
        }
      },
      error: (error: any) => {

      }
    });
  }
}
