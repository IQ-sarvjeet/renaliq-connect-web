import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/api-client';
declare const $: any;
let pattern = /^\d{10}$/;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})

export class ForgotPasswordComponent implements OnInit{
  form:any = FormGroup;
  errorMsg :any ="";
  successMsg :any ="";
  fields :any ={email :1 ,mobile:2};
  forgotPasswordModel :any ={
    emailId:'',
    mobileNumber:''
  }
  constructor(private _accountService: AccountService, private fb: FormBuilder){}
  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');
    this.intializeform();
  }
  intializeform() {
    this.form = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required,Validators.pattern(pattern)]],
    });
  }

  public async onSubmit(form: FormGroup) {
    this.errorMsg="";
    this.successMsg ="";
    if (form.invalid) {
      return;
    }
    let model: any = {
      email: form.value.emailId,
      phoneNumber : form.value.mobileNumber,
      isEmail :  form.value.emailId != ""
    };
    try {
      var result = await this._accountService.apiAccountLogoutPost().toPromise();
      if(result){
       this.successMsg ="Link to reset password sent.";
      }
    } catch (ex: any) {
      console.log(ex);
      this.errorMsg=ex.message;
    }
  }
  resetField(type:any){
    this.errorMsg="";
    if(type == this.fields.email){
      this.form.controls['mobileNumber'].clearValidators(null);
      this.form.controls['emailId'].setValidators([Validators.required, Validators.email]);
      this.form.get('mobileNumber').patchValue("");
      this.form.get('mobileNumber').markAsUntouched();
    }
    else if(type == this.fields.mobile){
      this.form.controls['emailId'].clearValidators(null);
      this.form.controls['mobileNumber'].setValidators([Validators.required,Validators.pattern(pattern)]);
      this.form.get('emailId').patchValue("");
      this.form.get('emailId').markAsUntouched();
    }
     this.form.controls['emailId'].updateValueAndValidity();
     this.form.controls['mobileNumber'].updateValueAndValidity();
  }
  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}
