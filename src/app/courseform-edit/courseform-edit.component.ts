import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BoardOrUniversityService } from '../services/boardoruniversity.service';
import { CenterService } from '../services/center.service';
import { CourseService } from '../services/course.service';
import { FeeService } from '../services/fee.service';
import { BoardOrUniversity } from '../shared/models/boardoruniversity.model';
import { Course } from '../shared/models/course.model';
import { Fee } from '../shared/models/fee.model';
import { ToastComponent } from '../shared/toast/toast.component';



@Component({
  selector: 'app-courseform-edit',
  templateUrl: './courseform-edit.component.html',
  styleUrls: ['./courseform-edit.component.css'],
})
export class CourseformEditComponent implements OnInit {

  fee: Fee = {};
  showtbl:boolean = true;
  submitted = false;
  course : Course = {};
  boardOrUniversityModel : BoardOrUniversity = {};
  allCourse = [];
  allUniversities = [];
  submittedBoardOrUniversity: boolean = false;
  getStartYear: any;
  getDurationYear: any;
  getDurationMonth: any;
  Fees = [];
  courseDuration: number;
  previouscourseDuration: number;
  feeStructure;
  total_Amount: number = 0;
  ModeofTotal: boolean = false;
  showSavebutton:boolean=false;
  showTable: boolean = false;
  year: number;
  courseId: any;
  courseDurationInMonth: number;
  courseArray = [];
  branchArray = [];
  branchBBA = [];
  branchMBA = [];
  branchBCOM = [];
  branchMCOM = [];

  branchBA = [];
  branchMA = [];

