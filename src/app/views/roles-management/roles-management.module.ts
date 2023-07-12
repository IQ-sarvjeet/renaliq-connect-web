import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RolesManagementComponent } from './roles-management.component';
import { RoleHeaderComponent } from './role-header/role-header.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { RolesListComponent } from './roles-list/roles-list.component';

const routes: Routes = [
  {
    path: '',
    component: RolesManagementComponent,
    children: [
      {
        path: 'rolesList',
        component: RolesListComponent,
      },
      {
        path: 'roleDetails',
        component: RoleDetailsComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    RolesManagementComponent,
    RoleHeaderComponent,
    RoleDetailsComponent,
    RolesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RolesManagementModule { }
