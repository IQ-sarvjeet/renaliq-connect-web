import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';
import { LocalStorageService } from '../shared/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private _localStorage: LocalStorageService, private storeService: StoreService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn()) {
        return true;
      }
      this.storeService.setCurrentRoute(state.url);
      this.authService.logOut();
      return false;
  }

}
