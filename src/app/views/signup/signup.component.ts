import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  ngOnInit(): void {
    $('.header').remove();
    $('.footer').remove();
    $('#back-to-top').remove();
  }
}
