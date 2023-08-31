import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { CourseService } from '../services/course.service';
import { BoardOrUniversityService } from '../services/boardoruniversity.service';
import { Course } from '../shared/models/course.model';
import { BoardOrUniversity } from '../shared/models/boardoruniversity.model';
import { FeeflowService } from '../services/feeflow.service';
import { Collectionflow } from '../shared/models/collectionflow.model';
import { CollectionflowService } from '../services/collectionflow.service';
import { COLLECTION_FLOW_TYPE } from '../../app/globals';
import { Student } from '../shared/models/student.model';
import { AuthService } from '../services/auth.service';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../shared/models/invoice.model';
import { Feeflow } from '../shared/models/feeflow.model';
import { CenterService } from '../services/center.service';
@Component({
  selector: 'app-candidatemanagement',
  templateUrl: './candidatemanagement.component.html',
  styleUrls: ['./candidatemanagement.component.css'],
})
export class CandidatemanagementComponent implements OnInit {
  isLoading: boolean = false;
  invoices = [];
  invoiced_fee: Invoice = {};
  certificateCollectionFlow: Collectionflow = {};
  bookCollectionFlow: Collectionflow = {};
  transportCollectionFlow: Collectionflow = {};
  collectionFlow_certificate_display = [];
  collectionFlow_book_display = [];
  collectionFlow_transport_display: Collectionflow = {};
  collectionMonth;
  collectionFlows = [];
  collection_flow_type = COLLECTION_FLOW_TYPE;
  intaketoday = new Date();
  intaketomonth = '0' + (this.intaketoday.getMonth() + 1);
  sintake = this.intaketoday.getFullYear() + '-' + this.intaketomonth.slice(-2);
  students: any = [];
  single_student_id;
  delete_student_id;
  filtered_students;
  filtered_students_count = 0;
  filtered_students_count_saved = 0;
  sortCenter;
  sortUniversity;
  sortCourse;
  sortIntake;
  allCourses: Course[];
  allUniversities: BoardOrUniversity[];
  allCenters: any[];
  allAdminCenters: any[];
  allYears: any[];
  feeFlowarray = [];
  submitted = false;
  showtable: boolean = false;
  currentDate = new Date();
  lastDayOfMonth: Date;
  certificateSubmitted: boolean = false;
  bookSubmitted: boolean = false;
  transportSubmitted: boolean = false;
  courseID_local;
  courseName;
  disableButtons: boolean = false;
  today = new Date();
  tomonth = '0' + (this.today.getMonth() + 1);
  collectedMonth = this.today.getFullYear() + '-' + this.tomonth.slice(-2);
  allMonthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  allMonthIndex = [];
  collectionFlow_transport_display_month_list = [];
  isSaved: boolean = false;
  isSubmit: boolean = true;
  export_year = [];
  export_array = [];
  export_array1 = [];

  invoice_studentname = ' ';
  invoice_date: Date;
  invoice_address;
  invoice_contact;
  invoice_regno;
  invoice_tallyid;
  invoice_university;
  invoice_course;
  invoice_staff;
  currentYear_Pair =
    new Date().getFullYear() + '-' + (new Date().getFullYear() + 1);
  previousyear_1 =
    new Date().getFullYear() - 1 + '-' + new Date().getFullYear();
  previousyear_2 =
    new Date().getFullYear() - 2 + '-' + (new Date().getFullYear() - 1);

  pqr = [];
  showpqr: boolean = false;
  selectedIndex: number = 0;
  showNext: boolean = true;
  showPrevious: boolean = true;
  students_saved;
  studentsWithCurrentYear_saved;
  filtered_students_saved;
  yearloading: boolean = false;
  totalSubmittedStudents:number = 0;
  constructor(
    private studentService: StudentService,
    private route: Router,
    private formBuilder: FormBuilder,
    private aroute: ActivatedRoute,
    public toast: ToastComponent,
    public courseService: CourseService,
    public boardoruniversityService: BoardOrUniversityService,
    public feeflowService: FeeflowService,
    public collectionFlowService: CollectionflowService,
    public auth: AuthService,
    public invoiceService: InvoiceService, // private aRoute: ActivatedRoute,
    public centerService:CenterService,

  ) {}

  filterForm: FormGroup = this.formBuilder.group({
    sort_center: ['', Validators.required],
    sort_university: [''],
    sort_course: [''],
    sort_intake: [''],
  });
  addCollectCertificateForm: FormGroup = this.formBuilder.group({
    collectedOn: ['', Validators.required],
    year: [''],
    remarks: ['', Validators.required],
    certificateCollected: [''],
  });

  addCollectBookForm: FormGroup = this.formBuilder.group({
    collectedOn: ['', Validators.required],
    year: [''],
    remarks: ['', Validators.required],
    bookCollected: [''],
  });

  addCollectTransportationFeeForm: FormGroup = this.formBuilder.group({
    collectedOn: [''],
    year: [''],
    remarks: ['', Validators.required],
    transportfeeCollected: [''],
  });
  ngOnInit(): void {
    this.selectedIndex = parseInt(localStorage.getItem('yearIndex'));
    this.getAllYears();
    
    if (this.auth.isStaff && this.auth.isAccountStaff) {
      this.disableButtons = false;
    } else if (this.auth.isStaff) {
      this.disableButtons = true;
    } else {
      this.disableButtons = false;
    }

   
    this.courseID_local = localStorage.getItem('courseID');
    this.sortUniversity = localStorage.getItem('sortUniversity');
    this.sortCenter = localStorage.getItem('sortCenter');
    this.sortIntake = localStorage.getItem('sortIntake');

    this.getCourses();
    this.getCenters();
    this.getBoardorUniversities();
    this.getAllSubmittedStudents();
    this.getCountOfSubmittedStudents();
    this.lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    


  }

