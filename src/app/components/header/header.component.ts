import { Component } from '@angular/core';
import { AccountService } from '../../api-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private _accountService: AccountService) {
  }


  public async logout() {
    var result = await this._accountService.apiAccountLogoutPost().toPromise();
  }




}
