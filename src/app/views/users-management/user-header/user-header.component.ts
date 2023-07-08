import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/api-client';
import { UserEventService } from '../services/user-event.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit{
  addUserForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    password: ['Pass@123', Validators.required],
    confirmPassword: ['Pass@123', Validators.required],
    token: [''],
    returnUrl: [''],
  });
  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private userEventService: UserEventService){}
  ngOnInit(): void {
    
  }
  submit(){
    if(this.addUserForm.valid) {
      this.accountService.apiAccountRegisterPost(this.addUserForm.value).subscribe({
        next: (response: number) => {
          if(response) {
            this.userEventService.setNewUserID(response);
          }
        },
        error: (error: any) => {

        }
      });
      this.addUserForm.patchValue({
        userName: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
      });
    }
  }
}
