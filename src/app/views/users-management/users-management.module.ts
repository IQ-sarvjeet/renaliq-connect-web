import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersManagementComponent } from './users-management.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { MbscModule } from '@mobiscroll/angular';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    children: [
      {
        path: 'usersList',
        component: UsersListComponent,
      },
      {
        path: 'userDetails',
        component: UserDetailsComponent,
      }
    ]
  }
];


@NgModule({
  declarations: [
    UsersManagementComponent,
    UsersListComponent,
    UserDetailsComponent,
    UserHeaderComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MbscModule
  ]
})
export class UsersManagementModule { }