  branchBsc = [];
  branchBCS = [];
  cBBA:boolean =  false;
  cMBA:boolean =  false;
  cBCOM:boolean = false;
  cMCOM:boolean = false;
  cBA:boolean = false;
  cMA:boolean = false;
  cBCS:boolean = false;
  cBsc:boolean = false;
  cMSW:boolean = false;
  cMFin:boolean = false;
  CID;
  singleCourse:Course = {};
  years;
  registration_fee;
  coaching_fee;
  centers: any[];
 center;
  constructor(private formBuilder: FormBuilder,
              private courseService:CourseService,
              private boardService:BoardOrUniversityService,
              public route: Router,
              public toast: ToastComponent,
              public feeService:FeeService,
              public auth:AuthService,
              private aRoute:ActivatedRoute,
              public centerService:CenterService,


              ) { }
  addCourseForm: FormGroup = this.formBuilder.group({
    coursename: ['',Validators.required],
    durationInYear: ['',Validators.required],
    durationInMonths: ['',Validators.required],
    branch: [''],
    board: ['',Validators.required],
    courseType: ['',Validators.required],
    startYear: ['',Validators.required],
    endYear:['',Validators.required],
    centers:['',Validators.required],

  });
  addFeeForm: FormGroup = this.formBuilder.group({
    courseId: ['',],
    year:[''],
    registration_fee: [''],
    coaching_fee: [''],
    exam_fee: [''],
    convocation_fee: [''],
    attestation_fee: [''],
    equalency_fee: [''],
    other_fee: [''],
    total_fee: [''],
    feeStructure: this.formBuilder.array([]),
    totalAmount: [''],
  });
  addBoardOrUniversityForm: FormGroup = this.formBuilder.group({
    boardoruniveristy: ['',Validators.required],
  });
  setDurationValidator(){
    const year = this.addCourseForm.get('durationInYear');
    const month = this.addCourseForm.get('durationInMonths');
    if(this.f.durationInYear.value == 0 && this.f.durationInMonths.value == 0)
    {
        year.reset();
        month.reset();
        year.setValue('');
        month.setValue('');
        year.setValidators([Validators.required,Validators.minLength(1)]);
        month.setValidators([Validators.required,Validators.minLength(1)]);
    }
    year.updateValueAndValidity();
    month.updateValueAndValidity();
}
  ngOnInit(): void {
    // this.centers = [
    //   'TIMES  - ABU DHABI',
    //   'TIMES  - AJMAN',
    //   'TIMES  - SHARJAH',

    // ];
    this.getAllCenters();

    this.aRoute.paramMap.subscribe((params:ParamMap) =>
    {
      this.fee.feeStructure = [];
      this.CID = params.get('id');
      this.courseService.getSingleCourseandFee({_id:this.CID}).subscribe(
        data=>{
          this.singleCourse = data[0];
          console.log(this.singleCourse,"       single")
          this.course.endYear = this.singleCourse.endYear;
          this.course.startYear = this.singleCourse.startYear;
          this.course.centers = this.singleCourse.centers;
          this.center = this.singleCourse.centers;
          this.getDurationYear = this.singleCourse.durationInYear;
          this.getDurationMonth = this.singleCourse.durationInMonths;
          this.total_Amount = this.singleCourse.feeId.totalAmount;
          for(var i in this.singleCourse.feeId.feeStructure){
            this.singleCourse.feeId.feeStructure[i].subjectList = [];
            console.log(this.singleCourse.feeId.feeStructure[i].subjectList,"sub list")
            this.Fees.push(this.singleCourse.feeId.feeStructure[i]);
          }
          console.log(this.Fees,"     fees")
          setTimeout(() => {
            this.fee.feeStructure = this.singleCourse.feeId.feeStructure;

            this.showtbl = true;
                    }, 30);


          // this.initGroup();
        }
      );

    }
    );
    this.courseArray = ['NIOS 10th','NIOS 12th','BA (Hons)','MA','BBA (Hons)','BBA','MBA','BCS (Hons)',
                        'B.Sc (Hons)','B.Sc','B.Com','M.Com','MSW','MFin',
                        ];
    this.branchBBA = ['General','Accounting'];
    this.branchMBA = ['General','Systems','Human Resource Management','Finance','Operations',
                      'Marketing','Tourism and Hospital Management','Logistics Management',
                    'Financial Management','Global Business',' Supply Chain and Logistics Management',
                     ];
    this.branchBA = ['English','Business Management'];

    this.branchMA = ['English',' Mass communication & Journalism',
                      'Information Technology','Economics','Political Science','Public Administration'];

    this.branchBCOM = ['Commerce'];
    this.branchMCOM = ['Commerce'];

    this.branchBsc = ['Business Management',' Accounting & Finance'];

    this.branchBCS = ['Network Technology and Cybersecurity',]
    this.getAllCourses();
    this.getAllUniversities();
    this.getAllCoursesWithFeeStructure();
  }
  onCentersSelection(event) {

    this.course.centers = event.value;
  }
  getAllCenters(){
    this.centerService.getcenters().subscribe(
      data => {
        this.centers = data;
        console.log(this.centers,'All centers')
  
      }
    )
  }
  getAllCourses(){
    this.courseService.getAllCourseWithBoardname().subscribe(
      data => {
        this.allCourse = data;
      }
    )
  }
  onCourseSelection(event){
    if(event.target.value == 'BBA' || event.target.value == 'BBA (Hons)'){
      this.cBBA =true;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;

    }else if(event.target.value == 'MBA'){
      this.cBBA =false;
      this.cMBA =true;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;

    }else if(event.target.value == 'BA' || event.target.value == 'BA (Hons)'){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = true;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;

    }
    else if(event.target.value == 'MA' || event.target.value == 'MA (Hons)'){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = true;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;

    }
    else if(event.target.value == 'BCS' || event.target.value == 'BCS (Hons)'){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = true;

    }
    else if(event.target.value == 'B.Sc' || event.target.value == 'B.Sc (Hons)'){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = true;
      this.cBCS = false;

    }
    else if(event.target.value == 'MSW' ){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = true;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;

    }
    else if(event.target.value == 'B.Com' ){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = true;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;

    }
    else if(event.target.value == 'M.Com' ){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = true;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;

    }
    else if(event.target.value == 'MFin' ){
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = true;
      this.cBsc = false;
      this.cBCS = false;

    }
    else{
      this.cBBA =false;
      this.cMBA =false;
      this.cBCOM = false;
      this.cMCOM = false;
      this.cBA = false;
      this.cMA = false;
      this.cMSW = false;
      this.cMFin = false;
      this.cBsc = false;
      this.cBCS = false;




    }
  }
  allCourseandFee = [];
  getAllCoursesWithFeeStructure(){
    this.courseService. getAllCourseandFee().subscribe(
      data => {

        for(var i in data){
          // if(this.allCourseandFee.length > 0){
            // alert("hii")
            // alert(this.allCourseandFee.filter(e => e.name == data[i].name && e.boardOrUniversity.boardoruniveristy == data[i].boardOrUniversity.boardoruniveristy))
              if(this.allCourseandFee.filter(e => e.name == data[i].name && e.boardOrUniversity.boardoruniveristy == data[i].boardOrUniversity.boardoruniveristy
                && e.boardOrUniversity.boardoruniveristy == data[i].boardOrUniversity.boardoruniveristy).length <= 0){
                this.allCourseandFee.push(data[i]);
              }
              else if(this.allCourseandFee.filter(e => e.name == data[i].name && e.boardOrUniversity.boardoruniveristy == data[i].boardOrUniversity.boardoruniveristy).length > 0){

                this.allCourseandFee.forEach((item, index) => {
                  if (item.name == data[i].name && item.boardOrUniversity.boardoruniveristy == data[i].boardOrUniversity.boardoruniveristy
                    && item.branch == data[i].branch && item.courseType == data[i].courseType)
                    this.allCourseandFee.splice(index, 1);
                });
                // this.allCourseandFee.splice(x,1);
                this.allCourseandFee.push(data[i]);
              }

        }
        this.allCourseandFee.reverse();
      }
    );

  }
  getAllUniversities(){
    this.boardService.getBoardOrUniversitys().subscribe(
      data => {
        this.allUniversities = data;
      }
    )
  }
  // durationYear(event:any){
  //   this.getDurationYear = event.target.value;
  //   this.calculateStartAndEndYear();
  // }
  // durationMonth(event:any){
  //   this.getDurationMonth = event.target.value;
  //   this.calculateStartAndEndYear();
  //    }
  onStartYear(event:any){
    this.setDurationValidator();
    this.getStartYear = event.target.value;
    this.year = this.getStartYear.split('-')[0];
    this.course.startYear = this.getStartYear;
    this.calculateStartAndEndYear();
    this.getfutureyears();
  }
calculateStartAndEndYear(){
  let formatedDateYearandMonth = this.formatDateYearAndMonth(this.getStartYear);
  this.course.endYear = formatedDateYearandMonth;
}
formatDateYearAndMonth(date) {
  var tmpValue;
  if(this.getDurationYear > 0 && this.getDurationMonth > 0){
    tmpValue = (this.getDurationYear * 12) + Number(this.getDurationMonth);
  }
  else if(this.getDurationYear > 0){
    tmpValue = (this.getDurationYear * 12);
  }
  else if(this.getDurationMonth >= 0){
    tmpValue = Number(this.getDurationMonth);
  }
  var date1 = new Date(date);
  date1.setMonth(date1.getMonth() + Number(tmpValue));
  var d = new Date(date1), month = '' + (d.getMonth()), year = '' + d.getFullYear();
  if (month.length < 2){
    month = '0' + month;

  }
  if(month == '00'){
    month = '12';
  }
  return [year, month].join('-');
}
  show(){
      if(this.showtbl){
        this.showtbl = false;
      }
      else{this.showtbl = true;
           this.showTable = false;}
  }

