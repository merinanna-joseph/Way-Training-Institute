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
import { LeadassignmentService } from '../services/leadassignment.service';
import { Leadassignment } from '../shared/models/leadassignment.model';
import {
  LEAD_STATUS,
  LEAD_ASSIGNMENT_STATUS,
  CALL_EVENT_STATUS,
} from '../../app/globals';
import { Callevent } from '../shared/models/callevent.model';
import { CalleventService } from '../services/callevent.service';
@Component({
  selector: 'app-lead-staff',
  templateUrl: './lead-staff.component.html',
  styleUrls: ['./lead-staff.component.css'],
})
export class LeadStaffComponent implements OnInit {
  lead: Lead = {};
  staffLead: Lead = {};
  staffleadDate;
  staffDetails: User[];
  submitted = false;
  calleventsubmitted = false;
  changeLeadStatus = false;
  leadForCallEvent: Lead = {};
  leadDetails1;
  leadassignment = new Leadassignment();
  callEvent: Callevent = {};
  staffDetails_noCurrentuser: User[] = [];
  currentUsername: string = '';
  lead_status = LEAD_STATUS;
  lead_assignment_status = LEAD_ASSIGNMENT_STATUS;
  requestDetails: any[] = [];
  leadChangeStatus: Lead = {};
  allLeads: Lead[];
  leadLength = 0;
  courses: string[];
  sources: string[];
  currentDate: number = Date.now();
  currentTime:string = '';
  selected:string='Select Event Type'
  isEventsStatus: boolean = false;
  isLeadStatus:boolean = false;
  selectcourse:string='select course';
  selectsourse:string='select sourse';
  isSort: boolean = false;
  isSortByCourse: boolean = false;
  isSortByCreatedon:boolean = false;
  isSortByStatus:boolean = false;
  isSortByAssignedStatus:boolean = false;
  assignedsubmitted=false;
  selectedCourse = 'ALL_COURSES';
  selectedPriorityStatus = 'ALL_PRIORITY';

