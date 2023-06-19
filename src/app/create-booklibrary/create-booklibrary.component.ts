import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardOrUniversityService } from '../services/boardoruniversity.service';
import { CourseService } from '../services/course.service';
import { BranchService } from '../services/branch.service';
import { CourseNameService } from '../services/coursename.service';
import { Booklibrary } from '../shared/models/booklibrary.model';
import { BookLibraryService } from '../services/booklibrary.service';
@Component({
  selector: 'app-create-booklibrary',
  templateUrl: './create-booklibrary.component.html',
  styleUrls: ['./create-booklibrary.component.css']
})
export class CreateBooklibraryComponent implements OnInit {
  allUniversities = [];
  allCoursenames = [];
  selectedCoursename;
  branchID;
  selectedBranchname;
  courseId: any;
  courseID;
  branchList=[];
  showBranch:boolean = false;
  course : Booklibrary = {};
  submitted = false;

  constructor(
    public auth:AuthService,
    private aroute: ActivatedRoute,
    public toast: ToastComponent,
     public route: Router,
     private formBuilder: FormBuilder,
     private boardService:BoardOrUniversityService,
     private courseService:CourseService,
              private coursenameService:CourseNameService,
              public branchService:BranchService,
              public booklibraryService:BookLibraryService
  ) { }

  addCourseForm: FormGroup = this.formBuilder.group({
    coursename: ['',Validators.required],
    // durationInYear: ['',Validators.required],
    // durationInMonths: ['',Validators.required],
    branch: [''],
    board: ['',Validators.required],
    courseType: ['',Validators.required],
    numberofyears: ['',Validators.required],
    semperyear:['',Validators.required],
    // centers:['',Validators.required],

  });
  ngOnInit(): void {
    this.getAllUniversities();
    this.getAllCoursenames();
  }
  get f() { return this.addCourseForm.controls; }

  displaybookLibrary(){
    if(this.auth.isAdmin){
      this.route.navigate(['display-booklibrary/']);
    }else if(this.auth.isTeacher){
      this.route.navigate(['teacher-display-booklibrary/']);
    }
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



   onCourseSave(){
    this.submitted = true;
    if (this.addCourseForm.invalid) {
      return;
    }

    // this.course.name = this.selectedCoursename;
    // this.course.branch = this.selectedBranchname;
    this.course.numberofyears = this.f.numberofyears.value;
    this.course.semperyear = this.f.semperyear.value;
    this.course.boardOrUniversity = this.f.board.value;
    this.course.courseType = this.f.courseType.value;
    // console.log(this.course.coursebranchId,this.course.courseType,"gggg",this.course.boardOrUniversity,this.course.numberofyears,this.course.coursenameId)
    this.booklibraryService.addBookLibrary(this.course).subscribe(
      data => {
        
        // this.addCourseForm.reset();
        this.submitted = false;
        this.toast.setMessage("Course  added !!!","success");
        if(this.auth.isAdmin){
          this.route.navigate(['display-booklibrary/']);
        }else if(this.auth.isTeacher){
          this.route.navigate(['teacher-display-booklibrary/']);
        }


      }
    )

// this.reload();
  }
}
