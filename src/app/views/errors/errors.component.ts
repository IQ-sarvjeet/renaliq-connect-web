import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from 'src/app/interfaces/error-message';
import { EventService } from 'src/app/services/event.service';
import { Messages } from 'src/app/shared/common-constants/messages';

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
    body: Messages.error404Body
  }
  constructor(private eventService: EventService) {

  }
  ngOnInit(): void {
    this.eventService.errorMessageSubscription().subscribe((message: ErrorMessage) => {
      console.log('Show error message:', message);
      this.errorMessage = message;
    })
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');
  }
  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}
