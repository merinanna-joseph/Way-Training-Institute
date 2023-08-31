import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../services/student.service';
// import { Fee } from '../shared/models/fee.model';
// import { FeeService } from '../services/fee.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CourseService } from '../services/course.service';
import { Course } from '../shared/models/course.model';
import { BoardOrUniversityService } from '../services/boardoruniversity.service';
import { LeadService } from '../services/lead.service';
import { Lead } from '../shared/models/lead.model';
import { Feeflow } from '../shared/models/feeflow.model';
import { FeeflowService } from '../services/feeflow.service';
import { Collectionflow } from '../shared/models/collectionflow.model';
import { CollectionflowService } from '../services/collectionflow.service';
import { COLLECTION_FLOW_TYPE } from '../../app/globals';
import { truncate } from 'node:fs';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { CenterService } from '../services/center.service';
@Component({
  selector: 'app-admissionform',
  templateUrl: './admissionform.component.html',
  styleUrls: ['./admissionform.component.css']
})
export class AdmissionformComponent implements OnInit {

  student:Student = {};
  feeFlow:Feeflow = {};
  academicYear = (new Date()).getFullYear();
  admissionDate = new Date();
  joiningdate = new Date();
  allIntakeMonth = [];
  allIntakeYear = [];
  feeyear = [];
  today = new Date();
  tomonth = "0" + (this.today.getMonth() + 1);
  intake = (this.today.getFullYear() + "-" + (this.tomonth.slice(-2)));

  // intake = new Date();
  allUniversities = [];
  allCourses = [];
  allfeeyear = [];
  allBranches: Course[] = [];
  singleCourseandFees:Course={};
  courseDisplay:boolean = false;
  branchDisplay:boolean = false;
  feesDisplay:boolean = false;
  feeyearDisplay:boolean = false;
  branch;
  courseDuration:string;
  totalfeeswithdiscount:number = 0;
  totalfeeswithoutdiscount:number = 0;

  per_year_discount:number[] = [];
  per_year_total:number[] = [];
  per_year_payable_total:number[] = [];
  per_year_payable_coaching_fee:number[] = [];
  per_year_payable_exam_fee:number[] = [];

  studentDiscount:number = 0;
  studentCoachingFeeWithDiscount:number = 0;
  submitted = false;
  boardoruniversityID: any;
  courseID:any;
  feeID:any;
  centers: any[];
  trainers:any[];
  physical_status: string[];
  NIOS10_display :  boolean = false;
  NIOS12_display :  boolean = false;
  checked_NIOS10_subjectlist = [];
  checked_NIOS12_subjectlist = [];
  previousyearCourses = [];
  lead:Lead = {};
  lead_id;
  lead_officer;
  lead_source;
  sources: string[];
  iscourseID:boolean = false;
  modeofIntake:boolean=false;
  NIOS10_subjectlist = [
    {
      value: '202 - English',
      label: '202 - English',
      isChecked: true
    },
    {
      value: '209 - Sanskrit',
      label: '209 - Sanskrit',
      isChecked: false

    },
    {
      value: '211 - Mathematics',
      label: '211 - Mathematics',
      isChecked: false

    },
    {
      value: '212 - Science and Technology',
      label: '212 - Science and Technology',
      isChecked: false

    },
    {
      value: '213 - Social science',
      label: '213 - Social science',
      isChecked: false

    },
    {
      value: '214 - Economics',
      label: '214 - Economics',
      isChecked: false

    },
    {
      value: '215 - Business Studies',
      label: '215 - Business Studies',
      isChecked: false

    },
    {
      value: '216 - Home Science',
      label: '216 - Home Science',
      isChecked: false

    },
    {
      value: '222 - Psychology',
      label: '222 - Psychology',
      isChecked: false

    },
    {
      value: '223 - Indian Culture and Heritage',
      label: '223 - Indian Culture and Heritage',
      isChecked: false

    },
    {
      value: '224 - Accountancy',
      label: '224 - Accountancy',
      isChecked: false

    },
    {
      value: '225 - Painting',
      label: '225 - Painting',
      isChecked: false

    },
    {
      value: '229 - Data Entry Operations',
      label: '229 - Data Entry Operations',
      isChecked: false

    },
    {
      value: '235 - Arabic',
      label: '235 - Arabic',
      isChecked: false

    },
  ];

