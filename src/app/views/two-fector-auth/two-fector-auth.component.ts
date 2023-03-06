import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Messages } from 'src/app/shared/common-constants/messages';
import { environment } from '../../../environments/environment';
import { AccountService, Email2FAModel, LoginModel, LoginResponse } from '../../api-client';
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
  messages: any = Messages;
  username: any = '';
  twoFACode: any = '';
  password: any = '';
  showToster: boolean = false;
  errorMessage: any;
  successMsg: any = "";
  isDisabled: boolean = false;
  showLoading: boolean = false;
  showResendCode: boolean = false;
  private timerSubscription: any;
  twoFAForm: FormGroup = this.fb.group({
    digit1: [''],
    digit2: [''],
    digit3: [''],
    digit4: [''],
    digit5: [''],
    digit6: [''],
  })

  constructor(private _localStorage: LocalStorageService,
    private _accountService: AccountService,
    private _httpclientwapperSerivce: HttpClientWapperService,
    private route: Router,
    private fb: FormBuilder,
    private eventService: EventService) {
  }
  ngOnInit(): void {

    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');

    this.redirectSummaryDashboard();

    this.getTwoFAUserDetail();
    this.timerSubscription = timer(100).subscribe(() => {
      this.showResendCode = true;
    })
  }

  redirectSummaryDashboard() {
    let token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
    if (token != null) {
      this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
      this.route.navigate(['/summary']);
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

  public async onSubmit() {
    this.showLoading = true;
    this.successMsg = "";
    this.errorMessage = "";
    await this.twoFALogin();
  };

  public async twoFALogin() {
    this.successMsg = "";
    this.errorMessage = "";
    const formValues = this.twoFAForm.value;
    let model: Email2FAModel = {
      username: this.username,
      password: this.password,
      twoFactorCode: `${formValues.digit1}${formValues.digit2}${formValues.digit3}${formValues.digit4}${formValues.digit5}${formValues.digit6}`,
      rememberMe: false
    };

    let data = await this._accountService.apiAccountAuthtokenValidatePost(model).subscribe(async (result: LoginResponse) => {
      if (result) {
        this._localStorage.setItem(CommonConstants.CONNECT_TOKEN_KEY, result.accessToken);
        setCookie(CommonConstants.CONNECT_TOKEN_KEY, result.accessToken, CommonConstants.CONNECT_REFRESH_TOKEN_EXPIRY);
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        this.eventService.userLoggedInUpdate(true);
        await this.getUserInfo();
      }
    },
      (error: any) => {
        this.showToster = true;
        this.errorMessage = error?.error?.message?.message;
        this.showLoading = false;
        if (this.errorMessage === this.messages.numberOfAttempts) {
          this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
          this.eventService.reachedNoOfAttemptsUpdate({
            showError: true,
            message: this.errorMessage
          });
          this.route.navigate(['/login']);
        }
      });
  };
  public async getUserInfo() {
    this.successMsg = "";
    this.errorMessage = "";
    this.showLoading = true;
    this.isDisabled = true


    await this._accountService.apiAccountUserInfoGet().subscribe(async (result: any) => {
      if (result) {
        this.showToster = true;
        this.isDisabled = false;
        this.showLoading = false;
        this._localStorage.setItem(CommonConstants.USER_INFO_KEY, JSON.stringify(result));
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        this.eventService.openToaster({
          showToster: true,
          message: `Welcome ${result?.fullName}`,
          type: 'success',
        });
        this.route.navigate(['/summary/']);
      }
    },
      (error: any) => {
        this.showToster = true;
        this.isDisabled = false;
        this.showLoading = false;
        this.errorMessage = error?.error?.message?.message;

        if (this.errorMessage === this.messages.numberOfAttempts) {
          this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
          this.eventService.reachedNoOfAttemptsUpdate({
            showError: true,
            message: this.errorMessage
          });
          this._localStorage.removeItem(CommonConstants.CONNECT_TOKEN_KEY);
          this.route.navigate(['/login']);
        }
      });
  };


  public async resendTwoFAToken($event: any) {
    $event.preventDefault();
    this.successMsg = "";
    this.errorMessage = "";
    this.showLoading = true;
    this.isDisabled = true
    let model: any = {
      username: this.username,
      password: this.password,
      rememberMe: false
    };

    await this._accountService.apiAccountAuthtokenResendPost(model).subscribe(async (result: any) => {
      if (result) {
        this.twoFAForm.reset();
        this.showToster = true;
        this.isDisabled = false;
        this.successMsg = this.messages.verificationCodeSuccessfully;
        this.showLoading = false;
      }
    },
      (error: any) => {
        this.twoFAForm.reset();
        this.showToster = true;
        this.isDisabled = false;
        this.showLoading = false;
        this.errorMessage = error?.error?.message?.message;

        if (this.errorMessage === this.messages.numberOfAttempts) {
          this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
          this.eventService.reachedNoOfAttemptsUpdate({
            showError: true,
            message: this.errorMessage
          });
          this.route.navigate(['/login']);
        }
      });
  };

  hideToster() {
    this.showToster = false;
  };

  ShowToastsResponse(event: any) {
    this.showToster = event;
  };

  onDigitInput(event: any) {
    let element;
    if (event.code !== 'Backspace' || event.code === 'ArrowRight')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace' || event.code === 'ArrowLeft')
      element = event.srcElement.previousElementSibling;

    if (element == null) {
      return;
    } else {
      element.focus();
    }
  }

  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
    this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
    this.timerSubscription.unsubscribe();
  };

}
