import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  ngOnInit(): void {
    $('.header').remove();
    $('.footer').remove();
    $('#back-to-top').remove();
  }
}
