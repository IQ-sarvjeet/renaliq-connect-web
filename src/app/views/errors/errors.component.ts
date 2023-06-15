import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/api-client';
import { ErrorMessage } from 'src/app/interfaces/error-message';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService) {}
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
  public logOut() {
    this.authService.logOut();
  }
}
