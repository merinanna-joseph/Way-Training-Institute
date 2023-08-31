import { Routes } from '@angular/router';
// import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DashboardCandidateComponent } from '../../dashboard-candidate/dashboard-candidate.component';
import { LeadAdminComponent } from '../../lead-admin/lead-admin.component';
import { UsersListComponent } from '../../users-list/users-list.component';
import { AdminSingleLeadComponent } from '../../admin-single-lead/admin-single-lead.component';
import { AdminProfileComponent } from '../../admin-profile/admin-profile.component';
import { CourseformEditComponent } from '../../courseform-edit/courseform-edit.component';
import { AdminEventsViewComponent } from '../../admin-events-view/admin-events-view.component';
import { CourseformComponent } from '../../courseform/courseform.component';
import { AdmissionformComponent } from '../../admissionform/admissionform.component';
import { CandidatemanagementComponent } from '../../candidatemanagement/candidatemanagement.component';
import { AdmissionformDisplayComponent } from '../../admissionform-display/admissionform-display.component';
import { AdmissionformSingleviewComponent } from '../../admissionform-singleview/admissionform-singleview.component';
import { FeecollectionformComponent } from '../../feecollectionform/feecollectionform.component';
import { CourseformSingleviewComponent } from '../../courseform-singleview/courseform-singleview.component';
import { CandidateSingleviewComponent } from '../../candidate-singleview/candidate-singleview.component';
import { TestImageComponent } from '../../test-image/test-image.component';
import { AdmissionformEditComponent } from '../../admissionform-edit/admissionform-edit.component';
import { ClosedAdmissionDisplayComponent } from '../../closed-admission-display/closed-admission-display.component';
import { ReportmanagementComponent } from '../../reportmanagement/reportmanagement.component';
import { ReportBookComponent } from '../../report-book/report-book.component';
import { ReportCertificateComponent } from '../../report-certificate/report-certificate.component';
import { ReportTransportComponent } from '../../report-transport/report-transport.component';
import { TestPrintComponent } from '../../test-print/test-print.component';
import { CourseandbranchViewComponent } from '../../courseandbranch-view/courseandbranch-view.component';
import { DisplayBooklibraryComponent } from '../../display-booklibrary/display-booklibrary.component';
import { CreateBooklibraryComponent } from '../../create-booklibrary/create-booklibrary.component';
import { AddCourseSubjectMaterialsComponent } from '../../add-course-subject-materials/add-course-subject-materials.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'admin-dashboard',      component: DashboardComponent },
    { path: 'candidate-dashboard',   component: DashboardCandidateComponent },
    { path: 'admin-profile',   component: AdminProfileComponent },
    { path: 'lead-admin',   component: LeadAdminComponent },
    { path: 'users',   component: UsersListComponent },
    {path:'admin-single-lead/:id',component:AdminSingleLeadComponent},
    { path: 'admin_view_events/:id',   component: AdminEventsViewComponent },
    {path:'course',component:CourseformComponent},
    { path: 'courseform-edit/:id',   component: CourseformEditComponent },
    { path: 'admission-form',   component: AdmissionformComponent },
    { path: 'admission-form/:id',   component: AdmissionformComponent },
    { path: 'admissionform-display',   component: AdmissionformDisplayComponent },
    { path: 'admissionform-singleview/:id',   component: AdmissionformSingleviewComponent },
    {path:'candidate-management',component:CandidatemanagementComponent},
    {path:'fee-collection/:id',component:FeecollectionformComponent},
    {path:'candidate-singleview/:id',component:CandidateSingleviewComponent},
    { path: 'courseform-singleview/:id/:center',   component: CourseformSingleviewComponent },
    { path: 'test-image',   component: TestImageComponent },
    { path: 'admissionform-edit/:id',   component: AdmissionformEditComponent },
    { path: 'closedAdmissionform-display',   component: ClosedAdmissionDisplayComponent },
    {path:'report-management',component:ReportmanagementComponent},
    {path:'book-report',component:ReportBookComponent},
    {path:'certificate-report',component:ReportCertificateComponent},
    {path:'transport-report',component:ReportTransportComponent},
    {path:'print-admmision',component:TestPrintComponent},
    {path:'admin-course_branch_view',component:CourseandbranchViewComponent},
    {path:'display-booklibrary',component:DisplayBooklibraryComponent},
    {path:'create-booklibrary',component:CreateBooklibraryComponent},
    {path:'addsubandmaterial/:id',component:AddCourseSubjectMaterialsComponent},




];
