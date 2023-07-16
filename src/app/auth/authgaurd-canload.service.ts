import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Roles } from '../enums/roles';
import { AccountService } from '../api-client';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthgaurdCanloadService implements CanLoad {
  constructor(private _accountService: AccountService,
    private authService: AuthService) { }

  async canLoad(): Promise<boolean> {
    const info = await this._accountService.apiAccountUserInfoGet().toPromise();
    if(info?.roles![0] === Roles.SYTEM_ADMIN && this.authService.isLoggedIn()) {
      return true;
    }
    return false;
  }
}