  NIOS12_subjectlist = [
    {
      value: '302 - English',
      label: '302 - English'
    },
    {
      value: '303 - Bengali',
      label: '303 - Bengali'
    },
    {
      value: '306 - Urdu',
      label: '306 - Urdu'
    },
    {
      value: '309 - Sanskrit',
      label: '309 - Sanskrit'
    },
    {
      value: '311 - Mathematics',
      label: '311 - Mathematics'
    },

    {
      value: '312 - Physics',
      label: '312 - Physics'
    },
    {
      value: '313 - Chemistry',
      label: '313 - Chemistry'
    },
    {
      value: '314 - Biology',
      label: '314 - Biology'
    },
    {
      value: '315 - History',
      label: '315 - History'
    },
    {
      value: '316 - Geography',
      label: '316 - Geography'
    },
    {
      value: '317 - Political Science',
      label: '317 - Political Science'
    },
    {
      value: '318 - Economics',
      label: '318 - Economics'
    },

    {
      value: '319 - Business Studies',
      label: '319 - Business Studies'
    },
    {
      value: '320 - Accountancy',
      label: '320 - Accountancy'
    },
    {
      value: '321 - Home Science',
      label: '321 - Home Science'
    },
    {
      value: '328 - Psychology',
      label: '328 - Psychology'
    },
    {
      value: '330 - Computer Science',
      label: '330 - Computer Science'
    },
    {
      value: '331 - Sociology',
      label: '331 - Sociology'
    },
    {
      value: '332 - Painting',
      label: '332 - Painting'
    },
    {
      value: '333 - Enviornmental Science',
      label: '333 - Enviornmental Science'
    },
    {
      value: '335 - Mass Communications',
      label: '335 - Mass Communications'
    },
    {
      value: '336 - Data Entry Operations',
      label: '336 - Data Entry Operations'
    },
    {
      value: '338 - Introduction to Law',
      label: '338 - Introduction to Law'
    },
    {
      value: '339 - Library & Information Science',
      label: '339 - Library & Information Science'
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
saved=false;
  commAddress:string = " ";
  permanentAddress:string = " ";
  multipleimages =[]
  otherspath=[]
  transportCollectionFlow:Collectionflow = {};
  locations = [];
  student_id: string;
  current_courseid_value: any;
  courseIndex: string;
  courseindex: string;
  statusoftransportation: boolean=false;

  user = new User();
  candidate_first_name;
  candidate_last_name;
  totalfeeswithorwithoutdiscount= 0;
  constructor(
    public auth:AuthService,
    private formBuilder: FormBuilder,
    public route: Router,
    public studentService: StudentService,
    public courseService:CourseService,
    public toast: ToastComponent,
    // public feeService: FeeService,
    public boardOrUniversityService:BoardOrUniversityService,
    private leadService : LeadService,
    private aRoute:ActivatedRoute,
    public feeflowService: FeeflowService,
    public collectionFlowService:CollectionflowService,
    public userService:UserService,
    public centerService:CenterService,

  ) { }


  addAdmissionForm: FormGroup = this.formBuilder.group({
    passport:[''],
    firstname: [''],
    lastname: [''],
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
    joiningdate:[''],
    university_register_number: [''],
    // studentdiscount: [''],
    courseId:[''],
    branch:[''],
    intake:[''],
    durationInYear:[''],
    total_fee:[''],
      fee_discount:[''],
    totalfeeswithdiscount:[''],
    centers: [''],
    subjectlist:[''],
    lead_officer:[''],
    trainer:[''],
    lead_source:[''],
    remarks:[''],
    disablitity_status:[''],

          // year: [''],
          // registration_fee: [''],
          // coaching_fee: [''],
          // exam_fee: [''],
          // convocation_fee: [''],
          // attestation_fee: [''],
          // equalency_fee: [''],
          // other_fee: [''],
          // total_fee_peryear: [0],
          // per_year_discount: [0],
          // per_year_payable_total:[0],
          username: ['',Validators.required],
          password: ['',Validators.required],
  });
  ngOnInit(): void {


    this.sources = ['Online','Phone','Social Media','Facebook','Walk','Reference','School Reference','Other'];

    // this.centers = [
    //   'TIMES  - ABU DHABI',
    //   'TIMES  - AJMAN',
    //   'TIMES  - SHARJAH',

    // ];
    this.physical_status = ['Differently Abled','Normal'];
    this.locations = ['Abu Dhabi','Ajman','Dubai','Fujairah','Ras Al Khaimah','Sharjah','Umm Al Quwain'];
    this.previousyearCourses = ['Schooling','12th or Equivalent','Graduation or Equivalent','Post Graduation or Equivalent']
    this.addAdmissionForm = this.formBuilder.group({
      passport:[''],
      firstname: [''],
      lastname: [''],
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
      joiningdate:[''],
      university_register_number: [''],
      intake: [''],
      // studentdiscount: [''],
      courseId:[''],
      branch:[''],

      durationInYear:[''],
      total_fee:[''],
      fee_discount:[''],
      totalfeeswithdiscount:[''],
      centers: [''],
      subjectlist:[''],
      lead_officer:[''],
    lead_source:[''],
    trainer:[''],
    remarks:[''],
    disablitity_status:[''],


      // year: [''],
      // registration_fee: [''],
      // coaching_fee: [''],
      // exam_fee: [''],
      // convocation_fee: [''],
      // attestation_fee: [''],
      // equalency_fee: [''],
      // other_fee: [''],
      // total_fee_peryear: [0],
      // per_year_discount: [0],
      // per_year_payable_total:[0],
      username: [''],
      password: [''],

    });
    this.getAllCenters();
    this.getAllUniversities();
    this.getAllTrainers();
    // this.student.lead_officer = this.auth.currentUser._id;
    // this.student.lead_source = this.sources[0];
    this.aRoute.paramMap.subscribe((params:ParamMap) =>
    {

      this.lead_id = params.get('id');
      if(this.lead_id){
        this.leadService.getLeadById(this.lead_id).subscribe(
          lead => {
            this.lead = lead[0];
            // this.
            this.lead_officer = this.lead.assignedTo.firstName + " " +this.lead.assignedTo.lastName;
            this.student.lead_officer = this.lead.assignedTo;
            this.student.lead_source = this.lead.source;
            this.student.password = 'Times123';
            // console.log(this.lead_officer)


          },
          error => {

          }
        );

      }else{
        this.lead_officer = this.auth.currentUser.firstName + " " + this.auth.currentUser.lastName;
        this.student.lead_officer = this.auth.currentUser._id;
        this.student.lead_source = this.sources[0];
        this.student.password = 'Times123';
        console.log(this.lead_officer)

      }



    }
  );
  this.transportCollectionFlow.isTransportationNeeded = false;
  }
  get s() {
    return this.addAdmissionForm.controls;
  }
 
  getFName(event:any){
    this.candidate_first_name = event.target.value;
    this.createUsername();
  }
  getLName(event:any){
    this.candidate_last_name = event.target.value;
    this.createUsername();
  }
  createUsername(){
    this.studentService.countStudents().subscribe(
      count => {
        // console.log(count,"count")
      
        let studentCount = count;
// alert(this.candidate_first_name)
        var fnamelengthOfThree = this.candidate_first_name.split(' ').join('');
        var lnamelengthOfThree = this.candidate_last_name.split(' ').join('');

        if(fnamelengthOfThree.length>=3){
          this.student.username = fnamelengthOfThree.substring(0, 3);
        }else{
          this.student.username = fnamelengthOfThree;
        }
        if(lnamelengthOfThree.length>=3){
          this.student.username += lnamelengthOfThree.substring(0, 3);
        }else{
          this.student.username += lnamelengthOfThree;
        }
        // this.student.username += this.student.roll_no;
        this.student.username += studentCount;
        this.student.username = this.student.username.toLowerCase();
    //  console.log(this.student.username,"user")
      }
    );
  }
  copyAddresses(event){
    if(event.target.checked){
      this.permanentAddress = this.commAddress;
    }
  }
  getSource(event){
    this.student.lead_source = event.value;
  }
  getTrainers(event){

    this.student.Trainer = event.value;
    // alert(this.student.Trainer)
  }
  getAllUniversities(){
    this.boardOrUniversityService.getBoardOrUniversitys().subscribe(
      data => {
        this.allUniversities = data;
        console.log(this.allUniversities,'All Universities')

      }
    )
  }
  getAllCenters(){
    this.centerService.getcenters().subscribe(
      data => {
        this.centers = data;
        console.log(this.centers,'All centers')

      }
    )
  }
  getAllTrainers(){
    this.userService.getTeachers().subscribe(
      data => {
        this.trainers = data;
        console.log(this.trainers,'All trainers')

      }
    )
  }
  onCentersSelection(event) {
    // alert(event.value)
    this.student.centers = event.value;
    // this.addAdmissionForm.controls['courseId'].setValue = null;
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

  onUniversitySelection(event){
    // this.boardoruniversityID='';
    if(!this.student.centers){
      this.toast.setMessage("Select Center !!!", "danger");
      return;
    }
    this.addAdmissionForm.patchValue( {'branch':''} );

    this.courseID='';
    this.courseDisplay = false;
    this.singleCourseandFees = {};
    this.allCourses = [];
    this.feeyear = [];
    this.allfeeyear = [];
    this.feeyearDisplay = false;
    this.courseDisplay = false;
    this.feesDisplay=false;
    this.NIOS10_display = false;
    this.NIOS12_display = false;
    this.boardoruniversityID = event.value;
    if(this.boardoruniversityID==''){
      this.courseDisplay = false;

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

    // this.courseService.getCoursesByUniversityId( this.boardoruniversityID ).subscribe(
    //   data => {
    //     this.allCourses = [];
    //     console.log(data,"data")
    //     for(var i in data){
    //       if(this.allCourses.filter(e => e.name == data[i].name
    //         && e.branch == data[i].branch && e.courseType == data[i].courseType).length <= 0){
    //         this.allCourses.push(data[i]);
    //       }
    //     }
    //     this.allCourses.sort((a, b) => a.name.localeCompare(b.name));
    //     console.log(this.allCourses,"cour")
    //     this.courseDisplay = true;

    //   });

     
  }
  onIntakeSelection(){
   this.modeofIntake=true;
    if(this.courseID){
      this.iscourseID = true;
      // this.onFeeyearSelection(this.courseID);
    }

  }
   onCourseSelection(event){
    this.singleCourseandFees = {};
     this.courseID = '';
     this.feeyearDisplay = false;
     this.feesDisplay=false;
     this.NIOS10_display = false;
     this.NIOS12_display = false;
     this.allfeeyear = [];
     localStorage.setItem('courseIndex',event.value);
    this.courseDuration = this.allCourses[event.value].durationInYear + "Y" + this.allCourses[event.value].durationInMonths + "M"
            this.current_courseid_value=this.allCourses[event.value].name+ '-' + '('+this.allCourses[event.value].branch+ ')'+'-'+ this.allCourses[event.value].courseType;
            this.singleCourseandFees = this.allCourses[event.value];
    //  this.courseService.getAllCourseandFee().subscribe(
    //   data=>{
    //     let courses = [];
    //     for(var i in data){
    //        courses.push(data[i]);
    //     }
    //     for(let i=0;i< courses.length;i++){
    //       if(courses[i].name == this.allCourses[event.value].name  && courses[i].boardOrUniversity._id == this.allCourses[event.value].boardOrUniversity
    //         && courses[i].branch == this.allCourses[event.value].branch && courses[i].courseType == this.allCourses[event.value].courseType && courses[i].centers == this.allCourses[event.value].centers){
    //         this.allfeeyear.push(courses[i]);
    //         // this.current_courseid_value=courses[i].name+ '-' + '('+courses[i].branch+ ')'+'-'+ courses[i].courseType;
    //         this.current_courseid_value=courses[i];

    //       }
    //     }
    //     this.feeyearDisplay = true;
    //     this.allfeeyear.reverse();
    //     console.log("current_courseid_value", this.current_courseid_value)
    //     this.courseIndex=i
    //     


    //   }
    // )

    // console.log(this.allfeeyear+"jj")

  }
  // onFeeyearSelection(event){
  //   // this.courseID = '';
  //   this.per_year_payable_coaching_fee = [];
  //   this.per_year_payable_exam_fee = [];
  //   if(this.iscourseID){
  //     this.courseID = event;
  //   }else{
  //     this.courseID = event.value;
  //   }
  //   this.feesDisplay=false;
  //   this.feeyear = [];
  //   this.singleCourseandFees = {};
  //   this.courseService.getSingleCourseandFee({_id : this.courseID} ).subscribe(
  //     data => {
  //       this.feesDisplay = true;
  //       this.iscourseID = false;
  //       this.singleCourseandFees = data[0];
  //       if(this.singleCourseandFees.name == 'NIOS 10th'){
  //         this.checked_NIOS10_subjectlist.push(this.NIOS10_subjectlist[0].value);
  //         this.NIOS10_display = true;
  //       }else if(this.singleCourseandFees.name == 'NIOS 12th'){
  //         this.checked_NIOS12_subjectlist.push(this.NIOS12_subjectlist[0].value);

  //         this.NIOS12_display = true;
  //       }
  //       this.totalfeeswithoutdiscount = this.singleCourseandFees.feeId.totalAmount;
  //       let yintake = new Date(this.s.intake.value);
  //       for(var i in this.singleCourseandFees.feeId.feeStructure){
  //       let y1 = yintake.getFullYear();
  //       let mon = new Date(yintake.setMonth(yintake.getMonth() + 12));
  //       let y2 = mon.getFullYear();
  //         yintake = mon;
  //         this.feeyear[i] = y1 + "-" +y2;
  //         this.per_year_total[i] =  this.singleCourseandFees.feeId.feeStructure[i].total_fee;
  //         this.per_year_payable_total[i] = this.singleCourseandFees.feeId.feeStructure[i].total_fee;
  //         this.per_year_discount[i]  = 0;
  //         this.courseDuration = this.singleCourseandFees.durationInYear + "Y" + this.singleCourseandFees.durationInMonths + "M"
  //       }
  //       console.log(this.singleCourseandFees,'Single course fees')
  //       console.log(this.feeyear)

  //     }
  //   )
  // }
  checked(item){
  //  console.log(this.checked_NIOS10_subjectlist)
    let ret: boolean = true;

      if(this.checked_NIOS10_subjectlist.indexOf(item) > -1){

        ret = true;

      }else if(this.checked_NIOS12_subjectlist.indexOf(item) > -1){
        ret = true;
      }
      else{
        ret = false;
      }
    // alert(ret)
    // console.log(ret)
    return ret;
  }
    onSubjectListNIOS10CheckboxChange(option, event) {
      // alert(event.target.checked+" " + option.value)
      if(event.target.checked) {
        this.checked_NIOS10_subjectlist.push(option.value);
      } else {
      for(var i=0 ; i < this.NIOS10_subjectlist.length; i++) {
        if(this.checked_NIOS10_subjectlist[i] == option.value) {
          this.checked_NIOS10_subjectlist.splice(i,1);
        }
      }
    }

    // console.log(this.checked_NIOS10_subjectlist)
    }
    onSubjectListNIOS12CheckboxChange(option, event) {
      // alert(event.target.checked+" " + option.value)
      if(event.target.checked) {
        this.checked_NIOS12_subjectlist.push(option.value);
      } else {
      for(var i=0 ; i < this.NIOS12_subjectlist.length; i++) {
        if(this.checked_NIOS12_subjectlist[i] == option.value) {
          this.checked_NIOS12_subjectlist.splice(i,1);
        }
      }
    }

    // console.log(this.checked_NIOS10_subjectlist)
    }


  // find_total_fee_with_discount(i){
  //   this.per_year_payable_total[i] = this.singleCourseandFees.feeId.feeStructure[i].total_fee - this.per_year_discount[i];
  //   if(this.singleCourseandFees.feeId.feeStructure[i].coaching_fee == 0){
  //     this.per_year_payable_exam_fee[i] = this.singleCourseandFees.feeId.feeStructure[i].exam_fee - this.per_year_discount[i];

  //   }else{

  //     this.per_year_payable_coaching_fee[i] = this.singleCourseandFees.feeId.feeStructure[i].coaching_fee - this.per_year_discount[i];
  //   }
  //   console.log(this.per_year_payable_exam_fee[i]," ",this.per_year_payable_coaching_fee[i],"i",this.per_year_payable_total[i])
  //   this.totalfeeswithdiscount = 0;
  //     for(var x in this.per_year_payable_total){
  //       this.totalfeeswithdiscount = this.totalfeeswithdiscount + this.per_year_payable_total[x];
  //     }

  // }
  getPayableFee(){
   
    if(this.s.total_fee.value && this.s.fee_discount.value){
      this.student.original_course_amount = Number(this.s.total_fee.value);
      this.student.discount = Number(this.s.fee_discount.value);
      this.totalfeeswithorwithoutdiscount = Number(this.s.total_fee.value) - Number(this.s.fee_discount.value);
      this.student.total_payable_fee_with_or_without_discount = this.totalfeeswithorwithoutdiscount;
    }else if(this.s.total_fee.value){
      this.student.original_course_amount = Number(this.s.total_fee.value);
      this.totalfeeswithorwithoutdiscount = Number(this.s.total_fee.value);
      this.student.total_payable_fee_with_or_without_discount = this.totalfeeswithorwithoutdiscount;

    }else if(this.s.fee_discount.value){
      this.student.discount = Number(this.s.fee_discount.value);
      this.totalfeeswithorwithoutdiscount = Number(this.s.fee_discount.value);
      this.student.total_payable_fee_with_or_without_discount = this.totalfeeswithorwithoutdiscount;

    }
  
  }
  uploadIdProof(event)
  {
    this.studentService.uploadImageOfIdProof(event.target.files[0]).
    subscribe((res:any)=>{
      this.imageUrl=res.imageUrl;
    })
  }
  onPassportImagePicker(event:Event)
  {
    const image_passport=(event.target as HTMLInputElement).files[0];
    this.addAdmissionForm.patchValue({passport:image_passport});
    this.addAdmissionForm.get('passport').updateValueAndValidity();
    const reader=new FileReader();
    reader.onload=()=>{
      this.passportPreview=reader.result
    };
    reader.readAsDataURL(image_passport)
    }
    count=0;
    //commenting due to id issue in upload
    // uploadPhoto(event)
    // {
    //   console.log(event.target.files[0].size)
    //   if(event.target.files[0].size<50*1024){
    //     this.studentService.uploadPhoto(event.target.files[0]).
    //     subscribe((res:any)=>{
    //       this.imageofprofilePhoto=res.imageUrl;

    //     })

    //     this.toast.setMessage("Photo upload successfully !!!", "success");
    //   }
    //   else{
    //     this.toast.setMessage(" Maximum file size should be 50KB !!!", "danger");

    //   }
    //      }

    // uploadSecondaryCertificate(event)
    // {
    //   this.studentService.uploadSecondaryCertificate(event.target.files[0]).
    //   subscribe((res:any)=>{
    //     if(res){
    //       this.name_secondary = res.imageName;
    //       this.imageOfSecondaryCertificate=res.imageUrl;
    //       this.toast.setMessage("Document upload successfully !!!", "success");

    //     }
    //     else{
    //       this.toast.setMessage("Document upload failed !!!", "danger");

    //     }


    //   })
    //   }
    // uploadHigherSecondaryCertificate(event)
    // {
    //   this.studentService.uploadHigherSecondaryCertificate(event.target.files[0]).
    //   subscribe((res:any)=>{
    //     if(res){
    //     this.name_highersecondory = res.imageName
    //     this.imageOfHigherSecondory=res.imageUrl;
    //     this.toast.setMessage("Document upload successfully !!!", "success");

    //     }
    //   })
    // }
    // uploadPassportFrontView(event)
    // {
    //   this.studentService.uploadHigherSecondaryCertificate(event.target.files[0]).
    //   subscribe((res:any)=>{
    //     if(res){
    //       this.name_passport_front =res.imageName
    //       this.imageOfPassportFrontView=res.imageUrl;
    //       this.toast.setMessage("Document upload successfully !!!", "success");

    //     }
    //        })
    // }
    //  uploadPassportBackView(event)
    // {
    //   this.studentService.uploadHigherSecondaryCertificate(event.target.files[0]).
    //   subscribe((res:any)=>{
    //     if(res){
    //       this.name_passport_back = res.imageName
    //       this.imageOfPassportBackView=res.imageUrl;
    //       this.toast.setMessage("Document upload successfully !!!", "success");

    //     }

    //   })
    // }
    // uploadVisaPage(event)
    // {
    //   this.studentService.uploadHigherSecondaryCertificate(event.target.files[0]).
    //   subscribe((res:any)=>{
    //     if(res){
    //       this.name_visapage = res.imageName
    //       this.imageOfVisaPage=res.imageUrl;
    //       this.toast.setMessage("Document upload successfully !!!", "success");

    //     }
    //           })
    // }
    // uploadEmiratesId(event)
    // {
    //   this.studentService.uploadHigherSecondaryCertificate(event.target.files[0]).
    //   subscribe((res:any)=>{
    //     if(res){
    //       this.name_emirates_id = res.imageName
    //     this.imageOfEmiratesId=res.imageUrl;
    //     this.toast.setMessage("Document upload successfully !!!", "success");

    //     }

    //   })
    // }
    
    // uploadOtherDocument(event)
    // {
     
    //   if(event.target.files.length>0){
    //     this.multipleimages=event.target.files;
    //     this.studentService.uploadOtherCertificate(this.multipleimages).
    //     subscribe((res:any)=>{
    //       if(res.imageUrl)
    //       {
    //         this.count=this.count+res.imageUrl.length
    //       }

    //       for(let k=0;k<res.imageUrl.length;k++){
    //         this.otherspath.push('http://206.189.140.241:4200/'+res.imageUrl[k].filename);
    //         // this.otherspath.push('http://localhost:3000/images/'+res.imageUrl[k].filename);


    //       }

    //       // alert(this.otherspath+"images")

    //       // console.log("all files",res.imageUrl)
    //       this.toast.setMessage("Image upload successfully !!!", "success");
    //     })
    //     console.log("documen list prod",this.student.studentDocuments.otherdocuments)
    //   }

    // }

    transportneeded(event){
      if(event.target.checked){
        // alert(event.target.checked)
        // this.transportation_required = event.target.checked;
        this.transportCollectionFlow.isTransportationNeeded = event.target.checked;


      }
      else{

        this.transportCollectionFlow.isTransportationNeeded = false;

      }
    }

    onadmissionformSubmit(){
      localStorage.removeItem('courseindex');
      this.saved=false;
      this.submitted = true;
      if (this.addAdmissionForm.invalid) {
        return;
      }
    this.student.istemporarysaved = false;
    // this.student.studentFees = [];
    this.student.studentCourse = [];
    this.student.subject_list = [];
    // for(var x in this.per_year_discount){
    //   this.studentDiscount += this.per_year_discount[x];
    // }
    // if(this.singleCourseandFees){
      // for(var x in this.singleCourseandFees.feeId.feeStructure){
      //   if(!this.per_year_payable_coaching_fee[x]){
      //     this.per_year_payable_coaching_fee[x] = this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;
      //   }else{
      //     if(!this.per_year_discount[x]){
      //       this.per_year_payable_coaching_fee[x] = this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;

      //     }

      //   }
      //   this.studentCoachingFeeWithDiscount += this.per_year_payable_coaching_fee[x];
      //   if(!this.per_year_payable_exam_fee[x]){
      //     this.per_year_payable_exam_fee[x] = this.singleCourseandFees.feeId.feeStructure[x].exam_fee;
      //   }
      // }
      // for(var i in this.singleCourseandFees.feeId.feeStructure){
      //   this.student.studentFees.push({
      //     year : this.feeyear[i],
      //     registration_fee : this.singleCourseandFees.feeId.feeStructure[i].registration_fee,
      //     coaching_fee : this.singleCourseandFees.feeId.feeStructure[i].coaching_fee,
      //     exam_fee : this.singleCourseandFees.feeId.feeStructure[i].exam_fee,
      //     convocation_fee : this.singleCourseandFees.feeId.feeStructure[i].convocation_fee,
      //     attestation_fee : this.singleCourseandFees.feeId.feeStructure[i].attestation_fee,
      //     equalency_fee : this.singleCourseandFees.feeId.feeStructure[i].equalency_fee,
      //     other_fee : this.singleCourseandFees.feeId.feeStructure[i].other_fee,
      //     per_year_total_fee : this.singleCourseandFees.feeId.feeStructure[i].total_fee,
      //     per_year_discount : this.per_year_discount[i],

      //     per_year_payable_total_fee : this.per_year_payable_total[i],
      //     per_year_payable_coaching_fee : this.per_year_payable_coaching_fee[i],


      //   });
      // }
      // this.student.original_course_amount = this.singleCourseandFees.feeId.totalAmount;
      // this.student.total_payable_fee_with_discount = this.singleCourseandFees.feeId.totalAmount - this.studentDiscount;
      
    // }
    this.student.courseID = this.singleCourseandFees._id;
    // this.student.feeID = this.singleCourseandFees.feeId;
    this.student.boardOrUniversityID = this.singleCourseandFees.boardOrUniversity;
    this.student.studentCourse.push(
      {
        course_name : this.singleCourseandFees.name,
        course_branch : this.singleCourseandFees.branch,
        boardOrUniversity : this.singleCourseandFees.boardOrUniversity.boardoruniveristy,
        course_duration_year : this.singleCourseandFees.durationInYear,
        course_duration_month : this.singleCourseandFees.durationInMonths,
        course_type : this.singleCourseandFees.courseType,
        course_startYear : this.singleCourseandFees.startYear,
        course_endYear : this.singleCourseandFees.endYear,
      }
      );
    this.student.studentDocuments={
      profilephoto:this.imageofprofilePhoto,
      secondarycertificate:this.imageOfSecondaryCertificate,
      highersecondarycertificate:this.imageOfHigherSecondory,
      passportfrontpage:this.imageOfPassportFrontView,
      passportbackpage:this.imageOfPassportBackView,
      visapage:this.imageOfVisaPage,
      emirateaid:this.imageOfEmiratesId,
      otherdocuments:this.otherspath
    }
    this.student.disablitity_status = this.s.disablitity_status.value;
    this.student.firstName = this.s.firstname.value,
    this.student.lastName = this.s.lastname.value,
    this.student.email = this.s.email.value,
    this.student.gender = this.s.gender.value,
    this.student.DOB = this.s.dob.value,
    this.student.contact = {
      mobilenumber : this.s.mobilenumber.value,
      residencenumber : this.s.residencenumber.value,
    }
    this.student.passportNumber = this.s.passportnumber.value,
    this.student.fatherName = this.s.fathername.value,
    this.student.motherName = this.s.mothername.value,
    this.student.address = {
      location : this.s.location.value,
      nationality : this.s.nationality.value,
      permanent_address : this.s.permanentaddress.value,
      temporary_address : this.s.temporaryaddress.value,
    },

    this.student.education_qualification = {
      last_Completed_Course : this.s.lastcompletedcourse.value,
      university : this.s.university.value,
      institute : this.s.institute.value,

      passout_year : this.s.passout_year.value,
    },
    this.student.remarks = this.s.remarks.value;
    let tID = this.s.tallyID.value;
    if(tID.length > 0){
      this.student.tally_ID = this.s.tallyID.value;
    }else{
      this.student.tally_ID = undefined;
    }
    let rID = this.s.university_register_number.value;
    if(rID.length > 0){
      this.student.university_register_number = this.s.university_register_number.value;
    }else{
      this.student.university_register_number = undefined;
    }
    this.student.admission_Date = this.s.admissiondate.value;
    this.student.joining_Date = this.s.joiningdate.value;

    this.student.intake = this.s.intake.value;

    this.student.username = this.s.username.value;

    this.student.password = this.s.password.value;

      for(var k in this.checked_NIOS10_subjectlist){
        this.student.subject_list.push(this.checked_NIOS10_subjectlist[k]);
      }
      for(var k in this.checked_NIOS12_subjectlist){
        this.student.subject_list.push(this.checked_NIOS12_subjectlist[k]);
      }





    // console.log(this.student + "admission before saving");
    this.user = {
      firstName:this.s.firstname.value,
      lastName: this.s.lastname.value,
      email:this.s.username.value,
      password:this.s.password.value,
      mobile:this.s.mobilenumber.value,
      roles:['student'],
    };
    console.log(this.student,"student",this.feeFlow,"user",this.user)
    this.userService.register(this.user)
    .subscribe(
        data => {
          // alert("succes");
          console.log(this.student,"student",this.feeFlow)
          this.studentService.addStudent(this.student).subscribe(
            (data)=>{
      
      
              // add to fee flow form
              this.feeFlow.studentId = data._id;
              this.feeFlow.lastPaidDate = this.s.admissiondate.value;
              this.feeFlow.ispaid = false;
              this.feeFlow.total_fee = this.student.total_payable_fee_with_or_without_discount;
              this.feeFlow.paid_fee = 0;
              this.feeFlow.balance_fee = this.student.total_payable_fee_with_or_without_discount;
                // let d = new Date(data.intake);
                // let y = new Date(data.intake);
                // for(var k in data.studentFees){
                //   // let y = new Date(data.intake);
                //   // d.setMonth(d.getMonth() - 3);
                //   let year1 = y.getFullYear();
                //   let mon = new Date(y.setMonth(y.getMonth() + 12));
      
                //   let year2 = mon.getFullYear();
                //   y = mon;
                //   this.allIntakeYear[k] = year1 + "-" +year2;
      
                //   // console.log(year1, year2,"year")
                // }
                // console.log(this.allIntakeYear+"in")
                // let xmonth;
                // for(var j = 1; j <= 12; j++){
                //   let month = d.getMonth() + j;
                //   if(month > 12){
                //     month = month -12;
                //     if(month.toString().length < 2){
                //       xmonth = '0' + month.toString();
                //       this.allIntakeMonth.push(xmonth);
                //       // console.log(this.allIntakeMonth,"month")
                //     }else{
                //       this.allIntakeMonth.push(month.toString());
      
                //     }
                //   }else{
                //     if(month.toString().length < 2){
                //       xmonth = '0' + month.toString();
                //       this.allIntakeMonth.push(xmonth);
                //       // console.log(this.allIntakeMonth,"month")
                //     }else{
                //       this.allIntakeMonth.push(month.toString());
      
                //     }
                //   }
      
                // }
      
      
       // add to transportation fee collection form start
            // for(var i in data.studentFees){
            //   this.transportCollectionFlow.month_list = [];
            //   if(this.transportCollectionFlow.isTransportationNeeded){
            //     for(var b = 0 ;b < this.allIntakeMonth.length; b++){
            //       this.transportCollectionFlow.month_list.push(
            //         {
            //           month : this.allIntakeMonth[b],
            //           isRequired : true,
            //           isPaid : false,
            //           paid_fee : 0,
            //         }
            //       );
            //     }
            //   }else{
            //     for(var c = 0 ;c < this.allIntakeMonth.length; c++){
            //       this.transportCollectionFlow.month_list.push(
            //         {
            //           month : this.allIntakeMonth[c],
            //           isRequired : false,
            //           isPaid : false,
            //           paid_fee : 0,
            //         }
            //       );
            //     }
            //   }
            //   // console.log(this.transportCollectionFlow.month_list)
            //   this.transportCollectionFlow.year = this.allIntakeYear[i];
            //   this.transportCollectionFlow.collectionType = COLLECTION_FLOW_TYPE.transport;
            //   this.transportCollectionFlow.collectedOn = this.s.intake.value;
            //   this.transportCollectionFlow.studentId = data._id;
            //   this.transportCollectionFlow.remarks = "NIL"
      
            //     //  console.log(this.transportCollectionFlow)
      
            //   this.collectionFlowService.addcollectionFlow(this.transportCollectionFlow).subscribe(
            //     data=>{
            //     //  alert("success")
      
            //     }
            //   );
            // }
      
       // add to transportation fee collection form end
      
      
      
      
              // this.feeFlow.fee_per_year = [];
      
              // for(var i in data.studentFees){
              //   // alert("alert 1")
              //   // for(var j = 0 ;j < this.allIntakeMonth.length; j++){
      
              //   //   if(j > 9){
              //   //     this.feeFlow.feeStructure.push(
              //   //       {
              //   //         year : this.allIntakeYear[i],
              //   //         month : this.allIntakeMonth[j],
              //   //         registration_fee : 0,
              //   //         coaching_fee : 0,
              //   //         exam_fee : 0,
              //   //         convocation_fee : 0,
              //   //         attestation_fee : 0,
              //   //         equalency_fee : 0,
              //   //         other_fee : 0,
      
              //   //         registration_fee_arrears : 0,
              //   //         coaching_fee_arrears  : 0,
              //   //         exam_fee_arrears : 0,
              //   //         convocation_fee_arrears: 0,
              //   //         attestation_fee_arrears: 0,
              //   //         equalency_fee_arrears: 0,
              //   //         other_fee_arrears: 0,
      
              //   //         registration_fee_paid_date : 0,
              //   //         coaching_fee_paid_date : 0,
              //   //         exam_fee_paid_date : 0,
              //   //         convocation_fee_paid_date : 0,
              //   //         attestation_fee_paid_date : 0,
              //   //         equalency_fee_paid_date : 0,
              //   //         other_fee_paid_date : 0,
      
              //   //         registration_fee_arrears_balance : 0,
              //   //         coaching_fee_arrears_balance  : 0,
              //   //         exam_fee_arrears_balance : 0,
              //   //         convocation_fee_arrears_balance: 0,
              //   //         attestation_fee_arrears_balance: 0,
              //   //         equalency_fee_arrears_balance: 0,
              //   //         other_fee_arrears_balance: 0,
      
              //   //       }
              //   //     )
              //   //   }else if(j > 0){
              //   //     this.feeFlow.feeStructure.push(
              //   //       {
              //   //         year : this.allIntakeYear[i],
              //   //         month : this.allIntakeMonth[j],
              //   //         registration_fee : 0,
              //   //         coaching_fee : data.studentFees[i].per_year_payable_coaching_fee/10,
              //   //         exam_fee : 0,
              //   //         convocation_fee : 0,
              //   //         attestation_fee : 0,
              //   //         equalency_fee : 0,
              //   //         other_fee : 0,
      
              //   //         registration_fee_arrears : 0,
              //   //         coaching_fee_arrears  : 0,
              //   //         exam_fee_arrears : 0,
              //   //         convocation_fee_arrears: 0,
              //   //         attestation_fee_arrears: 0,
              //   //         equalency_fee_arrears: 0,
              //   //         other_fee_arrears: 0,
      
              //   //         registration_fee_paid_date : 0,
              //   //         coaching_fee_paid_date : 0,
              //   //         exam_fee_paid_date : 0,
              //   //         convocation_fee_paid_date : 0,
              //   //         attestation_fee_paid_date : 0,
              //   //         equalency_fee_paid_date : 0,
              //   //         other_fee_paid_date : 0,
      
              //   //         registration_fee_arrears_balance : 0,
              //   //         coaching_fee_arrears_balance  : 0,
              //   //         exam_fee_arrears_balance : 0,
              //   //         convocation_fee_arrears_balance: 0,
              //   //         attestation_fee_arrears_balance: 0,
              //   //         equalency_fee_arrears_balance: 0,
              //   //         other_fee_arrears_balance: 0,
      
      
              //   //       }
              //   //     )
              //   //   }else if(j == 0){
              //   //     this.feeFlow.feeStructure.push(
              //   //       {
              //   //         year : this.allIntakeYear[i],
              //   //         month : this.allIntakeMonth[j],
              //   //         registration_fee : data.studentFees[i].registration_fee,
              //   //         coaching_fee : data.studentFees[i].per_year_payable_coaching_fee/10,
              //   //         exam_fee : data.studentFees[i].exam_fee,
              //   //         convocation_fee : data.studentFees[i].convocation_fee,
              //   //         attestation_fee : data.studentFees[i].attestation_fee,
              //   //         equalency_fee : data.studentFees[i].equalency_fee,
              //   //         other_fee : data.studentFees[i].other_fee,
      
              //   //         registration_fee_arrears : data.studentFees[i].registration_fee,
              //   //         coaching_fee_arrears  : data.studentFees[i].per_year_payable_coaching_fee/10,
              //   //         exam_fee_arrears : data.studentFees[i].exam_fee,
              //   //         convocation_fee_arrears: data.studentFees[i].convocation_fee,
              //   //         attestation_fee_arrears: data.studentFees[i].attestation_fee,
              //   //         equalency_fee_arrears: data.studentFees[i].equalency_fee,
              //   //         other_fee_arrears: data.studentFees[i].other_fee,
      
              //   //         registration_fee_paid_date : 0,
              //   //         coaching_fee_paid_date : 0,
              //   //         exam_fee_paid_date : 0,
              //   //         convocation_fee_paid_date : 0,
              //   //         attestation_fee_paid_date : 0,
              //   //         equalency_fee_paid_date : 0,
              //   //         other_fee_paid_date : 0,
      
              //   //         registration_fee_arrears_balance : 0,
              //   //         coaching_fee_arrears_balance  : 0,
              //   //         exam_fee_arrears_balance : 0,
              //   //         convocation_fee_arrears_balance: 0,
              //   //         attestation_fee_arrears_balance: 0,
              //   //         equalency_fee_arrears_balance: 0,
              //   //         other_fee_arrears_balance: 0,
      
      
      
              //   //       }
              //   //     )
              //   //   }
      
      
              //   // }
              //   // this.feeFlow.fee_per_year.push(
              //   //   {
              //   //     year : this.feeyear[i],
              //   //     total_fee : data.studentFees[i].per_year_payable_total_fee,
              //   //     balance_fee : data.studentFees[i].per_year_payable_total_fee,
              //   //     paid_fee : 0,
              //   //     registration_fee_total : data.studentFees[i].registration_fee,
              //   //     coaching_fee_total  : data.studentFees[i].per_year_payable_coaching_fee,
              //   //     exam_fee_total : this.per_year_payable_exam_fee[i],
              //   //     convocation_fee_total: data.studentFees[i].convocation_fee,
              //   //     attestation_fee_total: data.studentFees[i].attestation_fee,
              //   //     equalency_fee_total: data.studentFees[i].equalency_fee,
              //   //     other_fee_total: data.studentFees[i].other_fee,
      
              //   //     registration_fee_balance : data.studentFees[i].registration_fee,
              //   //     coaching_fee_balance  : data.studentFees[i].per_year_payable_coaching_fee,
              //   //     exam_fee_balance : this.per_year_payable_exam_fee[i],
              //   //     convocation_balance: data.studentFees[i].convocation_fee,
              //   //     attestation_balance: data.studentFees[i].attestation_fee,
              //   //     equalency_balance: data.studentFees[i].equalency_fee,
              //   //     other_balance: data.studentFees[i].other_fee,
              //   //     miscellaneous_fees_total: 0,
              //   //     miscellaneous_fees_paid_date:0,
              //   //     transport_fees_total: 0,
              //   //     transport_fees_paid_date:0,
              //   //     previous_year_arrear: 0,
              //   //     previous_year_arrear_balance: 0,
              //   //     previous_year_arrear_paid: 0,
              //   //     previous_year_arrear_paid_date:0,
      
              //   //   }
              //   //   );
              // }
              // console.log(JSON.stringify(this.feeFlow))
              this.feeflowService.addFeeflow(this.feeFlow).subscribe(
                data =>{
                  // alert("success")
                  // this.toast.setMessage("Admission form submitted !!!","success");
                  if(this.auth.isAdmin){
                   this.toast.setMessage("Admission form submitted !!!","success");
                    this.route.navigate(['candidate-singleview/' + this.feeFlow.studentId]);
      
                  }else{
                    this.toast.setMessage("Admission form submitted !!!", "success");
                    this.route.navigate(['staff-candidate-singleview/' + this.feeFlow.studentId]);
      
                    }
                });
      
      
      
          },
          error => {
            console.log(error.error,"  kkk");
            this.toast.setMessage(error.error.message,"danger");
      
          }
      
      
          );

       
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
        error => {
          this.toast.setMessage(error.error.message,"danger");
        
        }
      );

   

    }

    onadmissionformSave(){
      
      if(!this.current_courseid_value){
        localStorage.removeItem('courseIndex');

      }
      this.submitted=false;
      this.saved=true;
       if(this.s.firstname
        .value==''){
        this.toast.setMessage("Minimum fields are required !!!", "danger");
        return;
    }

      if(this.s.centers.value==''){
        this.toast.setMessage("Minimum fields are required !!!", "danger");

        return;

      }
      if(this.s.username.value==''){
        this.toast.setMessage("Minimum fields are required !!!", "danger");

        return;

      }
      if(this.s.password.value==''){
        this.toast.setMessage("Minimum fields are required !!!", "danger");

        return;

      }
      this.student.istemporarysaved = true;
      // this.student.studentFees = [];
      this.student.studentCourse = [];
      this.student.subject_list = [];
      // for(var x in this.per_year_discount){
      //   this.studentDiscount += this.per_year_discount[x];
      // }

      // if(this.singleCourseandFees.feeId){
        // for(var x in this.singleCourseandFees.feeId.feeStructure){
        //   if(!this.per_year_payable_coaching_fee[x]){
        //     this.per_year_payable_coaching_fee[x] = this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;
        //   }else{
        //     if(!this.per_year_discount[x]){
        //       this.per_year_payable_coaching_fee[x] = this.singleCourseandFees.feeId.feeStructure[x].coaching_fee;

        //     }

        //   }
        //   // this.studentCoachingFeeWithDiscount += this.per_year_payable_coaching_fee[x];
        //   // if(!this.per_year_payable_exam_fee[x]){

        //   //   this.per_year_payable_exam_fee[x] = this.singleCourseandFees.feeId.feeStructure[x].exam_fee;
        //   // }
        // }
        // for(var i in this.singleCourseandFees.feeId.feeStructure){
        //   this.student.studentFees.push({
        //     year : this.feeyear[i],
        //     registration_fee : this.singleCourseandFees.feeId.feeStructure[i].registration_fee,
        //     coaching_fee : this.singleCourseandFees.feeId.feeStructure[i].coaching_fee,
        //     exam_fee : this.singleCourseandFees.feeId.feeStructure[i].exam_fee,
        //     convocation_fee : this.singleCourseandFees.feeId.feeStructure[i].convocation_fee,
        //     attestation_fee : this.singleCourseandFees.feeId.feeStructure[i].attestation_fee,
        //     equalency_fee : this.singleCourseandFees.feeId.feeStructure[i].equalency_fee,
        //     other_fee : this.singleCourseandFees.feeId.feeStructure[i].other_fee,
        //     per_year_total_fee : this.singleCourseandFees.feeId.feeStructure[i].total_fee,
        //     per_year_discount : this.per_year_discount[i],
        //     per_year_payable_total_fee : this.per_year_payable_total[i],
        //     per_year_payable_coaching_fee : this.per_year_payable_coaching_fee[i],


        //   });
        // }

        // this.student.original_course_amount = this.singleCourseandFees.feeId.totalAmount;
        // this.student.total_payable_fee_with_discount = this.singleCourseandFees.feeId.totalAmount - this.studentDiscount;
        this.student.courseID = this.singleCourseandFees._id;
        // this.student.feeID = this.singleCourseandFees.feeId;
        this.student.boardOrUniversityID = this.singleCourseandFees.boardOrUniversity;
        this.student.studentCourse.push(
          {
            course_name : this.singleCourseandFees.name,
            course_branch : this.singleCourseandFees.branch,
            boardOrUniversity : this.singleCourseandFees.boardOrUniversity.boardoruniveristy,
            course_duration_year : this.singleCourseandFees.durationInYear,
            course_duration_month : this.singleCourseandFees.durationInMonths,
            course_type : this.singleCourseandFees.courseType,
            course_startYear : this.singleCourseandFees.startYear,
            course_endYear : this.singleCourseandFees.endYear,
          }
          );
      // }
      if(this.boardOrUniversityService!=null){
        this.student.boardOrUniversityID =this.boardoruniversityID;

      }
      if(this.current_courseid_value!=null)
      {
        // alert("hi")
        this.student.boardOrUniversityID =this.boardoruniversityID;
        this.student.courseID=this.singleCourseandFees._id;
        this.student.studentCourse.push(
          {
            course_name : this.singleCourseandFees.name,
            course_branch : this.singleCourseandFees.branch,
            boardOrUniversity : this.singleCourseandFees.boardOrUniversity.boardoruniveristy,
            course_duration_year :this.singleCourseandFees.durationInYear,
            course_duration_month : this.singleCourseandFees.durationInMonths,
            course_type : this.singleCourseandFees.courseType,
            course_startYear : this.singleCourseandFees.startYear,
            course_endYear : this.singleCourseandFees.endYear,
          }
          );

      }
      else
      {
        this.student.courseID='';
      }
       this.student.studentDocuments={
        profilephoto:this.imageofprofilePhoto,
        secondarycertificate:this.imageOfSecondaryCertificate,
        highersecondarycertificate:this.imageOfHigherSecondory,
        passportfrontpage:this.imageOfPassportFrontView,
        passportbackpage:this.imageOfPassportBackView,
        visapage:this.imageOfVisaPage,
        emirateaid:this.imageOfEmiratesId,
        otherdocuments:this.otherspath
      }
      this.student.disablitity_status = this.s.disablitity_status.value;
      this.student.firstName = this.s.firstname.value,
      this.student.lastName = this.s.lastname.value,
      this.student.email = this.s.email.value,
      this.student.gender = this.s.gender.value,
      this.student.DOB = this.s.dob.value,
      this.student.contact = {
        mobilenumber : this.s.mobilenumber.value,
        residencenumber : this.s.residencenumber.value,
      }
      this.student.passportNumber = this.s.passportnumber.value,
      this.student.fatherName = this.s.fathername.value,
      this.student.motherName = this.s.mothername.value,
      this.student.address = {
        location : this.s.location.value,
        nationality : this.s.nationality.value,
        permanent_address : this.s.permanentaddress.value,
        temporary_address : this.s.temporaryaddress.value,
      },

      this.student.education_qualification = {
        last_Completed_Course : this.s.lastcompletedcourse.value,
        university : this.s.university.value,
        institute : this.s.institute.value,

        passout_year : this.s.passout_year.value,
      },
      this.student.remarks = this.s.remarks.value;
      let tID = this.s.tallyID.value;
      if(tID.length > 0){
        this.student.tally_ID = this.s.tallyID.value;

      }
      let rID = this.s.university_register_number.value;
      if(rID.length > 0){
        this.student.university_register_number = this.s.university_register_number.value;
      }


      this.student.admission_Date = this.s.admissiondate.value;
      this.student.joining_Date = this.s.joiningdate.value;

      this.student.intake = this.s.intake.value;
      this.student.username = this.s.username.value;

      this.student.password = this.s.password.value;



        for(var k in this.checked_NIOS10_subjectlist){
          this.student.subject_list.push(this.checked_NIOS10_subjectlist[k]);
        }
        for(var k in this.checked_NIOS12_subjectlist){
          this.student.subject_list.push(this.checked_NIOS12_subjectlist[k]);
        }





      this.user = {
        firstName:this.s.firstname.value,
        lastName: this.s.lastname.value,
        email:this.s.username.value,
        password:this.s.password.value,
        mobile:this.s.mobilenumber.value,
        roles:['student'],
      };
      this.userService.register(this.user).subscribe(
        data=>{
          this.studentService.addStudent(this.student).subscribe(
            (data)=>{
    
              if(data){
    
    
              // add to fee flow form
              this.feeFlow.studentId = data._id;
              this.feeFlow.lastPaidDate = this.s.admissiondate.value;
              this.feeFlow.ispaid = false;

              this.feeFlow.total_fee = this.student.total_payable_fee_with_or_without_discount;
              this.feeFlow.paid_fee = 0;
              this.feeFlow.balance_fee = this.student.total_payable_fee_with_or_without_discount;
                // let d = new Date(data.intake);
                // let y = new Date(data.intake);
                
                // let xmonth;
                // for(var j = 1; j <= 12; j++){
                //   let month = d.getMonth() + j;
                //   if(month > 12){
                //     month = month -12;
                //     if(month.toString().length < 2){
                //       xmonth = '0' + month.toString();
                //       this.allIntakeMonth.push(xmonth);
                //       // console.log(this.allIntakeMonth,"month")
                //     }else{
                //       this.allIntakeMonth.push(month.toString());
    
                //     }
                //   }else{
                //     if(month.toString().length < 2){
                //       xmonth = '0' + month.toString();
                //       this.allIntakeMonth.push(xmonth);
                //       // console.log(this.allIntakeMonth,"month")
                //     }else{
                //       this.allIntakeMonth.push(month.toString());
    
                //     }
                //   }
    
                // }
    
    
       // add to transportation fee collection form start
            // for(var i in data.studentFees){
            //   this.transportCollectionFlow.month_list = [];
            //   if(this.transportCollectionFlow.isTransportationNeeded){
            //     for(var b = 0 ;b < this.allIntakeMonth.length; b++){
            //       this.transportCollectionFlow.month_list.push(
            //         {
            //           month : this.allIntakeMonth[b],
            //           isRequired : true,
            //           isPaid : false,
            //           paid_fee : 0,
            //         }
            //       );
            //     }
            //   }else{
            //     for(var c = 0 ;c < this.allIntakeMonth.length; c++){
            //       this.transportCollectionFlow.month_list.push(
            //         {
            //           month : this.allIntakeMonth[c],
            //           isRequired : false,
            //           isPaid : false,
            //           paid_fee : 0,
            //         }
            //       );
            //     }
            //   }
            //   // console.log(this.transportCollectionFlow.month_list)
            //   this.transportCollectionFlow.year = this.allIntakeYear[i];
            //   this.transportCollectionFlow.collectionType = COLLECTION_FLOW_TYPE.transport;
            //   this.transportCollectionFlow.collectedOn = this.s.intake.value;
            //   this.transportCollectionFlow.studentId = data._id;
            //   this.transportCollectionFlow.remarks = "NIL"
    
    
            //     //  console.log(this.transportCollectionFlow)
    
            //   this.collectionFlowService.addcollectionFlow(this.transportCollectionFlow).subscribe(
            //     data=>{
    
            //     }
            //   );
            // }
    
       // add to transportation fee collection form end
    
    
    
    
              // this.feeFlow.feeStructure = [];
              // this.feeFlow.fee_per_year = [];
    
              // for(var i in data.studentFees){
              //   // alert("alert 1")
               
              //   this.feeFlow.fee_per_year.push(
              //     {
              //       year : this.feeyear[i],
              //       total_fee : data.studentFees[i].per_year_payable_total_fee,
              //       balance_fee : data.studentFees[i].per_year_payable_total_fee,
              //       paid_fee : 0,
              //       registration_fee_total : data.studentFees[i].registration_fee,
              //       coaching_fee_total  : data.studentFees[i].per_year_payable_coaching_fee,
              //       exam_fee_total : this.per_year_payable_exam_fee[i],
              //       convocation_fee_total: data.studentFees[i].convocation_fee,
              //       attestation_fee_total: data.studentFees[i].attestation_fee,
              //       equalency_fee_total: data.studentFees[i].equalency_fee,
              //       other_fee_total: data.studentFees[i].other_fee,
    
              //       registration_fee_balance : data.studentFees[i].registration_fee,
              //       coaching_fee_balance  : data.studentFees[i].per_year_payable_coaching_fee,
              //       exam_fee_balance : this.per_year_payable_exam_fee[i],
              //       convocation_balance: data.studentFees[i].convocation_fee,
              //       attestation_balance: data.studentFees[i].attestation_fee,
              //       equalency_balance: data.studentFees[i].equalency_fee,
              //       other_balance: data.studentFees[i].other_fee,
              //       miscellaneous_fees_total: 0,
              //       miscellaneous_fees_paid_date:0,
              //       transport_fees_total: 0,
              //       transport_fees_paid_date:0,
              //       previous_year_arrear: 0,
              //       previous_year_arrear_balance: 0,
              //       previous_year_arrear_paid: 0,
              //       previous_year_arrear_paid_date:0,
    
              //     }
              //     );
              // }
              // console.log(JSON.stringify(this.feeFlow))
              this.feeflowService.addFeeflow(this.feeFlow).subscribe(
                data =>{
                  // alert("success")
                  // this.toast.setMessage("Admission form submitted !!!","success");
                  if(this.auth.isAdmin){
                   this.toast.setMessage("Admission form saved !!!","success");
                    this.route.navigate(['admissionform-edit/' + this.feeFlow.studentId]);
    
                  }else{
                    this.toast.setMessage("Admission form saved !!!", "success");
                    this.route.navigate(['staff-admissionform-edit/' + this.feeFlow.studentId]);
    
                    }
                });
    
    
    
          }
          else{
            if(this.auth.isAdmin){
              // alert("success")
    
              this.toast.setMessage("Admission form saved !!!","success");
               this.route.navigate(['admissionform-edit/' + data._id]);
    
             }
             else{
              // alert("success")
    
               this.toast.setMessage("Admission form saved !!!", "success");
               this.route.navigate(['staff-admissionform-edit/' + data._id]);
    
               }
    
          }
        },
          error => {
            this.toast.setMessage(error.error.message,"danger");
    
          }
    
    
          );
        },
        error => {
          this.toast.setMessage(error.error.message,"danger");
        
        }
      );
      

    }
  cancelClick(){
    if(this.auth.isAdmin){
    this.route.navigate(['candidate-management']);
    }else{
      this.route.navigate(['staff-candidate-management']);

    }
  }
}