  // currentTime:any;
  constructor(
    public route: Router,
    private leadService: LeadService,
    private aroute: ActivatedRoute,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public datepipe: DatePipe,
    private userService: UserService,
    private callEventService: CalleventService,
    private leadassignmentService: LeadassignmentService
  ) {}
  addLeadForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: [''],
    email: [''],
    mobile: ['', Validators.required],
    course: ['',Validators.required],
    dueDate: [''],
    status: [''],
    source: ['',Validators.required],
    remarks: ['', Validators.required],
  });

  addCallEventForm: FormGroup = this.formBuilder.group({
    subject: [''],
    type: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    remarks: ['', Validators.required],
  });
  addAssignForm: FormGroup = this.formBuilder.group({
    assignto: ['', Validators.required],

  });
  addStatusForm: FormGroup = this.formBuilder.group({
    remarks: ['', Validators.required],
  });
  selectedLead = 'INPROGRESS';
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
  ngOnInit(): void {
    this.lead.priorityStatus = 'hot';

    this.getFormatedTimeString();
    // alert(this.currentTime);
    this.courses = [
      '10th NIOS',
      '12th NIOS',
      'BBA',
      'B.com',
      'BA',
      'BSc',
      'BCA',
      'B.Ed',
      'MBA',
      'M.com',
      'MA',
      'MSc',
      'MCA',
      'PHD',
    ];
    this.sources = [
      'Online',
      'Phone',
      'Social Media',
      'Facebook',
      'Walk',
      'Reference',
      'School Reference',
      'Other',
    ];
    this.currentUsername =
      this.auth.currentUser.firstName + ' ' + this.auth.currentUser.lastName;
    this.userService.getStaffs().subscribe((data) => {
      for (var i in data) {
        if (data[i]._id != this.auth.currentUser._id &&!data[i].deletedOn) {
          this.staffDetails_noCurrentuser.push(data[i]);
        }
      }
      this.staffDetails = data;
      console.log('staff details', this.staffDetails);
    });
    this.getForm();
    // this.addLeadForm = this.formBuilder.group({
    //   firstname: ['', Validators.required],
    //   lastname: ['',Validators.required],
    //   email: ['', ],
    //   mobile: ['',[Validators.required]],
    //   course: [''],
    //   dueDate: [''],
    //   status: [''],
    //   source:['',Validators.required],
    //   remarks:['',Validators.required]
    // });

    this.leadassignmentService.getLeadassignmentsById().subscribe((data) => {
      for (var i in data) {
        if (
          data[i].assignedTo == this.auth.currentUser._id &&
          data[i].status == LEAD_ASSIGNMENT_STATUS.requested
        ) {
          this.requestDetails.push(data[i]);
        }
      }
    });
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  getForm() {
    this.leadDetails1 = [];
    this.leadService
      .getLeadsByAssgnedId(this.auth.currentUser._id)
      .subscribe((data) => {
        if (data.length > 0) {
          this.allLeads = data;
          for (var i in data) {
            if (data[i].status == LEAD_STATUS.inprogress) {
              this.leadDetails1.push(data[i]);
              this.leadDetails1.reverse();
              this.leadLength = this.leadDetails1.length;
            }
          }
        } else {
          this.leadLength = 0;
        }
        console.log(this.leadDetails1, 'mmmm');
      });
  }
  getLeads(event) {
    this.selectedLead = event.target.value;
    this.selectedCourse = 'ALL_COURSES';
    this.selectedPriorityStatus = 'ALL_PRIORITY';
    if (this.selectedLead == LEAD_STATUS.inprogress) {
      this.leadDetails1 = this.allLeads.filter(
        (x) => x.status == LEAD_STATUS.inprogress
      );
    } else if (this.selectedLead == LEAD_STATUS.converted) {
      this.leadDetails1 = this.allLeads.filter(
        (x) => x.status == LEAD_STATUS.converted
      );
    } else if (this.selectedLead == LEAD_STATUS.closed) {
      this.leadDetails1 = this.allLeads.filter(
        (x) => x.status == LEAD_STATUS.closed
      );
    } else {
      this.leadDetails1 = this.allLeads;
    }
    if (this.leadDetails1.length > 0) {
      this.leadLength = this.leadDetails1.length;
    } else {
      this.leadLength = 0;
    }
  }
  sortCourse(event){
    this.selectedCourse = event.target.value;
    if(this.selectedLead != 'ALL' && this.selectedPriorityStatus != 'ALL_PRIORITY' &&
    this.selectedCourse != 'ALL_COURSES'){
      this.leadDetails1 = this.allLeads.filter(x => x.status == this.selectedLead &&
        x.courseId == this.selectedCourse && x.priorityStatus == this.selectedPriorityStatus);
    }
    else if(this.selectedLead != 'ALL' &&  this.selectedCourse != 'ALL_COURSES'){
      this.leadDetails1 = this.allLeads.filter(x => x.status == this.selectedLead &&
        x.courseId == this.selectedCourse);
    }
    else if(this.selectedPriorityStatus != 'ALL_PRIORITY' &&  this.selectedCourse != 'ALL_COURSES'){
      this.leadDetails1 = this.allLeads.filter(x => x.priorityStatus == this.selectedPriorityStatus &&
        x.courseId == this.selectedCourse);
    }

    else if(this.selectedCourse == 'ALL_COURSES' &&
    this.selectedPriorityStatus != 'ALL_PRIORITY' &&
    this.selectedLead != 'ALL'){
      this.leadDetails1 = this.allLeads.filter(x => 
        x.priorityStatus == this.selectedPriorityStatus &&
        x.status == this.selectedLead)
    }
else if(this.selectedCourse == 'ALL_COURSES' &&
      this.selectedLead != 'ALL'){
      this.leadDetails1 = this.allLeads.filter(x => 
        x.status == this.selectedLead)
    }
else if(this.selectedCourse == 'ALL_COURSES' &&
    this.selectedPriorityStatus != 'ALL_PRIORITY'){
      this.leadDetails1 = this.allLeads.filter(x => 
        x.priorityStatus == this.selectedPriorityStatus)
    }
   else{
    this.leadDetails1 = this.allLeads.filter(x => x.courseId == event.target.value);
   }
   this.leadLength = this.leadDetails1.length;
  }
  getPriority(event){
    this.selectedPriorityStatus = event.target.value;
    if( this.selectedLead != 'ALL' && this.selectedCourse != 'ALL_COURSES' 
    && this.selectedPriorityStatus != 'ALL_PRIORITY'){
      this.leadDetails1 = this.allLeads.filter(x => x.courseId == this.selectedCourse &&
        x.status == this.selectedLead 
        && x.priorityStatus == this.selectedPriorityStatus);
    }
    else if(this.selectedCourse != 'ALL' && this.selectedPriorityStatus != 'ALL_PRIORITY'){
      this.leadDetails1 = this.allLeads.filter(x => 
        x.status == this.selectedLead && x.priorityStatus == this.selectedPriorityStatus);
    }
    else if(this.selectedCourse != 'ALL_COURSES' && this.selectedPriorityStatus != 'ALL_PRIORITY'){
      this.leadDetails1 = this.allLeads.filter(x =>
        x.courseId == this.selectedCourse && x.priorityStatus == this.selectedPriorityStatus);
    }
    else if(this.selectedPriorityStatus == 'ALL_PRIORITY' &&
            this.selectedLead != 'ALL' &&
            this.selectedCourse != 'ALL_COURSES'){
              this.leadDetails1 = this.allLeads.filter(x => 
                x.status == this.selectedLead &&
                x.courseId == this.selectedCourse)
            }
   else if(this.selectedPriorityStatus == 'ALL_PRIORITY' &&
            this.selectedLead != 'ALL'){
              this.leadDetails1 = this.allLeads.filter(x => 
                x.status == this.selectedLead)
            }
   else if(this.selectedPriorityStatus == 'ALL_PRIORITY' &&
            this.selectedCourse != 'ALL_COURSES'){
              this.leadDetails1 = this.allLeads.filter(x => 
                x.courseId == this.selectedCourse)
            }
   else{
    this.leadDetails1 = this.allLeads.filter(x => x.priorityStatus == this.selectedPriorityStatus);
   }
   this.leadLength = this.leadDetails1.length;
  }
  getCourse(event) {
    this.lead.courseId = event.value;
  }
  getSource(event) {
    this.lead.source = event.value;
  }
  onCallEventClick(lead: Lead) {
    this.leadForCallEvent = lead;
    this.callEvent = {
      leadId: lead._id,
      userId: this.auth.currentUser._id,
      status: CALL_EVENT_STATUS.open,
    };
  }

  onStatusChange(event) {
    this.lead.status = event.value;

    //  alert(event.value); // It will display the select city data
  }
  onViewClick(lead: Lead) {
    this.route.navigate(['staff-single-lead/' + lead._id]);
  }
  onAssigntoChange(event) {
    this.lead.assignedTo = event.value;
    if (this.lead.assignedTo == this.auth.currentUser._id) {
      this.lead.assignedStatus = LEAD_ASSIGNMENT_STATUS.accepted;
    } else {
      this.lead.assignedStatus = LEAD_ASSIGNMENT_STATUS.requested;
    }

    //  alert(event.value); // It will display the select city data
  }
  get f() {
    return this.addLeadForm.controls;
  }
  get cf() {
    return this.addCallEventForm.controls;
  }
  get af() {
    return this.addAssignForm.controls;
  }

  get changeStatus() {
    return this.addStatusForm.controls;
  }
  editLeadStaff(id: any) {
    this.leadService.getLead({ _id: id }).subscribe((data) => {
      this.staffLead = data;
    });
  }
  onLeadUpdate(leadUpdateDetails: any) {
    this.leadService.editLead(leadUpdateDetails).subscribe((data) => {
      this.getForm();
    });
  }
   getEvent(event) {
    this.callEvent.type = event.value;
    // this.lead.eventId = event.value;
  }

  onCallEventSave(leadDetails: any) {
    this.calleventsubmitted = true;
    //alert(this.cf.subject.value+" | "+this.cf.date.value+" | "+this.cf.time.value+" | "+this.cf.remarks.value);
    if (this.addCallEventForm.invalid) {
      return;
    }
    //alert(this.cf.date.value+" "+this.cf.time.value);
    this.callEvent.subject = this.cf.subject.value;
    // this.callEvent.type=this.callEvent.type;
    this.callEvent.date = new Date(
      this.cf.date.value + ' ' + this.cf.time.value
    );
    this.callEvent.remarks = this.cf.remarks.value;
    this.callEvent.time = this.cf.time.value;
    this.callEventService.addCallevent(this.callEvent).subscribe((data) => {
      document.getElementById('callEventSaveModalCloseBtn').click();
      this.toast.setMessage('Event Added Successfully', 'success');

      // this.addCallEventForm= this.formBuilder.group({
     //   type: ['',],
      //   date: ['', ],
      //   time: ['',],
      //   remarks: ['', ],
      // });

    });
  }

  onLeadSave(leadDetails: any) {
    this.submitted = true;
    if (this.addLeadForm.invalid) {
      return;
    }
    this.lead.status = LEAD_STATUS.inprogress;
    this.lead.firstName = this.f.firstname.value;
    this.lead.lastName = this.f.lastname.value;
    this.lead.email = this.f.email.value;
    this.lead.mobile = this.f.mobile.value;
    this.lead.createdOn = new Date();
    this.lead.createdBy = this.auth.currentUser._id;
    this.lead.assignedStatus = LEAD_ASSIGNMENT_STATUS.accepted;
    this.lead.assignedBy = this.auth.currentUser._id;
    this.lead.assignedTo = this.auth.currentUser._id;
    this.lead.remarks = this.f.remarks.value;
    console.log(this.lead, 'LEAD');
    this.leadService
      .addLead(this.lead)

      .subscribe(
        (data) => {
          // this.onleadadd.emit("success");
          this.leadassignment.leadId = data._id;
          this.leadassignment.assignedBy = data.assignedBy;
          this.leadassignment.assignedTo = data.assignedTo;
          this.leadassignment.assignedOn = data.createdOn;
          this.leadassignment.status = data.assignedStatus;

          this.leadassignmentService
            .addLeadassignment(this.leadassignment)
            .subscribe((data) => {
              // alert("success");
            });
          document.getElementById('leadSaveModalCloseBtn').click();

          this.toast.setMessage('Lead created successfully !!!', 'success');
          this.getForm();
          this.addLeadForm = this.formBuilder.group({
            firstname: [''],
            lastname: [''],
            email: [''],
            mobile: [''],
            course: [''],
            dueDate: [''],
            status: [''],
            source: [''],
            remarks: [''],
          });
          // alert("Lead sucessfully created")
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
        (error) => {
          // alert("Lead not created")
          document.getElementById('leadUpdateModalCloseBtn').click();

          this.toast.setMessage('Lead creation failed !', 'danger');
          console.log(error);
        }
      );
  }
  onleadStatusClick(lead) {
    this.isLeadStatus = false;
  //  alert(this.isLeadStatus)
    console.log(lead, 'Current Data');
    this.leadChangeStatus = lead;
    this.callEventService.getCalleventsByUserAndLead(this.auth.currentUser._id,lead._id).subscribe(
      data => {
          console.log(data,'Getallevents')
          for(var i in data){
            if(data[i].status == CALL_EVENT_STATUS.open){
                this.isLeadStatus = true;
                // alert(this.isLeadStatus)

                break;
            }
          }
      }
    )

    // alert(JSON.stringify(this.lead.status));
  }
  getleadStatusChange(event) {
    this.leadChangeStatus.status = event.value;
  }
  OnremarkChange(event) {
    this.leadChangeStatus.remarks = event.value;
  }
  OnStatusStaffChange() {
    this.changeLeadStatus = true;
    if (this.addStatusForm.invalid) {
      return;
    }
    this.leadChangeStatus.closedOn = new Date();
    this.leadService.editLead(this.leadChangeStatus).subscribe((data) => {
      this.getForm();
      document.getElementById('leadStatusModalCloseBtn').click();
      this.toast.setMessage('Status changed!', 'success');
      this.addStatusForm = this.formBuilder.group({
        remarks: [''],
      });
    });
  }
  onAssigntoStaffClick(lead) {
    this.isEventsStatus = false;

    this.lead = lead;
    this.leadassignment.leadId = lead._id;
    this.callEventService.getCalleventsByUserAndLead(this.auth.currentUser._id,this.lead._id).subscribe(
      data => {
          console.log(data,'Getallevents')
          for(var i in data){
            if(data[i].status == CALL_EVENT_STATUS.open){
                this.isEventsStatus = true;
                break;
            }
          }
      }
    )
  }
  getAssigntoStaffChange(event) {
    this.leadassignment.assignedTo = event.value;
  }
  onAssigntoStaffChange() {
    this.assignedsubmitted = true;
    if (this.addAssignForm.invalid) {
      return;
    }

    this.leadassignment.assignedBy = this.auth.currentUser._id;
    this.leadassignment.assignedOn = new Date();
    this.leadassignment.status = LEAD_ASSIGNMENT_STATUS.requested;
    this.leadService
      .editLead({
        _id: this.lead._id,
        assignedStatus: LEAD_ASSIGNMENT_STATUS.requested,
      })
      .subscribe((data) => {
        this.getForm();
      });
    this.leadassignmentService
      .addLeadassignment(this.leadassignment)
      .subscribe((data) => {
        document.getElementById('leadAssigntoStaffModalCloseBtn').click();
        this.toast.setMessage('Request Sent!', 'success');
      });
  }
  getPriorityStatus(event){
    this.lead.priorityStatus = event.target.value;
  }
  onViewRequest() {
    this.route.navigate(['view_request']);
  }

  clickToExport() {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };
    var toExcel = document.getElementById('tblData').innerHTML;
    var ctx = {
      table: toExcel,
    };
    var link = document.createElement('a');
    link.download = this.selectedLead + '.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
  }


  sortByName(){
    if(!this.isSort){
      this.isSort = true;
      this.leadDetails1.sort(function(a, b){
        if((a.firstName + a.lastName).toLowerCase() < (b.firstName + b.lastName).toLowerCase()) { return -1; }
        if((a.firstName + a.lastName).toLowerCase() > (b.firstName + b.lastName).toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.leadDetails1.reverse();
      this.isSort = false;
    }
  }
  sortByCourse(){
    if(!this.isSortByCourse){
      this.isSortByCourse = true;
      this.leadDetails1.sort(function(a, b){
        if(a.courseId.toLowerCase() < b.courseId.toLowerCase()) { return -1; }
        if(a.courseId.toLowerCase() > b.courseId.toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.leadDetails1.reverse();
      this.isSortByCourse = false;
    }
  }
  sortByCreatedon(){
    if(!this.isSortByCreatedon){
      this.isSortByCreatedon = true;
      this.leadDetails1.sort(function(a, b){
        if(a.createdOn.toLowerCase() < b.createdOn.toLowerCase()) { return -1; }
        if(a.createdOn.toLowerCase() > b.createdOn.toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.leadDetails1.reverse();
      this.isSortByCreatedon = false;
    }
  }
  sortByStatus(){
    if(!this.isSortByStatus){
      this.isSortByStatus = true;
      this.leadDetails1.sort(function(a, b){
        if(a.status.toLowerCase() < b.status.toLowerCase()) { return -1; }
        if(a.status.toLowerCase() > b.status.toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.leadDetails1.reverse();
      this.isSortByStatus = false;
    }
  }
  sortByAssignedStatus(){
    if(!this.isSortByAssignedStatus){
      this.isSortByAssignedStatus = true;
      this.leadDetails1.sort(function(a, b){
        if(a.assignedStatus.toLowerCase() < b.assignedStatus.toLowerCase()) { return -1; }
        if(a.assignedStatus.toLowerCase() > b.assignedStatus.toLowerCase()) { return 1; }
        return 0;
     })
    }
    else{
      this.leadDetails1.reverse();
      this.isSortByAssignedStatus = false;
    }
  }
}
