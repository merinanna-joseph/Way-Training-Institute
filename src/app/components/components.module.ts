import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarStaffComponent } from './sidebar-staff/sidebar-staff.component';
import { SidebarAccountstaffComponent } from './sidebar-accountstaff/sidebar-accountstaff.component';
import { SidebarAccountandstaffComponent } from './sidebar-accountandstaff/sidebar-accountandstaff.component';
import { SidebarTeacherComponent } from './sidebar-teacher/sidebar-teacher.component';
import { SidebarStudentComponent } from './sidebar-student/sidebar-student.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarStaffComponent,
    SidebarAccountstaffComponent,
    SidebarAccountandstaffComponent,
    SidebarTeacherComponent,
    SidebarStudentComponent,


  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarStaffComponent,
    SidebarAccountstaffComponent,
    SidebarAccountandstaffComponent,
    SidebarTeacherComponent,
    SidebarStudentComponent,

  ]
})
export class ComponentsModule { }
