import { Component, OnInit } from '@angular/core';
import { HttpClientWapperService } from '../../api-client/api/httpclient.wapper.service';
import { environment } from '../../environments/environment';
declare const $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {

  username: any = 'connectadmin@yopmail.com';
  password: any = 'Pass@123'
  constructor(private _httpclientwapperSerivce: HttpClientWapperService) {
  }



  ngOnInit(): void {
    $('.header').remove();
    $('.footer').remove();
    $('#back-to-top').remove();

    this.login();
  }

  public async login() {
    let model: any = {
      username: this.username,
      password: this.password,
      grant_type: environment.grantType,
      scope: environment.scope,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
    }

    var result = await this._httpclientwapperSerivce.login(model).toPromise();

    console.log("login Token :- " + result.access_token);
    console.log("login Scope :- " + result.scope);
    console.log("login token_type :- " + result.token_type);
  }

}
