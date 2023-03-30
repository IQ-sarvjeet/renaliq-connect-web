import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/api-client';
import { ErrorMessage } from 'src/app/interfaces/error-message';
import { EventService } from 'src/app/services/event.service';
import { Messages } from 'src/app/shared/common-constants/messages';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

declare const $: any;
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent {
  messages: any = Messages;
  errorMessage: ErrorMessage = {
    type: '404',
    title: Messages.error404Header,
    body: Messages.error404Body,
  };
  constructor(
    private eventService: EventService,
    private _accountService: AccountService,
    private _localStorage: LocalStorageService,
    private route: Router,) {}
  ngOnInit(): void {
    this.eventService
      .errorMessageSubscription()
      .subscribe((message: ErrorMessage) => {
        console.log('Show error message:', message);
        this.errorMessage = message;
      });
    $('#back-to-top').addClass('d-none');
  }
  ngOnDestroy(): void {
    $('#back-to-top').removeClass('d-none');
  }
  public async logOut() {
    this._localStorage.clearAll();
    try {
      var result = await this._accountService.apiAccountLogoutPost().toPromise();
      this.route.navigate(['/login']);    
    } catch (ex: any) {
      console.log(ex);
      this.route.navigate(['/login']);
    }
  }
}
