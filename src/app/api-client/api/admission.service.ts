/**
 * WebAPI
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AdmissionFilterModel } from '../model/admissionFilterModel';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AdmissionService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAdmissionCasecategoryListGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiAdmissionCasecategoryListGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiAdmissionCasecategoryListGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiAdmissionCasecategoryListGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/Admission/casecategory/list`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAdmissionDiagnosisListGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiAdmissionDiagnosisListGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiAdmissionDiagnosisListGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiAdmissionDiagnosisListGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/Admission/diagnosis/list`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAdmissionFacilityListGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiAdmissionFacilityListGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiAdmissionFacilityListGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiAdmissionFacilityListGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/Admission/facility/list`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAdmissionListPost(body?: AdmissionFilterModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiAdmissionListPost(body?: AdmissionFilterModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiAdmissionListPost(body?: AdmissionFilterModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiAdmissionListPost(body?: AdmissionFilterModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/api/Admission/list`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param fromdate 
     * @param todate 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAdmissionSummaryFromdateTodateGet(fromdate: Date, todate: Date, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiAdmissionSummaryFromdateTodateGet(fromdate: Date, todate: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiAdmissionSummaryFromdateTodateGet(fromdate: Date, todate: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiAdmissionSummaryFromdateTodateGet(fromdate: Date, todate: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (fromdate === null || fromdate === undefined) {
            throw new Error('Required parameter fromdate was null or undefined when calling apiAdmissionSummaryFromdateTodateGet.');
        }

        if (todate === null || todate === undefined) {
            throw new Error('Required parameter todate was null or undefined when calling apiAdmissionSummaryFromdateTodateGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/Admission/summary/${encodeURIComponent(String(fromdate))}/${encodeURIComponent(String(todate))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param fromdate 
     * @param todate 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiAdmissionSummaryStageFromdateTodateGet(fromdate: Date, todate: Date, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiAdmissionSummaryStageFromdateTodateGet(fromdate: Date, todate: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiAdmissionSummaryStageFromdateTodateGet(fromdate: Date, todate: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiAdmissionSummaryStageFromdateTodateGet(fromdate: Date, todate: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (fromdate === null || fromdate === undefined) {
            throw new Error('Required parameter fromdate was null or undefined when calling apiAdmissionSummaryStageFromdateTodateGet.');
        }

        if (todate === null || todate === undefined) {
            throw new Error('Required parameter todate was null or undefined when calling apiAdmissionSummaryStageFromdateTodateGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/Admission/summary/stage/${encodeURIComponent(String(fromdate))}/${encodeURIComponent(String(todate))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
