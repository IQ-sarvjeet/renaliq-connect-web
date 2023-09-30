# NewAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Swagger Generator
./generate.bat

# Update src/app/api-client/api.module.ts:90:71
 After Code Generated :  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders 
 Update:    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<any> 

# Update encoder.ts
import { HttpUrlEncodingCodec } from '@angular/common/http'; /**
* CustomHttpUrlEncodingCodec
* Fix plus sign (+) not encoding, so sent as blank space
* See: https://github.com/angular/angular/issues/11058#issuecomment-247367318
*/
export class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  override encodeKey(k: string): string {
        k = super.encodeKey(k);
        return k.replace(/\+/gi, '%2B');
    }
  override encodeValue(v: string): string {
        v = super.encodeValue(v);
        return v.replace(/\+/gi, '%2B');
    }
} 

#UserRoleService

Remove import { ProblemDetails } from '../model/problemDetails';
Delete file problemDetails.ts
Remove  in model.ts
export * from './problemDetails';


#Update patient.service.ts

    return this.httpClient.request<any>('get',`${this.basePath}/api/Patient/profile-image/${encodeURIComponent(String(enrollmentNumber))}`,

TEST
        {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress,
            responseType: 'blob' as any
        }
    );
