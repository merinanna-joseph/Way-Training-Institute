import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BoardOrUniversityService } from '../services/boardoruniversity.service';
import { CourseService } from '../services/course.service';
import { BranchService } from '../services/branch.service';
import { CourseNameService } from '../services/coursename.service';
// import { FeeService } from '../services/fee.service';
import { BoardOrUniversity } from '../shared/models/boardoruniversity.model';
import { Coursename } from '../shared/models/coursename.model';
import { Branch } from '../shared/models/branch.model';
import { Course } from '../shared/models/course.model';
// import { Fee } from '../shared/models/fee.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { CenterService } from '../services/center.service';


@Component({
  selector: 'app-courseform',
  templateUrl: './courseform.component.html',
  styleUrls: ['./courseform.component.css']
})
export class CourseformComponent implements OnInit {
  allCourseandFee = [];

  // fee: Fee = {};
  showtbl:boolean = true;
  submitted = false;
  course : Course = {};
  boardOrUniversityModel : BoardOrUniversity = {};
  courseNameModel : Coursename = {};
  branchModel : Branch = {};


  allCourse = [];
  allUniversities = [];
  allCoursenames = [];

  submittedBoardOrUniversity: boolean = false;
  submittedCourseName: boolean = false;

  getStartYear: any;
  getDurationYear: any;
  getDurationMonth: any;
  // Fees;
  courseDuration: number;
  previouscourseDuration: number;
  // feeStructure;
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
  showBranch:boolean = false;

