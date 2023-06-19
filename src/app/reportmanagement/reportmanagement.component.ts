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
  selector: 'app-reportmanagement',
  templateUrl: './reportmanagement.component.html',
  styleUrls: ['./reportmanagement.component.css'],
})
export class ReportmanagementComponent implements OnInit {
  isLoading: boolean = false;
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
  invoices = [];
  single_student_id;
  delete_student_id;
  sortUniversity;
  sortCourse;
  sortIntake;
  sortPaymentmode;
  sortUniversityts;
  sortCoursets;
  sortIntakets;
  sortPaymentmodets;
  sortUniversitybc;
  sortCoursebc;
  sortIntakebc;
  sortReportbc;
  allCourses: Course[];
  allUniversities: BoardOrUniversity[];
  allCenters: any[];
  allAdminCenters: any[];
  allYears: any[];
  feeFlowarray = [];
  submitted = false;
  datesubmitted = false;
  datestsubmitted = false;
  showtable: boolean = false;
  currentDate = new Date();
  lastDayOfMonth: Date;
  certificateSubmitted: boolean = false;
  bookSubmitted: boolean = false;
  transportSubmitted: boolean = false;
  courseID_local;
  courseIDts_local;
  courseIDbc_local;
  courseName;
  courseNamets;
  courseNamebc;
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
  showFilterOptions: boolean = false;
  showFilterOptionsts: boolean = true;
  payment_mode = [];
  filtered_invoices = [];
  filtered_reports = [];
  filtered_invoices_count = 0;
  startDate;
  endDate;
  startDatets;
  endDatets;
  reportsarray = ['Invoices', 'Commutation', 'Books & Certificates'];
  book_report_types = ['Books', 'Certificates'];
  invoice_report: boolean = false;
  bookandcertificate_report: boolean = true;
  commutation_report: boolean = false;
  books: Collectionflow[];
  certificates: Collectionflow[];
  students = [];
  booksandcertificate: any[];
  studentslist = [];
  studentslist1 = [];
  studentslist2: any = [];
  types_report_books = [];
  types_report_certificates = [];
  statusofbook: boolean = false;
  statusofcertificate: boolean = false;
  reportstype: any;
  commutation = [];
  filtered_invoicests: any[];
  sortReportsbc: any;
  courseNameinvoice: any;
  modeOfReport: any = '';
  coursename;
  coursebranch;
  coursetype;
  coursenamets;
  coursebranchts;
  coursetypets;
  // coursenamebc;
  // coursebranchbc;
  // coursetypebc;
  sortcoursename_bc: any;
  sortcoursebranch_bc: any;
  sortcoursetype_bc: any;
  totalRemittedfee;
  totalRemittedfeeoftrasnport;
  constructor(
    private studentService: StudentService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private aroute: ActivatedRoute,
    public toast: ToastComponent,
    public courseService: CourseService,
    public boardoruniversityService: BoardOrUniversityService,
    public feeflowService: FeeflowService,
    public collectionFlowService: CollectionflowService,
    public auth: AuthService,
    public invoiceService: InvoiceService,
    public centerService:CenterService,

  ) {}

