import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StaffLayoutRoutes } from './staff-layout.routing';
// import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { DashboardStaffComponent } from '../../dashboard-staff/dashboard-staff.component';
import { DashboardAccountstaffComponent } from '../../dashboard-accountstaff/dashboard-accountstaff.component';
import { DashboardAccountandstaffComponent } from '../../dashboard-accountandstaff/dashboard-accountandstaff.component';
import { DashboardTeacherComponent } from '../../dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from '../../dashboard-student/dashboard-student.component';
import { StudentBooklibraryViewComponent } from '../../student-booklibrary-view/student-booklibrary-view.component';


@NgModule({
  declarations: [
    DashboardStaffComponent,
    DashboardAccountstaffComponent,
    DashboardAccountandstaffComponent,
    DashboardTeacherComponent,
    DashboardStudentComponent,
    StudentBooklibraryViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StaffLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ]
})
export class StaffLayoutModule { }

