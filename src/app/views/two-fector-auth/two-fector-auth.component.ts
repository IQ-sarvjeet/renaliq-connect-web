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
  constructor(private _localStorage: LocalStorageService,
    private _accountService: AccountService,
    private _httpclientwapperSerivce: HttpClientWapperService,
    private route: Router) {
  }


  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');

    this.getTwoFAUserDetail();
    //this.token();
  }

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

  public async twoFALogin(form:any) {
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
      (error: any) => { console.log(error?.error?.message?.message); });
  };

  public async token(form?: any) {
    let model: any = {
      username: this.username,
      password: this.password,
      grant_type: environment.grantType,
      scope: environment.scope,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
    };

    var data = await this._httpclientwapperSerivce.apiAccountLoginPost(model).subscribe((result: any) => {
      if (result) {
        this._localStorage.setItem(CommonConstants.CONNECT_TOKEN_KEY, result.access_token);
        setCookie(CommonConstants.CONNECT_TOKEN_KEY, result.access_token, CommonConstants.CONNECT_REFRESH_TOKEN_EXPIRY);
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        this.route.navigate(['']);
      }
    },
      (error: any) => {
        console.log(error?.error?.message?.message);
      });
  };

  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  };


}
