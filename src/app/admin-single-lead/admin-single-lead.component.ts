import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { CALL_EVENT_STATUS, LEAD_ASSIGNMENT_STATUS, LEAD_STATUS } from '../globals';
import { AuthService } from '../services/auth.service';
import { CalleventService } from '../services/callevent.service';
import { LeadService } from '../services/lead.service';
import { LeadassignmentService } from '../services/leadassignment.service';
import { UserService } from '../services/user.service';
import { Callevent } from '../shared/models/callevent.model';
import { Lead } from '../shared/models/lead.model';
import { Leadassignment } from '../shared/models/leadassignment.model';
import { User } from '../shared/models/user.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { AlertsComponent } from '../shared/alerts/alerts.component';

@Component({
  selector: 'app-admin-single-lead',
  templateUrl: './admin-single-lead.component.html',
  styleUrls: ['./admin-single-lead.component.css']
})
export class AdminSingleLeadComponent implements OnInit {
  lead:Lead = {};
  loading:boolean = true;
  callEvents:Callevent[] = [];
  leadForCallEvent:Lead = {};
  callEvent:Callevent = {};
  calleventsubmitted=false;
  lead_status = LEAD_STATUS;
  lead_assignment_status = LEAD_ASSIGNMENT_STATUS;
  call_event_status = CALL_EVENT_STATUS;
  staffDetails: User[];
  staffDetails_noCurrentuser: User[] = [];
  leadChangeStatus: Lead = {};
  leadChangePriorityStatus: Lead = {};
  leadassignment = new Leadassignment();
  changeLeadStatus = false;
  changeLeadPriorityStatus = false;
  currentDate: number = Date.now();
  currentTime:any = '';
  show:boolean = false;
  leadremark_length;
  isEventsStatus: boolean = false;

  openEvent: Callevent;
  isOpenEvent : boolean = false;
selected:string='Select Event Type';
  constructor(
    public route:Router,
    public datepipe: DatePipe,
    private userService: UserService,
    private aRoute:ActivatedRoute,
    private leadService : LeadService,
    private callEventService : CalleventService,
    private formBuilder: FormBuilder,
    public auth:AuthService,
    public alerts:AlertsComponent,
    public toast: ToastComponent,
    private leadassignmentService: LeadassignmentService



  ) { }


  addCallEventForm: FormGroup = this.formBuilder.group({
    subject: ['',],
    type:['', Validators.required ],
    date: ['', Validators.required],
    time: ['',Validators.required],
    remarks: ['',Validators.required],
  });
  addStatusForm: FormGroup = this.formBuilder.group({
    remarks: ['', Validators.required],
  });
  addPriorityStatusForm: FormGroup = this.formBuilder.group({
    remarks: ['', Validators.required],
  });
 

