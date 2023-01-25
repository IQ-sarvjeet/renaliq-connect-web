import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpClientWapperService {


  constructor(protected httpClient: HttpClient,) {
  }

  public apiAccountLoginPost(model: any): Observable<any> {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
      });

    const body = new HttpParams({ fromObject: model });
    const options = { headers: headers };
    return this.httpClient.post(`${environment.baseApiUrl}/connect/token`, body.toString(), options);
  }



}
