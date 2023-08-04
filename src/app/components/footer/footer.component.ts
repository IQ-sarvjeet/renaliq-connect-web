import { Component } from '@angular/core';
import { SystemService } from 'src/app/api-client/api/system.service';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';
import { Messages } from 'src/app/shared/common-constants/messages';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  messages: any = Messages;
  apiVersion!: string;
  webVersion!: string;
  constructor(private systemService: SystemService) {}
  ngOnInit() {
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
}
