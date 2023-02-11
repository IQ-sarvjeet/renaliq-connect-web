import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { AccountService } from '../../api-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalStorageService,
    private route: Router
  ) {}
  public async logOut() {
    try {
      var result = await this._accountService.apiAccountLogoutPost().toPromise();
      this._localStorage.clearAll();
      this.route.navigate(['/login']);    
    } catch (ex: any) {
      console.log(ex);
    }
  }
}
