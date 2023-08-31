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
import { FeeflowService } from '../services/feeflow.service';
import { CollectionflowService } from '../services/collectionflow.service';
import { InvoiceService } from '../services/invoice.service';
@Component({
  selector: 'app-closed-admission-display',
  templateUrl: './closed-admission-display.component.html',
  styleUrls: ['./closed-admission-display.component.css']
})
export class ClosedAdmissionDisplayComponent implements OnInit {
  student:Student={};
  course:Course={};
  showTable:boolean=true;
  students = [];
  delete_student_id;

  isfeeSubmitted=false;
    constructor(
    private formBuilder: FormBuilder,
     private feeService: FeeService,
     private courseService:CourseService,
     public toast: ToastComponent,
     public route: Router,
     private studentService : StudentService,
     public auth:AuthService,
     public feeflowService: FeeflowService,
    public collectionFlowService: CollectionflowService,
    public invoiceService: InvoiceService ,
    private aroute: ActivatedRoute,
    ) { }
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
    this.studentService.getClosedStudentsWithALLDetails().subscribe(
      data => {
        for(var i in data){
            this.students.push(data[i]);
        }
        this.students.reverse();
      });
  }
 
  deleteStaff(id: any) {
    this.delete_student_id = id;
    console.log(this.delete_student_id,"stud id")
  }
 
  onAdmissionDelete() {
    this.invoiceService
      .getinvoicesWithStudentId(this.delete_student_id)
      .subscribe((data) => {
        for (let p = 0; p < data.length; p++) {
          console.log('All invoices flows', data[p]._id);
          this.invoiceService
            .deleteInvoice(data[p])
            .subscribe((data) => {});
        }
      });
    this.collectionFlowService
      .getcollectionFlowsWithStudentId(this.delete_student_id)
      .subscribe((data) => {
        for (let p = 0; p < data.length; p++) {
          console.log('All collection flows', data[p]._id);
          this.collectionFlowService
            .deletecollectionFlow(data[p])
            .subscribe((data) => {});
        }
      });
    this.feeflowService
      .getFeeflowsWithStudentId(this.delete_student_id)
      .subscribe((data) => {
        for (let q = 0; q < data.length; q++) {
          this.feeflowService.deleteFeeflow(data[q]).subscribe((data) => {});
        }
      });
    this.studentService
      .deleteStudent({ _id: this.delete_student_id })
      .subscribe((data) => {
        document.getElementById('submittedadmissionDeleteModalCloseBtn').click();
        this.reload();
        this.getAllSubmittedStudents();

        this.toast.setMessage(
          'Admission form deleted successfully !!!',
          'success'
        );
      });
  }
  reload() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['./'], { relativeTo: this.aroute });
  }
}
