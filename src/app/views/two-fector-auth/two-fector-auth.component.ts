import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { StoreService } from 'src/app/services/store.service';
import { Messages } from 'src/app/shared/common-constants/messages';
import { environment } from '../../../environments/environment';
import { AccountService, LoginModel } from '../../api-client';
import { CommonConstants } from '../../shared/common-constants/common-constants';
import { setCookie } from '../../shared/services/cookie.service';
import { HttpClientWapperService } from '../../shared/services/httpclient.wapper.service';
import { LocalStorageService } from '../../shared/services/localstorage.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserTokenRequestModel } from 'src/app/interfaces/user-token-request-model';
import { LoginResponseModel } from 'src/app/interfaces/login-response-model';
declare const $: any;
@Component({
  selector: 'app-two-fector-auth',
  templateUrl: './two-fector-auth.component.html',
  styleUrls: ['./two-fector-auth.component.scss'],
})


export class TwoFectorAuthComponent {
  requiredFieldError: boolean = false;
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
    private route: Router,
    private fb: FormBuilder,
    private eventService: EventService,
    private storeService: StoreService,
    private authService: AuthService) {}
  ngOnInit(): void {

    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');

    this.redirectSummaryDashboard();

    this.getTwoFAUserDetail();
    this.timerSubscription = timer(30000).subscribe(() => {
      this.showResendCode = true;
    })
    let elementReference = document.querySelector('#verificationCode1');
    if (elementReference instanceof HTMLElement) {
      elementReference.focus();
    }
  }

  redirectSummaryDashboard() {
    let token = this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
    if (token != null) {
      this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
      const path = this.storeService.getCurrentRoute();
      if (path) {
        this.route.navigate([path]);
      } else {
        this.route.navigate(['/summary']);
      }
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
    const digit1 = document.getElementById('verificationCode1') as HTMLInputElement
    const digit2 = document.getElementById('verificationCode2') as HTMLInputElement
    const digit3 = document.getElementById('verificationCode3') as HTMLInputElement
    const digit4 = document.getElementById('verificationCode4') as HTMLInputElement
    const digit5 = document.getElementById('verificationCode5') as HTMLInputElement
    const digit6 = document.getElementById('verificationCode6') as HTMLInputElement

    if (digit1.value === '' || digit2.value === '' || digit3.value === '' || digit4.value === '' || digit5.value === '' || digit6.value === '') {
      this.requiredFieldError = true;
      return;
    }
    this.requiredFieldError = false;
    this.showLoading = true;
    this.successMsg = "";
    this.errorMessage = "";
    
    let model: UserTokenRequestModel = {
      username: this.username,
      password: this.password,
      twoFactorCode: `${digit1.value}${digit2.value}${digit3.value}${digit4.value}${digit5.value}${digit6.value}`,
      rememberMe: false,
      client_id: environment.identity.clientId,
      client_secret: environment.identity.clientSecret,
      grant_type: environment.identity.grantType,
      scope: environment.identity.scopes
    };

    let data = await this.authService.apiAccountAuthtokenValidatePost(model).subscribe(async (result: LoginResponseModel) => {
      //console.log('apiAccountAuthtokenValidatePost results:', result)
      if (result && result.access_token) {
        if (result.expires_in) {
          const date = this.addMinutes(new Date(), (result.expires_in / 60));
          this._localStorage.setItem(CommonConstants.EXPIRATION_TIME, date.toString());
        }
        this._localStorage.setItem(CommonConstants.CONNECT_TOKEN_KEY, result.access_token);
        setCookie(CommonConstants.CONNECT_TOKEN_KEY, result.access_token, CommonConstants.CONNECT_REFRESH_TOKEN_EXPIRY);
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        await this.getUserInfo();
        this.eventService.userLoggedInUpdate(true);
      } else {
        this.errorMessage = 'Unauthorized Access.';
        this.redirectOnLogin();
      }
    },
      (error: any) => {
        //console.log('apiAccountAuthtokenValidatePost error:', error)
        this.showToster = true;
        this.errorMessage = error?.error?.error_description;
        if (this.errorMessage == null || this.errorMessage == '') {
          this.errorMessage = error?.error?.error;
        }
        this.showLoading = false;
        if (this.errorMessage === this.messages.numberOfAttempts || this.errorMessage === this.messages.invalidUserNameOrPassWord) {
          if (this.errorMessage === this.messages.invalidUserNameOrPassWord) {
            this.errorMessage = this.messages.numberOfAttempts;
          }
          this.redirectOnLogin();
        }
      });
  }
  onPaste(event: ClipboardEvent, index: number) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    const otp = pastedText.trim().substring(0, 6); 
    for (let i = 0; i < otp.length; i++) {
      this.twoFAForm.controls[`digit${index + i + 1}`].setValue(otp[i]);
    }
    const lastIndex = index + otp.length - 1;
    const inputElements = document.getElementsByClassName('verification-code-input');
    if (inputElements[lastIndex]) {
      const lastInputElement = inputElements[lastIndex] as HTMLInputElement;
      lastInputElement.focus();
      lastInputElement.selectionStart = lastInputElement.selectionEnd = lastInputElement.value.length;
    }
  }
  addMinutes(date: Date, minutes: number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }
  private redirectOnLogin() {
    this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
    this.eventService.reachedNoOfAttemptsUpdate({
      showError: true,
      message: this.errorMessage
    });
    this.route.navigate(['/login']);
  }
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
        this.storeService.userInfo(result);
        this._localStorage.removeItem(CommonConstants.TWO_FA_KEY);
        this.eventService.openToaster({
          showToster: true,
          message: `Welcome ${result?.fullName}`,
          type: 'success',
        });
        const path = this.storeService.getCurrentRoute();
        if (path) {
          this.route.navigate([path]);
        } else {
          this.route.navigate(['/summary']);
        }
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
          this._localStorage.removeItem(CommonConstants.EXPIRATION_TIME);
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

  acceptAlphaNumeric(event: any): boolean {
    var inp = String.fromCharCode(event.keyCode);
    const currentElement = event.target as HTMLInputElement;
    const currentIndex = Array.from(currentElement.parentElement!.children).indexOf(currentElement);
    if (/[a-zA-Z0-9]/.test(inp)) {
      currentElement.value = event.key;
      const nextElement = currentElement.nextElementSibling as HTMLInputElement;
      if (nextElement) {
        nextElement.focus();
      }
      return true;
    } else if ((event.code === 'ArrowLeft') && currentIndex > 0) {
      const previousElement = currentElement.previousElementSibling as HTMLInputElement;
      previousElement.focus();
      return true;
    } else if (event.code === 'ArrowRight' && currentIndex < 5) {
      const nextElement = currentElement.nextElementSibling as HTMLInputElement;
      if (nextElement) {
        nextElement.focus();
      }
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  backspacekeyEvent(event: any) {
    const currentElement = event.target as HTMLInputElement;
    const currentIndex = Array.from(currentElement.parentElement!.children).indexOf(currentElement);
    if ((event.code === 'ArrowLeft') && currentIndex > 0) {
      const previousElement = currentElement.previousElementSibling as HTMLInputElement;
      previousElement.focus();
    } else if ((event.code === 'Backspace') && currentIndex > 0 && event.target.selectionStart === 0 && event.target.selectionEnd === 0) {
      currentElement.value = '';
      const previousElement = currentElement.previousElementSibling as HTMLInputElement;
      previousElement.focus();
    }  else if (event.code === 'Delete') {
      currentElement.value = '';
      const previousElement = currentElement.previousElementSibling as HTMLInputElement;
      previousElement.focus();
    } else if (event.code === 'ArrowRight' && currentIndex < 5) {
      const nextElement = currentElement.nextElementSibling as HTMLInputElement;
      if (nextElement) {
        nextElement.focus();
      }
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
