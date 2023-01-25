import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../api-client';
import { environment } from '../../environments/environment';
import { setCookie } from '../../shared/services/cookie.service';
import { HttpClientWapperService } from '../../shared/services/httpclient.wapper.service';
import { LocalStorageService } from '../../shared/services/localstorage.service';
declare const $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {

  username: any = 'connectadmin@yopmail.com';
  password: any = 'Pass@123'

  constructor(private _httpclientwapperSerivce: HttpClientWapperService,
    private _localStorage: LocalStorageService,
    private _accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    $('.header').remove();
    $('.footer').remove();
    $('#back-to-top').remove();

    this.loginRequest();

    //setTimeout(() => {
    //  this.testAPI();
    //}, 9000);
  }

  public async loginRequest() {

    let model: any = {
      username: this.username,
      password: this.password,
      grant_type: environment.grantType,
      scope: environment.scope,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
    }

    var result = await this._httpclientwapperSerivce.apiAccountLoginPost(model).toPromise();

    this._localStorage.setItem("connect_tk", result.access_token)

    setCookie('connect_tk', result.access_token, '0.5');

    console.log("login Token :- " + result.access_token);
    console.log("login Scope :- " + result.scope);
    console.log("login token_type :- " + result.token_type);
  }


  public async testAPI() {

    var result = await this._accountService.apiAccountLogoutPost().toPromise();

  }



}
