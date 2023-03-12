import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './views/signup/signup.component';
import { SigninComponent } from './views/signin/signin.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './components/shared.module';
import { BASE_PATH } from './api-client/variables';
import { ApiModule } from './api-client';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestHeadersInterceptor } from './shared/services/request-headers-interceptor';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { ErrorsComponent } from './views/errors/errors.component';
import { TwoFectorAuthComponent } from './views/two-fector-auth/two-fector-auth.component';
import { environment } from '../environments/environment';
import { SummaryModule } from './views/summary/summary.module';
import { SampleUiComponent } from './views/sample-ui/sample-ui.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { InitialsPipe } from './pipes/initials.pipe'; // Pipe


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    ResetPasswordComponent,
    ErrorsComponent,
    TwoFectorAuthComponent,
    SampleUiComponent,
    InitialsPipe 
  ],
  imports: [ 
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ApiModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SummaryModule
  ],
  exports: [],
  providers: [
    { provide: BASE_PATH, useValue: environment.baseApiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHeadersInterceptor,
      multi: true
    },
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
