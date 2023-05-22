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

import { ClinicalPatientMatrixExportFilterModel } from '../model/clinicalPatientMatrixExportFilterModel';
import { ClinicalPatientMatrixFilterModel } from '../model/clinicalPatientMatrixFilterModel';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ClinicalQualityMatrixService {

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
    public apiClinicalQualityMatrixAvailablePeriodGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixAvailablePeriodGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixAvailablePeriodGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixAvailablePeriodGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/available-period`,
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
    public apiClinicalQualityMatrixCaregapGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixCaregapGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixCaregapGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixCaregapGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/caregap`,
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
     * @param patientId 
     * @param parientId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClinicalQualityMatrixCaregapPatientPatientIdGet(patientId: string, parientId?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixCaregapPatientPatientIdGet(patientId: string, parientId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixCaregapPatientPatientIdGet(patientId: string, parientId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixCaregapPatientPatientIdGet(patientId: string, parientId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (patientId === null || patientId === undefined) {
            throw new Error('Required parameter patientId was null or undefined when calling apiClinicalQualityMatrixCaregapPatientPatientIdGet.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (parientId !== undefined && parientId !== null) {
            queryParameters = queryParameters.set('parientId', <any>parientId);
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/caregap/patient/${encodeURIComponent(String(patientId))}`,
            {
                params: queryParameters,
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
    public apiClinicalQualityMatrixDownloadGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixDownloadGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixDownloadGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixDownloadGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/download`,
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
     * @param patientId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClinicalQualityMatrixGetPatientPatientIdGet(patientId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixGetPatientPatientIdGet(patientId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixGetPatientPatientIdGet(patientId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixGetPatientPatientIdGet(patientId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (patientId === null || patientId === undefined) {
            throw new Error('Required parameter patientId was null or undefined when calling apiClinicalQualityMatrixGetPatientPatientIdGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/get/patient/${encodeURIComponent(String(patientId))}`,
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
     * @param periodId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClinicalQualityMatrixGetPracticePeriodIdGet(periodId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixGetPracticePeriodIdGet(periodId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixGetPracticePeriodIdGet(periodId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixGetPracticePeriodIdGet(periodId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (periodId === null || periodId === undefined) {
            throw new Error('Required parameter periodId was null or undefined when calling apiClinicalQualityMatrixGetPracticePeriodIdGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/get/practice/${encodeURIComponent(String(periodId))}`,
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
     * @param matrix 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClinicalQualityMatrixMatrixHelpGet(matrix: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixMatrixHelpGet(matrix: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixMatrixHelpGet(matrix: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixMatrixHelpGet(matrix: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (matrix === null || matrix === undefined) {
            throw new Error('Required parameter matrix was null or undefined when calling apiClinicalQualityMatrixMatrixHelpGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/${encodeURIComponent(String(matrix))}/help`,
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
     * @param matrix 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClinicalQualityMatrixMatrixSummaryGet(matrix: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixMatrixSummaryGet(matrix: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixMatrixSummaryGet(matrix: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixMatrixSummaryGet(matrix: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (matrix === null || matrix === undefined) {
            throw new Error('Required parameter matrix was null or undefined when calling apiClinicalQualityMatrixMatrixSummaryGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/${encodeURIComponent(String(matrix))}/summary`,
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
     * @param metricId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClinicalQualityMatrixMetricMetricIdGet(metricId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixMetricMetricIdGet(metricId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixMetricMetricIdGet(metricId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixMetricMetricIdGet(metricId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (metricId === null || metricId === undefined) {
            throw new Error('Required parameter metricId was null or undefined when calling apiClinicalQualityMatrixMetricMetricIdGet.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/metric/${encodeURIComponent(String(metricId))}`,
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
    public apiClinicalQualityMatrixMetricsGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixMetricsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixMetricsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixMetricsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('get',`${this.basePath}/api/ClinicalQualityMatrix/metrics`,
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
    public apiClinicalQualityMatrixPatientExportPost(body?: ClinicalPatientMatrixExportFilterModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixPatientExportPost(body?: ClinicalPatientMatrixExportFilterModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixPatientExportPost(body?: ClinicalPatientMatrixExportFilterModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixPatientExportPost(body?: ClinicalPatientMatrixExportFilterModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<any>('post',`${this.basePath}/api/ClinicalQualityMatrix/patient/export`,
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
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiClinicalQualityMatrixPatientListPost(body?: ClinicalPatientMatrixFilterModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiClinicalQualityMatrixPatientListPost(body?: ClinicalPatientMatrixFilterModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiClinicalQualityMatrixPatientListPost(body?: ClinicalPatientMatrixFilterModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiClinicalQualityMatrixPatientListPost(body?: ClinicalPatientMatrixFilterModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<any>('post',`${this.basePath}/api/ClinicalQualityMatrix/patient/list`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