  courseID;
  branchList=[]
  selected_center;
  constructor(private formBuilder: FormBuilder,
              private courseService:CourseService,
              private coursenameService:CourseNameService,
              public branchService:BranchService,
              public toast: ToastComponent,
              private boardService:BoardOrUniversityService,
              public route: Router,
              // public feeService:FeeService,
              public auth:AuthService,
              private aroute: ActivatedRoute,
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
  // feeForm: FormGroup = this.formBuilder.group({
  //   courseId: ['',],
  //   feeStructure: this.formBuilder.array([]),
  //   totalAmount: [''],
  // });
  addBoardOrUniversityForm: FormGroup = this.formBuilder.group({
    boardoruniveristy: ['',Validators.required],
  });
  addCourseNameForm: FormGroup = this.formBuilder.group({
    course: ['',Validators.required],
  });
  addBranchForm: FormGroup = this.formBuilder.group({
    branch: ['',Validators.required],
  });
courseCount;
branchCount;
centers: any[];

  removeCoursename(x)
  {

    // getCountOfCourseswithCourseId
    this.courseService.getCountOfCourseswithCourseId(x).subscribe(
      datacount=>{

      this.courseCount=datacount;
      if(this.courseCount==0)
      {
        this.coursenameService.deletebyCoursenameID(x).subscribe(
          data=>{
           this.toast.setMessage('Coursename deleted successfully !!!', 'success');
        }
        )
      }
      else{
        this.toast.setMessage(' Cannot delete since  course is created !!!', 'danger');
      }

        }
    );


  }
  removeBranchname(x)
  {

    // getCountOfCourseswithCourseId
    this.courseService.getCountOfCourseswithBranchId(x).subscribe(
      datacount=>{
      this.branchCount=datacount;
      if(this.branchCount==0)
      {
        this.branchService.deleteBranchByID(x).subscribe(
          data=>{
           this.toast.setMessage('Branchname deleted successfully !!!', 'success');
        }
        )
      }
      else{
        this.toast.setMessage(' Cannot delete since  course is created !!!', 'danger');


      }

        }
    );


  }

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

    // this.courseArray = ['NIOS 10th','NIOS 12th','BA (Hons)','BA','MA','BBA (Hons)','BBA','MBA','BCS (Hons)',
    //                     'B.Sc (Hons)','B.Sc','B.Com','M.Com','MSW','MFin',
    //                     ];
    // this.branchBBA = ['General','Accounting','Business','Logistics'];
    // this.branchMBA = ['General','Systems','Human Resource Management','Finance','Operations',
    //                   'Marketing','Tourism and Hospital Management','Logistics Management',
    //                 'Financial Management','Global Business',' Supply Chain and Logistics Management',
    //                 'Finance & Accounting','Finance' ];
    // this.branchBA = ['English','Business Management'];

    // this.branchMA = ['English',' Mass communication & Journalism',
    //                   'Information Technology','Economics','Political Science','Public Administration'];

    // this.branchBCOM = ['Commerce'];
    // this.branchMCOM = ['Commerce'];

    // this.branchBsc = ['Business Management','Accounting & Finance','Computer Science'];

    // this.branchBCS = ['Network Technology and Cybersecurity',]
    this.getAllCourses();
    this.getAllUniversities();
    this.getAllCoursenames();
    // this.getAllCoursesWithFeeStructure();
    // this.getAllBranchs()
  }
// getAllBranchs()
// {
//   this.branchService
//   .getBranchByCourseId(this.boardoruniversityID)
//   .subscribe((data) => {

//   })

// }
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
  selectedCoursename;
  branchID;
  selectedBranchname;
  onBranchSelection(event)
  {

this.branchID=event.target.value
this.branchService
.getBranchById(this.branchID)
.subscribe((data) => {
  // alert(JSON.stringify(data))
  this.selectedBranchname=data['branch'];
//  this.course.coursenameId = data['courseId']
  this.course.coursebranchId= data['_id'];




})

  }
  onCourseSelection(event){

    this.branchList=[];
    this.courseID=event.target.value;

    this.coursenameService.getCourseById(this.courseID).subscribe((data)=>{
      this.course.coursenameId = data['_id']

      this.selectedCoursename=data['coursename'];


    })
    this.branchService
       .getBranchByCourseId(this.courseID)
       .subscribe((data) => {

         this.branchList=data;
         this.showBranch=true;


       })

   }
  getAllCoursesWithFeeStructure(){
   this.allCourseandFee = [];

    // alert(this.selected_center)
    this.courseService. getAllCourseandFeeByCenter(this.selected_center).subscribe(
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
        console.log("all course and fee",this.allCourseandFee)
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
  getAllCoursenames(){
    this.coursenameService.getCourses().subscribe(
      data => {
        this.allCoursenames = data;
        console.log("all coursenames",this.allCoursenames);
      }
    )
  }
  durationYear(event:any){
    this.getDurationYear = event.target.value;
    this.calculateStartAndEndYear();
  }
  durationMonth(event:any){
    this.getDurationMonth = event.target.value;
    this.calculateStartAndEndYear();
     }
  onStartYear(event:any){
    this.setDurationValidator();
    this.getStartYear = event.target.value;
    this.year = this.getStartYear.split('-')[0];
    this.course.startYear = this.getStartYear;
    this.calculateStartAndEndYear();
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
  else if(this.getDurationMonth > 0){
    tmpValue = Number(this.getDurationMonth);
  }
  var date1 = new Date(date);
  date1.setMonth(date1.getMonth() + Number(tmpValue));
  var d = new Date(date1), month = '' + (d.getMonth()), year = '' + d.getFullYear();

  if (month.length < 2)
  month = '0' + month;

  return [year, month].join('-');
}
  show(){

      if(this.showtbl){
        this.showtbl = false;
      }
      else{this.showtbl = true;
           this.showTable = false;
           this.reload();
          }
  }
  getCoursesInCenters(center){

    this.selected_center = center;
    this.getAllCoursesWithFeeStructure();
  }
  onCentersSelection(event) {
    this.course.centers = event.value;
  }
  get f() { return this.addCourseForm.controls; }
  get board() { return this.addBoardOrUniversityForm.controls; }
  get coursename() { return this.addCourseNameForm.controls; }
  get branchname() { return this.addBranchForm.controls; }
  ViewCourse()
  {
    if(this.auth.isAdmin){
      this.route.navigate(['admin-course_branch_view/']);
    }else if(this.auth.isTeacher){
      this.route.navigate(['teacher-course_branch_view/']);
    }
    

  }


   onViewClick(course: Course) {
    if(this.auth.isAdmin){
      this.route.navigate(['courseform-singleview/' + course._id + '/' + course.centers]);
    }else if(this.auth.isTeacher){
      this.route.navigate(['teacher-courseform-singleview/' + course._id + '/' + course.centers]);
    }
  }
  onCourseSave(){
    this.submitted = true;
    if (this.addCourseForm.invalid) {
      this.setDurationValidator();
      return;
    }

    this.course.name = this.selectedCoursename;
    this.course.branch = this.selectedBranchname;
    this.course.durationInYear = this.f.durationInYear.value;
    this.course.durationInMonths = this.f.durationInMonths.value;
    this.course.boardOrUniversity = this.f.board.value;
    this.course.courseType = this.f.courseType.value;
    console.log(this.course,"   sssss")
    this.courseService.addCourse(this.course).subscribe(
      data => {
        alert("success")
        this.getCourseid(data._id);
        this.getAllCourses();
        // this.addCourseForm.reset();
        this.submitted = false;
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
              this.showTable = true;

             }

           )
          //  this.toast.setMessage('Fee added successfully !!!', 'success');
          //  this.getAllCoursesWithFeeStructure()
          }
        )


      }
    )

