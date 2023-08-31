import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardStaff implements CanActivate {

  constructor(public auth: AuthService,public router:Router) {}

  canActivate() {
    if(this.auth.isStaff || this.auth.isAccountStaff || this.auth.isTeacher || this.auth.isStudent){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
