import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(public auth: AuthService,public router:Router) {}

  canActivate() {
    if(this.auth.isAdmin){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
