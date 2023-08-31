import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { StaffComponent } from './staff/staff.component';
import { AuthGuardSuperAdmin } from './services/auth-guard-super-admin.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AuthGuardStaff } from './services/auth-guard-staff.service';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StaffLayoutComponent } from './layouts/staff-layout/staff-layout.component';
import { LeadAdminComponent } from './lead-admin/lead-admin.component';
import { UsersListComponent } from './users-list/users-list.component';
import { StaffRequestComponent } from './staff-request/staff-request.component';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminSingleLeadComponent } from './admin-single-lead/admin-single-lead.component';
import { CourseformComponent } from './courseform/courseform.component';
import { CourseformEditComponent } from './courseform-edit/courseform-edit.component';
import { CandidatemanagementComponent } from './candidatemanagement/candidatemanagement.component';
import { FeecollectionformComponent } from './feecollectionform/feecollectionform.component';
import { AdmissionformDisplayComponent } from './admissionform-display/admissionform-display.component';
import { AdmissionformSingleviewComponent } from './admissionform-singleview/admissionform-singleview.component';
import { CourseformSingleviewComponent } from './courseform-singleview/courseform-singleview.component';
import { AdmissionformComponent } from './admissionform/admissionform.component';
import { EventsViewComponent } from './events-view/events-view.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminEventsViewComponent } from './admin-events-view/admin-events-view.component';
import { StaffSingleLeadComponent } from './staff-single-lead/staff-single-lead.component';
import { LeadStaffComponent } from './lead-staff/lead-staff.component';
import { CandidateSingleviewComponent } from './candidate-singleview/candidate-singleview.component';
import { AdmissionformEditComponent } from './admissionform-edit/admissionform-edit.component';
import { ClosedAdmissionDisplayComponent } from './closed-admission-display/closed-admission-display.component';
import { ReportmanagementComponent } from './reportmanagement/reportmanagement.component';
import { ReportBookComponent } from './report-book/report-book.component';
import { CourseandbranchViewComponent } from './courseandbranch-view/courseandbranch-view.component';
import { StudentAdmissionformdirectComponent } from './student-admissionformdirect/student-admissionformdirect.component';
import { StudentCoursedetailsComponent } from './student-coursedetails/student-coursedetails.component';
import { CreateBooklibraryComponent } from './create-booklibrary/create-booklibrary.component';
import { DisplayBooklibraryComponent } from './display-booklibrary/display-booklibrary.component';
import { AddCourseSubjectMaterialsComponent } from './add-course-subject-materials/add-course-subject-materials.component';


export const CommonModules = [
  SuperAdminComponent,AdminComponent,StaffComponent,LeadAdminComponent,
  UsersListComponent,LoginComponent,StaffRequestComponent,LogoutComponent,
  UserProfileComponent,AdminSingleLeadComponent,CourseformComponent,CourseformEditComponent,
  CandidatemanagementComponent,FeecollectionformComponent,AdmissionformComponent,
  AdmissionformDisplayComponent,
  AdmissionformSingleviewComponent,
  CourseformSingleviewComponent,
  LeadStaffComponent,
  StaffSingleLeadComponent,
  EventsViewComponent,
  AdminProfileComponent,
  AdminEventsViewComponent,
  CandidateSingleviewComponent, 
  AdmissionformEditComponent,
  ClosedAdmissionDisplayComponent,    
  ReportmanagementComponent,
  CourseandbranchViewComponent,
  StudentAdmissionformdirectComponent,
  StudentCoursedetailsComponent,
  CreateBooklibraryComponent,
  DisplayBooklibraryComponent,
  AddCourseSubjectMaterialsComponent,


];

const routes: Routes = [
  { path: 'super-admin', component: SuperAdminComponent,canActivate:[AuthGuardSuperAdmin],
    children:[]
  },

  { path: 'admin', component: AdminComponent,canActivate:[AuthGuardAdmin],
    children:[]
  },
  {path:'admin/:role',component:AdminComponent},

  // { path: 'staff', component: StaffComponent,canActivate:[AuthGuardStaff],
  //   children:[]
  // },
  {path:'staff',component:StaffComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},


  {
    path: '',
    component: AdminLayoutComponent,canActivate:[AuthGuardAdmin],
    children: [
        {
          path: '',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        },

    ]
  },
  {
    path: '',
    component: StaffLayoutComponent,canActivate:[AuthGuardStaff],
    children: [
        {
          path: '',
          loadChildren: './layouts/staff-layout/staff-layout.module#StaffLayoutModule'
        },
        {path:'view_request',component:StaffRequestComponent},

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
