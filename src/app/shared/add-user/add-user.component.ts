import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user = new User();
  @Input() userrole:string = '';
  @Output() onUseradd = new EventEmitter();

  constructor(
    public route:Router,
    private userService:UserService,
    private aroute:ActivatedRoute,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
  ) { }
  addUserForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: [''],
    email: [''],
    password: [''],
    mobile: [''],
    roles: [],
    status: [''],


    
  });;

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: [''],
      password: [''],
      mobile: [''],
      roles: [''],
      status: [''],
      
    });
  }
  get f() { return this.addUserForm.controls; }

  onUserSave(userDetails:any) {
   
    if (this.addUserForm.invalid) {
    
      return;
    }
  
    this.user = {firstName:this.f.firstname.value,lastName: this.f.lastname.value,
      email:this.f.email.value,password:this.f.password.value,mobile:this.f.mobile.value,
      roles:[this.userrole]
    }
  
    this.userService.register(this.user)
     
      .subscribe(
          data => {
            this.onUseradd.emit("success");
            this.toast.setMessage("User created successfully !!!", "success");
            this.addUserForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: [''],
            email: [''],
            password: [''],
            mobile: [''],
            roles: [''],
            status: [''],
          
          });
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          },
          error => {
            this.toast.setMessage("User creation failed !","danger");
            console.log(error)
             
          }
        );         
    }
   
}
