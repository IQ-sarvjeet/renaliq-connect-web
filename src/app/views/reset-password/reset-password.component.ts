import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/api-client';
declare const $: any;
let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit{
  resetForm:any = FormGroup;
  errorMsg :any ="";
  private token: string;
  private email: string;

  constructor(private _accountService: AccountService, private route: ActivatedRoute,private router: Router, private fb: FormBuilder){
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }
  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');
    this.intializeform();
  } 
  intializeform() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required,Validators.pattern(pattern)]],
      confirmPassword: ['', [Validators.required,Validators.pattern(pattern)]],
    });
  }
 
  public async onSubmit(form: FormGroup) {
    this.errorMsg ="";
    if (form.invalid) {
      return;
    }
    
    let password = form.get('password');
    let confirmPassword = form.get('confirmPassword');
    if(password != confirmPassword){
      this.errorMsg = "Password and Confirm Password not matched."
     return;
    } 

    let model: any = {
      password: form.value.password,
      token :  this.token
    };
    try {
     // var result = await this._accountService.apiAccountLoginPost(model).toPromise();
      this.router.navigate(['']);
    } catch(ex:any) {
      console.log(ex);
      alert(ex.error?.error_description);
    }
  }
  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}


