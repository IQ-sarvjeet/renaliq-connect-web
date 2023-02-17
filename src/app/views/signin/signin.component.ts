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
  showToster: boolean = false;
  errorMessage: any = '';
  showLoading: boolean = false;

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

    this.redirectSummaryDashboard();

    this.intializeform();
  };

  redirectSummaryDashboard() {
    let token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
    if (token != null) {
      this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
      this.route.navigate(['/summary']);
    }
  };


  intializeform() {
    this.signInForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  };

  public async onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.showLoading = true;
    await this.twoFALogin(form);
  };


  public async twoFALogin(form: FormGroup) {
    let model: any = {
      username: form.value.emailId.trim(),
      password: form.value.password.trim(),
      rememberMe: false
    };

    await this._accountService.apiAccountLoginPost(model).subscribe((result: any) => {
      if (result) {
        this._localStorage.setItem(CommonConstants.TWO_FA_KEY, JSON.stringify(model));
        this.route.navigate(['/twofectorauth']);
      }
    },
      (error) => {
        this.showToster = true;
        this.errorMessage = error?.error?.message?.message;
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        this.showLoading = false;
      });
  };



  public async login(form: FormGroup) {
    let model: any = {
      username: form.value.emailId.trim(),
      password: form.value.password.trim(),
      grant_type: environment.grantType,
      scope: environment.scope,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
    };

    let result = await this._httpclientwapperSerivce.apiAccountLoginPost(model).toPromise();
    this._localStorage.setItem(CommonConstants.CONNECT_TOKEN_KEY, result.access_token);
    setCookie(CommonConstants.CONNECT_TOKEN_KEY, result.access_token, CommonConstants.CONNECT_REFRESH_TOKEN_EXPIRY);
    this.route.navigate(['/summary']);
  };

  hideToster() {
    this.showToster = false;
  }

  ShowToastsResponse(event: any) {
    this.showToster = event;
  }

  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}
