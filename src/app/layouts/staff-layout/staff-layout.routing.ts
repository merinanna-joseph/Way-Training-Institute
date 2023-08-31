import { Routes } from '@angular/router';
import { LeadStaffComponent } from '../../lead-staff/lead-staff.component';
import { DashboardStaffComponent } from '../../dashboard-staff/dashboard-staff.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { StaffSingleLeadComponent } from '../../staff-single-lead/staff-single-lead.component';
import { EventsViewComponent } from '../../events-view/events-view.component';
import { AdmissionformComponent } from '../../admissionform/admissionform.component'
import { DashboardAccountstaffComponent } from '../../dashboard-accountstaff/dashboard-accountstaff.component';
import { DashboardAccountandstaffComponent } from '../../dashboard-accountandstaff/dashboard-accountandstaff.component';
import { AdmissionformDisplayComponent } from '../../admissionform-display/admissionform-display.component';
import { AdmissionformSingleviewComponent } from '../../admissionform-singleview/admissionform-singleview.component';
import { FeecollectionformComponent } from '../../feecollectionform/feecollectionform.component';
import { CandidatemanagementComponent } from '../../candidatemanagement/candidatemanagement.component';
import { CandidateSingleviewComponent } from '../../candidate-singleview/candidate-singleview.component';
import { ClosedAdmissionDisplayComponent } from '../../closed-admission-display/closed-admission-display.component';
import { AdmissionformEditComponent } from '../../admissionform-edit/admissionform-edit.component';
import { DashboardTeacherComponent } from '../../dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from '../../dashboard-student/dashboard-student.component';
import { CourseformComponent } from '../../courseform/courseform.component';
import { CourseformEditComponent } from '../../courseform-edit/courseform-edit.component';
import { CourseformSingleviewComponent } from '../../courseform-singleview/courseform-singleview.component';
import { CourseandbranchViewComponent } from '../../courseandbranch-view/courseandbranch-view.component';
import { StudentAdmissionformdirectComponent } from '../../student-admissionformdirect/student-admissionformdirect.component';
import { StudentCoursedetailsComponent } from '../../student-coursedetails/student-coursedetails.component';
import { DisplayBooklibraryComponent } from '../../display-booklibrary/display-booklibrary.component';
import { CreateBooklibraryComponent } from '../../create-booklibrary/create-booklibrary.component';
import { AddCourseSubjectMaterialsComponent } from '../../add-course-subject-materials/add-course-subject-materials.component';
import { StudentBooklibraryViewComponent } from '../../student-booklibrary-view/student-booklibrary-view.component';

export const StaffLayoutRoutes: Routes = [
    { path: 'staff-dashboard',      component: DashboardStaffComponent },
    { path: 'teacher-dashboard',      component: DashboardTeacherComponent },
    { path: 'student-dashboard',      component: DashboardStudentComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'staff-lead',   component: LeadStaffComponent },
    { path: 'staff-single-lead/:id',   component: StaffSingleLeadComponent },
    { path: 'view_events/:id',   component: EventsViewComponent },
    { path: 'staff-admission-form',   component: AdmissionformComponent },
    { path: 'staff-admission-form/:id',   component: AdmissionformComponent },
    { path: 'accountstaff-dashboard',   component: DashboardAccountstaffComponent },
    { path: 'accountandstaff-dashboard',   component: DashboardAccountandstaffComponent },

    { path: 'admissionform-display',   component: AdmissionformDisplayComponent },
    { path: 'staff-admissionform-singleview/:id',   component: AdmissionformSingleviewComponent },
    {path:'staff-candidate-management',component:CandidatemanagementComponent},
    { path: 'fee-collection/:id',component:FeecollectionformComponent},
    {path:'staff-candidate-singleview/:id',component:CandidateSingleviewComponent},
    { path: 'staff-closedAdmissionform-display',   component: ClosedAdmissionDisplayComponent },
    { path: 'staff-admissionform-edit/:id',   component: AdmissionformEditComponent },
    
    {path:'teacher-course',component:CourseformComponent},
    { path: 'teacher-courseform-edit/:id',   component: CourseformEditComponent },
    { path: 'teacher-courseform-singleview/:id/:center',   component: CourseformSingleviewComponent },
    {path:'teacher-course_branch_view',component:CourseandbranchViewComponent},

    
    { path: 'student-admissionformdirect',   component: StudentAdmissionformdirectComponent },
    { path: 'student-coursedetails',   component: StudentCoursedetailsComponent },
    {path:'teacher-display-booklibrary',component:DisplayBooklibraryComponent},
    {path:'teacher-create-booklibrary',component:CreateBooklibraryComponent},
    {path:'teacher-addsubandmaterial/:id',component:AddCourseSubjectMaterialsComponent},

    {path:'student-display-booklibrary',component:StudentBooklibraryViewComponent},

];
