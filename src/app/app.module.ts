import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptors,
  withJsonpSupport,
  withXsrfConfiguration
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './views/signup/signup.component';
import { SigninComponent } from './views/signin/signin.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BarChartHorizontalComponent } from './components/bar-chart-horizontal/bar-chart-horizontal.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    BarChartComponent,
    BarChartHorizontalComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(
      withXsrfConfiguration({ cookieName: '', headerName: '' }),
      withJsonpSupport(),
      withInterceptors([
        (req, next) => {
          // We can use the inject() function inside this function
          // For example: inject(AuthService)
          return next(req);
        },
      ])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
