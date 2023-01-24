import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { environment } from '../../environments/environment';


@Injectable()
export class HttpClientWapperService {

  protected basePath = '/';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  //private canConsumeForm(consumes: string[]): boolean {
  //  const form = 'multipart/form-data';
  //  for (const consume of consumes) {
  //    if (form === consume) {
  //      return true;
  //    }
  //  }
  //  return false;
  //}


  /**
   * 
   * 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiAccountLoginPost(observe?: 'body', reportProgress?: boolean): Observable<any>;
  public apiAccountLoginPost(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public apiAccountLoginPost(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public apiAccountLoginPost(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    });

    debugger
    return this.httpClient.request<any>('post', `${this.basePath}/connect/token`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  };


  public login(model: any): Observable<any> {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
      }
    );

    const body = new HttpParams({ fromObject: model });
    const options = { headers: headers };
    return this.httpClient.post(`${environment.baseApiUrl}/connect/token`, body.toString(), options);
  }



}
