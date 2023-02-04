import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/api-client';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
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

  constructor(private _accountService: AccountService, private route: ActivatedRoute, private router: Router,
               private fb: FormBuilder, private _localStorage: LocalStorageService){
    this.token = this.route.snapshot.queryParams['token'];
  }
  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');
    this._localStorage.clearAll();
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
    
    let password = form.get('password')?.value;
    let confirmPassword = form.get('confirmPassword')?.value;
    if(password != confirmPassword){
      this.errorMsg = "Password and Confirm Password not matched."
     return;
    } 
    if(!this.token){
      this.errorMsg ="Not authorized request.";
    }

    let model: any = {
      password: form.value.password.trim(),
      token :  this.token
    };
    try {
      var result = await this._accountService.apiAccountResetPasswordPost(model).toPromise();
      this._localStorage.clearAll();
      this.router.navigate(['login']);
    } catch(ex:any) {
      console.log(ex);
      this.errorMsg=ex.error?.message?.message;;
    }
  }
  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}


