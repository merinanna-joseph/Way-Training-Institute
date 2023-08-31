import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { User } from '../shared/models/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  addingUser:boolean =false;
  role:string = '';
  userlist:User[] = [];
  constructor(private router:Router,private userService:UserService,) { }

  ngOnInit(): void {
      this.userService.getUsers().subscribe(
        data=>{
          this.userlist = data;
        }
      );
  }
  userStatus(){
    this.userService.getUsers().subscribe(
      data=>{
        this.userlist = data;
      }
    );
  }
  addAdmin(){
    this.role = 'admin';
    this.addingUser = true;
    // this.router.navigate(['admin/'+ this.role]);

  }
  addStaff(){
    this.role = 'staff';
    this.addingUser = true;
    // this.router.navigate(['staff/'+ role]);

  }

}
