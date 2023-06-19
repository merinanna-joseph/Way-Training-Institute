import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
 
 
  showingLogin:boolean = true;
  closeDialog : Boolean = false; 
  eventId:string = this.route.snapshot.params.id?this.route.snapshot.params.id:"";
  hide = true;
  user = new User();
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  showPassword : Boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
  });; 
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
    return '';
  }
 
  toggleLoginForm(){
    this.showingLogin = !this.showingLogin;
  }
  
 
 
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    public toast: ToastComponent) { }
  
  ngOnInit() {
    if (this.auth.loggedIn) {
      this.auth.logout();
    }
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
   
  }

 
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }
  onForgotpasswordClick(){
    this.showingLogin = false;
  }
 
 
  getEmail(event:any){
    this.loginForm.value.email = event.target.value;
  }
  getPassword(event:any){
    this.loginForm.value.password = event.target.value;
  }
  get f() { return this.loginForm.controls; }

  login() {
    if(this.loginForm.value.email && this.loginForm.value.password){
      this.auth.login(this.loginForm.value).subscribe(
      res => {
        // alert(res);
        let url:string = "";
        if(this.auth.isSuperAdmin){
          // alert("in super admin");

            url = "super-admin";
        }
        else if(this.auth.isAdmin){
          // alert("in  admin");

            url = "/admin-dashboard";
        }else if(this.auth.isStaff && this.auth.isAccountStaff && !this.auth.currentUser.deletedOn){
          // alert("in  staff");

          url = "/accountandstaff-dashboard";
        }else if(this.auth.isStaff && !this.auth.currentUser.deletedOn){
          // alert("in  staff");

          url = "/staff-dashboard";
        }
        else if(this.auth.isAccountStaff && !this.auth.currentUser.deletedOn){
          // alert("in  acc staff"+this.auth.isAccountStaff);

          url = "/accountstaff-dashboard";
        }
        else if(this.auth.isStaff && this.auth.currentUser.deletedOn){
          this.toast.setMessage('User does not exists!', 'danger');

        }else if(this.auth.isTeacher){
          // alert("hii")
          url = "/teacher-dashboard";
        }
        else if(this.auth.isStudent){
          url = "/student-dashboard";
        }
        else{
          url = "/";
        }
        // alert(url)
        this.router.navigate([url]);
      },
        error =>
        // console.log(error,'Error')
         this.toast.setMessage('invalid email or password!', 'danger')
      );
    }else{
      this.toast.setMessage('Your Input is Wrong!', 'danger');
    }
  }

}