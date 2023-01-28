import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../api-client';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonConstants } from '../../shared/common-constants/common-constants';
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
  signInForm: any = FormGroup;
  
  constructor(
    private _httpclientwapperSerivce: HttpClientWapperService,
    private fb: FormBuilder,
    private _localStorage: LocalStorageService,
    private _accountService: AccountService,
    private route: Router
  ) {}

  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');
    this.intializeform();
  }
  intializeform() {
    this.signInForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  public async onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    let model: any = {
      username: form.value.emailId,
      password: form.value.password,
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
