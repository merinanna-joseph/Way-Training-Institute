import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../services/student.service';
import { Fee } from '../shared/models/fee.model';
import { FeeService } from '../services/fee.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CourseService } from '../services/course.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../shared/models/course.model';
import { BoardOrUniversityService } from '../services/boardoruniversity.service';
import { LeadService } from '../services/lead.service';
import { Lead } from '../shared/models/lead.model';
import { Feeflow } from '../shared/models/feeflow.model';
import { FeeflowService } from '../services/feeflow.service';
import { Collectionflow } from '../shared/models/collectionflow.model';
import { CollectionflowService } from '../services/collectionflow.service';
import { COLLECTION_FLOW_TYPE } from '../../app/globals';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { race } from 'rxjs/operators';
import { ifError } from 'node:assert';
import { stringify } from 'node:querystring';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { CenterService } from '../services/center.service';

@Component({
  selector: 'app-admissionform-edit',
  templateUrl: './admissionform-edit.component.html',
  styleUrls: ['./admissionform-edit.component.css'],
})
export class AdmissionformEditComponent implements OnInit {
  student: Student = {};
  user: User = {};
  feeFlow: Feeflow = {};
  academicYear = new Date().getFullYear();
  admissionDate = new Date();

  allIntakeMonth = [];
  allIntakeYear = [];
  feeyear = [];
  allfeeyear = [];

  today;
  tomonth;
  intake='';
  allUniversities = [];
  allCourses = [];
  allBranches: Course[] = [];
  singleCourseandFees: Course = {};
  courseDisplay: boolean = false;
  branchDisplay: boolean = false;
  feesDisplay: boolean = false;
  feeyearDisplay: boolean = false;

  branch;
  courseDuration: string;
  totalfeeswithdiscount: number = 0;
  totalfeeswithoutdiscount: number = 0;

  per_year_discount: number[] = [];
  per_year_total: number[] = [];
  per_year_payable_total: number[] = [];
  per_year_payable_coaching_fee: number[] = [];
  per_year_payable_exam_fee:number[] = [];
select='kk';
  studentDiscount: number = 0;
  studentCoachingFeeWithDiscount: number = 0;
  submitted = false;
  boardoruniversityID: any;
  courseID: any='';
  UNID:any='';
  feeID: any;
  centers: any[];
  physical_status: string[];
  NIOS10_display: boolean = false;
  NIOS12_display: boolean = false;
  previousyearCourses = [];
  checked_NIOS10_subjectlist = [];
  checked_NIOS12_subjectlist = [];
  lead: Lead = {};
  lead_id;
  lead_officer;
  lead_source;
  sources: string[];
  iscourseID: boolean = false;
  modeofIntake:boolean=false;
  NIOS10_subjectlist = [
    {
      value: '202 - English',
      label: '202 - English',
      isChecked: true,
    },
    {
      value: '209 - Sanskrit',
      label: '209 - Sanskrit',
      isChecked: false,
    },
    {
      value: '211 - Mathematics',
      label: '211 - Mathematics',
      isChecked: false,
    },
    {
      value: '212 - Science and Technology',
      label: '212 - Science and Technology',
      isChecked: false,
    },
    {
      value: '213 - Social science',
      label: '213 - Social science',
      isChecked: false,
    },
    {
      value: '214 - Economics',
      label: '214 - Economics',
      isChecked: false,
    },
    {
      value: '215 - Business Studies',
      label: '215 - Business Studies',
      isChecked: false,
    },
    {
      value: '216 - Home Science',
      label: '216 - Home Science',
      isChecked: false,
    },
    {
      value: '222 - Psychology',
      label: '222 - Psychology',
      isChecked: false,
    },
    {
      value: '223 - Indian Culture and Heritage',
      label: '223 - Indian Culture and Heritage',
      isChecked: false,
    },
    {
      value: '224 - Accountancy',
      label: '224 - Accountancy',
      isChecked: false,
    },
    {
      value: '225 - Painting',
      label: '225 - Painting',
      isChecked: false,
    },
    {
      value: '229 - Data Entry Operations',
      label: '229 - Data Entry Operations',
      isChecked: false,
    },
    {
      value: '235 - Arabic',
      label: '235 - Arabic',
      isChecked: false,
    },
  ];

  NIOS12_subjectlist = [
    {
      value: '302 - English',
      label: '302 - English',
      isChecked: true,
    },
    {
      value: '303 - Bengali',
      label: '303 - Bengali',
      isChecked: false,
    },
    {
      value: '306 - Urdu',
      label: '306 - Urdu',
      isChecked: false,
    },
    {
      value: '309 - Sanskrit',
      label: '309 - Sanskrit',
      isChecked: false,
    },
    {
      value: '311 - Mathematics',
      label: '311 - Mathematics',
      isChecked: false,
    },

    {
      value: '312 - Physics',
      label: '312 - Physics',
      isChecked: false,
    },
    {
      value: '313 - Chemistry',
      label: '313 - Chemistry',
      isChecked: false,
    },
    {
      value: '314 - Biology',
      label: '314 - Biology',
      isChecked: false,
    },
    {
      value: '315 - History',
      label: '315 - History',
      isChecked: false,
    },
    {
      value: '316 - Geography',
      label: '316 - Geography',
      isChecked: false,
    },
    {
      value: '317 - Political Science',
      label: '317 - Political Science',
      isChecked: false,
    },
    {
      value: '318 - Economics',
      label: '318 - Economics',
      isChecked: false,
    },

    {
      value: '319 - Business Studies',
      label: '319 - Business Studies',
      isChecked: false,
    },
    {
      value: '320 - Accountancy',
      label: '320 - Accountancy',
      isChecked: false,
    },
    {
      value: '321 - Home Science',
      label: '321 - Home Science',
      isChecked: false,
    },
    {
      value: '328 - Psychology',
      label: '328 - Psychology',
      isChecked: false,
    },
    {
      value: '330 - Computer Science',
      label: '330 - Computer Science',
      isChecked: false,
    },
    {
      value: '331 - Sociology',
      label: '331 - Sociology',
      isChecked: false,
    },
    {
      value: '332 - Painting',
      label: '332 - Painting',
      isChecked: false,
    },
    {
      value: '333 - Enviornmental Science',
      label: '333 - Enviornmental Science',
      isChecked: false,
    },
    {
      value: '335 - Mass Communications',
      label: '335 - Mass Communications',
      isChecked: false,
    },
    {
      value: '336 - Data Entry Operations',
      label: '336 - Data Entry Operations',
      isChecked: false,
    },
    {
      value: '338 - Introduction to Law',
      label: '338 - Introduction to Law',
      isChecked: false,
    },
    {
      value: '339 - Library & Information Science',
      label: '339 - Library & Information Science',
      isChecked: false,
    },
  ];

