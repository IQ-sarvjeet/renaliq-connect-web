import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../api-client';
import { CommonConstants } from '../../shared/common-constants/common-constants';
import { setCookie } from '../../shared/services/cookie.service';
import { HttpClientWapperService } from '../../shared/services/httpclient.wapper.service';
import { LocalStorageService } from '../../shared/services/localstorage.service';
declare const $: any;
@Component({
  selector: 'app-two-fector-auth',
  templateUrl: './two-fector-auth.component.html',
  styleUrls: ['./two-fector-auth.component.scss'],
})


export class TwoFectorAuthComponent {

  username: any = '';
  twoFACode: any = '';
  password: any = '';
  showToster: boolean = false;
  errorMessage: any = '';
  successMsg :any ="";
  isDisabled: boolean = false;

  constructor(private _localStorage: LocalStorageService,
    private _accountService: AccountService,
    private _httpclientwapperSerivce: HttpClientWapperService,
    private route: Router) {
  }


  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');

    this.redirectSummaryDashboard();

    this.getTwoFAUserDetail();
    //this.token();
  }

  redirectSummaryDashboard() {
    let token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
    if (token != null) {
      this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
      this.route.navigate(['/summary/dashboard']);
    }
  };


  getTwoFAUserDetail() {
    let jsonData = this._localStorage.getItem(CommonConstants.TWO_FA_KEY);
    let userData = JSON.parse(jsonData);
    if (userData) {
      this.username = userData.username;
      this.password = userData.password;
    }
  };

  public async onSubmit(form: any) {
    if (form.invalid)
      return;

    await this.twoFALogin(form);
  };

  public async twoFALogin(form: any) {
    let model: any = {
      username: this.username,
      twoFactorCode: this.twoFACode,
      rememberMe: false
    };

    let data = await this._accountService.apiAccountAuthtokenValidatePost(model).subscribe(async (result: any) => {
      if (result) {
        this.token(form);
      }
    },
      (error: any) => {
        this.showToster = true;
        this.errorMessage = error?.error?.message?.message;
      });
  };

  public async token(form?: any) {
    let that = this;
    let model: any = {
      username: this.username,
      password: this.password,
      grant_type: environment.grantType,
      scope: environment.scope,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
    };

    await this._httpclientwapperSerivce.apiAccountLoginPost(model).subscribe((result: any) => {
      if (result) {
        this._localStorage.setItem(CommonConstants.CONNECT_TOKEN_KEY, result.access_token);
        setCookie(CommonConstants.CONNECT_TOKEN_KEY, result.access_token, CommonConstants.CONNECT_REFRESH_TOKEN_EXPIRY);
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        that.route.navigate(['/summary/dashboard']);
      }
    },
      (error: any) => {
        this.showToster = true;
        this.errorMessage = error?.error?.message?.message;

        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        this.route.navigate(['/login']);
      });
  };


  public async resendTwoFAToken() {
    this.isDisabled=true
    let model: any = {
      username: this.username,
      password: this.password,
      rememberMe: false
    };

    await this._accountService.apiAccountAuthtokenResendPost(model).subscribe(async (result: any) => {
      this.successMsg ="";
      if (result) {
        this.showToster = true;
        this.isDisabled = false;
        this.successMsg = "Verification code sent successfully.";
      }
    },
      (error: any) => {
        this.showToster = true;
        this.isDisabled = false;
        this.errorMessage = error?.error?.message?.message;
      });
  };

  hideToster() {
    this.showToster = false;
  };

  ShowToastsResponse(event: any) {
    this.showToster = event;
  };



  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
    this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
  };


}
