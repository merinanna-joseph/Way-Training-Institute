import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children:any;
}
export const ROUTES: RouteInfo[] = [
  { path: '/teacher-dashboard', title: 'Dashboard',  icon: 'design_app', class: '' , children:''},
  // { path: '/teacher-course', title: 'Course Management',  icon:'design-2_ruler-pencil', class: '', children:'' },

  { path: '/teacher-display-booklibrary', title: 'Book Library',  icon:'users_single-02', class: '' ,children:''},
  // { path: '/staff-lead', title: 'Lead Management',  icon:'design_bullet-list-67', class: '' },
  // { path: '/staff-candidate-management', title: 'Candidate Management',  icon:'users_single-02', class: '' },
  // { path: '/staff-closedAdmissionform-display', title: 'Closed Admissions',  icon:'design_bullet-list-67', class: '' },

  // { path: '/admissionform-display', title: 'Admission Form',  icon:'design_bullet-list-67', class: '' }
  // { path: '/view_request', title: 'Events Management',  icon:'ui-1_calendar-60', class: '' },
  // { path: '/reports', title: 'Reports',  icon:'ui-1_calendar-60', class: '' },

];
@Component({
  selector: 'app-sidebar-teacher',
  templateUrl: './sidebar-teacher.component.html',
  styleUrls: ['./sidebar-teacher.component.css']
})
export class SidebarTeacherComponent implements OnInit {
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



