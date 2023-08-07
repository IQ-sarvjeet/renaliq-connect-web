import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/api-client/api/system.service';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';
import { Messages } from 'src/app/shared/common-constants/messages';
declare const $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  messages: any = Messages;
  apiVersion!: string;
  webVersion!: string;
  constructor(private systemService: SystemService) {}
  ngOnInit(): void {
    $('.header').addClass('d-none');
    $('.footer').addClass('d-none');
    $('#back-to-top').addClass('d-none');
    this.getVersion();
    this.webVersion = CommonConstants.WEB_VERSION;
  }
  private getVersion(){
    this.systemService.apiVersionGet().subscribe(
      (response: any) => {
        this.apiVersion = response.version;
      },
      (error) => {
        //console.error('Error fetching API version:', error);
        this.apiVersion = 'Unknown';
      }
    );
  }
  ngOnDestroy(): void {
    $('.header').removeClass('d-none');
    $('.footer').removeClass('d-none');
    $('#back-to-top').removeClass('d-none');
  }
}
