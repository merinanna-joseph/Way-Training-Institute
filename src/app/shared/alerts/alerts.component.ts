import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Callevent } from '../models/callevent.model';
import { CalleventService } from '../../services/callevent.service';
import { ToastComponent } from '../toast/toast.component';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import {
  LEAD_STATUS,
  LEAD_ASSIGNMENT_STATUS,
  CALL_EVENT_STATUS,
} from '../../globals';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  modalvalue:boolean ;
  @Input() message = { body: '', type: '',show:false,navigateUrl:'',eventId:'',eventtype:'',eventRemark:'',eventDate:'',eventusername:'',eventStatus:''};
  @Input() hidetoast: Function;
  subject;
  call_event_status = CALL_EVENT_STATUS;
checked=false;
  // callEvents:Callevent = {};
  callEvent: Callevent = {};
  changeEventStatus = false;
  latestEventsubmitted=false;
  call_event_status_checked:boolean = false;
  constructor(
    private router: Router,
    public toast:ToastComponent,
    public callEventService:CalleventService,
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute,



    ){}
    addStatusForm: FormGroup = this.formBuilder.group({
      status: ['', Validators.required],
      remarks: ['', Validators.required],
    });
  ngOnInit(): void {
  }
  setMessage(body, type, navigateTo:string="", events) {
    this.message.body = body;
    this.message.type = type;
    this.message.show = true;
    this.message.navigateUrl = navigateTo;
    this.message.eventId = events._id;
    this.message.eventtype = events.type;
    this.message.eventDate = events.date;
    this.message.eventusername = events.userId.firstName + ' ' + events.userId.lastName;
    this.message.eventStatus = events.status;

    // this.callEventService.getCallevent({_id:id}).subscribe(
    //   data=>{
    //     this.callEvents = data;
    //     console.log(JSON.stringify(this.callEvents)+ "kkkkkkk")
    //   }
    // )
  }
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.aRoute });
  }


  hideToast(){
    this.message.show = false;
    // if(this.message.navigateUrl.length>0){
      // this.router.navigate([this.message.navigateUrl]);
    // }

  }

 getEventStatusChange(event, calleventId) {
  // alert(event.value)
    this.callEvent._id = calleventId;
    this.callEvent.status = event.value;
    this.call_event_status_checked = true;

    // alert(this.callEvent.status);
    this.callEventService
      .getCallevent({ _id: calleventId })
      .subscribe((data) => {
        this.callEvent.remarks = data.remarks;
      });
    // alert(this.callEvent)

    // this.callEventService.editCallevent(this.callEvent).subscribe(
    //   data=>{
    //     this.ngOnInit();

    //   }
    // )
  }
  get cf() {
    return this.addStatusForm.controls;
  }

  OneventremarkChange(event) {
    this.callEvent.remarks = this.callEvent.remarks.concat(
      '-' + ' ' + 'Closing remark' + ':' + ' ' + event.value
    );
  }
  OneventStatusStaffChange() {
    this.latestEventsubmitted=true;

    // this.changeEventStatus = true;
    if (this.addStatusForm.invalid) {
      return;
    }
    this.callEventService.editCallevent(this.callEvent).subscribe((data) => {
      // this.getForm();
      // document.getElementById('eventStatusStaffModalCloseBtn').click();
      this.toast.setMessage('Status changed!', 'success');
      // this.router.navigate(['staff-lead']);
      this.reload();

      this.hideToast();

      this.addStatusForm = this.formBuilder.group({
        status: [''],
        remarks: [''],
      });
    });
  }
}
