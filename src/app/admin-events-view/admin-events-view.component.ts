import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Callevent } from '../shared/models/callevent.model';
import { CalleventService } from '../services/callevent.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import {CALL_EVENT_STATUS} from '../../app/globals';
@Component({
  selector: 'app-admin-events-view',
  templateUrl: './admin-events-view.component.html',
  styleUrls: ['./admin-events-view.component.css']
})
export class AdminEventsViewComponent implements OnInit {

  callEvents:Callevent = {};
  submitted = false;
  eventStatus = CALL_EVENT_STATUS;
  changeLeadStatus = false;
    constructor(public auth:AuthService,
      public callEventService:CalleventService,
      public toast: ToastComponent,
      private formBuilder: FormBuilder,
      private aRoute:ActivatedRoute,
      private route:Router
  
      ) { }
    addStatusForm:FormGroup = this.formBuilder.group({
      remarks: ['',Validators.required],
    });
    get changeStatus(){return this.addStatusForm.controls}
 

  ngOnInit(): void {
    this.getData();

  }
  getData(){
    this.aRoute.paramMap.subscribe((params:ParamMap) =>
    {
      let id = params.get('id');
     
      this.callEventService.getCalleventByUserId({_id:id}).subscribe(
        callEvents => {
          this.callEvents = callEvents[0];
          console.log(this.callEvents)
        },
        error => {

        }
      );
    }
    );
  }
  onClickLead(callEvent:Callevent){
    this.route.navigate(['admin-single-lead/'+callEvent.leadId._id])
  }
  
  getEventStatusChange(event){
    this.callEvents.status = event.value;
    console.log(this.callEvents)
    this.callEventService.editCallevent(this.callEvents).subscribe(
      data=>{
        this.getData();
        this.toast.setMessage("Status changed!","success");
        this.addStatusForm = this.formBuilder.group({
         remarks: [''],
       });
      }
    )
  }
  // OnremarkChange(event){
  //   this.callEvents.remarks = event.value;
  // }
  OnStatusStaffChange(){
    this.changeLeadStatus=true;
    if(this.addStatusForm.invalid){
      return;
    }
    
     this.callEventService.editCallevent(this.callEvents).subscribe(
       data=>{
         this.getData();
         document.getElementById('eventStatusModalCloseBtn').click()
         this.toast.setMessage("Status changed!","success");
         this.addStatusForm = this.formBuilder.group({
          remarks: [''],
        });
       }
     )
  }
}