  getFormatedTimeString(){
    let hours = '' + new Date().getHours();
    let minutes = '' + new Date().getMinutes();
    if(hours.length < 2){
      hours = '0' + hours;
    }
    if(minutes.length < 2){
      minutes = '0' + minutes;
    }
    this.currentTime =  hours + ':' + minutes;
  }
  ngOnInit() {

   this.getForm();
   this.getFormatedTimeString();

   this.getOpenEvent();

  }
  getForm(){
    this.aRoute.paramMap.subscribe((params:ParamMap) =>
    {
      this.getFormatedTimeString();

      let id = params.get('id');
      this.leadService.getLeadById(id).subscribe(
        lead => {
          this.lead = lead[0];
          this.loading = false;
          this.leadremark_length =this.lead.remarks.length;
          
        },
        error => {

        }
      );
      this.callEventService.getCalleventsByLead(id).subscribe(
        callEvents => {
          this.callEvents = callEvents;
          this.callEvents.sort(function(a, b){
            if(a.status.toLowerCase() < b.status.toLowerCase()) { return -1; }
           
            return 0;
         })
          this.callEvents.reverse();

          // this.callEvents.sort((a, b) => {
          //   return <any>new Date(a.date) - <any>new Date(b.date);
          // });
        },
        error => {

        }
      );

    }
  );
  this.userService.getStaffs().subscribe((data) => {
    for (var i in data) {
      if (data[i]._id != this.auth.currentUser._id) {
        this.staffDetails_noCurrentuser.push(data[i]);
      }
    }
    this.staffDetails = data;
  });
  }
  getOpenEvent(){
    this.aRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.callEventService.getCalleventsByLead(id).subscribe(
        (callEvents) => {
          this.callEvents = callEvents;
         
          this.callEvents.sort(function(a, b){
            if(a.status.toLowerCase() < b.status.toLowerCase()) { return -1; }
           
            return 0;
         })
          this.callEvents.reverse();
          for(var i in this.callEvents){
            if(this.callEvents[i].status == CALL_EVENT_STATUS.open){
              this.openEvent = this.callEvents[i];
              this.isOpenEvent = true;
              if(this.isOpenEvent){
                // alert(this.isOpenEvent)
                this.alerts.setMessage('Send Message', 'contact_alert','lead-admin',this.openEvent);
              }
              break;
            }
          }
  
        },
        (error) => {}
      );
    });
   
  
  }
  get cf() { return this.addCallEventForm.controls}
  get changeStatus() {
    return this.addStatusForm.controls;
  }
  get changePriorityStatus() {
    return this.addPriorityStatusForm.controls;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
 getEvent(event){
   this.callEvent.type = event.value;
 }
  onViewClick(callevent:Callevent){
  //alert(callevent._id)
this.route.navigate(['view_events/'+callevent._id])
}
  onCallEventClick(lead:Lead){
    this.leadForCallEvent = lead;
    this.callEvent = {leadId:lead._id,userId:this.auth.currentUser._id,status:CALL_EVENT_STATUS.open};
  }

  onCallEventSave(leadDetails:any) {

    this.calleventsubmitted=true;
    //alert(this.cf.subject.value+" | "+this.cf.date.value+" | "+this.cf.time.value+" | "+this.cf.remarks.value);
    if(this.addCallEventForm.invalid){
      return;
    }
    //alert(this.cf.date.value+" "+this.cf.time.value);
    this.callEvent.subject = this.cf.subject.value;
    // this.callEvent.type=this.callEvent.type;
    this.callEvent.date = new Date(this.cf.date.value+" "+this.cf.time.value);
    this.callEvent.remarks = this.cf.remarks.value;
    this.callEvent.time = this.cf.time.value;
    this.callEventService.addCallevent(this.callEvent).subscribe(
      data => {
        this.getForm();
        // this.callEvents.push(data);
        document.getElementById('callEventSaveModalCloseBtn').click();
        this.toast.setMessage("Event Added Successfully","success");
      }
    );
  }
 OneventremarkChange(event){
    this.callEvent.remarks = this.callEvent.remarks.concat('-'+' '+ 'Closing remark'+':' +' '+ event.value);
  }
  getEventStatusChange(event,callevent){
    this.callEvent._id = callevent._id;
    this.callEvent.status = event.value;
    this.callEventService.getCallevent({_id:callevent._id}).subscribe(
      data=>{
        this.callEvent.remarks = data.remarks;
      }
    )
    // alert(this.callEvent)

    // this.callEventService.editCallevent(this.callEvent).subscribe(
    //   data=>{
    //     this.ngOnInit();
       
    //   }
    // )
  }
  OneventStatusStaffChange(){
    this.changeLeadStatus=true;
    if(this.addStatusForm.invalid){
      return;
    }
     this.callEventService.editCallevent(this.callEvent).subscribe(
      data=>{
        this.getForm();
        document.getElementById('eventStatusStaffModalCloseBtn').click()
        this.toast.setMessage("Status changed!","success");
        this.addStatusForm = this.formBuilder.group({
         remarks: [''],
       });
      }
    )
    }
  onleadStatusClick(lead) {
    this.isEventsStatus = false;
    this.leadChangeStatus = lead;
    this.callEventService.getCalleventsByUserAndLead(this.auth.currentUser._id,this.lead._id).subscribe(
      data => {
          for(var i in data){
            if(data[i].status == CALL_EVENT_STATUS.open){
                this.isEventsStatus = true;
                break;
            }
          }
      }
    )
  
    // alert(JSON.stringify(this.lead.status));
  }
  onleadPriorityStatusClick(lead) {
    this.isEventsStatus = false;
    this.leadChangePriorityStatus = lead;
    
  }
  getleadStatusChange(event,lead) {
    this.leadChangeStatus._id = lead._id;
    this.leadChangeStatus.status = event.value;
    this.leadChangeStatus.closedOn = new Date();
  }
  OnremarkChange(event) {
    this.leadChangeStatus.remarks = event.value;
  }
  OnStatusStaffChange() {
    this.changeLeadStatus = true;
    if (this.addStatusForm.invalid) {
      return;
    }
   
    if(this.leadChangeStatus.status == LEAD_STATUS.converted){
      // alert("inside if");
      this.leadService.editLead(this.leadChangeStatus).subscribe((data) => {
        // this.getForm();
        document.getElementById('leadStatusModalCloseBtn').click();
        
        // alert("after success" + this.leadChangeStatus._id);
        this.toast.setMessage('Status changed!', 'success');
        this.route.navigate(['admission-form/'+this.leadChangeStatus._id])
        
        this.addStatusForm = this.formBuilder.group({
          remarks: [''],
        });
      });

    }else{
      this.leadService.editLead(this.leadChangeStatus).subscribe((data) => {
        this.getForm();
        document.getElementById('leadStatusModalCloseBtn').click();
        this.toast.setMessage('Status changed!', 'success');
        this.addStatusForm = this.formBuilder.group({
          remarks: [''],
        });
      });
    }

  
  }
  onAssigntoStaffClick(lead) {
    this.lead = lead;
    this.leadassignment.leadId = lead._id;
  }
  getAssigntoStaffChange(event) {
    this.leadassignment.assignedTo = event.value;
  }
  onAssigntoStaffChange() {
    this.leadassignment.assignedBy = this.auth.currentUser._id;
    this.leadassignment.assignedOn = new Date();
    this.leadassignment.status = LEAD_ASSIGNMENT_STATUS.requested;
    this.leadService
      .editLead({
        _id: this.lead._id,
        assignedStatus: LEAD_ASSIGNMENT_STATUS.requested,
      })
      .subscribe((data) => {
        // this.getForm();
      });
    this.leadassignmentService
      .addLeadassignment(this.leadassignment)
      .subscribe((data) => {
        document.getElementById('leadAssigntoStaffModalCloseBtn').click();
        this.toast.setMessage('Request Sent!', 'success');
      });
  }
  onLeadClick(){
    this.route.navigate(['lead-admin']);

  }
  closeEventStatus(){
    this.getForm();
  }
  getPriorityStatus(event:any){
    this.leadChangePriorityStatus._id = this.leadChangePriorityStatus._id;
    this.leadChangePriorityStatus.priorityStatus = event.target.value;
  }

  OnremarkChangePriorityStatus(event) {
    this.leadChangePriorityStatus.remarks = event.value;
  }
  OnPriorityStatusStaffChange() {
    this.changeLeadPriorityStatus = true;
    if (this.addPriorityStatusForm.invalid) {
      return;
    }
  
    this.leadService.editLead(this.leadChangePriorityStatus).subscribe((data) => {
      this.getForm();
      document.getElementById('leadPriorityStatusModalCloseBtn').click();
      this.toast.setMessage('Status changed!', 'success');
      this.addPriorityStatusForm = this.formBuilder.group({
        remarks: [''],
      });
    });
  }
}
