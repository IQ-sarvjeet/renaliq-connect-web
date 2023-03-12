import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdminCookbookService } from './api/adminCookbook.service';
import { AdminLearningCenterService } from './api/adminLearningCenter.service';
import { AppointmentService } from './api/appointment.service';
import { ArticlesService } from './api/articles.service';
import { AuthService } from './api/auth.service';
import { CareMessagingService } from './api/careMessaging.service';
import { CarePlansService } from './api/carePlans.service';
import { CareTeamService } from './api/careTeam.service';
import { CommentsService } from './api/comments.service';
import { ContentService } from './api/content.service';
import { CookbookService } from './api/cookbook.service';
import { FaqService } from './api/faq.service';
import { FeatureService } from './api/feature.service';
import { GoalsService } from './api/goals.service';
import { GroupsService } from './api/groups.service';
import { HealthMatrixService } from './api/healthMatrix.service';
import { HomeService } from './api/home.service';
import { LearningCenterService } from './api/learningCenter.service';
import { LikesService } from './api/likes.service';
import { MedicationService } from './api/medication.service';
import { MessagingService } from './api/messaging.service';
import { NotificationsService } from './api/notifications.service';
import { OnBoardingService } from './api/onBoarding.service';
import { PatientContactService } from './api/patientContact.service';
import { PatientDocumentsService } from './api/patientDocuments.service';
import { PatientHealthService } from './api/patientHealth.service';
import { PatientsService } from './api/patients.service';
import { PostsService } from './api/posts.service';
import { RcAccessService } from './api/rcAccess.service';
import { ReferenceDataService } from './api/referenceData.service';
import { RolesService } from './api/roles.service';
import { SavedItemsService } from './api/savedItems.service';
import { ScheduledJobService } from './api/scheduledJob.service';
import { SearchService } from './api/search.service';
import { ShortLinksService } from './api/shortLinks.service';
import { TopicsService } from './api/topics.service';
import { UserService } from './api/user.service';
import { UserAccountsService } from './api/userAccounts.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdminCookbookService,
    AdminLearningCenterService,
    AppointmentService,
    ArticlesService,
    AuthService,
    CareMessagingService,
    CarePlansService,
    CareTeamService,
    CommentsService,
    ContentService,
    CookbookService,
    FaqService,
    FeatureService,
    GoalsService,
    GroupsService,
    HealthMatrixService,
    HomeService,
    LearningCenterService,
    LikesService,
    MedicationService,
    MessagingService,
    NotificationsService,
    OnBoardingService,
    PatientContactService,
    PatientDocumentsService,
    PatientHealthService,
    PatientsService,
    PostsService,
    RcAccessService,
    ReferenceDataService,
    RolesService,
    SavedItemsService,
    ScheduledJobService,
    SearchService,
    ShortLinksService,
    TopicsService,
    UserService,
    UserAccountsService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
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
