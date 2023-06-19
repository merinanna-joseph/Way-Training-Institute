import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LEAD_STATUS } from '../globals';
import { StaffLayoutRoutes } from '../layouts/staff-layout/staff-layout.routing';
import { AuthService } from '../services/auth.service';
import { CenterService } from '../services/center.service';
import { LeadService } from '../services/lead.service';
import { UserService } from '../services/user.service';
import { Center } from '../shared/models/center.model';
import { User } from '../shared/models/user.model';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  user = new User();
  staff=new User();
  submitted = false;
  centersubmitted = false;
  center:Center = {};
  // userrole:string='staff'
  staffDetails: User[];
  editstaffsubmitted=false;
  isSortByName = false;
  isSortByMobile = false;
  isSortByEmail= false;
  staffDeleteDetails:User = {};
  isNotDeleted: boolean = false;
  

  constructor(public userService:UserService,
    public route:Router,
    private aroute:ActivatedRoute,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    public auth:AuthService,
    public leadService:LeadService,
    public centerService:CenterService,


    ) { }
    addUserForm: FormGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      roles: [],
      status: [''],
    });;
    editUserForm: FormGroup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',Validators.required],
      // password: ['', Validators.required],
      mobile: ['', Validators.required],
      roles: [],
      status: [''],
    });;
   
    addCenterForm: FormGroup = this.formBuilder.group({
      center: ['', Validators.required],
      
    });;

    checkedList = [];
    checkedListedit = [];
    // selected = []
    xyzlist = [
      {
        value: 'staff',
        label: 'Lead staff'
      },
      {
        value: 'account_staff',
        label: 'Account staff'
      },
      {
        value: 'teacher',
        label: 'Teacher'
      }
    ];

  ngOnInit(): void {
    
    
   

    this.addUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      roles: [''],
      status: [''],
    });
    this.getUsers();
    this.addCenterForm = this.formBuilder.group({
      center: ['', Validators.required],
      
    });
  }
  get f() { return this.addUserForm.controls; }
  get esf() { return this.editUserForm.controls;}
  get c() { return this.addCenterForm.controls; }

  
  onCheckboxChange(option, event) {
    // alert(event.target.checked+" " + option.value)
    if(event.target.checked) {
      this.checkedList.push(option.value);
    } else {
    for(var i=0 ; i < this.xyzlist.length; i++) {
      if(this.checkedList[i] == option.value) {
        this.checkedList.splice(i,1);
     }
   }
 }
//  this.user.roles = ;
//  console.log(this.checkedList);
}

  // onStaffRoleChange(event) {
  //   this.user.roles = event.value;

  // }

  onUserSave() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
    return;
    }

      this.user = {firstName:this.f.firstname.value,lastName: this.f.lastname.value,
      email:this.f.email.value,password:this.f.password.value,mobile:this.f.mobile.value,
      roles:this.checkedList
    }

    this.userService.register(this.user)
      .subscribe(
          data => {
            // this.onUseradd.emit("success");
            // alert("succes");
            this.users.push(data);
            document.getElementById('staffSaveModalCloseBtn').click();
            this.toast.setMessage("Staff created successfully !!!", "success");
            this.addUserForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['',Validators.required],
            email: ['',],
            password: ['',Validators.required],
            mobile: ['',Validators.required],
            roles: [''],
            status: [''],

          });
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          },
          error => {
            this.toast.setMessage(error.error.message,"danger");
          
          }
        );
    }




  getUsers(){
    this.users = [];
    this.userService.getUsers().subscribe(
      data => {
           for(var i in data){
             if((data[i].roles.indexOf('staff') > -1 || data[i].roles.indexOf('account_staff') > -1 || data[i].roles.indexOf('teacher') > -1) && !data[i].deletedOn){
               this.users.push(data[i])
             }
           }
           this.users.reverse();
          //  console.log(this.users)
      }
    )
  }
  getForm(){
    this.userService.getUsers().subscribe(
      data =>{
        this.staffDetails = data;
        this.staffDetails.reverse();
        // console.log("staff details",this.staffDetails);
      }
    );
  }
  onCheckboxChangeedit(option, event) {
    // alert(event.target.checked+" " + option.value)
    if(event.target.checked) {
      this.checkedListedit.push(option.value);
    } else {
    for(var i=0 ; i < this.xyzlist.length; i++) {
      if(this.checkedListedit[i] == option.value) {
        this.checkedListedit.splice(i,1);
     }
   }
 }
}
  editStaff(id:any){
    this.userService.getUser({_id:id}).subscribe(
      data => {
        this.staff = data;
        this.checkedListedit = this.staff.roles;

              }
    )
  }
 
  checked(item){
  
    let ret: boolean = true;
   
      if(this.checkedListedit.indexOf(item) > -1){
        ret = true;
      }
      else{
        ret = false;
      }
      console.log(ret)
    return ret;
  }
 
  deleteStaff(id:any){
    this.leadService.getLeadByUserWithAssignedTo(id).subscribe(
      data => {
          if(data.length > 0){
            for(var i in data){
              if(data[i].status == LEAD_STATUS.inprogress){
                  this.isNotDeleted = true;
                  break;
              }
              else{
                this.isNotDeleted = false;
              }
            }
          }
          else{
            this.isNotDeleted = false;
          }
      }
    )
    this.userService.getUser({_id:id}).subscribe(
      data => {
        this.staff = data;
        console.log('Staffnnnnnn',this.staff)
              });
    
            }
  onStaffUpdate(staffUpdateDetails:any){
    this.editstaffsubmitted = true;
    if (this.editUserForm.invalid) {
      return;
      }
    console.log(staffUpdateDetails)
    console.log("staffUpdateDetails")
    staffUpdateDetails.roles = this.checkedListedit;
    this.userService.editUser(staffUpdateDetails).subscribe(
      data => {
        console.log("data",data);
        document.getElementById('staffUpdateModalCloseBtn').click();
        this.toast.setMessage("staff updated successfully !!!", "success");
        this.getUsers();
        // this.users.push(data);
        console.log(this.users);

        // this.getForm();
      }
    )
  }
  onStaffDelete(staff){
  
    this.staffDeleteDetails._id = staff._id;
    this.staffDeleteDetails.deletedOn = new Date();
    this.userService.editUser(this.staffDeleteDetails).subscribe(
      data => {
        console.log("data",data);
        document.getElementById('staffDeleteModalCloseBtn').click();
        this.toast.setMessage("staff deleted successfully !!!", "success");
        this.getUsers();
        console.log(this.users);
      }
    )
  
  }
  clickToExport(){
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function(s) {
          return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
          })
        }
      var toExcel = document.getElementById("tblData").innerHTML;
      var ctx = {

        table: toExcel
      };
      var link = document.createElement("a");
      link.download = "All_Staffs.xls";
      link.href = uri + base64(format(template, ctx))
      link.click();
  }

  sortByName(){
    if(!this.isSortByName){
      this.isSortByName = true;
      this.users.sort(function(a, b){
        if(a.firstName+' '+a.lastName.toLowerCase() < b.firstName+' '+b.lastName.toLowerCase()) { return -1; }
        if(a.firstName+' '+a.lastName .toLowerCase() > b.firstName+' '+b.lastName.toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.users.reverse();
      this.isSortByName = false;
    }
  }
  sortByMobile(){
    if(!this.isSortByMobile){
      this.isSortByMobile = true;
      this.users.sort(function(a, b){
        if(a.mobile.toLowerCase() < b.firstName.toLowerCase()) { return -1; }
        if(a.mobile.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.users.reverse();
      this.isSortByMobile = false;
    }
  }
  sortByEmail(){
    if(!this.isSortByEmail){
      this.isSortByEmail = true;
      this.users.sort(function(a, b){
        if(a.email.toLowerCase() < b.email.toLowerCase()) { return -1; }
        if(a.email.toLowerCase() > b.email.toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.users.reverse();
      this.isSortByEmail = false;
    }
  }
  onCenterSave() {
    this.centersubmitted = true;
    if (this.addCenterForm.invalid) {
    return;
    }
    let center = this.c.center.value.toUpperCase();
      this.center = {center:center}

    this.centerService.addcenter(this.center)
      .subscribe(
          data => {
            // this.onUseradd.emit("success");
            // alert("succes");
            // this.users.push(data);
            document.getElementById('centerSaveModalCloseBtn').click();
            this.toast.setMessage("Centre created successfully !!!", "success");
            this.addCenterForm.reset();
          //   this.addCenterForm = this.formBuilder.group({
          //   center: ['', Validators.required],
            

          // });
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          },
          error => {
            this.toast.setMessage(error.error.message,"danger");
          
          }
        );
    }

}
