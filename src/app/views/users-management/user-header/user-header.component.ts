import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/api-client';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit{
  addUserForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: ['Pass@123', Validators.required],
    confirmPassword: ['Pass@123', Validators.required],
    token: ['', Validators.required],
    returnUrl: ['', Validators.required],
  });
  constructor(private fb: FormBuilder,
    private accountService: AccountService){}
  ngOnInit(): void {
    
  }
  submit(){
    this.accountService.apiAccountRegisterPost(this.addUserForm.value).subscribe({
      next: (response: boolean) => {
        if(response) {
          
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
