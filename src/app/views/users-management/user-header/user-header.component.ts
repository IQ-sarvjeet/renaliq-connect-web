import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, PracticeService, RoleService } from 'src/app/api-client';
import { UserEventService } from '../services/user-event.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit{
  practicesList: any = [];
  rolesList: any = [];
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
        }
      },
      error: (error: any) => {
      }
    });
  }
  resetForm(){
    this.addUserForm.reset();
  }
  searchHandler($event: any){
    this.userEventService.userSearchEvent($event.target.value);
  }
}
