import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../api-client';
import { CommonConstants } from '../../shared/common-constants/common-constants';
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

  constructor(private _localStorage: LocalStorageService,
    private _accountService: AccountService,
    private route: Router) {
  }


  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');

    this.getTwoFAUserDetail();

  }

  getTwoFAUserDetail() {
    let jsonData = this._localStorage.getItem(CommonConstants.TWO_FA_KEY);
    let userData = JSON.parse(jsonData);
    if (userData) {
      this.username = userData.username;
    }
    console.log(userData);

  }


  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}
