import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
import { User } from '../shared/models/user.model';
import { map } from 'rxjs/operators';
import { of, Subscription } from "rxjs";
import { delay } from 'rxjs/operators';

@Injectable()
export class AuthService {

  loggedIn : boolean = false;
  isAdmin : boolean = false;
  isSuperAdmin : boolean = false;
  isStaff : boolean = false;
  isAccountStaff : boolean = false;
  isTeacher : boolean = false;
  isStudent : boolean = false;

  currentUser: User = {};

  authToken: any;
  user: any;
  tokenSubscription = new Subscription()
  timeout;
  orgToken: any;

  constructor(private userService: UserService,
              private router: Router,
              private jwtHelper: JwtHelperService
              ) {
    const token:any = localStorage.getItem('token');
    var bool = jwtHelper.isTokenExpired(token);
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUserLogin(decodedUser);
    }else{
      this.router.navigate(['login'], { queryParams: { retUrl: window.location.pathname}});
    }
  }

  isLoggedIn():boolean{
    const token : any = localStorage.getItem('token');
    let isTokenExpired = this.jwtHelper.isTokenExpired(token);
    let boolbool:boolean = (token && !isTokenExpired);
    if(!boolbool){
      this.logout();
    }
    return boolbool;
  }

  login(emailAndPassword : any) {
    return this.userService.login(emailAndPassword).pipe(map(
      res  => {
        this.orgToken = res.data;
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUserLogin(decodedUser);
        return true;
      }
    ));
  }
  // logout() {
  //   localStorage.removeItem('token');
  //   this.loggedIn = false;
  //   this.isAdmin = false;
  //   this.isStaff = false;
  //   this.isSuperAdmin = false;
  //   this.currentUser = {};
  //   this.router.navigate(['login']);
  // }
  logout() {
    localStorage.removeItem('courseID');
    localStorage.removeItem('sortUniversity');
    localStorage.removeItem('sortCenter');
    localStorage.removeItem('sortIntake');
    // localStorage.removeItem('bothcenters_paid');
    // localStorage.removeItem('center1_paid');
    // localStorage.removeItem('center2_paid');
    // localStorage.removeItem('bothcenter_outstanding');
    // localStorage.removeItem('center1_outstanding');
    // localStorage.removeItem('center2_outstanding');
    // localStorage.removeItem('center1_outstanding?');
    // localStorage.removeItem('center1_paid?');
    // localStorage.removeItem('center2_outstanding?');
    // localStorage.removeItem('center2_paid?');
    // localStorage.removeItem('centers_outstanding?');
    // localStorage.removeItem('centers_paid?');
    // localStorage.removeItem('dAdmin_courseID');
    // localStorage.removeItem('dAdmin_sortUniversity');
    // localStorage.removeItem('dAdmin_sortCenter');
    // localStorage.removeItem('dAdmin_sortIntake');
    localStorage.removeItem('report_courseID');
    localStorage.removeItem('report_sortUniversity');
    localStorage.removeItem('report_sortPaymentmode');
    localStorage.removeItem('report_sortIntake');
    localStorage.removeItem('report_startDate');
    localStorage.removeItem('report_endDate');
    localStorage.removeItem('report_startDatets');
    localStorage.removeItem('report_endDatets');
    localStorage.removeItem('report_courseIDbc');
    localStorage.removeItem('report_sortUniversitybc');
    localStorage.removeItem('report_sortIntakebc');
    localStorage.removeItem('report_sortReportbc');
    localStorage.removeItem('report_courseIDts');
    localStorage.removeItem('report_sortUniversityts');
    localStorage.removeItem('report_sortIntakets');
    localStorage.removeItem('report_sortReportts');
    localStorage.removeItem('report_sortPaymentmodets');
    localStorage.removeItem('report_courseNamets');
    localStorage.removeItem('report_courseNamebc');
    localStorage.removeItem('report_courseNameinvoice');
    localStorage.removeItem('defaultvisibility');
    localStorage.removeItem('this.sortCourse');
    localStorage.removeItem('report_course_name');
    localStorage.removeItem('report_course_branch');
    localStorage.removeItem('report_course_type');
    localStorage.removeItem('report_course_name_ts');
    localStorage.removeItem('report_course_branch_ts');
    localStorage.removeItem('report_course_type_ts');
    localStorage.removeItem('report_course_name_bc');
    localStorage.removeItem('report_course_branch_bc');
    localStorage.removeItem('report_course_type_bc');
    localStorage.removeItem('report_courseName');
    localStorage.removeItem('yearIndex');









    this.tokenSubscription.unsubscribe();
    this.authToken = null;
    this.user = null;
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.isStaff = false;
    this.isAccountStaff = false;
    this.isSuperAdmin = false;
    this.isStudent = false;
    this.isTeacher = false;
    this.currentUser = {};
    this.router.navigate(['login']);
  }
  decodeUserFromToken(token:any) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUserLogin(decodedUser:User){
    if(decodedUser.roles){
      this.isStaff = (decodedUser.roles.indexOf('staff') > -1);
      this.isAdmin = (decodedUser.roles.indexOf('admin') > -1);
      this.isAccountStaff = (decodedUser.roles.indexOf('account_staff') > -1);
      this.isSuperAdmin = (decodedUser.roles.indexOf('super-admin') > -1);
      this.isTeacher = (decodedUser.roles.indexOf('teacher') > -1);
      this.isStudent = (decodedUser.roles.indexOf('student') > -1);
    }
    this.currentUser = decodedUser;
    this.loggedIn = true;
    this.setCurrentUser(decodedUser);
    this.storeUserData(this.orgToken,decodedUser);
  }
  setCurrentUser(decodedUser:User) {
    let user:User = {_id:decodedUser._id};
    return this.userService.getUser(user).subscribe(
      res=>{
        if(res.roles){
          this.isStaff = (res.roles.indexOf('staff') > -1);
          this.isAdmin = (res.roles.indexOf('admin') > -1);
          this.isAccountStaff = (res.roles.indexOf('account_staff') > -1);

          this.isSuperAdmin = (res.roles.indexOf('super-admin') > -1);
          this.isTeacher = (res.roles.indexOf('teacher') > -1);
          this.isStudent = (res.roles.indexOf('student') > -1);
        }
        this.currentUser = res;
        this.loggedIn = true;
        return this.loggedIn;
      }
    );
  }
  storeUserData(token, user) {
    this.timeout = this.jwtHelper.getTokenExpirationDate(token).valueOf() - new Date().valueOf();
    sessionStorage.setItem("id_token", token);
    sessionStorage.setItem("user", JSON.stringify(user))
    this.authToken = token;
    this.user = user;
    // this.emit({ username: this.user.username });
    this.expirationCounter(this.timeout);
  }
  expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.logout();
      this.router.navigate(["/login"]);
    });
  }


}