  get f() { return this.addCourseForm.controls; }
  get board() { return this.addBoardOrUniversityForm.controls; }

  onBackClick() {
    if(this.auth.isAdmin){
      this.route.navigate(['courseform-singleview/' + this.CID + '/' + this.center]);
    }else if(this.auth.isTeacher){
      this.route.navigate(['teacher-courseform-singleview/' + this.CID + '/' + this.center]);
    }
    // this.route.navigate(['courseform-singleview/' + this.CID]);
  }

  saveboardOrUniversity(details:any){
    this.submittedBoardOrUniversity = true;
    if (this.addBoardOrUniversityForm.invalid) {
      return;
    }

    this.boardOrUniversityModel.boardoruniveristy = this.board.boardoruniveristy.value;
    this.boardService.addBoardOrUniversity(this.boardOrUniversityModel).subscribe(
      data => {
        document.getElementById('boardSaveModalCloseBtn').click();
        this.allUniversities.push(data);
        this.addBoardOrUniversityForm = this.formBuilder.group({
          boardoruniveristy : ['']
        });;
      }

    )

  }

  getCourseid(e) {
    this.courseId = e;
    if (this.feeStructure) {
      this.feeStructure.clear();
    }
    this.ModeofTotal = true;
    this.courseService.getCourseById(e).subscribe((data) => {
      this.courseDuration = Number(data.durationInYear);
      this.courseDurationInMonth = Number(data.durationInMonths)
      if(this.courseDurationInMonth>0)
      {
        this.courseDuration=this.courseDuration+1;
      }


      // this.initGroup();
    });
    this.showSavebutton=true;
  }
  // get getFormData(): FormArray {
  //   return <FormArray>this.feeForm.get('feeStructure');
  // }
  // getfeeStructure() {
  //   this.feeService.getFeesByCourse().subscribe((data) => {
  //     this.Fees = data;
  //   });
  // }
  getfutureyears() {
    // alert("hii");
    for (let i = 0; i < this.singleCourse.feeId.feeStructure.length; i++) {
      // alert("hello")
      this.year = Number(this.getStartYear.split('-')[0]);
      // alert(this.year)
      let nextYear = Number(this.year)+i+1;
      // alert(Number(this.year) + i + '-' + nextYear)
      this.Fees[i].year = this.year + i + '-' + nextYear;
    }

  }

