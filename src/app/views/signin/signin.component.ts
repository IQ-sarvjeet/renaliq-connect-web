import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../api-client';
import { Router } from '@angular/router';
import { CommonConstants } from '../../shared/common-constants/common-constants';
import { setCookie } from '../../shared/services/cookie.service';
import { HttpClientWapperService } from '../../shared/services/httpclient.wapper.service';
import { LocalStorageService } from '../../shared/services/localstorage.service';
import { environment } from '../../../environments/environment';
declare const $: any;
let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signInForm: any = FormGroup;
  errorMsg: any = "";

  constructor(
    private _httpclientwapperSerivce: HttpClientWapperService,
    private fb: FormBuilder,
    private _localStorage: LocalStorageService,
    private _accountService: AccountService,
    private route: Router
  ) { }

  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');
    this.intializeform();
  };


  intializeform() {
    this.signInForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(pattern)]],
    });
  };

  public async onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    await this.twoFALogin(form);
  };


  public async twoFALogin(form: FormGroup) {
    let model: any = {
      username: form.value.emailId.trim(),
      password: form.value.password.trim(),
      rememberMe: false
    };

    var result = await this._accountService.apiAccountLoginPost(model).subscribe((result: any) => {
      if (result) {
        this._localStorage.setItem(CommonConstants.TWO_FA_KEY, JSON.stringify(model));
        this.route.navigate(['/twofectorauth']);
      }
    },
      (error) => {
        console.log(error?.error?.message?.message);
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
      });

    console.log(result);
  }



  public async login(form: FormGroup) {
    let model: any = {
      username: form.value.emailId.trim(),
      password: form.value.password.trim(),
      grant_type: environment.grantType,
      scope: environment.scope,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
    };

    try {
      var result = await this._httpclientwapperSerivce.apiAccountLoginPost(model).toPromise();
      this._localStorage.setItem(
        CommonConstants.CONNECT_TOKEN_KEY,
        result.access_token
      );
      setCookie(
        CommonConstants.CONNECT_TOKEN_KEY,
        result.access_token,
        CommonConstants.CONNECT_REFRESH_TOKEN_EXPIRY
      );
      this.route.navigate(['']);
    } catch (ex: any) {
      this.errorMsg =
        ex.error?.error == 'invalid_grant'
          ? 'Invalid username or password'
          : ex.error?.error_description;
    }
  }



  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}
