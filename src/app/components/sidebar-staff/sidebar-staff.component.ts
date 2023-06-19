import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/staff-dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  // { path: '/user-profile', title: 'Profile',  icon:'users_single-02', class: '' },
  { path: '/staff-lead', title: 'Lead Management',  icon:'design_bullet-list-67', class: '' },
  { path: '/staff-candidate-management', title: 'Candidate Management',  icon:'users_single-02', class: '' },
  // { path: '/staff-closedAdmissionform-display', title: 'Closed Admissions',  icon:'design_bullet-list-67', class: '' },

  // { path: '/admissionform-display', title: 'Admission Form',  icon:'design_bullet-list-67', class: '' }
  // { path: '/view_request', title: 'Events Management',  icon:'ui-1_calendar-60', class: '' },
  // { path: '/reports', title: 'Reports',  icon:'ui-1_calendar-60', class: '' },

];

@Component({
  selector: 'app-sidebar-staff',
  templateUrl: './sidebar-staff.component.html',
  styleUrls: ['./sidebar-staff.component.css']
})
export class SidebarStaffComponent implements OnInit {
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