  getTotal(i,event,j) {
    if(j==0){
      this.fee.feeStructure[i].registration_fee = event.target.value;
    }else if(j == 1){
      this.fee.feeStructure[i].coaching_fee = event.target.value;
    }else if(j == 2){
      this.fee.feeStructure[i].exam_fee = event.target.value;
    }else if(j == 3){
      this.fee.feeStructure[i].convocation_fee = event.target.value;
    }else if(j == 4){
      this.fee.feeStructure[i].attestation_fee = event.target.value;
    }else if(j == 5){
      this.fee.feeStructure[i].equalency_fee = event.target.value;
    }else if(j == 6){
      this.fee.feeStructure[i].other_fee = event.target.value;
    }
    console.log(this.fee.feeStructure[i].registration_fee,"kk")
    for(let x = 0; x< this.fee.feeStructure.length; x++){
      if(x == i){
        // alert(x +"        " + i)
        this.fee.feeStructure[i].total_fee =
        Number(this.fee.feeStructure[i].registration_fee) +
        Number(this.fee.feeStructure[i].coaching_fee) +
        Number(this.fee.feeStructure[i].exam_fee) +
        Number(this.fee.feeStructure[i].convocation_fee) +
        Number(this.fee.feeStructure[i].attestation_fee) +
        Number(this.fee.feeStructure[i].equalency_fee) +
        Number(this.fee.feeStructure[i].other_fee);
        this.fee.feeStructure[i].registration_fee = this.fee.feeStructure[i].registration_fee;
      }
    }


      this.getTotalAmount();
  }
  getTotalAmount() {
    this.total_Amount = 0;
    for (let j = 0; j < this.singleCourse.feeId.feeStructure.length; j++) {
      this.total_Amount += Number(this.fee.feeStructure[j].total_fee);
      console.log(this.fee.feeStructure[j].total_fee ,"   ", j ,"    total per")

    }
  }
  onCourseSave(){
    this.submitted = true;
    // if (this.addCourseForm.invalid) {
    //   this.setDurationValidator();
    //   return;
    // }
    // console.log("single course",this.singleCourse);
    this.course.name = this.singleCourse.name;
    this.course.branch = this.singleCourse.branch;
    this.course.durationInYear = this.singleCourse.durationInYear;
    this.course.durationInMonths = this.singleCourse.durationInMonths;
    this.course.boardOrUniversity = this.singleCourse.boardOrUniversity._id;
    this.course.courseType = this.singleCourse.courseType;
    this.course.coursebranchId=this.singleCourse.coursebranchId;
    this.course.coursenameId=this.singleCourse.coursenameId;
    this.courseService.addCourse(this.course).subscribe(
      data => {
        this.boardService.getBoardOrUniversity({_id:data.boardOrUniversity}).subscribe(
          dataBoard => {
            this.boardOrUniversityModel = dataBoard;
            if(this.boardOrUniversityModel.courseDetails){
              this.boardOrUniversityModel.courseDetails.push({courseId:data._id,coursename:data.name});
            }
           else{
            this.boardOrUniversityModel.courseDetails = [];
            this.boardOrUniversityModel.courseDetails.push({courseId:data._id,coursename:data.name});
           }

           this.boardService.editBoardOrUniversity(this.boardOrUniversityModel,localStorage.getItem('token')).subscribe(
             data => {

             }

           );
          //  this.toast.setMessage('Fee added successfully !!!', 'success');
           this.getAllCoursesWithFeeStructure()
          }
        );
        this.fee.courseId = data._id;
        this.fee.totalAmount = this.total_Amount;
        this.feeService.addFee(this.fee).subscribe((feedata) => {

          this.course._id = this.fee.courseId;
          this.course.feeId = feedata._id;

          this.courseService.editCourse(this.course).subscribe((data) => {
            this.toast.setMessage('Course added successfully !!!', 'success');
            this.onBackClick();
          });

        });



      }
    )


  }
  onfeeSave() {
    // this.fee.feeStructure = this.feeForm.get('feeStructure').value;
    this.courseService.getCourseById(this.courseId).subscribe(
      data => {
        this.course = data;

      }
    );

  }
}