  get c() {
    return this.addCollectCertificateForm.controls;
  }
  get b() {
    return this.addCollectBookForm.controls;
  }
  get t() {
    return this.addCollectTransportationFeeForm.controls;
  }
  getCountOfSubmittedStudents(){
    this.studentService.countSubmittedStudent().subscribe(
      studentCount=>{
     this.totalSubmittedStudents = studentCount;
      }
    );
  }
  getAllYears() {
    this.studentService.getSubmittedStudentsWithALLDetails().subscribe((data) => {
      for (var i in data) {
        
        // for (var j in data[i]) {
          // for (let l = 0; l < data[i].studentFees.length; l++) {
          //   if (this.export_year.length <= 0) {
          //     this.export_year.push(data[i].studentFees[l].year);
          //   } else {
          //     for (let m = 0; m < this.export_year.length; m++) {
          //       if (
          //         this.export_year.indexOf(
          //           data[i].studentFees[l].year
          //         ) <= -1
          //       ) {
          //         this.export_year.push(data[i].studentFees[l].year);
          //       }
          //     }
          //   }
          // }
          this.yearloading = true;
          this.export_year.sort();
          

        // }
      }
      if(!this.selectedIndex || this.selectedIndex == undefined){
        for (let h = 0; h < this.export_year.length; h++) {
          
          if (this.export_year[h] == this.currentYear_Pair) {
            this.selectedIndex = h;
            localStorage.setItem('yearIndex', String(this.selectedIndex));
          }
        }
      }
      if(this.selectedIndex){
        this.currentYear_Pair = this.export_year[this.selectedIndex];
        localStorage.setItem('yearIndex', String(this.selectedIndex));
       }
    });
  }
  getAllSubmittedStudents() {
    if(!this.selectedIndex){
      for (let h = 0; h < this.export_year.length; h++) {
        if (this.export_year[h] == this.currentYear_Pair) {
          this.selectedIndex = h;
          localStorage.setItem('yearIndex', String(this.selectedIndex));
        }
      }
    }
    // this.currentYear_Pair = this.export_year[this.selectedIndex]
    // alert(this.currentYear_Pair+" "+this.selectedIndex)
    // for (let h = 0; h < this.export_year.length; h++) {
    //   if (this.export_year[h] == this.currentYear_Pair) {
    //     this.selectedIndex = h;
    //     localStorage.setItem('yearIndex', String(this.selectedIndex));
    //   }
    // }

    this.isSubmit = true;
    this.isSaved = false;
    this.isLoading = true;
    this.students = [];
    this.studentsWithCurrentYear = [];
    this.feeflowService
      .getFeeflowsWithAllGroupedStudents()
      .subscribe((data) => {
    
        for (var i in data) {
          if (this.auth.isStaff && !this.auth.isAccountStaff) {

            if (data[i].studentId.lead_officer == this.auth.currentUser._id) {
              this.studentsWithCurrentYear.push(data[i].items[0]);
            }

          }
          if(!this.auth.isStaff && this.auth.isAccountStaff){
            this.studentsWithCurrentYear.push(data[i].items[0]);

          }
          if(this.auth.isStaff && this.auth.isAccountStaff){
            this.studentsWithCurrentYear.push(data[i].items[0]);

          }

          if(this.auth.isAdmin) {
            // alert("admin")
            this.studentsWithCurrentYear.push(data[i].items[0]);
          }
        }
        for (let p = 0; p < this.studentsWithCurrentYear.length; p++) {
          if (this.studentsWithCurrentYear[p].fee_per_year[0]) {
            if (
              this.studentsWithCurrentYear[p].fee_per_year[0].year ==
              this.currentYear_Pair
            ) {
              this.students.push(this.studentsWithCurrentYear[p]);
            }
          }
          if (this.studentsWithCurrentYear[p].fee_per_year[1]) {
            if (
              this.studentsWithCurrentYear[p].fee_per_year[1].year ==
              this.currentYear_Pair
            ) {
              this.students.push(this.studentsWithCurrentYear[p]);
            }
          }
          if (this.studentsWithCurrentYear[p].fee_per_year[2]) {
            if (
              this.studentsWithCurrentYear[p].fee_per_year[2].year ==
              this.currentYear_Pair
            ) {
              this.students.push(this.studentsWithCurrentYear[p]);
            }
          }
          if (this.studentsWithCurrentYear[p].fee_per_year[3]) {
            if (
              this.studentsWithCurrentYear[p].fee_per_year[3].year ==
              this.currentYear_Pair
            ) {
              this.students.push(this.studentsWithCurrentYear[p]);
            }
          }
        }
        this.students.reverse();
        if(this.courseID_local == null){
          this.local_Storage_Sort();
        }else{
          if(this.courseID_local != 'ALL'){
            this.courseService.getCourse({_id:this.courseID_local}).subscribe(
              data => {
                this.sortCourse = data;
                if(this.sortCourse.branch){
                  this.courseName = this.sortCourse.name + " - ( " + this.sortCourse.branch + " ) - " + this.sortCourse.courseType;
                }else{
                  this.courseName = this.sortCourse.name + " - " + this.sortCourse.courseType;

                }

                this.local_Storage_Sort();

              }
            );
          }else{
            this.local_Storage_Sort();
          }

        }
      });
  }
  getAllSavedStudents() {
    // for (let h = 0; h < this.export_year.length; h++) {
    //   if (this.export_year[h] == this.currentYear_Pair) {
    //     this.selectedIndex = h;
    //   }
    // }

    this.isSaved = true;
    this.isSubmit = false;
    this.students_saved = [];
    this.studentsWithCurrentYear_saved = [];
    this.studentService.getSavedStudentsWithALLDetails().subscribe((data) => {
      if (data.length > 0) {
        for (var i in data) {
          if (this.auth.isStaff && !this.auth.isAccountStaff) {
            if (data[i].lead_officer._id == this.auth.currentUser._id) {
              this.studentsWithCurrentYear_saved.push(data[i]);
            }
          } else {
            this.studentsWithCurrentYear_saved.push(data[i]);
          }
        }
        for (let p = 0; p < this.studentsWithCurrentYear_saved.length; p++) {
          // if (this.studentsWithCurrentYear_saved[p].studentFees[0]) {
          //   if (
          //     this.studentsWithCurrentYear_saved[p].studentFees[0].year ==
          //     this.currentYear_Pair
          //   ) {
          //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
          //   }
          // }
          // if (this.studentsWithCurrentYear_saved[p].studentFees[1]) {
          //   if (
          //     this.studentsWithCurrentYear_saved[p].studentFees[1].year ==
          //     this.currentYear_Pair
          //   ) {
          //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
          //   }
          // }
          // if (this.studentsWithCurrentYear_saved[p].studentFees[2]) {
          //   if (
          //     this.studentsWithCurrentYear_saved[p].studentFees[2].year ==
          //     this.currentYear_Pair
          //   ) {
          //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
          //   }
          // }
          // if (this.studentsWithCurrentYear_saved[p].studentFees[3]) {
          //   if (
          //     this.studentsWithCurrentYear_saved[p].studentFees[3].year ==
          //     this.currentYear_Pair
          //   ) {
          //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
          //   }
          // }
          this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        }

        this.students_saved.reverse();
      
      } else {
        this.students_saved = [];
      }
    });
  }
  onFilterClick() {
    this.submitted = true;
        if (
      this.sortCenter &&
      this.sortUniversity &&
      this.sortCourse &&
      this.sortIntake
    ) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else{
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
      // if (this.sortCenter == 'ALL') {
      //   this.filtered_students = this.students.filter((x: any) => {
      //     let date1 = new Date(x.studentId.intake);
      //     date1.setMonth(date1.getMonth() + 1);
      //     var d = new Date(date1),
      //       month = '' + d.getMonth(),
      //       year = '' + d.getFullYear();

      //     if (month.length < 2) month = '0' + month;

      //     let convertedintake = [year, month].join('-');
      //     if (
      //       x.studentId.studentCourse[0].boardOrUniversity ==
      //         this.sortUniversity &&
      //       x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
      //       x.studentId.studentCourse[0].course_type ==
      //         this.sortCourse.courseType &&
      //       x.studentId.studentCourse[0].course_branch ==
      //         this.sortCourse.branch &&
      //       convertedintake == this.sortIntake
      //     ) {
      //       return x;
      //     }
      //   });
      //   this.filtered_students_count = this.filtered_students.length;
      //   this.showtable = true;
      // } else {
      //   this.filtered_students = this.students.filter((x: any) => {
      //     let date1 = new Date(x.studentId.intake);
      //     date1.setMonth(date1.getMonth() + 1);
      //     var d = new Date(date1),
      //       month = '' + d.getMonth(),
      //       year = '' + d.getFullYear();

      //     if (month.length < 2) month = '0' + month;

      //     let convertedintake = [year, month].join('-');
      //     if (
      //       x.studentId.centers == this.sortCenter &&
      //       x.studentId.studentCourse[0].boardOrUniversity ==
      //         this.sortUniversity &&
      //       x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
      //       x.studentId.studentCourse[0].course_type ==
      //         this.sortCourse.courseType &&
      //       x.studentId.studentCourse[0].course_branch ==
      //         this.sortCourse.branch &&
      //       convertedintake == this.sortIntake
      //     ) {
      //       return x;
      //     }
      //   });
      //   this.filtered_students_count = this.filtered_students.length;
      //   this.showtable = true;
      // }
    } else if (this.sortCenter && this.sortUniversity && this.sortCourse) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>

            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>

            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&

            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else{
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }

    } else if (this.sortCenter && this.sortUniversity && this.sortIntake) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortCourse && this.sortIntake) {
      if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
              convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){

        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;

      }else {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&

            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortUniversity) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
          x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else {
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    } else if (this.sortCenter && this.sortCourse) {
      if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){

        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
          x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;

      }else {
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    } else if (this.sortCenter && this.sortIntake) {
      if (this.sortCenter == 'ALL') {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (convertedintake == this.sortIntake) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      } else {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    } else if (this.sortCenter) {
      if (this.sortCenter == 'ALL') {
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      } else {
        this.filtered_students = this.students.filter(
          (x) => x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    }
  }
  onFilterClickSave() {
    this.submitted = false;
    this.isSaved = true;

    if (
      this.sortCenter &&
      this.sortUniversity &&
      this.sortCourse &&
      this.sortIntake
    ) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&

            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&
            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else{
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&
            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }

      // if (this.sortCenter == 'ALL') {
      //   this.filtered_students_saved = this.students_saved.filter((x: any) => {
      //     let date1 = new Date(x.intake);
      //     date1.setMonth(date1.getMonth() + 1);
      //     var d = new Date(date1),
      //       month = '' + d.getMonth(),
      //       year = '' + d.getFullYear();

      //     if (month.length < 2) month = '0' + month;

      //     let convertedintake = [year, month].join('-');
      //     if (
      //       x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
      //       x.studentCourse[0].course_name == this.sortCourse.name &&
      //       x.studentCourse[0].course_type == this.sortCourse.courseType &&
      //       x.studentCourse[0].course_branch == this.sortCourse.branch &&
      //       convertedintake == this.sortIntake
      //     ) {
      //       return x;
      //     }
      //   });
      //   this.filtered_students_count_saved =
      //     this.filtered_students_saved.length;
      //   this.showtable = true;
      // } else {
      //   this.filtered_students_saved = this.students_saved.filter((x: any) => {
      //     let date1 = new Date(x.intake);
      //     date1.setMonth(date1.getMonth() + 1);
      //     var d = new Date(date1),
      //       month = '' + d.getMonth(),
      //       year = '' + d.getFullYear();

      //     if (month.length < 2) month = '0' + month;

      //     let convertedintake = [year, month].join('-');
      //     if (
      //       x.centers == this.sortCenter &&
      //       x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
      //       x.studentCourse[0].course_name == this.sortCourse.name &&
      //       x.studentCourse[0].course_type == this.sortCourse.courseType &&
      //       x.studentCourse[0].course_branch == this.sortCourse.branch &&
      //       convertedintake == this.sortIntake
      //     ) {
      //       return x;
      //     }
      //   });
      //   this.filtered_students_count_saved =
      //     this.filtered_students_saved.length;
      //   this.showtable = true;
      // }
    } else if (this.sortCenter && this.sortUniversity && this.sortCourse) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved;
        this.filtered_students_count_saved = this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students_saved.filter(
          (x) =>

            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students_saved.filter(
          (x) =>

            x.studentCourse[0].boardOrUniversity == this.sortUniversity

        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students_saved.filter(
          (x) =>
            x.centers == this.sortCenter

        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter(
          (x) =>
            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students_saved.filter(
          (x) =>
            x.centers == this.sortCenter &&

            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students_saved.filter(
          (x) =>
            x.centers == this.sortCenter &&
            x.studentCourse[0].boardOrUniversity == this.sortUniversity
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else{
        this.filtered_students = this.students_saved.filter(
          (x) =>
            x.centers == this.sortCenter &&
            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortUniversity && this.sortIntake) {

      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else {
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&
            x.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortCourse && this.sortIntake) {

      if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){

        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;

      }else {
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&

            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortUniversity) {

      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students_saved = this.students_saved;
        this.filtered_students_count_saved = this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter(
          (x) => x.studentCourse[0].boardOrUniversity == this.sortUniversity
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.centers == this.sortCenter

        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else {
        this.filtered_students = this.students.filter(
          (x) =>
            x.centers == this.sortCenter &&
            x.studentCourse[0].boardOrUniversity == this.sortUniversity
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortCourse) {

      if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved;
        this.filtered_students_count_saved = this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){

        this.filtered_students_saved = this.students_saved.filter(
          (x) =>
            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students_saved = this.students_saved.filter(
          (x) =>
            x.centers == this.sortCenter
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;

      }else {
        this.filtered_students_saved = this.students_saved.filter(
          (x) =>
            x.centers == this.sortCenter &&
            x.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentCourse[0].course_type == this.sortCourse.courseType &&
            x.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortIntake) {


      if (this.sortCenter == 'ALL') {
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (convertedintake == this.sortIntake) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      } else {
        this.filtered_students_saved = this.students_saved.filter((x: any) => {
          let date1 = new Date(x.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.centers == this.sortCenter &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }
    } else if (this.sortCenter) {
      if (this.sortCenter == 'ALL') {
        this.filtered_students_saved = this.students_saved;
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      } else {
        this.filtered_students_saved = this.students_saved.filter(
          (x) => x.centers == this.sortCenter
        );
        this.filtered_students_count_saved =
          this.filtered_students_saved.length;
        this.showtable = true;
      }
    }
  }


  local_Storage_Sort() {
    if (
      this.sortCenter &&
      this.sortUniversity &&
      this.sortCourse &&
      this.sortIntake
    ) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity == this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else{
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
      // if (this.sortCenter == 'ALL') {
      //   this.filtered_students = this.students.filter((x: any) => {
      //     let date1 = new Date(x.studentId.intake);
      //     date1.setMonth(date1.getMonth() + 1);
      //     var d = new Date(date1),
      //       month = '' + d.getMonth(),
      //       year = '' + d.getFullYear();

      //     if (month.length < 2) month = '0' + month;

      //     let convertedintake = [year, month].join('-');
      //     if (
      //       x.studentId.studentCourse[0].boardOrUniversity ==
      //         this.sortUniversity &&
      //       x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
      //       x.studentId.studentCourse[0].course_type ==
      //         this.sortCourse.courseType &&
      //       x.studentId.studentCourse[0].course_branch ==
      //         this.sortCourse.branch &&
      //       convertedintake == this.sortIntake
      //     ) {
      //       return x;
      //     }
      //   });
      //   this.filtered_students_count = this.filtered_students.length;
      //   this.showtable = true;
      // } else {
      //   this.filtered_students = this.students.filter((x: any) => {
      //     let date1 = new Date(x.studentId.intake);
      //     date1.setMonth(date1.getMonth() + 1);
      //     var d = new Date(date1),
      //       month = '' + d.getMonth(),
      //       year = '' + d.getFullYear();

      //     if (month.length < 2) month = '0' + month;

      //     let convertedintake = [year, month].join('-');
      //     if (
      //       x.studentId.centers == this.sortCenter &&
      //       x.studentId.studentCourse[0].boardOrUniversity ==
      //         this.sortUniversity &&
      //       x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
      //       x.studentId.studentCourse[0].course_type ==
      //         this.sortCourse.courseType &&
      //       x.studentId.studentCourse[0].course_branch ==
      //         this.sortCourse.branch &&
      //       convertedintake == this.sortIntake
      //     ) {
      //       return x;
      //     }
      //   });
      //   this.filtered_students_count = this.filtered_students.length;
      //   this.showtable = true;
      // }
    } else if (this.sortCenter && this.sortUniversity && this.sortCourse) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>

            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>

            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&

            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else{
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }

    } else if (this.sortCenter && this.sortUniversity && this.sortIntake) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (

            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&

            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortCourse && this.sortIntake) {
      if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
              convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){

        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;

      }else {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&

            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortCourse.branch &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }


    } else if (this.sortCenter && this.sortUniversity) {
      if(this.sortCenter == 'ALL' && this.sortUniversity == 'ALL'){
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortUniversity == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
          x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else {
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversity
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    } else if (this.sortCenter && this.sortCourse) {
      if(this.sortCenter == 'ALL' && this.courseID_local == 'ALL'){
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.sortCenter == 'ALL'){

        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }else if(this.courseID_local == 'ALL'){
        this.filtered_students = this.students.filter(
          (x) =>
          x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;

      }else {
        this.filtered_students = this.students.filter(
          (x) =>
            x.studentId.centers == this.sortCenter &&
            x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
            x.studentId.studentCourse[0].course_type ==
              this.sortCourse.courseType &&
            x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    } else if (this.sortCenter && this.sortIntake) {
      if (this.sortCenter == 'ALL') {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (convertedintake == this.sortIntake) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      } else {
        this.filtered_students = this.students.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.centers == this.sortCenter &&
            convertedintake == this.sortIntake
          ) {
            return x;
          }
        });
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    } else if (this.sortCenter) {
      if (this.sortCenter == 'ALL') {
        this.filtered_students = this.students;
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      } else {
        this.filtered_students = this.students.filter(
          (x) => x.studentId.centers == this.sortCenter
        );
        this.filtered_students_count = this.filtered_students.length;
        this.showtable = true;
      }
    }
  }
  get f() {
    return this.filterForm.controls;
  }
  getCourses() {

    if(this.sortUniversity != 'ALL'){
      this.allCourses = [];
      this.courseService.getAllCourseWithBoardname().subscribe((data) => {

        for (var i in data) {
          if (
            this.allCourses.filter(
              (e) =>
                e.name == data[i].name &&
                e.branch == data[i].branch &&
                e.courseType == data[i].courseType
            ).length <= 0
          ) {
            if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversity){
              this.allCourses.push(data[i]);
            }

          }
        }
        this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
    if(this.sortUniversity == null || this.sortUniversity == 'ALL'){
      this.allCourses = [];
      this.courseService.getAllCourseWithBoardname().subscribe((data) => {
        this.allCourses = [];
        for (var i in data) {
          if (this.allCourses.filter(
              (e) =>
                e.name == data[i].name &&
                e.branch == data[i].branch &&
                e.courseType == data[i].courseType
            ).length <= 0
          ) {
            this.allCourses.push(data[i]);
          }
        }
        this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
      });
    }

  }
  getBoardorUniversities() {
    this.boardoruniversityService.getBoardOrUniversitys().subscribe((data) => {
      this.allUniversities = data;
    });
  }
  getCenters() {
    this.allCenters = [];
    this.allAdminCenters = [{_id:'123',center:'ALL'}];
    this.getAllCenters();
  }
  getAllCenters(){
    this.centerService.getcenters().subscribe(
      data => {
        for(var i in data){
          this.allCenters.push(data[i]);
          this.allAdminCenters.push(data[i]);

        }
        console.log(this.allAdminCenters,'All centers',this.allCenters)
  
      }
    )
  }
  getSortCenter(event) {
    // alert(event.target.value)
    this.sortCenter = event.target.value;
    localStorage.setItem('sortCenter', this.sortCenter);
  }
  getSortUniversity(event) {

    this.sortUniversity = event.target.value
    localStorage.setItem('sortUniversity', this.sortUniversity);
    if(this.sortUniversity != 'ALL'){
      this.allCourses = [];
      this.courseService.getAllCourseWithBoardname().subscribe((data) => {

        for (var i in data) {
          if (
            this.allCourses.filter(
              (e) =>
                e.name == data[i].name &&
                e.branch == data[i].branch &&
                e.courseType == data[i].courseType
            ).length <= 0
          ) {
            if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversity){
              this.allCourses.push(data[i]);
            }

          }
        }
        this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
      });
    }else{
      this.allCourses = [];
      this.courseService.getAllCourseWithBoardname().subscribe((data) => {

        for (var i in data) {
          if (
            this.allCourses.filter(
              (e) =>
                e.name == data[i].name &&
                e.branch == data[i].branch &&
                e.courseType == data[i].courseType
            ).length <= 0
          ) {

            this.allCourses.push(data[i]);


          }
        }
        this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
      });
    }

  }
  getSortCourse(event) {
    this.courseID_local = event.target.value;
    localStorage.setItem('courseID', this.courseID_local);
    if(this.courseID_local != 'ALL'){
      this.courseService
      .getCourse({ _id: this.courseID_local })
      .subscribe((data) => {
        this.sortCourse = data;
        if (this.sortCourse.branch) {
          this.courseName =
            this.sortCourse.name +
            ' - ( ' +
            this.sortCourse.branch +
            ' ) - ' +
            this.sortCourse.courseType;
        } else {
          this.courseName =
            this.sortCourse.name + ' - ' + this.sortCourse.courseType;
        }
      });
    }else{
      this.courseName = 'ALL'
    }

  }
  getSortIntake(event) {
    this.sortIntake = event.target.value;
    localStorage.setItem('sortIntake', this.sortIntake);
  }
  reload() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['./'], { relativeTo: this.aroute });
  }
  onResetClick() {
    localStorage.removeItem('courseID');
    localStorage.removeItem('sortUniversity');
    localStorage.removeItem('sortCenter');
    localStorage.removeItem('sortIntake');
    this.reload();
    this.ngOnInit();
  }

  exportStudent(y1, y2, y3) {
    let year1 = y1;
    let year2 = y2;
    let year3 = y3;

    console.log('year1', y1);
    console.log('year2', y2);
    console.log('year3', y3);

    this.export_array = [];

    this.feeflowService
      .getFeeflowsWithAllGroupedStudentsByYear(year1, year2, year3)
      .subscribe((data) => {
        for (var i in data) {
          this.export_array1 = [];
          if (data[i].items[0].studentId.studentFees) {
          }
          this.export_array.push(data[i].items[0]);

          for (var j in data[i].items) {
            for (
              let l = 0;
              l < data[i].items[j].studentId.studentFees.length;
              l++
            ) {
              if (this.export_year.length <= 0) {
                this.export_year.push(
                  data[i].items[j].studentId.studentFees[l].year
                );
              } else {
                for (let m = 0; m < this.export_year.length; m++) {
                  if (
                    this.export_year.indexOf(
                      data[i].items[j].studentId.studentFees[l].year
                    ) <= -1
                  ) {
                    this.export_year.push(
                      data[i].items[j].studentId.studentFees[l].year
                    );
                  }
                }
              }
            }
            this.export_year.sort();
          }
          this.export_array.reverse();
          for (var x = 0; x < this.export_array.length; x++) {}
        }
      });

    this.showpqr = true;
    this.export_year.sort();
    for (let h = 0; h < this.export_year.length; h++) {
      if (this.export_year[h] == this.currentYear_Pair) {
        this.selectedIndex = h;
      }
    }
  }
  makeSingleObject(objectArray: any[]) {
    let labels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var cur_year_month =
      labels[new Date().getMonth()] + '-' + new Date().getFullYear();

    return objectArray.reduce(function (acc, obj: any) {
      let key = '';

      key = obj.year;
      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] = obj;
      return acc;
    }, {});
  }
  next() {
    this.showPrevious = true;
    this.selectedIndex++;
    if (this.selectedIndex >= this.export_year.length) {
      this.selectedIndex = this.export_year.length - 1;
      this.showNext = false;
    }
    let index = this.selectedIndex;
    if (this.selectedIndex <= 0) {
      this.selectedIndex = 0;
      this.showPrevious = false;
    }
    localStorage.setItem('yearIndex', String(this.selectedIndex));
    this.students = [];
    this.students_saved = [];

    for (let m = 0; m < this.studentsWithCurrentYear.length; m++) {
      if (this.studentsWithCurrentYear[m].fee_per_year[0]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[0].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
      if (this.studentsWithCurrentYear[m].fee_per_year[1]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[1].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
      if (this.studentsWithCurrentYear[m].fee_per_year[2]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[2].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
      if (this.studentsWithCurrentYear[m].fee_per_year[3]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[3].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
    }
    if(this.studentsWithCurrentYear_saved){
      for (let p = 0; p < this.studentsWithCurrentYear_saved.length; p++) {
        // if (this.studentsWithCurrentYear_saved[p].studentFees[0]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[0].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }
        // if (this.studentsWithCurrentYear_saved[p].studentFees[1]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[1].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }
        // if (this.studentsWithCurrentYear_saved[p].studentFees[2]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[2].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }
        // if (this.studentsWithCurrentYear_saved[p].studentFees[3]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[3].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }

        this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
      }
    }

  }
  studentsWithCurrentYear = [];
  previous() {
    //  alert("HI");
    this.showNext = true;
    this.selectedIndex--;
    let index = this.selectedIndex;
    if (this.selectedIndex <= 0) {
      this.selectedIndex = 0;
      this.showPrevious = false;
    }
    localStorage.setItem('yearIndex', String(this.selectedIndex));
    this.students = [];
    this.students_saved = [];

    for (let m = 0; m < this.studentsWithCurrentYear.length; m++) {
      if (this.studentsWithCurrentYear[m].fee_per_year[0]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[0].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
      if (this.studentsWithCurrentYear[m].fee_per_year[1]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[1].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
      if (this.studentsWithCurrentYear[m].fee_per_year[2]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[2].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
      if (this.studentsWithCurrentYear[m].fee_per_year[3]) {
        if (
          this.studentsWithCurrentYear[m].fee_per_year[3].year ==
          this.export_year[index]
        ) {
          this.students.push(this.studentsWithCurrentYear[m]);
        }
      }
    }
    if(this.studentsWithCurrentYear_saved){
      for (let p = 0; p < this.studentsWithCurrentYear_saved.length; p++) {
        // if (this.studentsWithCurrentYear_saved[p].studentFees[0]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[0].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }
        // if (this.studentsWithCurrentYear_saved[p].studentFees[1]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[1].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }
        // if (this.studentsWithCurrentYear_saved[p].studentFees[2]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[2].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }
        // if (this.studentsWithCurrentYear_saved[p].studentFees[3]) {
        //   if (
        //     this.studentsWithCurrentYear_saved[p].studentFees[3].year ==
        //     this.export_year[index]
        //   ) {
        //     this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
        //   }
        // }
        this.students_saved.push(this.studentsWithCurrentYear_saved[p]);
      }
    }

  }
  viewCandidate(student) {
    if (this.auth.isAdmin) {
      this.route.navigate(['candidate-singleview/' + student._id]);
    } else {
      this.route.navigate(['staff-candidate-singleview/' + student._id]);
    }
  }
  getCertificateCollectionValues(year) {
    this.collectionFlow_certificate_display = [];
    this.collectionFlowService
      .getcollectionFlowsWithStudentId(this.single_student_id)
      .subscribe((data) => {
        this.collectionFlows = data;
        for (var i in this.collectionFlows) {
          if (
            this.collectionFlows[i].collectionType ==
              COLLECTION_FLOW_TYPE.certificate &&
            this.collectionFlows[i].year == year
          ) {
            this.collectionFlow_certificate_display.push(
              this.collectionFlows[i]
            );
          }
        }
      });
  }
  getBookCollectionValues(year) {
    this.collectionFlow_book_display = [];
    this.collectionFlowService
      .getcollectionFlowsWithStudentId(this.single_student_id)
      .subscribe((data) => {
        this.collectionFlows = data;
        for (var i in this.collectionFlows) {
          if (
            this.collectionFlows[i].collectionType ==
              COLLECTION_FLOW_TYPE.book &&
            this.collectionFlows[i].year == year
          ) {
            this.collectionFlow_book_display.push(this.collectionFlows[i]);
          }
        }
      });
  }
  getTransportCollectionValues(year) {
    this.collectionFlowService
      .getcollectionFlowsWithStudentId(this.single_student_id)
      .subscribe((data) => {
        this.collectionFlows = data;
        let tmparray = [];
        this.allMonthIndex = [];
        for (var i in this.collectionFlows) {
          if (
            this.collectionFlows[i].collectionType ==
              COLLECTION_FLOW_TYPE.transport &&
            this.collectionFlows[i].year == year
          ) {
            tmparray.push(this.collectionFlows[i]);
          }
        }
        tmparray.reverse();
        this.collectionFlow_transport_display = tmparray[0];
        this.collectionFlow_transport_display_month_list =
          this.collectionFlow_transport_display.month_list;
        for (
          let y = 0;
          y < this.collectionFlow_transport_display.month_list.length;
          y++
        ) {
          this.allMonthIndex.push(
            this.collectionFlow_transport_display.month_list[y].month
          );
        }
      });
  }

  onTransportMonthSelection(option, event) {
    this.transportCollectionFlow.month_list = [];
    for (
      let x = 0;
      x < this.collectionFlow_transport_display.month_list.length;
      x++
    ) {
      if (this.collectionFlow_transport_display.month_list[x].month == option) {
        this.collectionFlow_transport_display.month_list[x].month = option;
        this.collectionFlow_transport_display.month_list[x].isRequired =
          event.target.checked;
        this.collectionFlow_transport_display.month_list[x].isPaid =
          this.collectionFlow_transport_display.month_list[x].isPaid;
        this.collectionFlow_transport_display.month_list[x].paid_fee =
          this.collectionFlow_transport_display.month_list[x].paid_fee;
      }
    }
  }
  onCandidateClick(student) {
    this.single_student_id = student._id;
    this.allYears = [];
    this.feeFlowarray = [];
    this.feeflowService
      .getFeeflowsWithStudentId(student._id)
      .subscribe((feeflows) => {
        let size = 12;
        feeflows.reverse();
        // for (var i = 0; i < feeflows[0].fee_per_year.length; i++) {
        //   this.allYears.push(feeflows[0].fee_per_year[i].year);
        // }
        this.bookCollectionFlow.year = this.allYears[0];
        this.certificateCollectionFlow.year = this.allYears[0];
        this.transportCollectionFlow.year = this.allYears[0];
        this.getCertificateCollectionValues(this.allYears[0]);
        this.getBookCollectionValues(this.allYears[0]);
        this.getTransportCollectionValues(this.allYears[0]);
      });
  }
  onCertificateYearChange(event) {
    this.certificateCollectionFlow.year = event.value;
    this.getCertificateCollectionValues(this.certificateCollectionFlow.year);
  }
  OnCertificateRemarkChange(event) {
    this.certificateCollectionFlow.remarks = event.value;
  }
  getcertificateCollected(event) {
    this.certificateCollectionFlow.isCertificateCollected =
      event.target.checked;
  }
  onBookYearChange(event) {
    this.bookCollectionFlow.year = event.value;
    this.getBookCollectionValues(this.bookCollectionFlow.year);
  }

  getbookCollected(event) {
    this.bookCollectionFlow.isBookCollected = event.target.checked;
  }
  onTransportYearChange(event) {
    this.transportCollectionFlow.year = event.value;
    this.getTransportCollectionValues(this.transportCollectionFlow.year);
  }
  OnTransportRemarkChange(event) {
    this.transportCollectionFlow.remarks = event.value;
  }

  onCertificateCollectSave() {
    this.certificateSubmitted = true;
    if (this.addCollectCertificateForm.invalid) {
      return;
    }
    this.certificateCollectionFlow.isCertificateCollected = true;
    this.certificateCollectionFlow.collectionType =
      COLLECTION_FLOW_TYPE.certificate;

    this.certificateCollectionFlow.collectedOn = this.c.collectedOn.value;
    this.certificateCollectionFlow.studentId = this.single_student_id;
    this.collectionFlowService
      .addcollectionFlow(this.certificateCollectionFlow)
      .subscribe((data) => {
        document.getElementById('certificateCollectionModalCloseBtn').click();
        this.toast.setMessage(
          'Certificate Collected successfully !!!',
          'success'
        );
      });
  }
  onBookCollectSave() {
    this.bookSubmitted = true;
    if (this.addCollectBookForm.invalid) {
      return;
    }

    this.bookCollectionFlow.isBookCollected = true;
    this.bookCollectionFlow.remarks = this.b.remarks.value;
    this.bookCollectionFlow.collectionType = COLLECTION_FLOW_TYPE.book;
    this.bookCollectionFlow.collectedOn = this.b.collectedOn.value;
    this.bookCollectionFlow.studentId = this.single_student_id;
    this.collectionFlowService
      .addcollectionFlow(this.bookCollectionFlow)
      .subscribe((data) => {
        document.getElementById('bookCollectionModalCloseBtn').click();
        this.toast.setMessage('Book collected Successfully !!!', 'success');
      });
  }

  onTransportCollectSave() {
    this.transportSubmitted = true;
    if (this.addCollectTransportationFeeForm.invalid) {
      return;
    }
    for (
      let x = 0;
      x < this.collectionFlow_transport_display.month_list.length;
      x++
    ) {
      if (this.collectionFlow_transport_display.month_list[x].isRequired) {
        this.transportCollectionFlow.isTransportationNeeded = true;
        break;
      } else {
        this.transportCollectionFlow.isTransportationNeeded = false;
      }
    }

    this.transportCollectionFlow.month_list =
      this.collectionFlow_transport_display.month_list;

    this.transportCollectionFlow.collectionType =
      COLLECTION_FLOW_TYPE.transport;
    this.transportCollectionFlow.collectedOn = new Date();
    this.transportCollectionFlow.studentId = this.single_student_id;

    this.collectionFlowService
      .addcollectionFlow(this.transportCollectionFlow)
      .subscribe((data) => {
        document.getElementById('transportCollectionModalCloseBtn').click();
        if (this.auth.isAdmin) {
          this.toast.setMessage(
            'Transport Marked successfully !!!',
            'success',
            'candidate-management'
          );
        } else {
          this.toast.setMessage(
            'Transport Marked successfully  !!!',
            'success',
            'staff-candidate-management'
          );
        }
      });
  }

  onViewSubmitClick(student: Student) {
    if (this.auth.isAdmin) {
      this.route.navigate(['admissionform-singleview/' + student._id]);
    } else {
      this.route.navigate(['staff-admissionform-singleview/' + student._id]);
    }
  }
  onViewSavedClick(student: Student) {
    if (this.auth.isAdmin) {
      this.route.navigate(['admissionform-edit/' + student._id]);
    } else {
      this.route.navigate(['staff-admissionform-edit/' + student._id]);
    }
  }
  onInvoiceClick(student: Student) {
    this.invoices = [];
    this.invoiceService
      .getinvoicesWithStudentId(student._id)
      .subscribe((data) => {
        for (var i in data) {
          this.invoices.push(data[i]);
        }
        this.invoices.reverse();
        this.invoice_studentname =
          this.invoices[0].studentId.firstName +
          ' ' +
          this.invoices[0].studentId.lastName;
        this.invoice_address =
          this.invoices[0].studentId.address.permanent_address;
        this.invoice_contact = this.invoices[0].studentId.contact.mobilenumber;
        this.invoice_regno =
          this.invoices[0].studentId.university_register_number;
        this.invoice_tallyid = this.invoices[0].studentId.tally_ID;
        this.invoice_university =
          this.invoices[0].studentId.studentCourse[0].boardOrUniversity;
        if (this.invoices[0].studentId.studentCourse[0].course_branch) {
          this.invoice_course =
            this.invoices[0].studentId.studentCourse[0].course_name +
            ' - ' +
            this.invoices[0].studentId.studentCourse[0].course_branch +
            ' (' +
            this.invoices[0].studentId.studentCourse[0].course_type +
            ') ';
        } else {
          this.invoice_course =
            this.invoices[0].studentId.studentCourse[0].course_name +
            ' (' +
            this.invoices[0].studentId.studentCourse[0].course_type +
            ') ';
        }
        this.invoice_staff =
          this.auth.currentUser.firstName +
          ' ' +
          this.auth.currentUser.lastName;
      });
  }

  getInvoiceByStudentID(invoice: Invoice) {
    this.invoiceService
      .getInvoiceByStudentID({ _id: invoice._id })
      .subscribe((data) => {
        this.invoiced_fee = data[0];
      });
    setTimeout(() => {
      this.print();
    }, 500);
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
          // #trid{
          //   background-color:yellow !important;
          // }
          // tr {
          //   background-color: aqua;
          // }
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }
  createAdmissionform() {
    if (this.auth.isAdmin) {
      this.route.navigate(['admission-form']);
    } else {
      this.route.navigate(['staff-admission-form']);
    }
  }
  applyFilter(event) {
    let filterValueLower = event.target.value.toLowerCase();
    if (filterValueLower === '') {
      this.local_Storage_Sort();
      // this.filtered_students = this.students;
      // this.filtered_students_count = this.filtered_students.length;
      this.showtable = true;
    } else {
      this.filtered_students = this.filtered_students.filter(
        (student) =>
          student.studentId.firstName
            .toLowerCase()
            .includes(filterValueLower) ||
          student.studentId.lastName.toLowerCase().includes(filterValueLower)
      );
      this.showtable = true;
      this.filtered_students_count = this.filtered_students.length;
    }
  }
  applyFilterOnSave(event) {
    let filterValueLower = event.target.value.toLowerCase();
    if (filterValueLower === '') {
      this.filtered_students_saved = this.students_saved;
      this.filtered_students_count_saved = this.filtered_students_saved.length;
      this.showtable = true;
    } else {
      this.filtered_students_saved = this.filtered_students_saved.filter(
        (student) =>
          student.firstName.toLowerCase().includes(filterValueLower) ||
          student.lastName.toLowerCase().includes(filterValueLower)
      );
      this.showtable = true;
      this.filtered_students_count_saved = this.filtered_students_saved.length;
    }
  }

  clickToExport() {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns=http://www.w3.org/TR/REC-html40><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };
    var toExcel = document.getElementById('tblData1').innerHTML;
    var ctx = {
      table: toExcel,
    };
    var link = document.createElement('a');
    link.download = 'CandidateList' + '.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  deleteStaff(id: any) {
    this.delete_student_id = id;
  }

  onStudentDelete() {
    this.collectionFlowService
      .getcollectionFlowsWithStudentId(this.delete_student_id)
      .subscribe((data) => {
        for (let p = 0; p < data.length; p++) {
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
        document.getElementById('savedadmissionDeleteModalCloseBtn').click();
        this.reload();
        this.getAllSavedStudents();

        this.toast.setMessage(
          'Admission form deleted successfully !!!',
          'success'
        );
      });
  }
  onAdmissionDelete() {
    this.invoiceService
      .getinvoicesWithStudentId(this.delete_student_id)
      .subscribe((data) => {
        for (let p = 0; p < data.length; p++) {
          this.invoiceService
            .deleteInvoice(data[p])
            .subscribe((data) => {});
        }
      });
    this.collectionFlowService
      .getcollectionFlowsWithStudentId(this.delete_student_id)
      .subscribe((data) => {
        for (let p = 0; p < data.length; p++) {
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
  clickToExport1() {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns=http://www.w3.org/TR/REC-html40><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };
    var toExcel = document.getElementById('tblData1').innerHTML;
    var ctx = {
      table: toExcel,
    };
    var link = document.createElement('a');
    link.download = 'CandidateList' + '.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  modeOfName: boolean = false;
  modeOfCenter: boolean = false;
  modeOfRegNO: boolean = false;
  modeOfTallyId: boolean = false;
  modeOfRegNOSaved: boolean = false;
  modeOfNameSaved: boolean = false;
  modeOfTallyIdSaved: boolean = false;
  onSortClickTallyId() {
    this.modeOfTallyId = true;
    this.filtered_students.sort((a, b) =>
      Number(a.studentId.tally_ID) < Number(b.studentId.tally_ID) ? -1 : 1
    );
  }
  onSortClickTallyIdreverse() {
    this.modeOfTallyId = false;
    this.filtered_students.sort((a, b) =>
      Number(a.studentId.tally_ID) > Number(b.studentId.tally_ID) ? -1 : 1
    );
  }
  onSortClickTallyIdSaved() {
    this.modeOfTallyIdSaved = true;
    this.filtered_students_saved.sort((a, b) =>
      Number(a.tally_ID) < Number(b.tally_ID) ? -1 : 1
    );
  }
  onSortClickTallyIdreverseSaved() {
    this.modeOfTallyIdSaved = false;
    this.filtered_students_saved.sort((a, b) =>
      Number(a.tally_ID) > Number(b.tally_ID) ? -1 : 1
    );
  }

  onSortClickName() {
    this.modeOfName = true;

    this.filtered_students.sort((a, b) =>
      a.studentId.firstName < b.studentId.firstName ? -1 : 1
    );
  }
  onSortClickNameReverse() {
    this.modeOfName = false;
    this.filtered_students.sort((a, b) =>
      a.studentId.firstName > b.studentId.firstName ? -1 : 1
    );
  }
  onSortClickNameSaved() {
    this.modeOfNameSaved = true;

    this.filtered_students_saved.sort((a, b) =>
      a.firstName < b.firstName ? -1 : 1
    );
  }
  onSortClickNameReverseSaved() {
    this.modeOfNameSaved = false;
    this.filtered_students_saved.sort((a, b) =>
      a.firstName > b.firstName ? -1 : 1
    );
  }

  onSortClickCenter() {
    this.modeOfCenter = true;

    this.filtered_students.sort((a, b) =>
      a.studentId.centers < b.studentId.centers ? -1 : 1
    );
  }
  onSortClickCenterReverse() {
    this.modeOfCenter = false;

    this.filtered_students.sort((a, b) =>
      a.studentId.centers > b.studentId.centers ? -1 : 1
    );
  }
  onSortClickRegisterNO() {
    this.modeOfRegNO = true;
    this.filtered_students.sort((a, b) =>
      a.studentId.university_register_number <
      b.studentId.university_register_number
        ? -1
        : 1
    );
  }

  onSortClickNameRegisterNOreverse() {
    this.modeOfRegNO = false;

    this.filtered_students.sort((a, b) =>
      a.studentId.university_register_number >
      b.studentId.university_register_number
        ? -1
        : 1
    );
  }
  onSortClickRegisterNOSaved() {
    this.modeOfRegNOSaved = true;
    this.filtered_students_saved.sort((a, b) =>
      a.university_register_number < b.university_register_number ? -1 : 1
    );
  }
  onSortClickNameRegisterNOreverseSaved() {
    this.modeOfRegNOSaved = false;
    this.filtered_students_saved.sort((a, b) =>
      a.university_register_number > b.university_register_number ? -1 : 1
    );
  }
}