  filterForm: FormGroup = this.formBuilder.group({
    sort_paymentmode: [''],
    sort_university: [''],
    sort_course: [''],
    sort_intake: [''],
  });
  filterFormbc: FormGroup = this.formBuilder.group({
    sort_typebc: [''],
    sort_universitybc: [''],
    sort_coursebc: [''],
    sort_intakebc: [''],
  });
  filterFormts: FormGroup = this.formBuilder.group({
    sort_paymentmodets: [''],
    sort_universityts: [''],
    sort_coursets: [''],
    sort_intakets: [''],
  });
  dateForm: FormGroup = this.formBuilder.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });
  dateFormts: FormGroup = this.formBuilder.group({
    startDatets: ['', Validators.required],
    endDatets: ['', Validators.required],
  });

  ngOnInit(): void {
    this.payment_mode = ['Cash', 'Card', 'Wire Transfer', 'Others'];
    this.getStudentsWithALLDetails();
    this.courseID_local = localStorage.getItem('report_courseID');
    this.sortUniversity = localStorage.getItem('report_sortUniversity');
    this.sortPaymentmode = localStorage.getItem('report_sortPaymentmode');
    this.sortIntake = localStorage.getItem('report_sortIntake');
    this.courseIDbc_local = localStorage.getItem('report_courseIDbc');
    this.sortUniversitybc = localStorage.getItem('report_sortUniversitybc');
    this.sortIntakebc = localStorage.getItem('report_sortIntakebc');
    this.sortReportsbc = localStorage.getItem('report_sortReportbc');
    this.startDate = localStorage.getItem('report_startDate');
    this.endDate = localStorage.getItem('report_endDate');
    this.startDatets = localStorage.getItem('report_startDatets');
    this.endDatets = localStorage.getItem('report_endDatets');
    this.courseIDts_local = localStorage.getItem('report_courseIDts');
    this.sortUniversityts = localStorage.getItem('report_sortUniversityts');
    this.sortPaymentmodets = localStorage.getItem('report_sortPaymentmodets');
    this.sortIntakets = localStorage.getItem('report_sortIntakets');
    this.courseNamets = localStorage.getItem('report_courseNamets');
    this.courseNamebc = localStorage.getItem('report_courseNamebc');
    this.courseName = localStorage.getItem('report_courseName');
    this.modeOfReport = localStorage.getItem('defaultvisibility');
    this.coursename = localStorage.getItem('report_course_name');
    this.coursebranch = localStorage.getItem('report_course_branch');
    this.coursetype = localStorage.getItem('report_course_type');
    this.coursenamets = localStorage.getItem('report_course_name_ts');
    this.coursebranchts = localStorage.getItem('report_course_branch_ts');
    this.coursetypets = localStorage.getItem('report_course_type_ts');
    this.sortcoursename_bc = localStorage.getItem('report_course_name_bc');
    this.sortcoursebranch_bc = localStorage.getItem('report_course_branch_bc');
    this.sortcoursetype_bc = localStorage.getItem('report_course_type_bc');
 

    if (this.modeOfReport == null) {
      this.modeOfReport = 'Invoices';
    }

    if (this.modeOfReport == 'Commutation') {
      this.commutation_report = true;
      this.bookandcertificate_report = false;
      this.invoice_report = false;
      this.startDatets = localStorage.getItem('report_startDatets');
      this.endDatets = localStorage.getItem('report_endDatets');
      
      if(this.courseIDts_local == null){
        this.onTansportFilter_localStorage();
      }else{
        if(this.courseIDts_local != 'ALL'){
          this.courseService
          .getCourse({ _id: this.courseIDts_local })
          .subscribe((data) => {
            this.sortCoursets = data;
            if (this.sortCoursets.branch) {
              this.courseNamets =
                this.sortCoursets.name +
                ' - ( ' +
                this.sortCoursets.branch +
                ' ) - ' +
                this.sortCoursets.courseType;
              localStorage.setItem('report_courseNamets', this.courseNamets);
            } else {
              this.courseNamets =
                this.sortCoursets.name + ' - ' + this.sortCoursets.courseType;
              localStorage.setItem('report_courseNamets', this.courseNamets);
            }
            if (this.sortCoursets) {
              this.coursenamets = this.sortCoursets.name;
              this.coursebranchts = this.sortCoursets.branch;
              this.coursetypets = this.sortCoursets.courseType;
              localStorage.setItem('report_course_name_ts', this.sortCoursets.name);
              localStorage.setItem(
                'report_course_branch_ts',
                this.sortCoursets.branch
              );
              localStorage.setItem(
                'report_course_type_ts',
                this.sortCoursets.courseType
              );
            }
            this.onTansportFilter_localStorage();
          });
          
        }else{
          this.courseNamets = 'ALL';
          this.onTansportFilter_localStorage();
        }

      }
    }

    
    if (this.modeOfReport == 'Invoices') {
      this.invoice_report = true;
      this.bookandcertificate_report = false;
      this.commutation_report = false;
      this.startDate = localStorage.getItem('report_startDate');
      this.endDate = localStorage.getItem('report_endDate');
      if(this.courseID_local == null){
        
        this.onInvoiceFilter_localStorage();
      }else{
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
              localStorage.setItem('report_courseName', this.courseName);
            } else {
              this.courseName =
                this.sortCourse.name + ' - ' + this.sortCourse.courseType;
              localStorage.setItem('report_courseName', this.courseName);
            }
            if (this.sortCourse) {
              this.coursename = this.sortCourse.name;
              this.coursebranch = this.sortCourse.branch;
              this.coursetype = this.sortCourse.courseType;
              localStorage.setItem('report_course_name', this.sortCourse.name);
              localStorage.setItem('report_course_branch', this.sortCourse.branch);
              localStorage.setItem(
                'report_course_type',
                this.sortCourse.courseType
              );
            }
            this.onInvoiceFilter_localStorage();
          });
          
        }else{
         
          this.courseName = 'ALL';
          this.onInvoiceFilter_localStorage();
          // this.local_Storage_Sort();
        }

      }
    }
    
    this.getCourses();
    this.getCenters();
    this.getBoardorUniversities();




    this.lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

   
  }

  report_type_bookorcert;
  reload() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['./'], { relativeTo: this.aRoute });
  }
  onSelectreport(n) {
    this.report_type_bookorcert = n.target.value;
    if (this.report_type_bookorcert == 'Books') {
      this.statusofbook = true;
      this.statusofcertificate = false;
      this.reportstype = 'BOOK';
      // this.filterForm.patchValue({ sort_intake: null });
      // this.filterForm.patchValue({ sort_university: null });
      // this.filterForm.patchValue({ sort_course: null });

      this.getallBook();
    }
    if (this.report_type_bookorcert == 'Certificates') {
      this.statusofbook = false;
      this.statusofcertificate = true;
      // this.filterForm.patchValue({ sort_intake: null });
      // this.filterForm.patchValue({ sort_university: null });
      // this.filterForm.patchValue({ sort_course: null });

      this.reportstype = 'CERTIFICATE';
      this.getallCertificate(); //3
    }
    if (this.report_type_bookorcert == 'Invoices') {
      this.invoice_report = true;
      this.bookandcertificate_report = false;
      this.commutation_report = false;
      // this.startDatets = localStorage.getItem('report_startDatets');
      // this.endDatets = localStorage.getItem('report_endDatets');
      this.startDate = localStorage.getItem('report_startDate');
      this.endDate = localStorage.getItem('report_endDate');
    }
  }
  onClickReport(m) {
    let report_type = m.target.value;
    if (report_type == 'Invoices') {
      this.invoice_report = true;
      this.bookandcertificate_report = false;
      this.commutation_report = false;
      // this.startDatets = localStorage.getItem('report_startDatets');
      // this.endDatets = localStorage.getItem('report_endDatets');
      this.startDate = localStorage.getItem('report_startDate');
      this.endDate = localStorage.getItem('report_endDate');
      if (this.startDate && this.endDate) {
        this.showFilterOptions = true;

      }
    }
    if (report_type == 'Books & Certificates') {
      this.bookandcertificate_report = true;
      this.invoice_report = false;
      this.commutation_report = false;
      this.startDatets = localStorage.getItem('report_startDatets');
      this.endDatets = localStorage.getItem('report_endDatets');
      this.startDate = localStorage.getItem('report_startDate');
      this.endDate = localStorage.getItem('report_endDate');
    }
    if (report_type == 'Commutation') {
      this.commutation_report = true;
      this.bookandcertificate_report = false;
      this.invoice_report = false;
      // this.startDate = localStorage.getItem('report_startDate');
      // this.endDate = localStorage.getItem('report_endDate');
      this.startDatets = localStorage.getItem('report_startDatets');
      this.endDatets = localStorage.getItem('report_endDatets');
    }
  }
  getStudentsWithALLDetails() {
    this.studentService.getStudentsWithALLDetails().subscribe((data) => {
      this.students = data;
      if (this.sortReportsbc == 'Books') {
        this.statusofbook = true;
        this.statusofcertificate = false;
        this.reportstype = 'BOOK';
       
        this.getallBook();
      }
      if (this.sortReportsbc == 'Certificates') {
        this.statusofbook = false;
        this.statusofcertificate = true;
       
        this.reportstype = 'CERTIFICATE';
        this.getallCertificate(); //1
      }
    });
  }

  getallBook() {
    
    this.collectionFlowService.getallBook().subscribe((data) => {
      this.books = data;
      this.booksandcertificate = [];
      for (let m = 0; m < this.books.length; m++) {
        this.booksandcertificate.push(this.books[m]);
      }
      this.studentslist1 = [];
      this.studentslist2 = [];
      this.studentslist = [];

      this.getstudentlist();
    });
  }
  cn = [];

  getallCertificate() {
    this.collectionFlowService.getallCertificate().subscribe((data) => {
      this.certificates = data;
      this.booksandcertificate = [];
      for (let n = 0; n < this.certificates.length; n++) {
        this.booksandcertificate.push(this.certificates[n]);
      }
      this.studentslist1 = [];
      this.studentslist2 = [];
      this.studentslist = [];
      this.getstudentlist();
    });
  }
  getstudentlist() {
    for (let k = 0; k < this.booksandcertificate.length; k++) {
      if(this.booksandcertificate[k].studentId.tally_ID=='undefined')
      {
        this.studentslist1.push({
          studentId: this.booksandcertificate[k].studentId,
          id: this.booksandcertificate[k].studentId._id,
          name:
            this.booksandcertificate[k].studentId.firstName +
            ' ' +
            this.booksandcertificate[k].studentId.lastName,
          regno: this.booksandcertificate[k].studentId.university_register_number,
          tallyid:'',
          center:this.booksandcertificate[k].studentId.centers,
          collectedOn: this.booksandcertificate[k].collectedOn,
          remarks: this.booksandcertificate[k].remarks,
          type: this.booksandcertificate[k].collectionType,

        });

      }
      else{
        this.studentslist1.push({
          studentId: this.booksandcertificate[k].studentId,
          id: this.booksandcertificate[k].studentId._id,
          name:
            this.booksandcertificate[k].studentId.firstName +
            ' ' +
            this.booksandcertificate[k].studentId.lastName,
          regno: this.booksandcertificate[k].studentId.university_register_number,
          tallyid:this.booksandcertificate[k].studentId.tally_ID,
          center:this.booksandcertificate[k].studentId.centers,
          collectedOn: this.booksandcertificate[k].collectedOn,
          remarks: this.booksandcertificate[k].remarks,
          type: this.booksandcertificate[k].collectionType,

        });

      }



       }

    for (let a = 0; a < this.students.length; a++) {
      if( this.students[a].tally_ID=='undefined')
      {
        this.studentslist2.push({
          studentId: this.students[a],
          id: this.students[a]._id,
          name: this.students[a].firstName + ' ' + this.students[a].lastName,
          regno: this.students[a].university_register_number,
          tallyid:'',
          center:this.students[a].centers,
          collectedOn: '',
          remarks: 'NIL',
          type: 'NIL',
        });
      }
      else{
        this.studentslist2.push({
          studentId: this.students[a],
          id: this.students[a]._id,
          name: this.students[a].firstName + ' ' + this.students[a].lastName,
          regno: this.students[a].university_register_number,
          tallyid:this.students[a].tally_ID,
          center:this.students[a].centers,
          collectedOn: '',
          remarks: 'NIL',
          type: 'NIL',
        });

      }
        }



    var res1 = this.studentslist2.filter(
      (item1) => !this.studentslist1.some((item2) => item2.id === item1.id)
    );
    for (let p = 0; p < res1.length; p++) {

      if(!res1[p].studentId.closingType){
        this.studentslist1.push(res1[p]);

      }
    }
if (this.modeOfReport == 'Book & Certificate') {
  this.bookandcertificate_report = true;
  this.invoice_report = false;
  this.commutation_report = false;
  
  if(this.courseIDbc_local == null){
    this.onBookandcertsFilter_localStorage();
  }else{
    if(this.courseIDbc_local != 'ALL'){
      this.courseService
      .getCourse({ _id: this.courseIDbc_local })
      .subscribe((data) => {
        this.sortCoursebc = data;
        if (this.sortCoursebc.branch) {
          this.courseNamebc =
            this.sortCoursebc.name +
            ' - ( ' +
            this.sortCoursebc.branch +
            ' ) - ' +
            this.sortCoursebc.courseType;
          localStorage.setItem('report_courseNamebc', this.courseNamebc);
        } else {
          this.courseNamebc =
            this.sortCoursebc.name + ' - ' + this.sortCoursebc.courseType;
          localStorage.setItem('report_courseNamebc', this.courseNamebc);
        }
        if (this.sortCoursebc) {
          this.sortcoursename_bc = this.sortCoursebc.name;
          this.sortcoursebranch_bc = this.sortCoursebc.branch;
          this.sortcoursetype_bc = this.sortCoursebc.courseType;
          localStorage.setItem('report_course_name_bc', this.sortCoursebc.name);
          localStorage.setItem(
            'report_course_branch_bc',
            this.sortCoursebc.branch
          );
          localStorage.setItem(
            'report_course_type_bc',
            this.sortCoursebc.courseType
          );
        }
        this.onBookandcertsFilter_localStorage();
      });
    }else{
      this.courseNamebc = 'ALL';
      this.onBookandcertsFilter_localStorage();
    }

  }
}

  }

  get d() {
    return this.dateForm.controls;
  }

  get ts() {
    return this.dateFormts.controls;
  }
  total=0;
  getAllInvoicesBtwDateswithStudentsdemo(
    sDate,
    eDate,
    paymentmode,
    university,
    intake,
    coursename,
    coursebranch,
    coursetype
  ) {
    this.totalRemittedfee=0

    this.invoiceService
      .getAllInvoicesBtwDateswithStudentsdemo(
        sDate,
        eDate,
        paymentmode,
        university,
        intake,
        coursename,
        coursebranch,
        coursetype
      )
      .subscribe((data) => {
        this.showtable = true;
        this.filtered_invoices=data;
        this.totalRemittedfee=this.filtered_invoices[this.filtered_invoices.length-1].totalremittedamount
        data.pop();
        this.filtered_invoices=data;


      });
  }
  getAllInvoicesBtwDateswithStudentswithonlycoursename(
    sDate,
    eDate,
    paymentmode,
    university,
    intake,
    coursename,
    coursetype

  ) {
    // this.totalRemittedfee=0
    this.invoiceService
      .getAllInvoicesBtwDateswithStudentsdemoWithCourseonly(
        sDate,
        eDate,
        paymentmode,
        university,
        intake,
        coursename,
        coursetype

      )
      .subscribe((data) => {
        this.showtable = true;
        this.filtered_invoices = data;
        this.totalRemittedfee=this.filtered_invoices[this.filtered_invoices.length-1].totalremittedamount
        data.pop();
        this.filtered_invoices=data;



      });
  }

  getAllInvoicesBtwDateswithStudentsdemots(
    sDate,
    eDate,
    paymentmode,
    university,
    intake,
    coursename,
    coursebranch,
    coursetype
  ) {

    this.filtered_invoicests = []

    this.invoiceService
      .getAllInvoicesBtwDateswithStudentsdemots(
        sDate,
        eDate,
        paymentmode,
        university,
        intake,
        coursename,
        coursebranch,
        coursetype
      )
      .subscribe((data) => {
        this.showtable = true;
        this.filtered_invoicests = data;

        this.totalRemittedfeeoftrasnport=this.filtered_invoicests[this.filtered_invoicests.length-1].totalremittedamount;
        data.pop();
        this.filtered_invoicests=data;


      });
  }
  getAllInvoicesBtwDateswithStudentswithonlycoursenamets(
    sDate,
    eDate,
    paymentmode,
    university,
    intake,
    coursename,
    coursetype
  ) {
    this.filtered_invoicests = []

    this.totalRemittedfeeoftrasnport=0
    this.invoiceService
      .getAllInvoicesBtwDateswithStudentswithonlycoursenamets(
        sDate,
        eDate,
        paymentmode,
        university,
        intake,
        coursename,
        coursetype
      )
      .subscribe((data) => {
        this.showtable = true;
        this.filtered_invoicests = data;
        this.totalRemittedfeeoftrasnport=this.filtered_invoicests[this.filtered_invoicests.length-1].totalremittedamount
        data.pop();
        this.filtered_invoicests=data;

      });
  }


  getAllInvoicesBtwDateswithStudents(sDate, eDate) {
    this.invoices = [];
    this.filtered_invoices = [];
    this.invoiceService
      .getAllInvoicesBtwDateswithStudents(sDate, eDate)
      .subscribe((data) => {
        for (var i in data) {
          this.invoices.push(data[i]);
        }
        this.filtered_invoices = this.invoices;
        this.filtered_invoices.reverse();
        this.showtable = true;
        if (this.courseID_local == null) {

          this.isLoading = true;
        } else {
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

                localStorage.setItem(
                  'report_courseNameinvoice',
                  this.courseName
                );
              } else {
                this.courseName =
                  this.sortCourse.name + ' - ' + this.sortCourse.courseType;

                localStorage.setItem(
                  'report_courseNameinvoice',
                  this.courseName
                );
              }
              // this.local_Storage_Sort();

              this.isLoading = true;
            });
        }
      });

  }
  local_Storage_Sort() {
    if (
      this.sortPaymentmode &&
      this.sortUniversity &&
      this.sortCourse &&
      this.sortIntake
    ) {
      this.filtered_invoices = this.invoices.filter((x: any) => {
        let date1 = new Date(x.studentId.intake);
        date1.setMonth(date1.getMonth() + 1);
        var d = new Date(date1),
          month = '' + d.getMonth(),
          year = '' + d.getFullYear();

        if (month.length < 2) month = '0' + month;

        let convertedintake = [year, month].join('-');
        if (
          x.paymentMode == this.sortPaymentmode &&
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
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    } else if (this.sortPaymentmode && this.sortUniversity && this.sortCourse) {
      this.filtered_invoices = this.invoices.filter(
        (x) =>
          x.paymentMode == this.sortPaymentmode &&
          x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversity &&
          x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
          x.studentId.studentCourse[0].course_type ==
            this.sortCourse.courseType &&
          x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
      );
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    } else if (this.sortPaymentmode && this.sortUniversity && this.sortIntake) {
      this.filtered_invoices = this.invoices.filter((x: any) => {
        let date1 = new Date(x.studentId.intake);
        date1.setMonth(date1.getMonth() + 1);
        var d = new Date(date1),
          month = '' + d.getMonth(),
          year = '' + d.getFullYear();
        if (month.length < 2) month = '0' + month;
        let convertedintake = [year, month].join('-');
        if (
          x.paymentMode == this.sortPaymentmode &&
          x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversity &&
          convertedintake == this.sortIntake
        ) {
          return x;
        }
      });
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    } else if (this.sortPaymentmode && this.sortCourse && this.sortIntake) {
      this.filtered_invoices = this.invoices.filter((x: any) => {
        let date1 = new Date(x.studentId.intake);
        date1.setMonth(date1.getMonth() + 1);
        var d = new Date(date1),
          month = '' + d.getMonth(),
          year = '' + d.getFullYear();
        if (month.length < 2) month = '0' + month;
        let convertedintake = [year, month].join('-');
        if (
          x.paymentMode == this.sortPaymentmode &&
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
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    } else if (this.sortPaymentmode && this.sortUniversity) {
      this.filtered_invoices = this.invoices.filter(
        (x) =>
          x.paymentMode == this.sortPaymentmode &&
          x.studentId.studentCourse[0].boardOrUniversity == this.sortUniversity
      );
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    } else if (this.sortPaymentmode && this.sortCourse) {
      this.filtered_invoices = this.invoices.filter(
        (x) =>
          x.paymentMode == this.sortPaymentmode &&
          x.studentId.studentCourse[0].course_name == this.sortCourse.name &&
          x.studentId.studentCourse[0].course_type ==
            this.sortCourse.courseType &&
          x.studentId.studentCourse[0].course_branch == this.sortCourse.branch
      );
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    } else if (this.sortPaymentmode && this.sortIntake) {
      this.filtered_invoices = this.invoices.filter((x: any) => {
        let date1 = new Date(x.studentId.intake);
        date1.setMonth(date1.getMonth() + 1);
        var d = new Date(date1),
          month = '' + d.getMonth(),
          year = '' + d.getFullYear();

        if (month.length < 2) month = '0' + month;

        let convertedintake = [year, month].join('-');
        if (
          x.paymentMode == this.sortPaymentmode &&
          convertedintake == this.sortIntake
        ) {
          return x;
        }
      });
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    } else if (this.sortPaymentmode) {
      this.filtered_invoices = this.invoices.filter(
        (x) => x.paymentMode == this.sortPaymentmode
      );
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
    }
  }

  get f() {
    return this.filterForm.controls;
  }
  get bc() {
    return this.filterFormbc.controls;
  }

  getCourses() {
    if (this.modeOfReport == 'Commutation'){
      if(this.sortUniversityts == null || this.sortUniversityts == 'ALL'){
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
      }else if(this.sortUniversityts != 'ALL'){
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
              // if (this.modeOfReport == 'Commutation') {
                if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversityts){
                  this.allCourses.push(data[i]);
                }

              // }
              // if (this.modeOfReport == 'Book & Certificate') {
              //   if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversitybc){
              //     this.allCourses.push(data[i]);
              //   }
              // }
              // if (this.modeOfReport == 'Invoices') {
              //   if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversity){
              //     this.allCourses.push(data[i]);
              //   }
              // }


            }
          }
          this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
        });
      }

    }
    if (this.modeOfReport == 'Book & Certificate') {
      if(this.sortUniversitybc == null || this.sortUniversitybc == 'ALL'){
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
      }else if(this.sortUniversitybc != 'ALL'){
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
              // if (this.modeOfReport == 'Commutation') {
              //   if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversityts){
              //     this.allCourses.push(data[i]);
              //   }

              // }
              // if (this.modeOfReport == 'Book & Certificate') {
                if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversitybc){
                  this.allCourses.push(data[i]);
                }
              // }
              // if (this.modeOfReport == 'Invoices') {
              //   if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversity){
              //     this.allCourses.push(data[i]);
              //   }
              // }


            }
          }
          this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
        });
      }
    }
    if (this.modeOfReport == 'Invoices') {

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
      }else if(this.sortUniversity != 'ALL'){
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
  getSortUniversitybc(event) {
    this.sortUniversitybc = event.target.value;
    localStorage.setItem('report_sortUniversitybc', this.sortUniversitybc);
    if(this.sortUniversitybc != 'ALL'){
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
            if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversitybc){
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
  getSortCoursebc(event) {
    this.courseIDbc_local = event.target.value;
    localStorage.setItem('report_courseIDbc', this.courseIDbc_local);
    if(this.courseIDbc_local != 'ALL'){
      this.courseService
      .getCourse({ _id: this.courseIDbc_local })
      .subscribe((data) => {
        this.sortCoursebc = data;
        if (this.sortCoursebc.branch) {
          this.courseNamebc =
            this.sortCoursebc.name +
            ' - ( ' +
            this.sortCoursebc.branch +
            ' ) - ' +
            this.sortCoursebc.courseType;
          localStorage.setItem('report_courseNamebc', this.courseNamebc);
        } else {
          this.courseNamebc =
            this.sortCoursebc.name + ' - ' + this.sortCoursebc.courseType;
          localStorage.setItem('report_courseNamebc', this.courseNamebc);
        }
        if (this.sortCoursebc) {
          this.sortcoursename_bc = this.sortCoursebc.name;
          this.sortcoursebranch_bc = this.sortCoursebc.branch;
          this.sortcoursetype_bc = this.sortCoursebc.courseType;
          localStorage.setItem('report_course_name_bc', this.sortCoursebc.name);
          localStorage.setItem(
            'report_course_branch_bc',
            this.sortCoursebc.branch
          );
          localStorage.setItem(
            'report_course_type_bc',
            this.sortCoursebc.courseType
          );
        }
      });
    }else{
      this.courseNamebc = 'ALL';
      this.sortcoursename_bc = 'ALL';
      this.sortcoursebranch_bc = 'ALL';
      this.sortcoursetype_bc = 'ALL';
      localStorage.setItem('report_course_name_bc', this.sortcoursename_bc);
      localStorage.setItem(
        'report_course_branch_bc',
        this.sortcoursebranch_bc
      );
      localStorage.setItem(
        'report_course_type_bc',
        this.sortcoursetype_bc
      );
    }


  }
  getSortReporttype(event) {
    this.sortReportbc = event.target.value;
    localStorage.setItem('report_sortReportbc', this.sortReportbc);
    if (this.sortReportbc == 'Books') {
      this.statusofbook = true;
      this.statusofcertificate = false;
      this.reportstype = 'BOOK';
      // this.filterForm.patchValue({ sort_intake: null });
      // this.filterForm.patchValue({ sort_university: null });
      // this.filterForm.patchValue({ sort_course: null });

      this.getallBook();
    }
    if (this.sortReportbc == 'Certificates') {
      this.statusofbook = false;
      this.statusofcertificate = true;
      // this.filterForm.patchValue({ sort_intake: null });
      // this.filterForm.patchValue({ sort_university: null });
      // this.filterForm.patchValue({ sort_course: null });

      this.reportstype = 'CERTIFICATE';
      this.getallCertificate(); //2
    }
  }
  getSortIntakebc(event) {
    this.sortIntakebc = event.target.value;
    console.log(this.sortIntakebc,"bok")
    localStorage.setItem('report_sortIntakebc', this.sortIntakebc);
  }

  getSortUniversity(event) {
    this.sortUniversity = event.target.value;
    localStorage.setItem('report_sortUniversity', this.sortUniversity);
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
    localStorage.setItem('report_courseID', this.courseID_local);
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
          localStorage.setItem('report_courseName', this.courseName);
        } else {
          this.courseName =
            this.sortCourse.name + ' - ' + this.sortCourse.courseType;
          localStorage.setItem('report_courseName', this.courseName);
        }
        if (this.sortCourse) {
          this.coursename = this.sortCourse.name;
          this.coursebranch = this.sortCourse.branch;
          this.coursetype = this.sortCourse.courseType;
          localStorage.setItem('report_course_name', this.sortCourse.name);
          localStorage.setItem('report_course_branch', this.sortCourse.branch);
          localStorage.setItem(
            'report_course_type',
            this.sortCourse.courseType
          );
        }
      });
    }else{
      this.courseName = 'ALL';
      this.coursename = 'ALL';
      this.coursebranch = 'ALL';
      this.coursetype = 'ALL';
      localStorage.setItem('report_course_name', this.coursename);
      localStorage.setItem('report_course_branch', this.coursebranch);
          localStorage.setItem(
            'report_course_type',
            this.coursetype
          );
    }
    
  }
  getSortIntake(event) {
    this.sortIntake = event.target.value;
    if(!this.sortIntake){
      this.sortIntake = null;
    }
    console.log(this.sortIntake,"in")
    localStorage.setItem('report_sortIntake', this.sortIntake);
  }
  getPaymentMode(event) {
    this.sortPaymentmode = event.target.value;
    localStorage.setItem('report_sortPaymentmode', this.sortPaymentmode);
  }
  getSortUniversityts(event) {
    this.sortUniversityts = event.target.value;
    localStorage.setItem('report_sortUniversityts', this.sortUniversityts);

    if(this.sortUniversityts != 'ALL'){
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
            if(data[i].boardOrUniversity.boardoruniveristy == this.sortUniversityts){
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

  getSortCoursets(event) {
    this.courseIDts_local = event.target.value;
    localStorage.setItem('report_courseIDts', this.courseIDts_local);
    if(this.courseIDts_local != 'ALL'){
      this.courseService
      .getCourse({ _id: this.courseIDts_local })
      .subscribe((data) => {
        this.sortCoursets = data;
        if (this.sortCoursets.branch) {
          this.courseNamets =
            this.sortCoursets.name +
            ' - ( ' +
            this.sortCoursets.branch +
            ' ) - ' +
            this.sortCoursets.courseType;
          localStorage.setItem('report_courseNamets', this.courseNamets);
        } else {
          this.courseNamets =
            this.sortCoursets.name + ' - ' + this.sortCoursets.courseType;
          localStorage.setItem('report_courseNamets', this.courseNamets);
        }
        if (this.sortCoursets) {
          this.coursenamets = this.sortCoursets.name;
          this.coursebranchts = this.sortCoursets.branch;
          this.coursetypets = this.sortCoursets.courseType;
          localStorage.setItem('report_course_name_ts', this.sortCoursets.name);
          localStorage.setItem(
            'report_course_branch_ts',
            this.sortCoursets.branch
          );
          localStorage.setItem(
            'report_course_type_ts',
            this.sortCoursets.courseType
          );
        }
      });
    }else{
      this.courseNamets = 'ALL';
      this.coursenamets = 'ALL';
      this.coursebranchts = 'ALL';
      this.coursetypets = 'ALL';
      localStorage.setItem('report_course_name_ts', this.coursenamets);
      localStorage.setItem('report_course_branch_ts', this.coursebranchts);
          localStorage.setItem(
            'report_course_type_ts',
            this.coursetypets
          );
    }
    
  }

  getSortIntakets(event) {
    this.sortIntakets = event.target.value;
    if(!this.sortIntakets){
      this.sortIntakets = null;
    }
    console.log(this.sortIntakets,"ts")
    localStorage.setItem('report_sortIntakets', this.sortIntakets);
  }
  getPaymentModets(event) {
    this.sortPaymentmodets = event.target.value;

    localStorage.setItem('report_sortPaymentmodets', this.sortPaymentmodets);
  }

  onFilterClickInvoiceReport() {
    localStorage.setItem('defaultvisibility', 'Invoices');
    localStorage.removeItem('report_courseName');
    localStorage.removeItem('report_sortReport');
    localStorage.removeItem('report_courseID');
    localStorage.removeItem('report_sortUniversity');
    localStorage.removeItem('report_sortIntake');
    localStorage.removeItem('report_courseNameinvoice');
    localStorage.removeItem('report_sortPaymentmode');
    localStorage.removeItem('report_course_name');
    localStorage.removeItem('report_course_branch');
    localStorage.removeItem('report_course_type');
    this.reload();
    this.ngOnInit();
  }
  onFilterClickTransportReport() {
    localStorage.setItem('defaultvisibility', 'Commutation');
    localStorage.removeItem('report_courseNamets');
    localStorage.removeItem('report_sortPaymentmodets');
    localStorage.removeItem('report_courseIDts');
    localStorage.removeItem('report_sortUniversityts');
    localStorage.removeItem('report_sortIntakets');
    localStorage.removeItem('report_course_name_ts');
    localStorage.removeItem('report_course_branch_ts');
    localStorage.removeItem('report_course_type_ts');

    this.reload();
    this.ngOnInit();

  }
  onFilterClickBookandCertsReport() {
    localStorage.setItem('defaultvisibility', 'Book & Certificate');
    localStorage.removeItem('report_courseNamebc');
    localStorage.removeItem('report_sortReportbc');
    localStorage.removeItem('report_courseIDbc');
    localStorage.removeItem('report_sortUniversitybc');
    localStorage.removeItem('report_sortIntakebc');
    localStorage.removeItem('report_course_name_bc');
    localStorage.removeItem('report_course_branch_bc');
    localStorage.removeItem('report_course_type_bc');

    // this.route.navigate(['report-management/']);
    this.reload();
    this.ngOnInit();

  }

  onBookandcertsFilterClick() {
    this.filtered_reports = this.studentslist1;
    localStorage.setItem('defaultvisibility', 'Book & Certificate');

    if (this.sortUniversitybc && this.sortcoursename_bc && this.sortIntakebc) {
      if(this.sortUniversitybc == 'ALL' && this.sortcoursename_bc == 'ALL'){
        this.filtered_reports = [];

          this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;
          let convertedintake = [year, month].join('-');
          if (
            convertedintake == this.sortIntakebc
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
      }else if(this.sortUniversitybc == 'ALL'){
          if(this.sortcoursebranch_bc){
            this.filtered_reports = [];

            this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();

            if (month.length < 2) month = '0' + month;
            let convertedintake = [year, month].join('-');
            if (
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
              x.studentId.studentCourse[0].course_branch ==
                this.sortcoursebranch_bc &&
              convertedintake == this.sortIntakebc
            ) {
              return x;
            }
            });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
          }else{
          this.filtered_reports = [];

          this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;
          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
            x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&

            convertedintake == this.sortIntakebc
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
          }
      }else if(this.sortcoursename_bc == 'ALL'){
        this.filtered_reports = [];

        this.filtered_reports = this.studentslist1.filter((x: any) => {
        let date1 = new Date(x.studentId.intake);
        date1.setMonth(date1.getMonth() + 1);
        var d = new Date(date1),
          month = '' + d.getMonth(),
          year = '' + d.getFullYear();

        if (month.length < 2) month = '0' + month;
        let convertedintake = [year, month].join('-');
        if (
          x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversitybc &&

          convertedintake == this.sortIntakebc
        ) {
          return x;
        }
        });
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
      }else{
        if(this.sortcoursebranch_bc){
          this.filtered_reports = [];

          this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;
          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversitybc &&
            x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
            x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
            x.studentId.studentCourse[0].course_branch ==
              this.sortcoursebranch_bc &&
            convertedintake == this.sortIntakebc
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
        }else{
        this.filtered_reports = [];

        this.filtered_reports = this.studentslist1.filter((x: any) => {
        let date1 = new Date(x.studentId.intake);
        date1.setMonth(date1.getMonth() + 1);
        var d = new Date(date1),
          month = '' + d.getMonth(),
          year = '' + d.getFullYear();

        if (month.length < 2) month = '0' + month;
        let convertedintake = [year, month].join('-');
        if (
          x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversitybc &&
          x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
          x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&

          convertedintake == this.sortIntakebc
        ) {
          return x;
        }
        });
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
        }
        
      }

    }else if (this.sortUniversitybc && this.sortcoursename_bc) {
      if(this.sortUniversitybc == 'ALL' && this.sortcoursename_bc == 'ALL'){
        this.filtered_reports = [];

          this.filtered_reports = this.studentslist1;
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
      }else if(this.sortUniversitybc == 'ALL'){
          if(this.sortcoursebranch_bc){
            this.filtered_reports = [];

            this.filtered_reports = this.studentslist1.filter((x: any) => {

            if (
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
              x.studentId.studentCourse[0].course_branch ==
                this.sortcoursebranch_bc

            ) {
              return x;
            }
            });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
          }else{
          this.filtered_reports = [];

          this.filtered_reports = this.studentslist1.filter((x: any) => {

          if (
            x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
            x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
          }
      }else if(this.sortcoursename_bc == 'ALL'){
        this.filtered_reports = [];

        this.filtered_reports = this.studentslist1.filter((x: any) => {

        if (
          x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversitybc

        ) {
          return x;
        }
        });
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
      }else{
        if(this.sortcoursebranch_bc){
            this.filtered_reports = [];

            this.filtered_reports = this.studentslist1.filter((x: any) => {

            if (
              x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc &&
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
              x.studentId.studentCourse[0].course_branch ==
                this.sortcoursebranch_bc

            ) {
              return x;
            }
            });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }else{
        this.filtered_reports = [];

        this.filtered_reports = this.studentslist1.filter((x: any) => {

        if (
          x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversitybc &&
          x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
          x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc
        ) {
          return x;
        }
        });
      this.filtered_invoices_count = this.filtered_invoices.length;
      this.showtable = true;
        }
      }




   

    }else if (this.sortIntakebc && this.sortcoursename_bc) {
      if(this.sortcoursename_bc == 'ALL'){
          this.filtered_reports = [];

          this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();

            if (month.length < 2) month = '0' + month;

            let convertedintake = [year, month].join('-');
            if (
              convertedintake == this.sortIntakebc
            ) {
              return x;
            }
          });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
      }else{
        this.filtered_reports = [];
          if(this.sortcoursebranch_bc){

            this.filtered_reports = this.studentslist1.filter((x: any) => {
              let date1 = new Date(x.studentId.intake);
              date1.setMonth(date1.getMonth() + 1);
              var d = new Date(date1),
                month = '' + d.getMonth(),
                year = '' + d.getFullYear();

              if (month.length < 2) month = '0' + month;

              let convertedintake = [year, month].join('-');
              if (
                x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                x.studentId.studentCourse[0].course_branch ==
                  this.sortcoursebranch_bc &&
                convertedintake == this.sortIntakebc
              ) {
                return x;
              }
            });
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
          }else{
            this.filtered_reports = this.studentslist1.filter((x: any) => {
              let date1 = new Date(x.studentId.intake);
              date1.setMonth(date1.getMonth() + 1);
              var d = new Date(date1),
                month = '' + d.getMonth(),
                year = '' + d.getFullYear();

              if (month.length < 2) month = '0' + month;

              let convertedintake = [year, month].join('-');
              if (
                x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                convertedintake == this.sortIntakebc
              ) {
                return x;
              }
            });
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
          }
      }




    }else if (this.sortUniversitybc && this.sortIntakebc) {
      if(this.sortUniversitybc == 'ALL'){
        this.filtered_reports = [];
        this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            convertedintake == this.sortIntakebc
          ) {
            return x;
          }
        });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
      }else{
        this.filtered_reports = [];
        this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc &&
            convertedintake == this.sortIntakebc
          ) {
            return x;
          }
        });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
      }

    }else if (this.sortUniversitybc) {
      if(this.sortUniversitybc == 'ALL'){
       
        this.filtered_reports = [];
        this.filtered_reports = this.studentslist1;
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
      }else{
        this.filtered_reports = [];
        this.filtered_reports = this.studentslist1.filter(
          (x) =>
            x.studentId.studentCourse[0].boardOrUniversity ==
            this.sortUniversitybc
        );
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
      }

    }else if (this.sortcoursename_bc) {
      if(this.sortcoursename_bc == 'ALL'){
        this.filtered_reports = [];

        this.filtered_reports = this.studentslist1;
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
      }else{
        if(this.sortcoursebranch_bc){
          this.filtered_reports = [];

          this.filtered_reports = this.studentslist1.filter(
            (x) =>
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
              x.studentId.studentCourse[0].course_branch == this.sortcoursebranch_bc
          );
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }else{
          this.filtered_reports = [];

          this.filtered_reports = this.studentslist1.filter(
            (x) =>
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc
          );
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }
      }


     
    }else if (this.sortIntakebc) {
      this.filtered_reports = [];
        this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
          if (convertedintake == this.sortIntakebc) {
            return x;
          }
        });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
    }
  }


  onInvoiceFilterClick() {
    this.total=0;
    this.datesubmitted = true;
    if (this.dateForm.invalid) {
      return;
    }
    localStorage.setItem('defaultvisibility', 'Invoices');

    localStorage.setItem('report_startDate', this.d.startDate.value);
    localStorage.setItem('report_endDate', this.d.endDate.value);
    this.showFilterOptions = true;

    if (!this.coursename) {
      this.coursename = 'undefined';
      this.coursebranch = 'undefined';
      this.coursetype = 'undefined';
    }
    if(this.courseID_local == 'ALL'){
      this.coursename = 'ALL';
      this.coursebranch = 'ALL';
      this.coursetype = 'ALL';
    }
   
    if(this.coursename && this.coursebranch&&this.coursetype){
      this.getAllInvoicesBtwDateswithStudentsdemo(
        this.d.startDate.value,
        this.d.endDate.value,
        this.sortPaymentmode,
        this.sortUniversity,
        this.sortIntake,
        this.coursename,
        this.coursebranch,
        this.coursetype
      );
     }
     if(this.coursename&&this.coursetype&&!this.coursebranch)
    {

      this.getAllInvoicesBtwDateswithStudentswithonlycoursename(
        this.d.startDate.value,
        this.d.endDate.value,
        this.sortPaymentmode,
        this.sortUniversity,
        this.sortIntake,
        this.coursename,
        this.coursetype

      );
     }


    }
  onTansportFilterClick() {
  
    localStorage.setItem('defaultvisibility', 'Commutation');

    localStorage.setItem('report_startDatets', this.ts.startDatets.value);
    localStorage.setItem('report_endDatets', this.ts.endDatets.value);
    this.showFilterOptions = true;

    if (!this.coursenamets) {
      this.coursenamets = 'undefined';
      this.coursebranchts = 'undefined';
      this.coursetypets = 'undefined';
    }
    if(this.coursenamets && this.coursebranchts&&this.coursetypets)
    {
      this.getAllInvoicesBtwDateswithStudentsdemots(
        this.ts.startDatets.value,
        this.ts.endDatets.value,
        this.sortPaymentmodets,
        this.sortUniversityts,
        this.sortIntakets,
        this.coursenamets,
        this.coursebranchts,
        this.coursetypets
      );
 }
 if(this.coursenamets&&this.coursetypets&&!this.coursebranchts)
 {
   this.getAllInvoicesBtwDateswithStudentswithonlycoursenamets(
    this.ts.startDatets.value,
    this.ts.endDatets.value,
    this.sortPaymentmodets,
    this.sortUniversityts,
    this.sortIntakets,
    this.coursenamets,
    this.coursetypets

   );
 }



    }


    onBookandcertsFilter_localStorage() {
      this.filtered_reports = this.studentslist1;
      // localStorage.setItem('defaultvisibility', 'Book & Certificate');
      if (this.sortUniversitybc && this.sortcoursename_bc && this.sortIntakebc) {
        if(this.sortUniversitybc == 'ALL' && this.sortcoursename_bc == 'ALL'){
          this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();
  
            if (month.length < 2) month = '0' + month;
            let convertedintake = [year, month].join('-');
            if (
              convertedintake == this.sortIntakebc
            ) {
              return x;
            }
            });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }else if(this.sortUniversitybc == 'ALL'){
            if(this.sortcoursebranch_bc){
              this.filtered_reports = [];
  
              this.filtered_reports = this.studentslist1.filter((x: any) => {
              let date1 = new Date(x.studentId.intake);
              date1.setMonth(date1.getMonth() + 1);
              var d = new Date(date1),
                month = '' + d.getMonth(),
                year = '' + d.getFullYear();
  
              if (month.length < 2) month = '0' + month;
              let convertedintake = [year, month].join('-');
              if (
                x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                x.studentId.studentCourse[0].course_branch ==
                  this.sortcoursebranch_bc &&
                convertedintake == this.sortIntakebc
              ) {
                return x;
              }
              });
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
            }else{
            this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();
  
            if (month.length < 2) month = '0' + month;
            let convertedintake = [year, month].join('-');
            if (
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
  
              convertedintake == this.sortIntakebc
            ) {
              return x;
            }
            });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
            }
        }else if(this.sortcoursename_bc == 'ALL'){
          this.filtered_reports = [];
  
          this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();
  
          if (month.length < 2) month = '0' + month;
          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc &&
  
            convertedintake == this.sortIntakebc
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
        }else{
          if(this.sortcoursebranch_bc){
            this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();
  
            if (month.length < 2) month = '0' + month;
            let convertedintake = [year, month].join('-');
            if (
              x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc &&
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
              x.studentId.studentCourse[0].course_branch ==
                this.sortcoursebranch_bc &&
              convertedintake == this.sortIntakebc
            ) {
              return x;
            }
            });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
          }else{
          this.filtered_reports = [];
  
          this.filtered_reports = this.studentslist1.filter((x: any) => {
          let date1 = new Date(x.studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();
  
          if (month.length < 2) month = '0' + month;
          let convertedintake = [year, month].join('-');
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc &&
            x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
            x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
  
            convertedintake == this.sortIntakebc
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
          }
          
        }
  
      }else if (this.sortUniversitybc && this.sortcoursename_bc) {
        if(this.sortUniversitybc == 'ALL' && this.sortcoursename_bc == 'ALL'){
          this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1;
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }else if(this.sortUniversitybc == 'ALL'){
            if(this.sortcoursebranch_bc){
              this.filtered_reports = [];
  
              this.filtered_reports = this.studentslist1.filter((x: any) => {
  
              if (
                x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                x.studentId.studentCourse[0].course_branch ==
                  this.sortcoursebranch_bc
  
              ) {
                return x;
              }
              });
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
            }else{
            this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1.filter((x: any) => {
  
            if (
              x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
              x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc
            ) {
              return x;
            }
            });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
            }
        }else if(this.sortcoursename_bc == 'ALL'){
          this.filtered_reports = [];
  
          this.filtered_reports = this.studentslist1.filter((x: any) => {
  
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc
  
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
        }else{
          if(this.sortcoursebranch_bc){
              this.filtered_reports = [];
  
              this.filtered_reports = this.studentslist1.filter((x: any) => {
  
              if (
                x.studentId.studentCourse[0].boardOrUniversity ==
                this.sortUniversitybc &&
                x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                x.studentId.studentCourse[0].course_branch ==
                  this.sortcoursebranch_bc
  
              ) {
                return x;
              }
              });
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
          }else{
          this.filtered_reports = [];
  
          this.filtered_reports = this.studentslist1.filter((x: any) => {
  
          if (
            x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc &&
            x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
            x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc
          ) {
            return x;
          }
          });
        this.filtered_invoices_count = this.filtered_invoices.length;
        this.showtable = true;
          }
        }
  
  
  
  
     
  
      }else if (this.sortIntakebc && this.sortcoursename_bc) {
        if(this.sortcoursename_bc == 'ALL'){
            this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1.filter((x: any) => {
              let date1 = new Date(x.studentId.intake);
              date1.setMonth(date1.getMonth() + 1);
              var d = new Date(date1),
                month = '' + d.getMonth(),
                year = '' + d.getFullYear();
  
              if (month.length < 2) month = '0' + month;
  
              let convertedintake = [year, month].join('-');
              if (
                convertedintake == this.sortIntakebc
              ) {
                return x;
              }
            });
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
        }else{
          this.filtered_reports = [];
            if(this.sortcoursebranch_bc){
  
              this.filtered_reports = this.studentslist1.filter((x: any) => {
                let date1 = new Date(x.studentId.intake);
                date1.setMonth(date1.getMonth() + 1);
                var d = new Date(date1),
                  month = '' + d.getMonth(),
                  year = '' + d.getFullYear();
  
                if (month.length < 2) month = '0' + month;
  
                let convertedintake = [year, month].join('-');
                if (
                  x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                  x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                  x.studentId.studentCourse[0].course_branch ==
                    this.sortcoursebranch_bc &&
                  convertedintake == this.sortIntakebc
                ) {
                  return x;
                }
              });
              this.filtered_invoices_count = this.filtered_invoices.length;
              this.showtable = true;
            }else{
              this.filtered_reports = this.studentslist1.filter((x: any) => {
                let date1 = new Date(x.studentId.intake);
                date1.setMonth(date1.getMonth() + 1);
                var d = new Date(date1),
                  month = '' + d.getMonth(),
                  year = '' + d.getFullYear();
  
                if (month.length < 2) month = '0' + month;
  
                let convertedintake = [year, month].join('-');
                if (
                  x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                  x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                  convertedintake == this.sortIntakebc
                ) {
                  return x;
                }
              });
              this.filtered_invoices_count = this.filtered_invoices.length;
              this.showtable = true;
            }
        }
  
  
  
  
      }else if (this.sortUniversitybc && this.sortIntakebc) {
        if(this.sortUniversitybc == 'ALL'){
          this.filtered_reports = [];
          this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();
  
            if (month.length < 2) month = '0' + month;
  
            let convertedintake = [year, month].join('-');
            if (
              convertedintake == this.sortIntakebc
            ) {
              return x;
            }
          });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }else{
          this.filtered_reports = [];
          this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();
  
            if (month.length < 2) month = '0' + month;
  
            let convertedintake = [year, month].join('-');
            if (
              x.studentId.studentCourse[0].boardOrUniversity ==
                this.sortUniversitybc &&
              convertedintake == this.sortIntakebc
            ) {
              return x;
            }
          });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }
  
      }else if (this.sortUniversitybc) {
        if(this.sortUniversitybc == 'ALL'){
         
          this.filtered_reports = [];
          this.filtered_reports = this.studentslist1;
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }else{
          this.filtered_reports = [];
          this.filtered_reports = this.studentslist1.filter(
            (x) =>
              x.studentId.studentCourse[0].boardOrUniversity ==
              this.sortUniversitybc
          );
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }
  
      }else if (this.sortcoursename_bc) {
        if(this.sortcoursename_bc == 'ALL'){
          this.filtered_reports = [];
  
          this.filtered_reports = this.studentslist1;
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
        }else{
          if(this.sortcoursebranch_bc){
            this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1.filter(
              (x) =>
                x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc &&
                x.studentId.studentCourse[0].course_branch == this.sortcoursebranch_bc
            );
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
          }else{
            this.filtered_reports = [];
  
            this.filtered_reports = this.studentslist1.filter(
              (x) =>
                x.studentId.studentCourse[0].course_name == this.sortcoursename_bc &&
                x.studentId.studentCourse[0].course_type == this.sortcoursetype_bc
            );
            this.filtered_invoices_count = this.filtered_invoices.length;
            this.showtable = true;
          }
        }
  
  
       
      }else if (this.sortIntakebc) {
        this.filtered_reports = [];
          this.filtered_reports = this.studentslist1.filter((x: any) => {
            let date1 = new Date(x.studentId.intake);
            date1.setMonth(date1.getMonth() + 1);
            var d = new Date(date1),
              month = '' + d.getMonth(),
              year = '' + d.getFullYear();
  
            if (month.length < 2) month = '0' + month;
  
            let convertedintake = [year, month].join('-');
            if (convertedintake == this.sortIntakebc) {
              return x;
            }
          });
          this.filtered_invoices_count = this.filtered_invoices.length;
          this.showtable = true;
      }
      else{
        this.filtered_reports = this.studentslist1;
          this.showtable = true;
      }
    }
    onInvoiceFilter_localStorage() {
      
      this.total=0;
      this.datesubmitted = true;
      // if (this.dateForm.invalid) {
      //   return;
      // }
      // localStorage.setItem('defaultvisibility', 'Invoices');
  
      // localStorage.setItem('report_startDate', this.d.startDate.value);
      // localStorage.setItem('report_endDate', this.d.endDate.value);
      this.showFilterOptions = true;
  
      if (!this.coursename) {
       
        this.coursename = 'undefined';
        this.coursebranch = 'undefined';
        this.coursetype = 'undefined';
      }
      if(this.courseID_local == 'ALL'){
        this.coursename = 'ALL';
        this.coursebranch = 'ALL';
        this.coursetype = 'ALL';
      }
     
      if(this.coursename && this.coursebranch&&this.coursetype){
       
        this.getAllInvoicesBtwDateswithStudentsdemo(
          this.startDate,
          this.endDate,
          this.sortPaymentmode,
          this.sortUniversity,
          this.sortIntake,
          this.coursename,
          this.coursebranch,
          this.coursetype
        );
       }
       if(this.coursename&&this.coursetype&&!this.coursebranch)
      {
  
        this.getAllInvoicesBtwDateswithStudentswithonlycoursename(
          this.startDate,
          this.endDate,
          this.sortPaymentmode,
          this.sortUniversity,
          this.sortIntake,
          this.coursename,
          this.coursetype
  
        );
       }
  
  
      }


      onTansportFilter_localStorage() {
        // localStorage.setItem('defaultvisibility', 'Commutation');
    
        // localStorage.setItem('report_startDatets', this.ts.startDatets.value);
        // localStorage.setItem('report_endDatets', this.ts.endDatets.value);
        this.showFilterOptions = true;
    
        if (!this.coursenamets) {
          this.coursenamets = 'undefined';
          this.coursebranchts = 'undefined';
          this.coursetypets = 'undefined';
        }
        if(this.coursenamets && this.coursebranchts&&this.coursetypets)
        {
          this.getAllInvoicesBtwDateswithStudentsdemots(
            this.startDatets,
            this.endDatets,
            this.sortPaymentmodets,
            this.sortUniversityts,
            this.sortIntakets,
            this.coursenamets,
            this.coursebranchts,
            this.coursetypets
          );
     }
     if(this.coursenamets&&this.coursetypets&&!this.coursebranchts)
     {
       this.getAllInvoicesBtwDateswithStudentswithonlycoursenamets(
        this.startDatets,
        this.endDatets,
        this.sortPaymentmodets,
        this.sortUniversityts,
        this.sortIntakets,
        this.coursenamets,
        this.coursetypets
    
       );
     }
    
    
    
        } 



  onDatesClickts() {
    this.datestsubmitted = true;
    if (this.dateFormts.invalid) {
      return;
    }
    localStorage.setItem('report_startDatets', this.ts.startDatets.value);
    localStorage.setItem('report_endDatets', this.ts.endDatets.value);
    this.showFilterOptions = true;
    this.invoiceService
      .getinvoicesWithAllStudentswithcommutation(
        this.ts.startDatets.value,
        this.ts.endDatets.value
      )
      .subscribe((data) => {
        this.commutation = data;
      });
  }

  onViewSubmitClick(student: Student) {
    if (this.auth.isAdmin) {
      this.route.navigate(['admissionform-singleview/' + student._id]);
    } else {
      this.route.navigate(['staff-admissionform-singleview/' + student._id]);
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
    var toExcel = document.getElementById('tblData').innerHTML;
    var ctx = {
      table: toExcel,
    };
    var link = document.createElement('a');
    link.download = 'Invoice report' + '.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  clickToExportbookandreport() {
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
    var toExcel = document.getElementById(
      'tblDataofbooksandcertificate'
    ).innerHTML;
    var ctx = {
      table: toExcel,
    };
    var link = document.createElement('a');
    link.download = 'Book and certificate reports' + '.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  clickToExportcommutationreport() {
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
    var toExcel = document.getElementById('tblDataofcommutation').innerHTML;
    var ctx = {
      table: toExcel,
    };
    var link = document.createElement('a');
    link.download = 'Commutation report' + '.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  modeOfName:boolean=false;
  modeOfNamets:boolean=false;
  modeOfNamebc:boolean=false;
  modeOfCenter:boolean=false;
  modeOfCenterbc:boolean=false;
  modeOfRegNO:boolean=false;
  modeOfRegNOts:boolean=false;
  modeOfCenterts:boolean=false;
  modeOfRegNObc:boolean=false;
  modeOfTallyId:boolean=false;
  modeOfTallyIdts:boolean=false;
  modeOfTallyIdbc:boolean=false;
  modeOfPaymentMode:boolean=false;
  modeOfPaymentModets:boolean=false;

  onSortClickTallyId() {
    this.modeOfTallyId=true;
    this.filtered_invoices.sort((a, b) => (Number(a.studentId.tally_ID)
    < Number(b.studentId.tally_ID)? -1 : 1));

  }
  onSortClickTallyIdreverse() {
    this.modeOfTallyId=false;
    this.filtered_invoices.sort((a, b) => (Number(a.studentId.tally_ID)
    > Number(b.studentId.tally_ID)? -1 : 1));

  }
  onSortClickPaymentMode() {
    this.modeOfPaymentMode=true;
    this.filtered_invoices.sort((a, b) => (a.paymentMode
      < b.paymentMode? -1 : 1));



  }
  onSortClickPaymentModereverse() {
    this.modeOfPaymentMode=false;
    this.filtered_invoices.sort((a, b) => (a.paymentMode
      > b.paymentMode? -1 : 1));
 }
 onSortClickPaymentModets() {
  this.modeOfPaymentModets=true;
  this.filtered_invoicests.sort((a, b) => (a.paymentMode
    < b.paymentMode? -1 : 1));



}
onSortClickPaymentModereversets() {
  this.modeOfPaymentModets=false;
  this.filtered_invoicests.sort((a, b) => (a.paymentMode
    > b.paymentMode? -1 : 1));


}
  onSortClickTallyIdts() {
    this.modeOfTallyIdts=true;
    this.filtered_invoicests.sort((a, b) => (Number(a.studentId.tally_ID)
    < Number(b.studentId.tally_ID)? -1 : 1));

  }
  onSortClickTallyIdreversets() {
    this.modeOfTallyIdts=false;
    this.filtered_invoicests.sort((a, b) => (Number(a.studentId.tally_ID)
    > Number(b.studentId.tally_ID)? -1 : 1));

  }

  onSortClickTallyIdbc() {
    this.modeOfTallyIdbc=true;
    this.filtered_reports.sort((a, b) => (Number(a.studentId.tally_ID)
    < Number(b.studentId.tally_ID)? -1 : 1));

  }
  onSortClickTallyIdreversebc() {
    this.modeOfTallyIdbc=false;
    this.filtered_reports.sort((a, b) => (Number(a.studentId.tally_ID)
    > Number(b.studentId.tally_ID)? -1 : 1));

  }



  onSortClickName() {
    this.modeOfName=true;
    this.modeOfRegNO=false;

    this.filtered_invoices.sort((a, b) => (a.studentId.firstName
      < b.studentId.firstName? -1 : 1));

  }
  onSortClickNameReverse() {
    this.modeOfName=false;
    this.modeOfRegNO=false;
    this.filtered_invoices.sort((a, b) => (a.studentId.firstName
    >b.studentId.firstName ? -1 : 1));

  }


  onSortClickCenter() {
    this.modeOfCenter=true;

    this.filtered_invoices.sort((a, b) => (a.studentId.centers< b.studentId.centers ? -1 : 1));

  }
  onSortClickCenterReverse() {
    this.modeOfCenter=false;

    this.filtered_invoices.sort((a, b) => (a.studentId.centers> b.studentId.centers ? -1 : 1));
 }
 onSortClickRegisterNO()
 {

  this.modeOfRegNO=true;
  this.filtered_invoices.sort((a, b) => (a.studentId.university_register_number
    <b.studentId.university_register_number ? -1 : 1));


  // this.filtered_invoices.sort((a, b) => (a.studentId.university_register_number)<(
  //   b.studentId.university_register_number) ? -1 : 1);

 }
 onSortClickNameRegisterNOreverse()
 {
  this.modeOfRegNO=false;
  // this.filtered_invoices.sort((a, b) => (a.studentId.university_register_number)>
  // (b.studentId.university_register_number) ? -1 : 1);
  this.filtered_invoices.sort((a, b) => (a.studentId.university_register_number
    >b.studentId.university_register_number ? -1 : 1));


 }
 onSortClickNamets() {
  this.modeOfNamets=true;
  this.filtered_invoicests.sort((a, b) => (a.studentId.firstName
    < b.studentId.firstName? -1 : 1));

}
onSortClickNameReversets() {
  this.modeOfNamets=false;
  this.filtered_invoicests.sort((a, b) => (a.studentId.firstName
  >b.studentId.firstName ? -1 : 1));

}

 onSortClickRegisterNOts()
 {
  this.modeOfRegNOts=true;

  this.filtered_invoicests.sort((a, b) => (a.studentId.university_register_number<b.studentId.university_register_number ? -1 : 1));
 }
 onSortClickNameRegisterNOreversets()
 {
  this.modeOfRegNOts=false;

  this.filtered_invoicests.sort((a, b) => (a.studentId.university_register_number> b.studentId.university_register_number ? -1 : 1));

 }
 onSortClickCenterts() {
  this.modeOfCenterts=true;

  this.filtered_invoicests.sort((a, b) => (a.studentId.centers< b.studentId.centers ? -1 : 1));

}
onSortClickCenterReversets() {
  this.modeOfCenterts=false;

  this.filtered_invoicests.sort((a, b) => (a.studentId.centers> b.studentId.centers ? -1 : 1));
}
onSortClickNamebc() {
  this.modeOfNamebc=true;
  this.filtered_reports.sort((a, b) => (a.studentId.firstName
    < b.studentId.firstName? -1 : 1));

}
onSortClickNameReversebc() {
  this.modeOfNamebc=false;
  this.filtered_reports.sort((a, b) => (a.studentId.firstName
  >b.studentId.firstName ? -1 : 1));

}

 onSortClickRegisterNObc()
 {
  this.modeOfRegNObc=true;

  this.filtered_reports.sort((a, b) => (a.studentId.university_register_number
    <b.studentId.university_register_number ? -1 : 1));
 }
 onSortClickNameRegisterNOreversebc()
 {
  this.modeOfRegNObc=false;

  this.filtered_reports.sort((a, b) => (a.studentId.university_register_number>
    b.studentId.university_register_number ? -1 : 1));

 }
 onSortClickCenterbc() {
  this.modeOfCenterbc=true;

  this.filtered_reports.sort((a, b) => (a.studentId.centers< b.studentId.centers ? -1 : 1));

}
onSortClickCenterReversebc() {
  this.modeOfCenterbc=false;

  this.filtered_reports.sort((a, b) => (a.studentId.centers> b.studentId.centers ? -1 : 1));
}


}