// this.reload();
  }
  reload() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['./'], { relativeTo: this.aroute });
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
  saveCourse(details:any){
    this.submittedCourseName = true;
    if (this.addCourseNameForm.invalid) {
      return;
    }
    let word= this.coursename.course.value.trim().toLowerCase();
    let lCase= this.coursename.course.value.replace(/\s/g, "").toLowerCase();
    let uCase=this.coursename.course.value.replace(/\s/g, "").toUpperCase();

    // alert(out)
    for(let p=0;p<this.allCoursenames.length;p++)
    {
      // alert(this.allCoursenames[p])
      // alert("coursename"+this.coursename.course.value)
      if(uCase==this.allCoursenames[p].coursename||lCase==this.allCoursenames[p].coursename)
      {
         this.toast.setMessage('Course already exist!!!', 'danger');
         return;


      }
    }

    this.courseNameModel.coursename = this.coursename.course.value;
    this.coursenameService.addCourse(this.courseNameModel).subscribe(
      data => {
        document.getElementById('courseSaveModalCloseBtn').click();
        this.allCoursenames.push(data);
        this.toast.setMessage('Course added successfully !!!', 'success');

        this.addCourseNameForm= this.formBuilder.group({
          course : ['']
        });
      }

    )

  }
  saveBranch(details:any){
    // this.submittedCourseName = true;
    // if (this.addCourseNameForm.invalid) {
    //   return;
    // }

    this.branchModel.branch= this.branchname.branch.value;
    this.branchModel.courseId=this.courseID;
    this.branchService.addBranch(this.branchModel).subscribe(
      data => {
        document.getElementById('branchSaveModalCloseBtn').click();
        this.branchList.push(data);
        this.toast.setMessage('Branch added successfully !!!', 'success');

        this.addBranchForm= this.formBuilder.group({
          branch : ['']
        });
      }

    )

  }



  getCourseid(e) {
    this.courseId = e;
    // if (this.feeStructure) {
    //   this.feeStructure.clear();
    // }
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
  // initGroup() {
  //   for (let i = 0; i < this.courseDuration; i++) {
  //     let nextYear = Number(this.year)+i+1;
  //     this.feeStructure = this.feeForm.get('feeStructure') as FormArray;
  //     this.feeStructure.push(
  //       this.formBuilder.group({
  //         year: [Number(this.year) + i + '-' + nextYear],
  //         registration_fee: [0],
  //         coaching_fee: [0],
  //         exam_fee: [0],
  //         convocation_fee: [0],
  //         attestation_fee: [0],
  //         equalency_fee: [0],
  //         other_fee: [0],
  //         total_fee: [0],
  //       })
  //     );
  //   }
  // }

  // getTotal(i) {
  //   this.feeForm.value.feeStructure[i].total_fee =
  //     Number(this.feeForm.value.feeStructure[i].registration_fee) +
  //     Number(this.feeForm.value.feeStructure[i].coaching_fee) +
  //     Number(this.feeForm.value.feeStructure[i].exam_fee) +
  //     Number(this.feeForm.value.feeStructure[i].convocation_fee) +
  //     Number(this.feeForm.value.feeStructure[i].attestation_fee) +
  //     Number(this.feeForm.value.feeStructure[i].equalency_fee) +
  //     Number(this.feeForm.value.feeStructure[i].other_fee);
  //     this.feeForm.controls['feeStructure'].setValue(this.feeForm.value.feeStructure);
  //     this.getTotalAmount();
  // }
  // getTotalAmount() {
  //   this.total_Amount = 0;
  //   for (let j = 0; j < this.courseDuration; j++) {
  //     this.total_Amount += Number(this.feeForm.value.feeStructure[j].total_fee);
  //   }
  // }
  // onfeeSave() {
  //   this.fee.courseId = this.courseId;
  //   this.fee.feeStructure = this.feeForm.get('feeStructure').value;
  //   this.fee.totalAmount = this.total_Amount;
  //   this.courseService.getCourseById(this.courseId).subscribe(
  //     data => {
  //       this.course = data;
  //       this.feeService.addFee(this.fee).subscribe((data) => {
  //         this.course._id = data.courseId;
  //         this.course.feeId = data._id;
  //         this.courseService.editCourse(this.course).subscribe((data) => {});
  //         // this.toast.setMessage('Fee added successfully !!!', 'success');

  //         this.show();
  //         this.getfeeStructure();
  //         this.ngOnInit();


  //       });
  //     }
  //   );


  // }
}
