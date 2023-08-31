import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children:any;
}
export const ROUTES: RouteInfo[] = [
    { path: '', title: 'Dashboard',  icon: 'design_app', class: '' ,
    children: [

      {

         path: '/admin-dashboard', title: 'Lead Dashboard',  icon: 'education_atom', class: ''

      },

     {

         path: '/candidate-dashboard', title: 'Candidate Dashboard',  icon: 'education_atom', class: ''

      },
      ]
    },
    { path: '/users', title: 'Staff Management',  icon:'sport_user-run', class: '', children:''},
    { path: '/lead-admin', title: 'Lead Management',  icon:'location_map-big', class: '' , children:''},
    { path: '/course', title: 'Course Management',  icon:'design-2_ruler-pencil', class: '', children:'' },
    { path: '/candidate-management', title: 'Candidate Management',  icon:'users_single-02', class: '', children:'',
    // children: [

    //   {
    //     path: '/closedAdmissionform-display', title: 'Closed Admissions',  icon:'design_bullet-list-67', class: ''
    //   },


    //   ]
     },
       {
        path: '/closedAdmissionform-display', title: 'Closed Admissions',  icon:'design_bullet-list-67', class: '',children:'',
      },

    // { path: '/test-image', title: 'Test Image',  icon:'ui-1_bell-53', class: '' },

    { path: '/report-management', title: 'Report Management',  icon:'business_chart-bar-32', class: '', children:'',},
    { path: '/display-booklibrary', title: 'Book Library',  icon:'users_single-02', class: '' ,children:''},

    // { path: '/book-report', title: 'Books Report',  icon:'business_chart-bar-32', class: '', children:'',},
    // { path: '/certificate-report', title: 'Certificates Report',  icon:'business_chart-bar-32', class: '', children:'',},
    // { path: '/transport-report', title: 'Transport Report',  icon:'business_chart-bar-32', class: '', children:'',},

    // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isLoggedIn : boolean = false;

  constructor(private auth : AuthService) { }

  ngOnInit() {
    // alert(this.auth.isLoggedIn());
    this.isLoggedIn = this.auth.isLoggedIn();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
