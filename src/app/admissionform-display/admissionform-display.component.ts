import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fee } from '../shared/models/fee.model';
import { FeeService } from '../services/fee.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CourseService } from '../services/course.service';
import { type } from 'node:os';
import { Course } from '../shared/models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../shared/models/student.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admissionform-display',
  templateUrl: './admissionform-display.component.html',
  styleUrls: ['./admissionform-display.component.css']
})
export class AdmissionformDisplayComponent implements OnInit {
  student:Student={};
  course:Course={};
  showTable:boolean=true;
  students;
  
  isfeeSubmitted=false;
    constructor(
    private formBuilder: FormBuilder,
     private feeService: FeeService,
     private courseService:CourseService,
     public toast: ToastComponent,
     public route: Router,
     private studentService : StudentService,
     public auth:AuthService,) { }
  feeForm: FormGroup = this.formBuilder.group({
    courseId:['',Validators.required ],
    registration_fee: ['',],
    coaching_fee: ['',],
    exam_fee: [''],
    convocation_fee: ['',],
    attestation_fee: ['',],
    equalency_fee: ['',],
    total_fee:['', ]
  });

  ngOnInit(): void {
  this.getAllSubmittedStudents();
  }
  onViewClick(student: Student) {
    this.route.navigate(['admissionform-singleview/' + student._id]);
  }
  createAdmissionform(){
    this.route.navigate(['admission-form'])
  }
 
  

 getAllSubmittedStudents()
  {
    this.studentService.getStudents().subscribe(
      data => {
        this.students=data;
        console.log(data)
      });
  }
 

 

 

}
