import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/student-dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  // { path: '/user-profile', title: 'Profile',  icon:'users_single-02', class: '' },
  { path: '/student-admissionformdirect', title: 'Admission Details',  icon:'design_bullet-list-67', class: '' },
  // { path: '/student-coursedetails', title: 'Course Details',  icon:'users_single-02', class: '' },
  // { path: '/staff-closedAdmissionform-display', title: 'Closed Admissions',  icon:'design_bullet-list-67', class: '' },

  { path: '/student-display-booklibrary', title: 'Book Library',  icon:'design_bullet-list-67', class: '' }
  // { path: '/view_request', title: 'Events Management',  icon:'ui-1_calendar-60', class: '' },
  // { path: '/reports', title: 'Reports',  icon:'ui-1_calendar-60', class: '' },

];

@Component({
  selector: 'app-sidebar-student',
  templateUrl: './sidebar-student.component.html',
  styleUrls: ['./sidebar-student.component.css']
})
export class SidebarStudentComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
