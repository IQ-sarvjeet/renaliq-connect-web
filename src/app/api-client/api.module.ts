import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AccountService } from './api/account.service';
import { AdmissionService } from './api/admission.service';
import { CareMemberService } from './api/careMember.service';
import { ClinicalQualityMatrixService } from './api/clinicalQualityMatrix.service';
import { NotificationService } from './api/notification.service';
import { PatientService } from './api/patient.service';
import { PracticeService } from './api/practice.service';
import { UserService } from './api/user.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AccountService,
    AdmissionService,
    CareMemberService,
    ClinicalQualityMatrixService,
    NotificationService,
    PatientService,
    PracticeService,
    UserService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<any> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
