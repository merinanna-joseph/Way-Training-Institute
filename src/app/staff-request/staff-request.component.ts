import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LeadService } from '../services/lead.service';
import { Lead } from '../shared/models/lead.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { DatePipe } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { by } from 'protractor';
import { LeadAdminComponent } from '../lead-admin/lead-admin.component';
import { LeadassignmentService } from '../services/leadassignment.service';
import {Leadassignment} from '../shared/models/leadassignment.model';
import {LEAD_STATUS,LEAD_ASSIGNMENT_STATUS} from '../../app/globals';

@Component({
  selector: 'app-staff-request',
  templateUrl: './staff-request.component.html',
  styleUrls: ['./staff-request.component.css']
})
export class StaffRequestComponent implements OnInit {
  lead = new Lead();
  leadDetails1;
  leadassignment = new Leadassignment();
  staffDetails: User[];

  constructor(
    public route:Router,
    private leadService:LeadService,
    public toast: ToastComponent,
    public auth:AuthService,
    private userService:UserService,
    private leadassignmentService:LeadassignmentService,
   
  ) { }

  ngOnInit(): void {
    this.userService.getStaffs().subscribe(
      data=>{
           this.staffDetails = data;
          //  alert(this.staffDetails);
      }
    );
   this.getForm();
   
  }
  getForm(){
    this.leadDetails1 = [];
    this.leadassignmentService.getLeadassignmentsById().subscribe(
      data =>{
        for(var i in data){
          if(data[i].assignedTo == this.auth.currentUser._id && data[i].status == LEAD_ASSIGNMENT_STATUS.requested){
            this.leadDetails1.push(data[i]);
            this.leadDetails1.reverse();
          }
        }
       
        
      }
    );
  }
  acceptLeadRequest(leadDetails){
    // alert(JSON.stringify(leadDetails));
   
       this.leadassignmentService.getLeadassignment({_id:leadDetails._id}).subscribe(
         data=>{
          this.leadassignment = data;
          this.leadassignment.respondedon = new Date();
          
          this.leadassignment.status = LEAD_ASSIGNMENT_STATUS.accepted;
          this.leadassignmentService.editLeadassignment(this.leadassignment).subscribe(
            data=>{
              this.getForm();
            }
          ) 
          this.leadService.getLead({_id:leadDetails.leadId._id}).subscribe(
            data=>{
              this.lead = data;
              this.lead.status = LEAD_STATUS.inprogress;
              this.lead.assignedStatus = LEAD_ASSIGNMENT_STATUS.accepted;
              this.lead.assignedTo = this.leadassignment.assignedTo;
             
              this.leadService.editLead(this.lead).subscribe(
                data=>{
                  this.toast.setMessage("Accepted!","success");

                  // alert(JSON.stringify(data));
                }
              );
         }
       )
       
     }
   );
  }
  rejectLeadRequest(leadDetails){
        this.leadassignmentService.getLeadassignment({_id:leadDetails._id}).subscribe(
          data=>{
           this.leadassignment = data;
           this.leadassignment.respondedon = new Date();
           
           this.leadassignment.status = LEAD_ASSIGNMENT_STATUS.rejected;
           this.leadassignmentService.editLeadassignment(this.leadassignment).subscribe(
             data=>{
               
             }
           ) 
           this.leadService.getLead({_id:leadDetails.leadId._id}).subscribe(
            data=>{
              this.lead = data;
              this.lead.status = LEAD_STATUS.inprogress;
              this.lead.assignedStatus = LEAD_ASSIGNMENT_STATUS.rejected;
              this.lead.assignedTo = this.leadassignment.assignedBy;
              // alert(this.leadassignment.assignedBy)
              this.leadService.editLead(this.lead).subscribe(
                data=>{
                  this.getForm();
                  this.toast.setMessage("Rejected!","danger");

                  // alert("success");
                }
              );
         
          }
        )
      }
    );
 
  }
  onBackClick(){
    this.route.navigate(['staff-lead']);

  }
}
