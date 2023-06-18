import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Roles } from '../enums/roles';
import { AccountService } from '../api-client';
@Injectable({
  providedIn: 'root'
})
export class AuthgaurdCanloadService implements CanLoad {
  constructor(private _accountService: AccountService) { }

  async canLoad(): Promise<boolean> {
    const info = await this._accountService.apiAccountUserInfoGet().toPromise();
    return info?.roles![0] === Roles.SYTEM_ADMIN;
  }
}
