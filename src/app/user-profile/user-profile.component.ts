import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUsername: User = {};
  users: User = {};
  user_password_details: User = {};
  submitted = false;
  currentUser: User = {};
  user: User;
  currentUserkk: any;
  userupdate: any;
  showCurrentPassword : Boolean = false;
  showNewPassword : Boolean = false;
  showConfirmPassword : Boolean = false;
  constructor(
    public auth: AuthService,
    public userService: UserService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder
  ) {}
  ResetPasswordForm = this.formBuilder.group({
    current_password: ['', Validators.required],
    new_password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  });
  userForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['',Validators.required ],
    email: ['',],
    mobile: ['',Validators.required ],
  });

  ngOnInit() {
    this.userService
      .getUser({ _id: this.auth.currentUser._id })
      .subscribe((data) => {
        this.currentUsername = data;
      });
    console.log('current user', this.currentUsername);
  }
  getFirstName(event) {
    this.users.firstName = event.value;
  }
  getLastName(event) {
    this.users.lastName = event.value;
  }
  getMobile(event) {
    this.users.mobile = event.value;
  }
  get cf() {
    console.log(this.userForm.controls.value);
    return this.userForm.controls;
  }

 updateUser(userdetails) {
    this.submitted=true;
    if(this.userForm.invalid){
      return;
    }
    this.users._id = this.auth.currentUser._id;
    this.userService.editUser(this.users).subscribe((data) => {
      console.log('data', data);
      this.currentUserkk=this.users
      this.toast.setMessage('profile updated successfully !!!', 'success');
      this.ngOnInit();
       });
  }

  ResetPasswordSave(passwordDetails) {
    if (passwordDetails.current_password) {
      if (passwordDetails.current_password.trim().length <= 0) {
        this.toast.setMessage('Current Password cannot be Empty !!!', 'danger');
        return;
      }
    } else {
      this.toast.setMessage('Current Password cannot be Empty !!!', 'danger');
      return;
    }
    if (passwordDetails.new_password) {
      if (passwordDetails.new_password.trim().length <= 0) {
        this.toast.setMessage('New Password cannot be Empty !!!', 'danger');
        return;
      }
    } else {
      this.toast.setMessage('New Password cannot be Empty !!!', 'danger');
      return;
    }
    if (passwordDetails.confirm_password) {
      if (passwordDetails.confirm_password.trim().length <= 0) {
        this.toast.setMessage('Confirm Password cannot be Empty !!!', 'danger');
        return;
      }
    } else {
      this.toast.setMessage('Confirm Password cannot be Empty !!!', 'danger');
      return;
    }
    if (passwordDetails.new_password != passwordDetails.confirm_password) {
      this.toast.setMessage('Password does not match !!!', 'danger');
      return;
    }
    this.user_password_details = {
      email: this.currentUsername.email,
      password: passwordDetails.current_password,
    };
    this.auth.login(this.user_password_details).subscribe(
      (res) => {
        this.user = this.auth.currentUser;
        this.user.password = passwordDetails.confirm_password;
        document.getElementById('passwordUpdateModalCloseBtn').click();
        this.toast.setMessage('Password updated successfully !!!', 'success');
        // this.addPasswordresetForm.reset();
        this.userService.editUserNewPassword(this.user).subscribe(
          (data) => {},
          (error) => {}
        );
      },
      (error) => this.toast.setMessage('invalid credentials!', 'danger')
    );
  }
}
