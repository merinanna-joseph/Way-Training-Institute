import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { Feeflow } from '../shared/models/feeflow.model';
import { FeeflowService } from '../services/feeflow.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-feecollectionform',
  templateUrl: './feecollectionform.component.html',
  styleUrls: ['./feecollectionform.component.css']
})
export class FeecollectionformComponent implements OnInit {

  submitted:boolean = false;
  currentDate = new Date();
  student:Student = {};
  student_id;
  allMonths = [];
  allYears = [];
  feecollection : Feeflow = {};
  total_fees_per_year;
  total_fees_per_month;
  payment_mode: string[];
  Feetype:string[];
  feeType_value:string;
  coaching_fee_input:boolean = false;
  registration_fee_input:boolean = false;
  convocation_fee_input:boolean = false;
  exam_fee_input:boolean = false;
  attestation_fee_input:boolean = false;
  equalency_fee_input:boolean = false;
  others_fee_input:boolean = false;

  constructor(
              private formBuilder: FormBuilder,
              private aRoute:ActivatedRoute,
              public route: Router,
              public studentService: StudentService,
              public courseService:CourseService,
              public feeflowService:FeeflowService,
              public toast: ToastComponent,

              ) { }


  addCollectFeeForm: FormGroup = this.formBuilder.group({
    month: ['',Validators.required],
    date: ['',Validators.required],
    totAmount: [''],
    paidAmount: [''],
    fineAmount: [''],
    remarks: [''],
    payment_mode:[''],
  });
 
  ngOnInit(): void {
    this.payment_mode = ['Cash','Card','Wire Transfer','Others'];
    this.Feetype = ['Registration','Convocation','Exam','Attestation','Equalency','Others']
    this.allMonths = ['January','February','March','April','May','June','July','August','September',
                      'October','November','December'];
    // console.log(this.allMonths)
    this.aRoute.paramMap.subscribe((params:ParamMap) =>
    {
      
      this.student_id = params.get('id');
        console.log(this.student_id)
        this.studentService.getStudentByCourseandFees({_id:this.student_id}).subscribe(
          student => {
            this.student = student[0];
            console.log(this.student+ "        student")
            this.total_fees_per_year = this.student.studentFees[0].per_year_total_fee;
            this.total_fees_per_month = this.student.studentFees[0].per_year_total_fee / 10;
            let startYear = this.student.studentCourse[0].course_startYear;

            
          },
          error => {
  
          }
        );
      
      
      
    

    }
  );
  }
  get f() { return this.addCollectFeeForm.controls; }
  getFeetype(event){
    this.feeType_value = event.value;

    if(this.feeType_value == 'Registration'){
      this.registration_fee_input = true;
    }
    else if(this.feeType_value == 'Convocation'){
      this.convocation_fee_input = true;
    }
    else if(this.feeType_value == 'Exam'){
      this.exam_fee_input = true;
    }
    else if(this.feeType_value == 'Attestation'){
      this.attestation_fee_input = true;
    }
    else if(this.feeType_value == 'Equalency'){
      this.equalency_fee_input = true;
    }
    else if(this.feeType_value == 'Others'){
      this.others_fee_input = true;
    }
  }
  onYearChange(event){
    let changed_year = event.value;
    for(var i in this.student.studentFees){
      if(changed_year == this.student.studentFees[i].year){
        this.total_fees_per_year = this.student.studentFees[i].per_year_total_fee;
      }
    }
    
  }
  getPaymentMode(event){
        this.feecollection.paymentMode = this.f.payment_mode.value;

  }
  onFeeCollectSave(){
    // this.feecollection.month = this.f.month.value;
    // this.feecollection.feeStructure = [];
    this.feecollection.fee_per_year = [];

    this.feecollection.lastPaidDate = new Date();
    this.feecollection.remarks = this.f.remarks.value;
    this.feecollection.studentId = this.student_id;
    console.log(this.feecollection)
    this.feeflowService.addFeeflow(this.feecollection).subscribe(
      data =>{
        // alert("success")
        this.toast.setMessage("fee collected !!!", "success");

      }
    )

   
  }


  onCancelClick(){
    this.route.navigate(['fee-management/']);
  }
}