  imageUrl: any;
  passportPreview: string | ArrayBuffer;
  imageOfSecondaryCertificate: any;
  imageOfHigherSecondory: any;
  imageofprofilePhoto: any;
  name_secondary: any;
  PassportFrontView: any;
  PassportBackView: any;
  name_highersecondory: any;
  name_passport_front: any;
  name_passport_back: any;
  imageOfPassportFrontView: any;
  imageOfPassportBackView: any;
  imageOfVisaPage: any;
  name_visapage: any;
  imageOfEmiratesId: any;
  name_emirates_id: any;
  imageOfOtherDocument: any;
  name_other: any;
  commAddress: string = ' ';
  permanentAddress: string = ' ';
  multipleimages = [];
  otherspath = [];
  transportCollectionFlow: Collectionflow = {};
  locations = [];
  courseDisplaydefault: boolean;
  secondorystatus: boolean;
  otherstatus: boolean;
  otherdocslength: number;
  studentotherdoc: any;
  highersecondorystatus: boolean;
  passportfrontpagestatus: boolean;
  passportbackpagestatus: boolean;
  emiratesidstatus: boolean;
  visapagestatus: boolean;
  extension: string;
  index: number;
  name_pdf: string;
  student_secondory_certificate_image: string;
  name_img: string;
  student_id: string;
  student_admission_date: Date;
  student_intake: Date;
  boardoruniversity_status: boolean = false;
  feeDisplaydefault: boolean;
  statusOfFee: boolean;
  studentcourseandfee: boolean = false;
  coursename: any;
  statusofcourse: boolean = false;
  courseDisplaydefaultwithonlyuniversity: boolean = false;
  studentvalue: any;
  courseindex: string;
  feeyearDisplaydefault: boolean = false;
  statusoftransportation: boolean;
  collectionFlows: Collectionflow[];
  NIOS10_display_default: boolean;
  NIOS12_display_default: boolean;
  current_courseid_value: any;
  currentcourseeventvalue: any;
  status_empty_boardoruniversityID: number;
  feessDisplay: boolean;
  default: boolean = true;
  // feeid_default: any;
  feeid_default: any = '2021-13';
  courseIDdefault;
  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public route: Router,
    public studentService: StudentService,
    public courseService: CourseService,
    public toast: ToastComponent,
    public feeService: FeeService,
    public boardOrUniversityService: BoardOrUniversityService,
    private leadService: LeadService,
    private aRoute: ActivatedRoute,
    public feeflowService: FeeflowService,
    public collectionFlowService: CollectionflowService,
    private httpClient: HttpClient,
    private confirmationDialogService: ConfirmationDialogService,
    public userService:UserService,
    public centerService:CenterService,

  ) {}

  addAdmissionForm: FormGroup = this.formBuilder.group({
    passport: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: [''],
    gender: [''],
    dob: [''],
    mobilenumber: [''],
    residencenumber: [''],
    passportnumber: [''],
    fathername: [''],
    mothername: [''],
    location: [''],
    nationality: [''],
    permanentaddress: [''],
    temporaryaddress: [''],
    lastcompletedcourse: [''],
    university: [''],
    institute: [''],
    passout_year: [''],
    academicyear: [''],
    tallyID: [''],
    admissiondate: [''],
    university_register_number: [''],
    // studentdiscount: [''],
    courseId: ['', Validators.required],
    branch: ['', Validators.required],
    feeyear: ['', Validators.required],
    intake: ['', Validators.required],
    durationInYear: [''],
    totalfeeswithdiscount: [''],
    centers: [''],
    subjectlist: [''],
    lead_officer: [''],
    lead_source: [''],
    remarks: [''],
    disablitity_status: [''],
    year: [''],
    registration_fee: [''],
    coaching_fee: [''],
    exam_fee: [''],
    convocation_fee: [''],
    attestation_fee: [''],
    equalency_fee: [''],
    other_fee: [''],
    total_fee_peryear: [0],
    per_year_discount: [0],
    per_year_payable_total: [0],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {

    this.getForm();
    this.getAllCenters();
    this.getAllUniversities();
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

    // this.centers = ['TIMES  - ABU DHABI', 'TIMES  - AJMAN','TIMES  - SHARJAH',];
    this.physical_status = ['Differently Abled', 'Normal'];
    this.locations = [
      'Abu Dhabi',
      'Ajman',
      'Dubai',
      'Fujairah',
      'Ras Al Khaimah',
      'Sharjah',
      'Umm Al Quwain',
    ];
    this.previousyearCourses = [
      'Schooling',
      '12th or Equivalent',
      'Graduation or Equivalent',
      'Post Graduation or Equivalent',
    ];

    this.addAdmissionForm = this.formBuilder.group({
      passport: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      gender: [''],
      dob: [''],
      mobilenumber: [''],
      residencenumber: [''],
      passportnumber: [''],
      fathername: [''],
      mothername: [''],
      location: [''],
      nationality: [''],
      permanentaddress: [''],
      temporaryaddress: [''],
      lastcompletedcourse: [''],
      university: [''],
      institute: [''],
      passout_year: [''],
      academicyear: [''],
      tallyID: [''],
      admissiondate: [''],
      university_register_number: [''],
      intake: ['',, Validators.required],
      // studentdiscount: [''],
      courseId: ['', Validators.required],
      branch: ['', Validators.required],
      feeyear: ['', Validators.required],

      durationInYear: [''],
      totalfeeswithdiscount: [''],
      centers: [''],
      subjectlist: [''],
      lead_officer: [''],
      lead_source: [''],
      remarks: [''],
      disablitity_status: [''],

      year: [''],
      registration_fee: [''],
      coaching_fee: [''],
      exam_fee: [''],
      convocation_fee: [''],
      attestation_fee: [''],
      equalency_fee: [''],
      other_fee: [''],
      total_fee_peryear: [0],
      per_year_discount: [0],
      per_year_payable_total: [0],
      username: ['', Validators.required],
    password: ['', Validators.required],
    });
  }

  getForm() {
    this.aRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.studentService.getStudentByFeeId({ _id: id }).subscribe((data) => {
        this.student = data[0];
        console.log('student', this.student);
        this.courseIDdefault=this.student.courseID
              this.collectionFlowService
          .getcollectionFlowsWithStudentId(this.student._id)
          .subscribe((data) => {
            this.collectionFlows = data;
              this.transportCollectionFlow.isTransportationNeeded =
              this.collectionFlows[0].isTransportationNeeded;


          });
          if(this.student.intake)
          {
            this.today = new Date(this.student.intake);
            this.tomonth = '0' + (this.today.getMonth() + 1);
            this.intake = this.today.getFullYear() + '-' + this.tomonth.slice(-2);
            this.modeofIntake=true;


          }
          else{
            this.intake ='';
            this.modeofIntake=false;

          }

        if (this.student.studentCourse[0]) {
          this.coursename = this.student.studentCourse[0].course_name+this.student.studentCourse[0].course_branch
          +this.student.studentCourse[0].course_type;



          this.studentvalue = 1;
        } else {
          this.studentvalue = '';
        }
        if (this.student.boardOrUniversityID != null) {

          this.boardoruniversity_status = true;
        } else {
          this.boardoruniversity_status = false;
        }
        if (this.student.boardOrUniversityID != null) {

      //service to get course with university and center new addition
      this.courseService.getCoursesByUniversityIdandCenter( this.student.boardOrUniversityID,this.student.centers ).subscribe(
        data => {
          this.allCourses = [];
          console.log(data,"data")

          for(var i in data){
            if(this.allCourses.filter(e => e.name == data[i].name
              && e.branch == data[i].branch && e.courseType == data[i].courseType).length <= 0){
              this.allCourses.push(data[i]);
            }
          }
          this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
          console.log(this.allCourses,"cour")
          // this.courseDisplay = true;
          for(let k=0;k<this.allCourses.length;k++)
                    {
                      if(this.allCourses[k].name+this.allCourses[k].branch+this.allCourses[k].courseType
                        ==this.coursename)
                      {

                        this.courseindex=k.toString();

                      }
                    }


                    this.courseDisplaydefault = true;

        });
      //service to get course with university and center old version
          // this.courseService
          //   .getCoursesByUniversityId(this.student.boardOrUniversityID)
          //   .subscribe((data) => {
          //     for (var i in data) {
          //       if (
          //         this.allCourses.filter(
          //           (e) =>
          //             e.name == data[i].name &&
          //             e.branch == data[i].branch &&
          //             e.courseType == data[i].courseType
          //         ).length <= 0
          //       ) {
          //         this.allCourses.push(data[i]);
          //       }
          //       console.log("allcourse",this.allCourses)
          //     }
          //     this.allCourses.sort((a, b) => a.name.localeCompare(b.name));

          //     for(let k=0;k<this.allCourses.length;k++)
          //     {
          //       if(this.allCourses[k].name+this.allCourses[k].branch+this.allCourses[k].courseType
          //         ==this.coursename)
          //       {

          //         this.courseindex=k.toString();

          //       }
          //     }


          //     this.courseDisplaydefault = true;
          //   });
        }
        console.log('student', this.student);
        if (this.student.courseID && this.student.subject_list.length >= 1) {
          this.courseService
            .getSingleCourseandFee({ _id: this.student.courseID })
            .subscribe((data) => {
              this.singleCourseandFees = data[0];
              if (this.singleCourseandFees.name == 'NIOS 10th') {
                this.NIOS10_display_default = true;
                for (let k = 0; k < 15; k++) {
                  for (let m = 0; m < 15; m++) {
                    if (
                      this.NIOS10_subjectlist[k].label ==
                      this.student.subject_list[m]
                    ) {
                      this.NIOS10_subjectlist[k].isChecked = true;
                      this.checked_NIOS10_subjectlist.push(
                        this.NIOS10_subjectlist[k].label
                      );
                    }
                    console.log('subject list10', this.NIOS10_subjectlist);
                  }
                }
              }
              if (this.singleCourseandFees.name == 'NIOS 12th') {
                this.NIOS12_display_default = true;
                for (let a = 0; a < 25; a++) {
                  for (let b = 0; b < 25; b++) {
                    if (
                      this.NIOS12_subjectlist[a].label ==
                      this.student.subject_list[b]
                    ) {
                      this.NIOS12_subjectlist[a].isChecked = true;
                      this.checked_NIOS12_subjectlist.push(
                        this.NIOS12_subjectlist[a].label
                      );
                    }
                    console.log('subject list12', this.NIOS12_subjectlist);
                  }
                }

                this.checked_NIOS12_subjectlist.push(
                  this.NIOS12_subjectlist[0].value
                );
                console.log('subject list122', this.NIOS12_subjectlist);

              }
            });
        }


        if (this.student.courseID != '') {
          this.allfeeyear = [];
          this.courseService.getAllCourseandFee().subscribe((data) => {
            let courses = [];
            for (var i in data) {
              courses.push(data[i]);
            }
            for (let i = 0; i < courses.length; i++) {
              if (
                courses[i].name == this.allCourses[this.courseindex].name &&
                courses[i].boardOrUniversity._id ==
                  this.allCourses[this.courseindex].boardOrUniversity &&
                courses[i].branch == this.allCourses[this.courseindex].branch &&
                courses[i].courseType ==
                  this.allCourses[this.courseindex].courseType && 
                  courses[i].centers == this.allCourses[this.courseindex].centers
              ) {
                this.allfeeyear.push(courses[i]);
              }
            }

            this.allfeeyear.reverse();
                 });
          console.log('all year', this.allfeeyear);
        }
        if (
          this.student.studentCourse.length > 0 &&
          this.student.studentFees.length == 0
        ) {
          this.courseDisplaydefault = true;
          this.feeyearDisplay = true;

        }
        if (this.student.feeID && this.student.studentFees.length > 0) {
          this.feeyearDisplaydefault = false;
          this.courseDisplaydefault = true;
          this.feeDisplaydefault = true;
          this.courseDuration =
            this.student.studentCourse[0].course_duration_year +
            'Y' +
            this.student.studentCourse[0].course_duration_month +
            'M'

          this.feeyear=[];
          let yintake = new Date(this.student.intake);

          this.courseService
      .getSingleCourseandFee({ _id:this.student.courseID })
      .subscribe((data) => {
        this.singleCourseandFees = data[0];
        this.totalfeeswithoutdiscount =
        this.singleCourseandFees.feeId.totalAmount;
        console.log(this.singleCourseandFees)
        for (var i in this.singleCourseandFees.feeId.feeStructure) {
          let y1 = yintake.getFullYear();
          let mon = new Date(yintake.setMonth(yintake.getMonth() + 12));
          let y2 = mon.getFullYear();
          yintake = mon;
          this.feeyear[i] = y1 + '-' + y2;
          this.per_year_total[i] =
          this.student.studentFees[i].per_year_total_fee;
          this.per_year_payable_total[i] =
          this.student.studentFees[i].per_year_payable_total_fee;
          this.per_year_discount[i] =  this.student.studentFees[i].per_year_discount;

          if(this.student.studentFees[i].per_year_payable_coaching_fee == 0){
            this.per_year_payable_exam_fee[i] = this.student.studentFees[i].exam_fee - this.per_year_discount[i];

          }else{
            this.per_year_payable_coaching_fee[i]=this.student.studentFees[i].per_year_payable_coaching_fee;
          }

        }

      })

          this.statusOfFee = false;
        }

        this.studentotherdoc = data[0].studentDocuments.otherdocuments;
        this.otherdocslength =
          this.student.studentDocuments.otherdocuments.length;

        if (this.student.studentDocuments.otherdocuments.length != 0) {
          this.otherstatus = true;
        } else {
          this.otherstatus = false;
        }
        if (this.student.studentDocuments.secondarycertificate) {
          this.secondorystatus = true;
        } else {
          this.secondorystatus = false;
        }
        if (this.student.studentDocuments.highersecondarycertificate) {
          this.highersecondorystatus = true;
        } else {
          this.highersecondorystatus = false;
        }
        if (this.student.studentDocuments.passportfrontpage) {
          this.passportfrontpagestatus = true;
        } else {
          this.passportfrontpagestatus = false;
        }
        if (this.student.studentDocuments.passportbackpage) {
          this.passportbackpagestatus = true;
        } else {
          this.passportbackpagestatus = false;
        }
        if (this.student.studentDocuments.emirateaid) {
          this.emiratesidstatus = true;
        } else {
          this.emiratesidstatus = false;
        }
        if (this.student.studentDocuments.visapage) {
          this.visapagestatus = true;
        } else {
          this.visapagestatus = false;
        }
        let user = {email:this.student.username}
        this.userService.getUserByEmail(user).subscribe(
          data=>{
            this.user = data;
            console.log(this.user,"user");
          }
        );
      });

    });



  }

  get s() {
    return this.addAdmissionForm.controls;
  }
  copyAddresses(event) {
    if (event.target.checked) {
      this.student.address.temporary_address =
        this.student.address.permanent_address;
    }
  }
  getSource(event) {
    this.student.lead_source = event.value;
  }
  getAllUniversities() {
    this.boardOrUniversityService.getBoardOrUniversitys().subscribe((data) => {
      this.allUniversities = data;
      console.log(this.allUniversities, 'All Universities');
    });
  }
  getAllCenters(){
    this.centerService.getcenters().subscribe(
      data => {
        this.centers = data;
        console.log(this.centers,'All centers')

      }
    )
  }
  onCentersSelection(event) {
    // alert(event.value)
    this.student.centers = event.value;

    this.addAdmissionForm.patchValue( {'courseId':''} );
    this.addAdmissionForm.patchValue( {'branch':''} );
    this.addAdmissionForm.patchValue( {'intake':''} );
    this.addAdmissionForm.patchValue( {'feeyear':''} );
    this.courseDisplay = false;
    this.feeyearDisplay = false;
    this.feesDisplay = false;
    this.modeofIntake = false;
    // this.s.intake.value = '';
    this.getAllUniversities();
  }

  onUniversitySelection(event) {
    if(!this.student.centers){
      this.toast.setMessage("Select Center !!!", "danger");
      return;
    }
    this.addAdmissionForm.patchValue( {'branch':''} );

    localStorage.removeItem('courseindex');
    this.NIOS12_display_default = false;
    this.NIOS10_display_default = false;
    this.courseDisplaydefault = false;
    this.feeDisplaydefault = false;
    this.allCourses = [];
    this.feeyear = [];
    this.allfeeyear = [];
    this.feeyearDisplay = false;
    this.courseDisplay = false;
    this.feesDisplay = false;
    this.NIOS10_display = false;
    this.NIOS12_display = false;
    this.boardoruniversityID = event.value;

    if (this.boardoruniversityID == '') {
      this.courseDisplay = false;
      this.courseDisplaydefault = false;
      this.student.courseID = '';
      this.student.studentCourse = [];
      this.student.studentFees = [];
    }
     //service to get course with university and center new addition
 this.courseService.getCoursesByUniversityIdandCenter( this.boardoruniversityID,this.student.centers ).subscribe(
  data => {
    this.allCourses = [];
    console.log(data,"data")

    for(var i in data){
      if(this.allCourses.filter(e => e.name == data[i].name
        && e.branch == data[i].branch && e.courseType == data[i].courseType).length <= 0){
        this.allCourses.push(data[i]);
      }
    }
    this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
    console.log(this.allCourses,"cour")
    this.courseDisplay = true;

  });
      //service to get course with university and center old version
    // this.courseService
    //   .getCoursesByUniversityId(this.boardoruniversityID)
    //   .subscribe((data) => {
    //     for (var i in data) {
    //       if (
    //         this.allCourses.filter(
    //           (e) =>
    //             e.name == data[i].name &&
    //             e.branch == data[i].branch &&
    //             e.courseType == data[i].courseType
    //         ).length <= 0
    //       ) {
    //         this.allCourses.push(data[i]);
    //       }
    //     }

    //     this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
    //     this.courseDisplay = true;
    //   });
  }

  onIntakeSelection() {
    // alert("inside intake"+this.courseID)
    this.modeofIntake=true;

    if (this.courseID) {
      // alert("this.courseID")
      this.iscourseID = true;
      this.onFeeyearSelection(this.courseID);
      this.student.courseID='';
    }
    if(this.student.courseID)
    {
      // alert("this.student.courseID")

      this.courseID = this.student.courseID;
      this.iscourseID = true;
      this.onFeeyearSelection(this.courseID);

    }

    }
  onCourseSelection(event) {
    // this.addAdmissionForm.value.feeyear=''
    this.feeyearDisplay=false;

    // this.courseDisplaydefault=false;
    this.student.studentCourse = [];
    this.student.studentFees = [];
    // this.student.subject_list=[];
    // this.NIOS10_subjectlist=[];
    this.currentcourseeventvalue = event.value;
    this.NIOS12_display_default = false;
    this.NIOS10_display_default = false;
    this.courseID = '';
    this.feesDisplay = false;
    this.feeDisplaydefault = false;
    this.NIOS10_display = false;
    this.NIOS12_display = false;
    this.NIOS12_display = false;
    this.NIOS12_display_default = false;
    this.NIOS10_display_default = false;
    this.allfeeyear = [];

    this.courseService.getAllCourseandFee().subscribe((data) => {
      let courses = [];
      for (var i in data) {
        courses.push(data[i]);
      }

      for (var i in courses) {
        if (
          courses[i].name == this.allCourses[event.value].name &&
          courses[i].boardOrUniversity._id ==
            this.allCourses[event.value].boardOrUniversity &&
          courses[i].branch == this.allCourses[event.value].branch &&
          courses[i].courseType == this.allCourses[event.value].courseType && 
          courses[i].centers == this.allCourses[event.value].centers
        ) {
          this.allfeeyear.push(courses[i]);
          this.current_courseid_value = courses[i];
          console.log('current_courseid_value', this.current_courseid_value);
        }
      }
      this.allfeeyear.reverse();

      this.feeyearDisplay = true;
      // this.courseDisplay=true;

      console.log('ALL FEE YEAR' + this.allfeeyear);
      // this.feeyearDisplaydefault
    });

    // console.log(this.allfeeyear+"jj")
  }
  selectedValue;
  onFeeyearSelection(event) {
    this.per_year_payable_coaching_fee = [];
    this.per_year_payable_exam_fee = [];
    if (this.iscourseID) {
      this.courseID = event;
      this.courseService
      .getSingleCourseandFee({ _id: this.courseID })
      .subscribe((data) => {
        this.feesDisplay = true;

      this.iscourseID = false;
        this.default = false;
        this.singleCourseandFees = data[0];
        if (
          this.singleCourseandFees.name == 'NIOS 10th' &&
          this.NIOS10_display_default == false
        ) {
          this.checked_NIOS10_subjectlist.push(
            this.NIOS10_subjectlist[0].value
          );
          this.NIOS10_display = true;

        } else if (
          this.singleCourseandFees.name == 'NIOS 12th' &&
          this.NIOS12_display_default == false
        ) {
          this.NIOS12_display = true;

        }
        this.totalfeeswithoutdiscount =
          this.singleCourseandFees.feeId.totalAmount;
      let yintake = new Date(this.s.intake.value);
        for (var i in this.singleCourseandFees.feeId.feeStructure) {
          let y1 = yintake.getFullYear();
          let mon = new Date(yintake.setMonth(yintake.getMonth() + 12));

          let y2 = mon.getFullYear();
          yintake = mon;
          this.feeyear[i] = y1 + '-' + y2;

          this.per_year_total[i] =
            this.singleCourseandFees.feeId.feeStructure[i].total_fee;
          this.per_year_payable_total[i] =
            this.singleCourseandFees.feeId.feeStructure[i].total_fee;

          this.per_year_discount[i] = 0;
          this.courseDuration =
            this.singleCourseandFees.durationInYear +
            'Y' +
            this.singleCourseandFees.durationInMonths +
            'M,' +
            this.singleCourseandFees.startYear +
            '-' +
            this.singleCourseandFees.endYear;
        }
        console.log(this.singleCourseandFees, 'Single course fees');
        this.studentcourseandfee = true;
        console.log('fee year' + this.feeyear);
      });




    }

    else {
      this.courseID = event.value;



    }
    if (event.value == '') {
      this.feesDisplay = false;
    }


    this.feeyear = [];
    this.singleCourseandFees = {};
    this.courseService
      .getSingleCourseandFee({ _id: this.courseID })
      .subscribe((data) => {
        this.feesDisplay = true;


        this.iscourseID = false;
        this.default = false;
        this.singleCourseandFees = data[0];
        if (
          this.singleCourseandFees.name == 'NIOS 10th' &&
          this.NIOS10_display_default == false
        ) {
          this.checked_NIOS10_subjectlist.push(
            this.NIOS10_subjectlist[0].value
          );
          this.NIOS10_display = true;

        } else if (
          this.singleCourseandFees.name == 'NIOS 12th' &&
          this.NIOS12_display_default == false
        ) {
          this.NIOS12_display = true;

        }
        this.totalfeeswithoutdiscount =
          this.singleCourseandFees.feeId.totalAmount;
      let yintake = new Date(this.s.intake.value);
        for (var i in this.singleCourseandFees.feeId.feeStructure) {
          let y1 = yintake.getFullYear();
          let mon = new Date(yintake.setMonth(yintake.getMonth() + 12));

          let y2 = mon.getFullYear();
          yintake = mon;
          this.feeyear[i] = y1 + '-' + y2;

          this.per_year_total[i] =
            this.singleCourseandFees.feeId.feeStructure[i].total_fee;
          this.per_year_payable_total[i] =
            this.singleCourseandFees.feeId.feeStructure[i].total_fee;

          this.per_year_discount[i] = 0;
          this.courseDuration =
            this.singleCourseandFees.durationInYear +
            'Y' +
            this.singleCourseandFees.durationInMonths +
            'M,' +
            this.singleCourseandFees.startYear +
            '-' +
            this.singleCourseandFees.endYear;
        }
        console.log(this.singleCourseandFees, 'Single course fees');
        this.studentcourseandfee = true;
        console.log('fee year' + this.feeyear);
      });
  }
  checked(item) {

    let ret: boolean = true;

    if (this.checked_NIOS10_subjectlist.indexOf(item) > -1) {
      ret = true;
    } else if (this.checked_NIOS12_subjectlist.indexOf(item) > -1) {
      ret = true;
    } else {
      ret = false;
    }

    return ret;
  }
  onSubjectListNIOS10CheckboxChange(option, event) {
    if (event.target.checked) {
      this.checked_NIOS10_subjectlist.push(option.value);


    } else {
      for (var i = 0; i < this.NIOS10_subjectlist.length; i++) {
        if (this.checked_NIOS10_subjectlist[i] == option.value) {
          this.checked_NIOS10_subjectlist.splice(i, 1);
        }
      }
    }


  }
  onSubjectListNIOS12CheckboxChange(option, event) {
    if(this.checked_NIOS12_subjectlist.length<1)
    {
      this.checked_NIOS12_subjectlist.push(this.NIOS12_subjectlist[0].value);

    }

    if (event.target.checked) {
      this.checked_NIOS12_subjectlist.push(option.value);
    } else {
      for (var i = 0; i < this.NIOS12_subjectlist.length; i++) {
        if (this.checked_NIOS12_subjectlist[i] == option.value) {
          this.checked_NIOS12_subjectlist.splice(i, 1);
        }
      }
    }


  }

  find_total_fee_with_discount(i) {

    this.per_year_payable_total[i] =
      this.singleCourseandFees.feeId.feeStructure[i].total_fee -
      this.per_year_discount[i];
      if(this.singleCourseandFees.feeId.feeStructure[i].coaching_fee == 0){
        this.per_year_payable_exam_fee[i] = this.singleCourseandFees.feeId.feeStructure[i].exam_fee - this.per_year_discount[i];

      }else{
        this.per_year_payable_coaching_fee[i] =
        this.singleCourseandFees.feeId.feeStructure[i].coaching_fee -
        this.per_year_discount[i];
      }

    this.totalfeeswithdiscount = 0;
    for (var x in this.per_year_payable_total) {
      this.totalfeeswithdiscount =
        this.totalfeeswithdiscount + this.per_year_payable_total[x];
    }
  }
  uploadIdProof(event) {
    this.studentService
      .uploadImageOfIdProof(event.target.files[0])
      .subscribe((res: any) => {
        this.imageUrl = res.imageUrl;
      });
  }
  onPassportImagePicker(event: Event) {
    const image_passport = (event.target as HTMLInputElement).files[0];
    this.addAdmissionForm.patchValue({ passport: image_passport });
    this.addAdmissionForm.get('passport').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.passportPreview = reader.result;
    };
    reader.readAsDataURL(image_passport);
  }
  uploadPhoto(event) {
    console.log(event.target.files[0].size);
    let type = 'studentdocuments';

    if (event.target.files[0].size < 50 * 1024) {
      this.studentService
        .uploadPhoto(event.target.files[0],this.student._id,type)
        .subscribe((res: any) => {
          this.imageofprofilePhoto = res.imageUrl;
        });

      this.toast.setMessage('Photo upload successfully !!!', 'success');
    } else {
      this.toast.setMessage(' Maximum file size should be 50KB !!!', 'danger');
    }
  }

  uploadSecondaryCertificate(event) {
    let type = 'studentdocuments';

    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        if (res) {
          this.name_secondary = res.imageName;
          this.imageOfSecondaryCertificate = res.imageUrl;
          this.toast.setMessage('Document upload successfully !!!', 'success');
        }
      });
  }
  uploadHigherSecondaryCertificate(event) {
    let type = 'studentdocuments';

    this.studentService
      .uploadHigherSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        if (res) {
          this.name_highersecondory = res.imageName;
          this.imageOfHigherSecondory = res.imageUrl;
          this.toast.setMessage('Document upload successfully !!!', 'success');
        }
      });
  }
  uploadPassportFrontView(event) {
    let type = 'studentdocuments';

    this.studentService
      .uploadHigherSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        if (res) {
          this.name_passport_front = res.imageName;
          this.imageOfPassportFrontView = res.imageUrl;
        }
      });
    this.toast.setMessage('Document upload successfully !!!', 'success');
  }
  uploadPassportBackView(event) {
    let type = 'studentdocuments';

    this.studentService
      .uploadHigherSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        if (res) {
          this.name_passport_back = res.imageName;
          this.imageOfPassportBackView = res.imageUrl;
          this.toast.setMessage('Document upload successfully !!!', 'success');
        }
      });
  }
  uploadVisaPage(event) {
    let type = 'studentdocuments';

    this.studentService
      .uploadHigherSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        if (res) {
          this.name_visapage = res.imageName;
          this.imageOfVisaPage = res.imageUrl;
          this.toast.setMessage('Document upload successfully !!!', 'success');
        }
      });
  }
  uploadEmiratesId(event) {
    let type = 'studentdocuments';

    this.studentService
      .uploadHigherSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.name_emirates_id = res.imageName;
        this.imageOfEmiratesId = res.imageUrl;
        this.toast.setMessage('Document upload successfully !!!', 'success');
      });
  }
  count = 0;
  transportneeded(event) {
    if (event.target.checked) {
      this.transportCollectionFlow.isTransportationNeeded =
        event.target.checked;
    } else {
      this.transportCollectionFlow.isTransportationNeeded = false;
    }
  }
  onCollectionDelete() {
    this.collectionFlowService
      .deleteCollectionflowByStudent({ _id: this.student._id })
      .subscribe((data) => {});
  }

  onadmissionformSubmit() {
    if(this.NIOS10_display)
    {
      this.checked_NIOS12_subjectlist=[]
    }
    if(this.NIOS12_display&& this.checked_NIOS10_subjectlist.length==1&&
      this.checked_NIOS12_subjectlist.length==0)
    {
      this.checked_NIOS12_subjectlist.push(this.NIOS12_subjectlist[0].value);
      this.checked_NIOS10_subjectlist=[]


    }

if(this.checked_NIOS10_subjectlist.length>0){
  this.student.subject_list=[]

  for (var k in this.checked_NIOS10_subjectlist) {
    this.student.subject_list.push(this.checked_NIOS10_subjectlist[k]);
  }

}

    if(this.checked_NIOS12_subjectlist.length>0){
      this.student.subject_list=[]


      for (var k in this.checked_NIOS12_subjectlist) {
        this.student.subject_list.push(this.checked_NIOS12_subjectlist[k]);
      }

    }


    localStorage.removeItem('courseIndex');


    this.submitted = true;

    if (this.addAdmissionForm.invalid) {
      return;
    }

    this.student.istemporarysaved = false;
    this.student.intake = this.s.intake.value;
    this.student.admission_Date = this.s.admissiondate.value;
    this.student.DOB = this.s.dob.value
    this.studentDiscount=0;
    this.student.username = this.s.username.value;
    this.student.password = this.s.password.value;
    for (var x in this.per_year_discount) {
      this.studentDiscount += this.per_year_discount[x];

    }
    if (this.singleCourseandFees.feeId) {
      for (var x in this.singleCourseandFees.feeId.feeStructure) {
        if (!this.per_year_payable_coaching_fee[x]) {
          this.per_year_payable_coaching_fee[x] =
            this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;
        }else
        {

          if(!this.per_year_discount[x]) {
            this.per_year_payable_coaching_fee[x] =
            this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;
          }

        }
        this.studentCoachingFeeWithDiscount +=
          this.per_year_payable_coaching_fee[x];
          if(!this.per_year_payable_exam_fee[x]){
            this.per_year_payable_exam_fee[x] =
            this.singleCourseandFees.feeId.feeStructure[x].exam_fee;
          }
      }

      // alert(this.singleCourseandFees.feeId.feeStructure[x].coaching_fee)

      if (this.student.feeID) {
        this.student.studentCourse = [];
        this.student.studentFees = [];
        this.student.total_payable_fee_with_discount=0;
        for (var i in this.singleCourseandFees.feeId.feeStructure) {
          this.student.studentFees.push({
            year: this.feeyear[i],
            registration_fee:
              this.singleCourseandFees.feeId.feeStructure[i].registration_fee,
            coaching_fee:
              this.singleCourseandFees.feeId.feeStructure[i].coaching_fee,
            exam_fee: this.singleCourseandFees.feeId.feeStructure[i].exam_fee,
            convocation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].convocation_fee,
            attestation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].attestation_fee,
            equalency_fee:
              this.singleCourseandFees.feeId.feeStructure[i].equalency_fee,
            other_fee: this.singleCourseandFees.feeId.feeStructure[i].other_fee,
            per_year_total_fee:
              this.singleCourseandFees.feeId.feeStructure[i].total_fee,
            per_year_discount: this.per_year_discount[i],

            per_year_payable_total_fee: this.per_year_payable_total[i],
            per_year_payable_coaching_fee:
              this.per_year_payable_coaching_fee[i],
          });
        }
        this.student.total_payable_fee_with_discount=0;

        this.student.original_course_amount =
          this.singleCourseandFees.feeId.totalAmount;
          this.student.total_payable_fee_with_discount =
          this.singleCourseandFees.feeId.totalAmount - this.studentDiscount;

        this.student.courseID = this.singleCourseandFees._id;
        this.student.feeID = this.singleCourseandFees.feeId;

        this.student.boardOrUniversityID =
          this.singleCourseandFees.boardOrUniversity;
        this.student.studentCourse.push({
          course_name: this.singleCourseandFees.name,
          course_branch: this.singleCourseandFees.branch,
          boardOrUniversity:
            this.singleCourseandFees.boardOrUniversity.boardoruniveristy,
          course_duration_year: this.singleCourseandFees.durationInYear,
          course_duration_month: this.singleCourseandFees.durationInMonths,
          course_type: this.singleCourseandFees.courseType,
          course_startYear: this.singleCourseandFees.startYear,
          course_endYear: this.singleCourseandFees.endYear,
        });
      } else {
        this.student.total_payable_fee_with_discount=0;

        for (var i in this.singleCourseandFees.feeId.feeStructure) {
          this.student.studentFees.push({
            year: this.feeyear[i],
            registration_fee:
              this.singleCourseandFees.feeId.feeStructure[i].registration_fee,
            coaching_fee:
              this.singleCourseandFees.feeId.feeStructure[i].coaching_fee,
            exam_fee: this.singleCourseandFees.feeId.feeStructure[i].exam_fee,
            convocation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].convocation_fee,
            attestation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].attestation_fee,
            equalency_fee:
              this.singleCourseandFees.feeId.feeStructure[i].equalency_fee,
            other_fee: this.singleCourseandFees.feeId.feeStructure[i].other_fee,
            per_year_total_fee:
              this.singleCourseandFees.feeId.feeStructure[i].total_fee,
            per_year_discount: this.per_year_discount[i],

            per_year_payable_total_fee: this.per_year_payable_total[i],
            per_year_payable_coaching_fee:
              this.per_year_payable_coaching_fee[i],
          });
        }

        this.student.original_course_amount =
          this.singleCourseandFees.feeId.totalAmount;
        this.student.total_payable_fee_with_discount =
          this.singleCourseandFees.feeId.totalAmount - this.studentDiscount;
        this.student.courseID = this.singleCourseandFees._id;
        this.student.feeID = this.singleCourseandFees.feeId;
        this.student.boardOrUniversityID =
          this.singleCourseandFees.boardOrUniversity;
        this.student.studentCourse.push({
          course_name: this.singleCourseandFees.name,
          course_branch: this.singleCourseandFees.branch,
          boardOrUniversity:
            this.singleCourseandFees.boardOrUniversity.boardoruniveristy,
          course_duration_year: this.singleCourseandFees.durationInYear,
          course_duration_month: this.singleCourseandFees.durationInMonths,
          course_type: this.singleCourseandFees.courseType,
          course_startYear: this.singleCourseandFees.startYear,
          course_endYear: this.singleCourseandFees.endYear,
        });
      }

    }

    this.user.email = this.s.username.value;
    this.user.password = this.s.password.value;
    this.userService.updateStudentCredentials(this.user).subscribe(
      userdata=>{
        this.studentService.editStudent(this.student).subscribe((data) => {
          if (this.student.studentFees.length > 0) {
            this.allIntakeMonth = [];
    
            // add to fee flow form
            this.feeFlow.studentId = this.student._id;
            this.feeFlow.lastPaidDate = this.student.admission_Date;
    
            let d = new Date(this.student.intake);
            let y = new Date(this.student.intake);
            for (var k in this.student.studentFees) {
              // let y = new Date(data.intake);
              // d.setMonth(d.getMonth() - 3);
              let year1 = y.getFullYear();
              let mon = new Date(y.setMonth(y.getMonth() + 12));
    
              let year2 = mon.getFullYear();
              y = mon;
              this.allIntakeYear[k] = year1 + '-' + year2;
    
              // console.log(year1, year2,"year")
            }
            // console.log(this.allIntakeYear)
            let xmonth;
            for (var j = 1; j <= 12; j++) {
              let month = d.getMonth() + j;
              if (month > 12) {
                month = month - 12;
                if (month.toString().length < 2) {
                  xmonth = '0' + month.toString();
                  this.allIntakeMonth.push(xmonth);
                  // console.log(this.allIntakeMonth,"month")
                } else {
                  this.allIntakeMonth.push(month.toString());
                }
              } else {
                if (month.toString().length < 2) {
                  xmonth = '0' + month.toString();
                  this.allIntakeMonth.push(xmonth);
                  // console.log(this.allIntakeMonth,"month")
                } else {
                  this.allIntakeMonth.push(month.toString());
                }
              }
            }
    
            // add to transportation fee collection form start
            for (var i in this.student.studentFees) {
              this.onCollectionDelete();
    
            }
    
            for (var i in this.student.studentFees) {
    
              this.transportCollectionFlow.month_list = [];
              if (this.transportCollectionFlow.isTransportationNeeded) {
                for (var b = 0; b < this.allIntakeMonth.length; b++) {
                  this.transportCollectionFlow.month_list.push({
                    month: this.allIntakeMonth[b],
                    isRequired: true,
                    isPaid: false,
                    paid_fee: 0,
                  });
                }
              } else {
                for (var c = 0; c < this.allIntakeMonth.length; c++) {
                  this.transportCollectionFlow.month_list.push({
                    month: this.allIntakeMonth[c],
                    isRequired: false,
                    isPaid: false,
                    paid_fee: 0,
                  });
                }
              }
              console.log(this.transportCollectionFlow.month_list);
              this.transportCollectionFlow.year = this.allIntakeYear[i];
              this.transportCollectionFlow.collectionType =
                COLLECTION_FLOW_TYPE.transport;
              this.transportCollectionFlow.collectedOn = this.s.intake.value;
              this.transportCollectionFlow.studentId = this.student._id;
              this.transportCollectionFlow.remarks = 'NIL';
    
              console.log(this.transportCollectionFlow);
    
              this.collectionFlowService
                .addcollectionFlow(this.transportCollectionFlow)
                .subscribe((data) => {});
            }
    
            // add to transportation fee collection form end
    
            this.feeFlow.fee_per_year = [];
    
            for (var i in this.student.studentFees) {
             
              this.feeFlow.fee_per_year.push({
                year: this.feeyear[i],
                total_fee: this.student.studentFees[i].per_year_payable_total_fee,
                balance_fee: this.student.studentFees[i].per_year_payable_total_fee,
                paid_fee: 0,
                registration_fee_total:
                this.student.studentFees[i].registration_fee,
                coaching_fee_total:
                  this.student.studentFees[i].per_year_payable_coaching_fee,
                exam_fee_total: this.per_year_payable_exam_fee[i],
                convocation_fee_total: this.student.studentFees[i].convocation_fee,
                attestation_fee_total: this.student.studentFees[i].attestation_fee,
                equalency_fee_total: this.student.studentFees[i].equalency_fee,
                other_fee_total: this.student.studentFees[i].other_fee,
                registration_fee_balance:
                this.student.studentFees[i].registration_fee,
                coaching_fee_balance:
                  this.student.studentFees[i].per_year_payable_coaching_fee,
                exam_fee_balance: this.per_year_payable_exam_fee[i],
                convocation_balance: this.student.studentFees[i].convocation_fee,
                attestation_balance: this.student.studentFees[i].attestation_fee,
                equalency_balance: this.student.studentFees[i].equalency_fee,
                other_balance: this.student.studentFees[i].other_fee,
                miscellaneous_fees_total: 0,
                miscellaneous_fees_paid_date: 0,
                transport_fees_total: 0,
                transport_fees_paid_date: 0,
                previous_year_arrear: 0,
                previous_year_arrear_balance: 0,
                previous_year_arrear_paid: 0,
                previous_year_arrear_paid_date: 0,
              });
            }
            console.log(JSON.stringify('fee flow' + this.feeFlow));
            this.feeflowService.addFeeflow(this.feeFlow).subscribe((data) => {
              if (this.auth.isAdmin) {
                this.toast.setMessage('Admission form submitted !!!', 'success');
                this.route.navigate([
                  'candidate-singleview/' + this.feeFlow.studentId,
                ]);
              } else {
                this.toast.setMessage('Admission form submitted !!!', 'success');
                this.route.navigate([
                  'staff-candidate-singleview/' + this.feeFlow.studentId,
                ]);
              }
            });
          } else {
            if (this.auth.isAdmin) {
              this.toast.setMessage('Admission form submitted !!!', 'success');
              this.route.navigate(['candidate-singleview/' + this.student._id]);
            } else {
              this.toast.setMessage('Admission form submitted !!!', 'success');
              this.route.navigate([
                'staff-candidate-singleview/' + this.student._id,
              ]);
            }
          }
        });
      },
      (error) => {
        this.toast.setMessage(error.error.message,"danger");
      }
    );
    
  }

  onadmissionformSave(student) {
    if (this.currentcourseeventvalue != null) {
      localStorage.removeItem('courseIndex');
      localStorage.setItem('courseIndex', this.currentcourseeventvalue);
      this.courseindex = localStorage.getItem('courseIndex');
    }
    this.feeyearDisplaydefault = false;
    // localStorage.removeItem('courseindex');
    this.student.istemporarysaved = true;
    this.student.intake = this.s.intake.value;
    this.student.admission_Date = this.s.admissiondate.value;
    this.student.DOB = this.s.dob.value;
    this.student.boardOrUniversityID= this.boardoruniversityID;
    this.student.username = this.s.username.value;
    this.student.password = this.s.password.value;
    if (this.current_courseid_value != null) {
      this.student.courseID = this.current_courseid_value._id;
      // this.student.branch = this.current_courseid_value._id;
      this.student.studentCourse.push({
        course_name: this.current_courseid_value.name,
        course_branch: this.current_courseid_value.branch,
        boardOrUniversity: this.current_courseid_value.boardoruniveristy,
        course_duration_year: this.current_courseid_value.durationInYear,
        course_duration_month: this.current_courseid_value.durationInMonths,
        course_type: this.current_courseid_value.courseType,
        course_startYear: this.current_courseid_value.startYear,
        course_endYear: this.current_courseid_value.endYear,
      });
    }

    this.student.subject_list = [];
    for (var x in this.per_year_discount) {
      this.studentDiscount += this.per_year_discount[x];
    }
    console.log('studentFees in save', this.student.studentFees);
    if (this.singleCourseandFees.feeId) {
      for (var x in this.singleCourseandFees.feeId.feeStructure) {
        if (!this.per_year_payable_coaching_fee[x]) {
          this.per_year_payable_coaching_fee[x] =
            this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;
        }
        else
        {
          if(!this.per_year_discount[x]) {
            this.per_year_payable_coaching_fee[x] =
            this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;
          }

        }
        this.studentCoachingFeeWithDiscount +=
          this.per_year_payable_coaching_fee[x];
          if(!this.per_year_payable_exam_fee[x]){
            this.per_year_payable_exam_fee[x] =
            this.singleCourseandFees.feeId.feeStructure[x].exam_fee;
          }
      }
      if (this.student.feeID) {
        this.student.studentCourse = [];
        this.student.studentFees = [];
        this.student.total_payable_fee_with_discount=0;
        for (var i in this.singleCourseandFees.feeId.feeStructure) {
          this.student.studentFees.push({
            year: this.feeyear[i],
            registration_fee:
              this.singleCourseandFees.feeId.feeStructure[i].registration_fee,
            coaching_fee:
              this.singleCourseandFees.feeId.feeStructure[i].coaching_fee,
            exam_fee: this.singleCourseandFees.feeId.feeStructure[i].exam_fee,
            convocation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].convocation_fee,
            attestation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].attestation_fee,
            equalency_fee:
              this.singleCourseandFees.feeId.feeStructure[i].equalency_fee,
            other_fee: this.singleCourseandFees.feeId.feeStructure[i].other_fee,
            per_year_total_fee:
              this.singleCourseandFees.feeId.feeStructure[i].total_fee,
            per_year_discount: this.per_year_discount[i],
            per_year_payable_total_fee: this.per_year_payable_total[i],
            per_year_payable_coaching_fee:
              this.per_year_payable_coaching_fee[i],
          });
        }
        this.student.original_course_amount =
          this.singleCourseandFees.feeId.totalAmount;
        this.student.total_payable_fee_with_discount =
          this.singleCourseandFees.feeId.totalAmount - this.studentDiscount;
        this.student.courseID = this.singleCourseandFees._id;
        this.student.feeID = this.singleCourseandFees.feeId;
        // this.student.boardOrUniversityID =
          // this.singleCourseandFees.boardOrUniversity;
        this.student.studentCourse.push({
          course_name: this.singleCourseandFees.name,
          course_branch: this.singleCourseandFees.branch,
          boardOrUniversity:
            this.singleCourseandFees.boardOrUniversity.boardoruniveristy,
          course_duration_year: this.singleCourseandFees.durationInYear,
          course_duration_month: this.singleCourseandFees.durationInMonths,
          course_type: this.singleCourseandFees.courseType,
          course_startYear: this.singleCourseandFees.startYear,
          course_endYear: this.singleCourseandFees.endYear,
        });

      } else {
        this.student.total_payable_fee_with_discount=0;
        for (var i in this.singleCourseandFees.feeId.feeStructure) {
          this.student.studentFees.push({
            year: this.feeyear[i],
            registration_fee:
              this.singleCourseandFees.feeId.feeStructure[i].registration_fee,
            coaching_fee:
              this.singleCourseandFees.feeId.feeStructure[i].coaching_fee,
            exam_fee: this.singleCourseandFees.feeId.feeStructure[i].exam_fee,
            convocation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].convocation_fee,
            attestation_fee:
              this.singleCourseandFees.feeId.feeStructure[i].attestation_fee,
            equalency_fee:
              this.singleCourseandFees.feeId.feeStructure[i].equalency_fee,
            other_fee: this.singleCourseandFees.feeId.feeStructure[i].other_fee,
            per_year_total_fee:
              this.singleCourseandFees.feeId.feeStructure[i].total_fee,
            per_year_discount: this.per_year_discount[i],
            per_year_payable_total_fee: this.per_year_payable_total[i],
            per_year_payable_coaching_fee:
              this.per_year_payable_coaching_fee[i],
          });
        }
        this.student.original_course_amount =
        this.singleCourseandFees.feeId.totalAmount;
        this.student.total_payable_fee_with_discount =
        this.singleCourseandFees.feeId.totalAmount - this.studentDiscount;
        this.student.courseID = this.singleCourseandFees._id;
        this.student.feeID = this.singleCourseandFees.feeId;
        // this.student.boardOrUniversityID =
        // this.singleCourseandFees.boardOrUniversity;

        this.student.studentCourse.push({
          course_name: this.singleCourseandFees.name,
          course_branch: this.singleCourseandFees.branch,
          boardOrUniversity:
          this.singleCourseandFees.boardOrUniversity.boardoruniveristy,
          course_duration_year: this.singleCourseandFees.durationInYear,
          course_duration_month: this.singleCourseandFees.durationInMonths,
          course_type: this.singleCourseandFees.courseType,
          course_startYear: this.singleCourseandFees.startYear,
          course_endYear: this.singleCourseandFees.endYear,
        });

      }
    }
    for (var k in this.checked_NIOS10_subjectlist) {
      this.student.subject_list.push(this.checked_NIOS10_subjectlist[k]);
    }
    for (var k in this.checked_NIOS12_subjectlist) {
      this.student.subject_list.push(this.checked_NIOS12_subjectlist[k]);
    }

    this.user.email = this.s.username.value;
    this.user.password = this.s.password.value;
    //update user cred
    this.userService.updateStudentCredentials(this.user).subscribe(
      (userdata)=>{
        // console.log("user serv",userdata)
      //update student cred 
        this.studentService.editStudent(this.student).subscribe((data) => {
          // console.log("stud serv")
          if (this.student.studentFees.length > 0) {
            // console.log("if")
            this.allIntakeMonth = [];

            // add to fee flow form
            this.feeFlow.studentId = this.student._id;
            this.feeFlow.lastPaidDate = this.student.admission_Date;

            let d = new Date(this.student.intake);
            let y = new Date(this.student.intake);
            for (var k in this.student.studentFees) {
              // let y = new Date(data.intake);
              // d.setMonth(d.getMonth() - 3);
              let year1 = y.getFullYear();
              let mon = new Date(y.setMonth(y.getMonth() + 12));

              let year2 = mon.getFullYear();
              y = mon;
              this.allIntakeYear[k] = year1 + '-' + year2;

              // console.log(year1, year2,"year")
            }
            // console.log(this.allIntakeYear)
            let xmonth;
            for (var j = 1; j <= 12; j++) {
              let month = d.getMonth() + j;
              if (month > 12) {
                month = month - 12;
                if (month.toString().length < 2) {
                  xmonth = '0' + month.toString();
                  this.allIntakeMonth.push(xmonth);
                  // console.log(this.allIntakeMonth,"month")
                } else {
                  this.allIntakeMonth.push(month.toString());
                }
              } else {
                if (month.toString().length < 2) {
                  xmonth = '0' + month.toString();
                  this.allIntakeMonth.push(xmonth);
                  // console.log(this.allIntakeMonth,"month")
                } else {
                  this.allIntakeMonth.push(month.toString());
                }
              }
            }

            // add to transportation fee collection form start
            for (var i in this.student.studentFees) {
              this.onCollectionDelete();

            }
            for (var i in this.student.studentFees) {
              this.transportCollectionFlow.month_list = [];
              if (this.transportCollectionFlow.isTransportationNeeded) {
                for (var b = 0; b < this.allIntakeMonth.length; b++) {
                  this.transportCollectionFlow.month_list.push({
                    month: this.allIntakeMonth[b],
                    isRequired: true,
                    isPaid: false,
                    paid_fee: 0,
                  });
                }
              } else {
                for (var c = 0; c < this.allIntakeMonth.length; c++) {
                  this.transportCollectionFlow.month_list.push({
                    month: this.allIntakeMonth[c],
                    isRequired: false,
                    isPaid: false,
                    paid_fee: 0,
                  });
                }
              }
              console.log('month list', this.transportCollectionFlow.month_list);
              this.transportCollectionFlow.year = this.allIntakeYear[i];
              this.transportCollectionFlow.collectionType =
                COLLECTION_FLOW_TYPE.transport;
              this.transportCollectionFlow.collectedOn = this.s.intake.value;
              this.transportCollectionFlow.studentId = this.student._id;
              this.transportCollectionFlow.remarks = 'NIL';

              console.log('transportCollectionFlow', this.transportCollectionFlow);

              this.collectionFlowService
                .addcollectionFlow(this.transportCollectionFlow)
                .subscribe((data) => {
                  // alert(JSON.stringify(data))
                });
            }

            // add to transportation fee collection form end

            this.feeFlow.fee_per_year = [];

            for (var i in this.student.studentFees) {
            
              this.feeFlow.fee_per_year.push({
                year: this.feeyear[i],

                total_fee: this.student.studentFees[i].per_year_payable_total_fee,
                balance_fee: this.student.studentFees[i].per_year_payable_total_fee,
                paid_fee: 0,
                registration_fee_total:
                this.student.studentFees[i].registration_fee,
                coaching_fee_total:
                  this.student.studentFees[i].per_year_payable_coaching_fee,
                exam_fee_total: this.per_year_payable_exam_fee[i],
                convocation_fee_total: this.student.studentFees[i].convocation_fee,
                attestation_fee_total: this.student.studentFees[i].attestation_fee,
                equalency_fee_total: this.student.studentFees[i].equalency_fee,
                other_fee_total: this.student.studentFees[i].other_fee,

                registration_fee_balance:
                this.student.studentFees[i].registration_fee,
                coaching_fee_balance:
                  this.student.studentFees[i].per_year_payable_coaching_fee,
                exam_fee_balance: this.per_year_payable_exam_fee[i],
                convocation_balance: this.student.studentFees[i].convocation_fee,
                attestation_balance: this.student.studentFees[i].attestation_fee,
                equalency_balance: this.student.studentFees[i].equalency_fee,
                other_balance: this.student.studentFees[i].other_fee,
                miscellaneous_fees_total: 0,
                miscellaneous_fees_paid_date: 0,
                transport_fees_total: 0,
                transport_fees_paid_date: 0,
                previous_year_arrear: 0,
                previous_year_arrear_balance: 0,
                previous_year_arrear_paid: 0,
                previous_year_arrear_paid_date: 0,
              });
            }
            console.log(JSON.stringify('fee flow' + this.feeFlow));
            this.feeflowService.addFeeflow(this.feeFlow).subscribe((data) => {
              if (this.auth.isAdmin) {
                this.route.navigate([
                  'admissionform-edit/' + this.feeFlow.studentId,
                ]);
                this.toast.setMessage('Admission form saved !!!', 'success');
              } else {
                this.route.navigate([
                  'staff-admissionform-edit/' + this.feeFlow.studentId,
                ]);
                this.toast.setMessage('Admission form saved !!!', 'success');
              }
            });
          } else {
            console.log("updated")
            if (this.auth.isAdmin) {
              this.route.navigate(['admissionform-edit/' + this.student._id]);
              this.toast.setMessage('Admission form saved !!!', 'success');
            } else {
              this.route.navigate(['staff-admissionform-edit/' + this.student._id]);
              this.toast.setMessage('Admission form saved !!!', 'success');
            }
          }

          this.toast.setMessage('Admission form saved !!!', 'success');
        });
      },
      (error) => {
        // console.log(error,"err")
        this.toast.setMessage(error.error.message,"danger");
      }
    );


    
  }
  cancelClick() {
    if (this.auth.isAdmin) {
      this.route.navigate(['candidate-management']);
    } else {
      this.route.navigate(['staff-candidate-management']);
    }
  }
  name_of_image;
  secondary_name;
  getImageofstudentsecondarycertificate() {
    let pos =
      this.student.studentDocuments.secondarycertificate.lastIndexOf('.'); // get last position of `.`
    this.extension = this.student.studentDocuments.secondarycertificate.slice(
      pos + 1
    ); // extract extension ignoring `.`
    // if (this.extension == 'pdf') {
    //   this.statusofextension = true;
    //   this.index =
    //     this.student.studentDocuments.secondarycertificate.lastIndexOf('/');
    //   this.name_pdf =
    //     this.student.studentDocuments.secondarycertificate.substring(
    //       this.index + 1
    //     );
    // } else {
    //   this.statusofextension = false;
    //   this.index =
    //     this.student.studentDocuments.secondarycertificate.lastIndexOf('/');
    //   this.name_img =
    //     this.student.studentDocuments.secondarycertificate.substring(
    //       this.index + 1
    //     );
    // }
    if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.secondarycertificate.lastIndexOf('/');
      this.name_img =
        this.student.studentDocuments.secondarycertificate.substring(
          this.index + 1
        );
    }else{
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.secondarycertificate.lastIndexOf('/');
      this.name_pdf =
        this.student.studentDocuments.secondarycertificate.substring(
          this.index + 1
        );
    
    }
    this.name_of_image = 'secondary';

    this.student_secondory_certificate_image =
      this.student.studentDocuments.secondarycertificate;
  }
  statusofextension = false;
  getImageofstudenthighersecondarycertificate() {
    let pos =
      this.student.studentDocuments.highersecondarycertificate.lastIndexOf('.'); // get last position of `.`
    this.extension =
      this.student.studentDocuments.highersecondarycertificate.slice(pos + 1); // extract extension ignoring `.`
    // if (this.extension == 'pdf') {
    //   this.statusofextension = true;
    //   this.index =
    //     this.student.studentDocuments.highersecondarycertificate.lastIndexOf(
    //       '/'
    //     );
    //   this.name_pdf =
    //     this.student.studentDocuments.highersecondarycertificate.substring(
    //       this.index + 1
    //     );
    // } else {
    //   this.statusofextension = false;
    //   this.index =
    //     this.student.studentDocuments.highersecondarycertificate.lastIndexOf(
    //       '/'
    //     );
    //   this.name_img =
    //     this.student.studentDocuments.highersecondarycertificate.substring(
    //       this.index + 1
    //     );
    // }
    if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.highersecondarycertificate.lastIndexOf(
          '/'
        );
      this.name_img =
        this.student.studentDocuments.highersecondarycertificate.substring(
          this.index + 1
        );
    
    }else{
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.highersecondarycertificate.lastIndexOf(
          '/'
        );
      this.name_pdf =
        this.student.studentDocuments.highersecondarycertificate.substring(
          this.index + 1
        );
     
    }
    this.name_of_image = 'highersecondary';

    this.student_secondory_certificate_image =
      this.student.studentDocuments.highersecondarycertificate;
  }
  getImageofstudentpassportfrontpage() {
    let pos = this.student.studentDocuments.passportfrontpage.lastIndexOf('.'); // get last position of `.`
    this.extension = this.student.studentDocuments.passportfrontpage.slice(
      pos + 1
    ); // extract extension ignoring `.`
    // if (this.extension == 'pdf') {
    //   this.statusofextension = true;
    //   this.statusofextension = true;
    //   this.index =
    //     this.student.studentDocuments.passportfrontpage.lastIndexOf('/');
    //   this.name_pdf = this.student.studentDocuments.passportfrontpage.substring(
    //     this.index + 1
    //   );
    // } else {
    //   this.statusofextension = false;
    //   this.index =
    //     this.student.studentDocuments.passportfrontpage.lastIndexOf('/');
    //   this.name_img = this.student.studentDocuments.passportfrontpage.substring(
    //     this.index + 1
    //   );
    // }
    if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.passportfrontpage.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.passportfrontpage.substring(
        this.index + 1
      );
    
    }else{
      this.statusofextension = true;
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.passportfrontpage.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.passportfrontpage.substring(
        this.index + 1
      );
    
    }
    this.name_of_image = 'psfrontpage';
    this.student_secondory_certificate_image =
      this.student.studentDocuments.passportfrontpage;
  }
  getImageofstudentpassportbackpage() {
    let pos = this.student.studentDocuments.passportbackpage.lastIndexOf('.'); // get last position of `.`
    this.extension = this.student.studentDocuments.passportbackpage.slice(
      pos + 1
    ); // extract extension ignoring `.`
    // if (this.extension == 'pdf') {
    //   this.statusofextension = true;
    //   this.statusofextension = true;
    //   this.index =
    //     this.student.studentDocuments.passportbackpage.lastIndexOf('/');
    //   this.name_pdf = this.student.studentDocuments.passportbackpage.substring(
    //     this.index + 1
    //   );
    // } else {
    //   this.statusofextension = false;
    //   this.index =
    //     this.student.studentDocuments.passportbackpage.lastIndexOf('/');
    //   this.name_img = this.student.studentDocuments.passportbackpage.substring(
    //     this.index + 1
    //   );
    // }
    if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.passportbackpage.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.passportbackpage.substring(
        this.index + 1
      );
    
    }else{
      this.statusofextension = true;
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.passportbackpage.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.passportbackpage.substring(
        this.index + 1
      );
    
    }
    this.name_of_image = 'psbackpage';
    this.student_secondory_certificate_image =
      this.student.studentDocuments.passportbackpage;
  }
  getImageofstudentvisapage() {
    let pos = this.student.studentDocuments.visapage.lastIndexOf('.'); // get last position of `.`
    this.extension = this.student.studentDocuments.visapage.slice(pos + 1); // extract extension ignoring `.`
    // if (this.extension == 'pdf') {
    //   this.statusofextension = true;
    //   this.statusofextension = true;
    //   this.index = this.student.studentDocuments.visapage.lastIndexOf('/');
    //   this.name_pdf = this.student.studentDocuments.visapage.substring(
    //     this.index + 1
    //   );
    // } else {
    //   this.statusofextension = false;
    //   this.index = this.student.studentDocuments.visapage.lastIndexOf('/');
    //   this.name_img = this.student.studentDocuments.visapage.substring(
    //     this.index + 1
    //   );
    // }
    if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
      this.statusofextension = false;
      this.index = this.student.studentDocuments.visapage.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.visapage.substring(
        this.index + 1
      );
    
    }else{
      this.statusofextension = true;
      this.statusofextension = true;
      this.index = this.student.studentDocuments.visapage.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.visapage.substring(
        this.index + 1
      );
   
    }

    
    this.name_of_image = 'visapage';
    this.student_secondory_certificate_image =
      this.student.studentDocuments.visapage;
  }
  getImageofstudenemiratesid() {
    let pos = this.student.studentDocuments.emirateaid.lastIndexOf('.'); // get last position of `.`
    this.extension = this.student.studentDocuments.emirateaid.slice(pos + 1); // extract extension ignoring `.`
    // if (this.extension == 'pdf') {
    //   this.statusofextension = true;
    //   this.statusofextension = true;
    //   this.index = this.student.studentDocuments.emirateaid.lastIndexOf('/');
    //   this.name_pdf = this.student.studentDocuments.emirateaid.substring(
    //     this.index + 1
    //   );
    // } else {
    //   this.statusofextension = false;
    //   this.index = this.student.studentDocuments.emirateaid.lastIndexOf('/');
    //   this.name_img = this.student.studentDocuments.emirateaid.substring(
    //     this.index + 1
    //   );
    // }
    if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
      this.statusofextension = false;
      this.index = this.student.studentDocuments.emirateaid.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.emirateaid.substring(
        this.index + 1
      );
    
    }else{
      this.statusofextension = true;
      this.statusofextension = true;
      this.index = this.student.studentDocuments.emirateaid.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.emirateaid.substring(
        this.index + 1
      );
    
    }
    this.name_of_image = 'emiratesid';
    this.student_secondory_certificate_image =
      this.student.studentDocuments.emirateaid;
  }
  student_other_doc = [];
  others;
  pdfdocs = [];
  imagedocs = [];
  getImageofstudentotherdocs() {
    this.imagedocs = [];
    this.pdfdocs = [];
    this.name_of_image = 'others';
    if (this.student.studentDocuments.otherdocuments.length > 0) {
      for (
        let k = 0;
        k < this.student.studentDocuments.otherdocuments.length;
        k++
      ) {
        let pos =
          this.student.studentDocuments.otherdocuments[k].lastIndexOf('.'); // get last position of `.`
        this.extension = this.student.studentDocuments.otherdocuments[k].slice(
          pos + 1
        ); // extract extension ignoring `.`
        // if (this.extension == 'pdf') {
        //   // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
        //   // console.log("pdf",this.pdfdocs)
        //   // let name=(this.student.studentDocuments.otherdocuments[k]).match(
        //   //   /[\w-]+\.(pdf)/g);

        //   this.index =
        //     this.student.studentDocuments.otherdocuments[k].lastIndexOf('/');
        //   let name = this.student.studentDocuments.otherdocuments[k].substring(
        //     this.index + 1
        //   );

        //   // console.log("name",name[0])
        //   let path = this.student.studentDocuments.otherdocuments[k];
        //   // this.imagename_path.push({name:name,path:path})

        //   this.pdfdocs.push({ name: name, path: path });
        //   console.log('pdf', this.pdfdocs);
        // } else {
        //   // let name=this.student.studentDocuments.otherdocuments[k].match(
        //   //   /[\w-]+\.(jpg|png|)/g
        //   // );
        //   this.index =
        //     this.student.studentDocuments.otherdocuments[k].lastIndexOf('/');
        //   let name = this.student.studentDocuments.otherdocuments[k].substring(
        //     this.index + 1
        //   );

        //   // console.log("name",name[0])
        //   let path = this.student.studentDocuments.otherdocuments[k];
        //   this.imagedocs.push({ name: name, path: path });
        // }

        if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
// let name=this.student.studentDocuments.otherdocuments[k].match(
          //   /[\w-]+\.(jpg|png|)/g
          // );
          this.index =
            this.student.studentDocuments.otherdocuments[k].lastIndexOf('/');
          let name = this.student.studentDocuments.otherdocuments[k].substring(
            this.index + 1
          );

          // console.log("name",name[0])
          let path = this.student.studentDocuments.otherdocuments[k];
          this.imagedocs.push({ name: name, path: path });
        
        }else{
          // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
          // console.log("pdf",this.pdfdocs)
          // let name=(this.student.studentDocuments.otherdocuments[k]).match(
          //   /[\w-]+\.(pdf)/g);

          this.index =
            this.student.studentDocuments.otherdocuments[k].lastIndexOf('/');
          let name = this.student.studentDocuments.otherdocuments[k].substring(
            this.index + 1
          );

          // console.log("name",name[0])
          let path = this.student.studentDocuments.otherdocuments[k];
          // this.imagename_path.push({name:name,path:path})

          this.pdfdocs.push({ name: name, path: path });
          console.log('pdf', this.pdfdocs);
        
        }
        this.otherdocslength =
          this.student.studentDocuments.otherdocuments.length;
      }
    }
  }
  updateImageofstudentprofilephotocertificate(event) {
    let type = 'studentdocuments';
    if (event.target.files[0].size < 50 * 1024) {
      this.studentService
        .uploadPhoto(event.target.files[0],this.student._id,type)
        .subscribe((res: any) => {
          this.imageofprofilePhoto = res.imageUrl;

          this.student.studentDocuments = {
            profilephoto: res.imageUrl,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        });

      this.toast.setMessage('Photo upload successfully !!!', 'success');
    } else {
      this.toast.setMessage(' Maximum file size should be 50KB !!!', 'danger');
    }
  }

  updateImageofstudentsecondarycertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.student.studentDocuments = {
          profilephoto: this.student.studentDocuments.profilephoto,
          secondarycertificate: res.imageUrl,
          highersecondarycertificate:
            this.student.studentDocuments.highersecondarycertificate,
          passportfrontpage: this.student.studentDocuments.passportfrontpage,
          passportbackpage: this.student.studentDocuments.passportbackpage,
          visapage: this.student.studentDocuments.visapage,
          emirateaid: this.student.studentDocuments.emirateaid,
          otherdocuments: this.student.studentDocuments.otherdocuments,
        };
        this.studentService.editStudent(this.student).subscribe((data) => {});
        if (res) {
          this.toast.setMessage(
            'Document uploaded successfully !!!',
            'success'
          );
          this.secondorystatus = true;
        }
      });
  }
  updateImageofstudenthscertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.student.studentDocuments = {
          profilephoto: this.student.studentDocuments.profilephoto,
          secondarycertificate:
            this.student.studentDocuments.secondarycertificate,
          highersecondarycertificate: res.imageUrl,
          passportfrontpage: this.student.studentDocuments.passportfrontpage,
          passportbackpage: this.student.studentDocuments.passportbackpage,
          visapage: this.student.studentDocuments.visapage,
          emirateaid: this.student.studentDocuments.emirateaid,
          otherdocuments: this.student.studentDocuments.otherdocuments,
        };
        this.studentService.editStudent(this.student).subscribe((data) => {});
        if (res) {
          this.toast.setMessage(
            'Document uploaded successfully !!!',
            'success'
          );
          this.highersecondorystatus = true;
        }
      });
  }
  updateImageofstudentpfcertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.student.studentDocuments = {
          profilephoto: this.student.studentDocuments.profilephoto,
          secondarycertificate:
            this.student.studentDocuments.secondarycertificate,
          highersecondarycertificate:
            this.student.studentDocuments.highersecondarycertificate,
          passportfrontpage: res.imageUrl,
          passportbackpage: this.student.studentDocuments.passportbackpage,
          visapage: this.student.studentDocuments.visapage,
          emirateaid: this.student.studentDocuments.emirateaid,
          otherdocuments: this.student.studentDocuments.otherdocuments,
        };
        this.studentService.editStudent(this.student).subscribe((data) => {});
        if (res) {
          this.toast.setMessage(
            'Document uploaded successfully !!!',
            'success'
          );
          this.passportfrontpagestatus = true;
        }
      });
  }

  updateImageofstudentpbcertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.student.studentDocuments = {
          profilephoto: this.student.studentDocuments.profilephoto,
          secondarycertificate:
            this.student.studentDocuments.secondarycertificate,
          highersecondarycertificate:
            this.student.studentDocuments.highersecondarycertificate,
          passportfrontpage: this.student.studentDocuments.passportfrontpage,
          passportbackpage: res.imageUrl,
          visapage: this.student.studentDocuments.visapage,
          emirateaid: this.student.studentDocuments.emirateaid,
          otherdocuments: this.student.studentDocuments.otherdocuments,
        };
        this.studentService.editStudent(this.student).subscribe((data) => {});
        if (res) {
          this.toast.setMessage(
            'Document uploaded successfully !!!',
            'success'
          );
          this.passportbackpagestatus = true;
        }
      });
  }

  updateImageofstudentvpcertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.student.studentDocuments = {
          profilephoto: this.student.studentDocuments.profilephoto,
          secondarycertificate:
            this.student.studentDocuments.secondarycertificate,
          highersecondarycertificate:
            this.student.studentDocuments.highersecondarycertificate,
          passportfrontpage: this.student.studentDocuments.passportfrontpage,
          passportbackpage: this.student.studentDocuments.passportbackpage,
          visapage: res.imageUrl,
          emirateaid: this.student.studentDocuments.emirateaid,
          otherdocuments: this.student.studentDocuments.otherdocuments,
        };
        this.studentService.editStudent(this.student).subscribe((data) => {});
        if (res) {
          this.toast.setMessage(
            'Document uploaded successfully !!!',
            'success'
          );
          this.visapagestatus = true;
        }
      });
  }
  updateImageofstudenteothercertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.student.studentDocuments = {
          profilephoto: this.student.studentDocuments.profilephoto,
          secondarycertificate:
            this.student.studentDocuments.secondarycertificate,
          highersecondarycertificate:
            this.student.studentDocuments.highersecondarycertificate,
          passportfrontpage: this.student.studentDocuments.passportfrontpage,
          passportbackpage: this.student.studentDocuments.passportbackpage,
          visapage: res.imageUrl,
          emirateaid: this.student.studentDocuments.emirateaid,
          otherdocuments: this.student.studentDocuments.otherdocuments,
        };
        this.studentService.editStudent(this.student).subscribe((data) => {});
        if (res) {
          this.toast.setMessage(
            'Document uploaded successfully !!!',
            'success'
          );
        }
      });
  }

  updateImageofstudenteidcertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.student.studentDocuments = {
          profilephoto: this.student.studentDocuments.profilephoto,
          secondarycertificate:
            this.student.studentDocuments.secondarycertificate,
          highersecondarycertificate:
            this.student.studentDocuments.highersecondarycertificate,
          passportfrontpage: this.student.studentDocuments.passportfrontpage,
          passportbackpage: this.student.studentDocuments.passportbackpage,
          visapage: this.student.studentDocuments.visapage,
          emirateaid: res.imageUrl,
          otherdocuments: this.student.studentDocuments.otherdocuments,
        };
        this.studentService.editStudent(this.student).subscribe((data) => {});
        if (res) {
          this.toast.setMessage(
            'Document uploaded successfully !!!',
            'success'
          );
          this.emiratesidstatus = true;
        }
      });
  }
  updateImageofstudenteotherdocs(event) {
    if (event.target.files.length > 0) {
      this.multipleimages = event.target.files;
      let type = 'studentdocuments';

      this.studentService
        .uploadOtherCertificate(this.multipleimages,this.student._id,type)
        .subscribe((res: any) => {
          for (let k = 0; k < res.imageUrl.length; k++) {
            this.student.studentDocuments.otherdocuments.push(
              'http://206.189.140.241:4200/' +type+'/'+this.student._id+'/' + res.imageUrl[k].filename
            );
            // this.student.studentDocuments.otherdocuments.push(
            //   'https://admintimes.com/' +type+'/'+this.student._id+'/' + res.imageUrl[k].filename
            // );
            // this.student.studentDocuments.otherdocuments.push(
            //   'http://localhost:3000/images/' +type+'/'+this.student._id+'/' + res.imageUrl[k].filename
            // );
          }

          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        });

      console.log('all images', this.otherspath);
      this.otherstatus = true;

      this.toast.setMessage('Image upload successfully !!!', 'success');
    }
  }
  uploadOtherDocument(event) {
    if (event.target.files.length > 0) {
      this.multipleimages = event.target.files;
      let type = 'studentdocuments';

      this.studentService
        .uploadOtherCertificate(this.multipleimages,this.student._id,type)
        .subscribe((res: any) => {
          for (let k = 0; k < res.imageUrl.length; k++) {
            // this.student.studentDocuments.otherdocuments.push(
            //   'http://206.189.140.241:4200/' +type+'/'+this.student._id+'/' +  res.imageUrl[k].filename
            // );
            this.student.studentDocuments.otherdocuments.push(
              'https://admintimes.com/' +type+'/'+this.student._id+'/' +  res.imageUrl[k].filename
            );
            // this.student.studentDocuments.otherdocuments.push(
            //   'http://localhost:3000/images/' +type+'/'+this.student._id+'/' +  res.imageUrl[k].filename
            // );
          }
          this.otherdocslength =
            this.student.studentDocuments.otherdocuments.length;

          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        });

      // console.log("all images",this.otherspath)
      this.toast.setMessage('Image upload successfully !!!', 'success');
    }
  }

  uploadCertificate(event) {
    let type = 'studentdocuments';
    this.studentService
      .uploadSecondaryCertificate(event.target.files[0],this.student._id,type)
      .subscribe((res: any) => {
        this.imageOfSecondaryCertificate = res.imageUrl;

        if (this.name_of_image == 'secondary') {
          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate: res.imageUrl,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        } else if (this.name_of_image == 'highersecondary') {
          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate: res.imageUrl,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        } else if (this.name_of_image == 'psfrontpage') {
          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: res.imageUrl,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        }
        if (this.name_of_image == 'psbackpage') {
          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: res.imageUrl,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        }
        if (this.name_of_image == 'visapage') {
          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: res.imageUrl,
            emirateaid: this.student.studentDocuments.emirateaid,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        }
        if (this.name_of_image == 'emiratesid') {
          this.student.studentDocuments = {
            profilephoto: this.student.studentDocuments.profilephoto,
            secondarycertificate:
              this.student.studentDocuments.secondarycertificate,
            highersecondarycertificate:
              this.student.studentDocuments.highersecondarycertificate,
            passportfrontpage: this.student.studentDocuments.passportfrontpage,
            passportbackpage: this.student.studentDocuments.passportbackpage,
            visapage: this.student.studentDocuments.visapage,
            emirateaid: res.imageUrl,
            otherdocuments: this.student.studentDocuments.otherdocuments,
          };
          this.studentService.editStudent(this.student).subscribe((data) => {});
        }

        // if(this.name_of_image=='highersecondary'){
        //   this.student.studentDocuments = {
        //   highersecondarycertificate:res.imageUrl,
        // }
        // this.studentService.editStudent(this.student).subscribe(
        //     data=>{    })

        // }
      });
    this.toast.setMessage('Document uploaded successfully !!!', 'success');
  }
  imgUrl;
  downloadimage() {
    if (this.name_of_image == 'secondary') {
      this.imgUrl = this.student.studentDocuments.secondarycertificate;
    }
    if (this.name_of_image == 'highersecondary') {
      this.imgUrl = this.student.studentDocuments.highersecondarycertificate;
    }
    if (this.name_of_image == 'psfrontpage') {
      this.imgUrl = this.student.studentDocuments.passportfrontpage;
    }
    if (this.name_of_image == 'psbackpage') {
      this.imgUrl = this.student.studentDocuments.passportbackpage;
    }

    if (this.name_of_image == 'visapge') {
      this.imgUrl = this.student.studentDocuments.visapage;
    }
    if (this.name_of_image == 'emiratesid') {
      this.imgUrl = this.student.studentDocuments.emirateaid;
    }

    const imgName = this.imgUrl.substr(this.imgUrl.lastIndexOf('/') + 1);
    this.httpClient
      .get(this.imgUrl, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });

        // IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file);
          return;
        }

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = imgName;

        // Version link.click() to work at firefox
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }
  downloadAllimage() {
    this.ngOnInit();
    for (
      let k = 0;
      k < this.student.studentDocuments.otherdocuments.length;
      k++
    ) {
      this.imgUrl = this.student.studentDocuments.otherdocuments[k];
      const imgName = this.imgUrl.substr(this.imgUrl.lastIndexOf('/') + 1);
      this.httpClient
        .get(this.imgUrl, { responseType: 'blob' as 'json' })
        .subscribe((res: any) => {
          const file = new Blob([res], { type: res.type });

          // IE
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file);
            return;
          }

          const blob = window.URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = blob;
          link.download = imgName;

          // Version link.click() to work at firefox
          link.dispatchEvent(
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );

          setTimeout(() => {
            // firefox
            window.URL.revokeObjectURL(blob);
            link.remove();
          }, 100);
        });
    }
  }
  imagepop;
  removeImagepdf(pdfname) {
    this.student.studentDocuments.otherdocuments.forEach((item, index) => {
      if (item === pdfname)
        this.student.studentDocuments.otherdocuments.splice(index, 1);
    });

    this.student.studentDocuments = {
      profilephoto: this.student.studentDocuments.profilephoto,
      secondarycertificate: this.student.studentDocuments.secondarycertificate,
      highersecondarycertificate:
        this.student.studentDocuments.highersecondarycertificate,
      passportfrontpage: this.student.studentDocuments.passportfrontpage,
      passportbackpage: this.student.studentDocuments.passportbackpage,
      visapage: this.student.studentDocuments.visapage,
      emirateaid: this.student.studentDocuments.emirateaid,
      otherdocuments: this.student.studentDocuments.otherdocuments,
    };
    this.studentService.editStudent(this.student).subscribe((data) => {});

    this.toast.setMessage('Document Deleted', 'success');
    this.otherdocslength = this.student.studentDocuments.otherdocuments.length;
  }
  removeImageimg(imagename) {
    this.student.studentDocuments.otherdocuments.forEach((item, index) => {
      if (item === imagename)
        this.student.studentDocuments.otherdocuments.splice(index, 1);
    });

    this.student.studentDocuments = {
      profilephoto: this.student.studentDocuments.profilephoto,
      secondarycertificate: this.student.studentDocuments.secondarycertificate,
      highersecondarycertificate:
        this.student.studentDocuments.highersecondarycertificate,
      passportfrontpage: this.student.studentDocuments.passportfrontpage,
      passportbackpage: this.student.studentDocuments.passportbackpage,
      visapage: this.student.studentDocuments.visapage,
      emirateaid: this.student.studentDocuments.emirateaid,
      otherdocuments: this.student.studentDocuments.otherdocuments,
    };
    this.studentService.editStudent(this.student).subscribe((data) => {});
    this.otherdocslength = this.student.studentDocuments.otherdocuments.length;
    this.toast.setMessage('Document Deleted', 'success');
  }

  public openConfirmationDialogpdf(imagepdf) {
    let imgpdf = imagepdf;
    this.confirmationDialogService
      .confirm(
        'Please confirm..',
        'Do you really want to Delete this Document?'
      )
      .then((confirmed) => {
        this.removeImagepdf(imgpdf);
      });
  }
  public openConfirmationDialogimg(imageimg) {
    let img = imageimg;
    this.confirmationDialogService
      .confirm(
        'Please confirm..',
        'Do you really want to Delete this Document ?'
      )
      .then((confirmed) => {
        this.removeImageimg(img);
      });
  }
  public removeConfirmationimage(imageimg) {
    let img = imageimg;
    this.confirmationDialogService
      .confirm(
        'Please confirm..',
        'Do you really want to Delete this Document ?'
      )
      .then((confirmed) => {
        this.removeImagesingleimg(img);
      });
  }

  removeImagesingleimg(imgname) {
    if (this.student.studentDocuments.secondarycertificate == imgname) {
      this.student.studentDocuments = {
        profilephoto: this.student.studentDocuments.profilephoto,
        highersecondarycertificate:
          this.student.studentDocuments.highersecondarycertificate,
        passportfrontpage: this.student.studentDocuments.passportfrontpage,
        passportbackpage: this.student.studentDocuments.passportbackpage,
        visapage: this.student.studentDocuments.visapage,
        emirateaid: this.student.studentDocuments.emirateaid,
        otherdocuments: this.student.studentDocuments.otherdocuments,
      };
      this.studentService.editStudent(this.student).subscribe((data) => {});

      this.toast.setMessage('Document Deleted', 'success');
      this.secondorystatus = false;
    }
    if (this.student.studentDocuments.highersecondarycertificate == imgname) {
      this.student.studentDocuments = {
        profilephoto: this.student.studentDocuments.profilephoto,
        secondarycertificate:
          this.student.studentDocuments.secondarycertificate,
        passportfrontpage: this.student.studentDocuments.passportfrontpage,
        passportbackpage: this.student.studentDocuments.passportbackpage,
        visapage: this.student.studentDocuments.visapage,
        emirateaid: this.student.studentDocuments.emirateaid,
        otherdocuments: this.student.studentDocuments.otherdocuments,
      };
      this.studentService.editStudent(this.student).subscribe((data) => {});

      this.toast.setMessage('Document Deleted', 'success');
      this.highersecondorystatus = false;
    }
    if (this.student.studentDocuments.passportfrontpage == imgname) {
      this.student.studentDocuments = {
        profilephoto: this.student.studentDocuments.profilephoto,
        secondarycertificate:
          this.student.studentDocuments.secondarycertificate,
        highersecondarycertificate:
          this.student.studentDocuments.highersecondarycertificate,
        passportbackpage: this.student.studentDocuments.passportbackpage,
        visapage: this.student.studentDocuments.visapage,
        emirateaid: this.student.studentDocuments.emirateaid,
        otherdocuments: this.student.studentDocuments.otherdocuments,
      };
      this.studentService.editStudent(this.student).subscribe((data) => {});

      this.toast.setMessage('Document Deleted', 'success');
      this.passportfrontpagestatus = false;
    }
    if (this.student.studentDocuments.passportbackpage == imgname) {
      this.student.studentDocuments = {
        profilephoto: this.student.studentDocuments.profilephoto,
        secondarycertificate:
          this.student.studentDocuments.secondarycertificate,

        highersecondarycertificate:
          this.student.studentDocuments.highersecondarycertificate,
        passportfrontpage: this.student.studentDocuments.passportfrontpage,
        visapage: this.student.studentDocuments.visapage,
        emirateaid: this.student.studentDocuments.emirateaid,
        otherdocuments: this.student.studentDocuments.otherdocuments,
      };
      this.studentService.editStudent(this.student).subscribe((data) => {});

      this.toast.setMessage('Document Deleted', 'success');
      this.passportbackpagestatus = false;
    }
    if (this.student.studentDocuments.visapage == imgname) {
      this.student.studentDocuments = {
        profilephoto: this.student.studentDocuments.profilephoto,
        secondarycertificate:
          this.student.studentDocuments.secondarycertificate,

        highersecondarycertificate:
          this.student.studentDocuments.highersecondarycertificate,
        passportfrontpage: this.student.studentDocuments.passportfrontpage,
        passportbackpage: this.student.studentDocuments.passportbackpage,
        emirateaid: this.student.studentDocuments.emirateaid,
        otherdocuments: this.student.studentDocuments.otherdocuments,
      };
      this.studentService.editStudent(this.student).subscribe((data) => {});

      this.toast.setMessage('Document Deleted', 'success');
      this.visapagestatus = false;
    }
    if (this.student.studentDocuments.emirateaid == imgname) {
      this.student.studentDocuments = {
        profilephoto: this.student.studentDocuments.profilephoto,
        secondarycertificate:
          this.student.studentDocuments.secondarycertificate,

        highersecondarycertificate:
          this.student.studentDocuments.highersecondarycertificate,
        passportfrontpage: this.student.studentDocuments.passportfrontpage,
        passportbackpage: this.student.studentDocuments.passportbackpage,
        visapage: this.student.studentDocuments.visapage,
        otherdocuments: this.student.studentDocuments.otherdocuments,
      };
      this.studentService.editStudent(this.student).subscribe((data) => {});

      this.toast.setMessage('Document Deleted', 'success');
      this.emiratesidstatus = false;
    }
  }

  showPdf(url) {
    window.open(url, '_blank');
  }
}
