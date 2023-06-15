import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, Configuration } from '../api-client';
import { UserInfo } from '../interfaces/user';
import { CommonConstants } from '../shared/common-constants/common-constants';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { StoreService } from './store.service';
import { UserTokenRequestModel } from '../interfaces/user-token-request-model';
import { LoginResponseModel } from '../interfaces/login-response-model';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected basePath = environment.baseApiUrl;
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(private _localStorage: LocalStorageService,
    private storeService: StoreService,
    private _accountService: AccountService,
    protected httpClient: HttpClient,
    private route: Router) {
  }
  isLoggedIn() {
    const userInfo: UserInfo = this.storeService.getUserInfo();
    if (!userInfo || !userInfo.fullName) {
      return false;
    }
    if (this.isUserSessionExpired()) {
      return false;
    }
    return !!this._localStorage.getItem(CommonConstants.CONNECT_TOKEN_KEY);
  }
  isUserSessionExpired() {
    const expirationTime = this._localStorage.getItem(CommonConstants.EXPIRATION_TIME);
    if (expirationTime) {
      if (new Date().getTime() > new Date(expirationTime).getTime()) {
        return true;
      }
    }
    return false;
  }
  public async logOut() {
    const path: string = window.location.hash;
    if (path.indexOf('/publish') !== -1) {
      this.storeService.setCurrentRoute(path.replace('#', ''));
    }
    try {
      await this._accountService.apiAccountLogoutPost().toPromise();
    } catch (ex: any) {
      console.log(ex);
    } finally {
      this._localStorage.clearAll();
      this.route.navigate(['/login']);
    }
  }
  /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public apiAccountAuthtokenValidatePost(body?: UserTokenRequestModel, observe?: 'body', reportProgress?: boolean): Observable<LoginResponseModel>;
  public apiAccountAuthtokenValidatePost(body?: UserTokenRequestModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<LoginResponseModel>>;
  public apiAccountAuthtokenValidatePost(body?: UserTokenRequestModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<LoginResponseModel>>;
  public apiAccountAuthtokenValidatePost(body?: UserTokenRequestModel, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const to_encoded = (obj: any) => Object.keys(obj).map(k =>
      `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

    return this.httpClient.request<LoginResponseModel>('post', `${this.basePath}/connect/token`,
      {
        body: to_encoded(body),
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }
}
