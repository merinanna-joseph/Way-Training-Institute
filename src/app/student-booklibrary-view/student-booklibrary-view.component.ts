import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Student } from '../shared/models/student.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseSubjectService } from '../services/coursesubject.service';
import { StudymaterialService } from '../services/studymaterial.service';
import { HttpClient } from '@angular/common/http';
import { BookLibraryService } from '../services/booklibrary.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-booklibrary-view',
  templateUrl: './student-booklibrary-view.component.html',
  styleUrls: ['./student-booklibrary-view.component.css']
})
export class StudentBooklibraryViewComponent implements OnInit {

  student: Student = {};
  studentCoursesubjects = [];
  showSubjects:boolean = false;
  showFiles:boolean = false;
  showMaterials:boolean = false;
  subjectname;
  studymaterialname;
  whenclicked:Boolean = false;
  material_length = 0;
  studymaterialOf_singlesubject = [];
  studymaterial_download = [];
  imagedocs_studymaterial = [];
  pdfdocs_studymaterial = [];
  name_of_image_studymaterial;
  studymaterialfile_length = 0;
  extension: any;
  index: any;
  imgUrl;

  cName;
  cType;
  cBranch;
  cUniversity;
  universityname;
  selectYear;
  showYearwiseTable:boolean = false;
  booklibraryid;
  yearLength = Array;
  yrlen = 3;
  pdf_length = 0;
  img_length =0;
  selectSemester;
  showSemesters:boolean = false;
  semLength = Array;
  semlen;
  constructor(
    public auth: AuthService,
    public route: Router,
    public studentService: StudentService,
    public coursesubjectService:CourseSubjectService,
    public studymaterialService:StudymaterialService,
    public toast: ToastComponent,
        private httpClient: HttpClient,
    public booklibraryService:BookLibraryService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    console.log(this.auth.currentUser,"curuser");
    
 
    this.getForm();
  }

  getForm() {
    if(this.auth.currentUser.roles[0] == "student"){
      this.studentService.getStudentByUsername({username:this.auth.currentUser.email}).subscribe(
        data=>{
          console.log(data,"userdataa");

         //get booklibrary with course start
         if(data.studentCourse){
          this.cName = data.studentCourse[0].course_name;
          this.cType = data.studentCourse[0].course_type;
          this.cBranch = data.studentCourse[0].course_branch;
          this.cUniversity = data.boardOrUniversityID;
          this.universityname =  data.studentCourse[0].boardOrUniversity;
         }
         if(this.cBranch){
          this.booklibraryService.getBooklibraryWithNameBranchType(this.cName,this.cType,this.cBranch,this.cUniversity).subscribe(
            data=>{
              console.log(data,"book libra");
              this.booklibraryid = data[0]._id;
              this.yrlen = Number(data[0].numberofyears);
              this.semlen = Number(data[0].semperyear);

              // alert(this.yrlen)

            }
          );
         }else{
          this.booklibraryService.getBooklibraryWithNameType(this.cName,this.cType,this.cUniversity).subscribe(
            data=>{
              console.log(data,"book libra");
              this.booklibraryid = data[0]._id;
              this.yrlen = Number(data[0].numberofyears);
              // alert(this.yrlen)

            }
          )
         }
          

         //get booklibrary with course end

          //start
                 //course subjects getting start
        // this.coursesubjectService.getCoursesubjectsByCourse(this.student.courseID._id,year_index).subscribe(
        //   subdata=>{
        //     this.studentCoursesubjects = [];
        //     for(var i=0;i<subdata.length;i++){
        //       this.showSubjects = true;
        //       this.studentCoursesubjects.push(subdata[i]);

        //     }
        //     console.log(this.studentCoursesubjects,"course subj")
        //   }
        // );
         //course subjects getting end

          // this.student = data;
          console.log(this.student,"   student lll")
         




          //end
        }
      );


      }

      
      
 
    // console.log('student ID' + this.student._id);
  }
  onYearClick(year){
    this.selectYear = year;
    this.showSemesters = true;
    this.showYearwiseTable = false;
    this.showSubjects = true;
    this.showMaterials = false;
    this.showFiles = false;
    // this.getSubjectsinYears(this.booklibraryid,this.selectYear)

  }
  onSemesterClick(sem){
    this.selectSemester = sem;
    this.showSemesters = true;

    this.showYearwiseTable = true;
    this.showSubjects = true;
    this.showMaterials = false;
    this.showFiles = false;
    this.getSubjectsinYears(this.booklibraryid,this.selectYear,this.selectSemester)

  }
  getSubjectsinYears(courseId,yearIndex,semIndex){
    this.coursesubjectService.getCoursesubjectsByCourse(courseId,yearIndex,semIndex).subscribe(
      subdata=>{
        this.studentCoursesubjects = [];
        this.studymaterialOf_singlesubject = [];
  
        for(var i=0;i<subdata.length;i++){
          this.studentCoursesubjects.push(subdata[i]);
  
        }
        console.log(this.studentCoursesubjects,"course subj")
      }
    );
   }
  getStudymaterials(subid,subname){
    // for(var x in this.subjectIndex){
    //   if(x == index){
    //     this.subjectIndex[x] = true;
  
  
    //   }else{
    //     this.subjectIndex[x] = false;
    //   }
    // }
    this.subjectname = subname;
    // this.showMaterials = true;
    console.log("subindex",subid)
    this.studymaterialService.getStudymaterialsBySubject(subid).subscribe(
      data=>{
        this.whenclicked = true;
    
          this.material_length = data.length;
          if(this.material_length > 0){
            this.showMaterials = true;
            this.showSubjects = false;

          }else{
            this.showMaterials = false;
            this.showSubjects = true;

          }
        
        this.studymaterialOf_singlesubject = data;
        console.log(this.studymaterialOf_singlesubject,"materials")
      }
    );
  
  }

  getImageofstudymaterials(studymaterial,name) {
    this.studymaterial_download = [];
    this.studymaterial_download = studymaterial;
    this.imagedocs_studymaterial = [];
    this.pdfdocs_studymaterial = [];
    this.name_of_image_studymaterial = 'others';
    this.studymaterialname = name;
    this.studymaterialfile_length = studymaterial.length;
    // alert(this.studymaterialfile_length);
    this.showMaterials = false;
      this.showFiles = true;
      this.showSubjects = false;
    if (studymaterial.length > 0) {
      

      for (
        let k = 0;
        k < studymaterial.length;
        k++
      ) {
        console.log('other   ', studymaterial[k].imagepath);
        let pos = studymaterial[k].imagepath.lastIndexOf('.'); // get last position of `.`
        this.extension = studymaterial[k].imagepath.slice(pos + 1); // extract extension ignoring `.`
        console.log(pos, "  position")
        console.log(this.extension,"   exten");
        // if (this.extension == 'pdf' || this.extension == 'txt' || this.extension == 'xlsx' || this.extension == 'xls' || this.extension == 'doc' || this.extension == 'docx') {
        //   // alert(this.student.studentDocuments.otherdocuments[k])
        //   // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
        //   // console.log("pdf",this.pdfdocs)
        //   // let name=(this.student.studentDocuments.otherdocuments[k]).match(
        //   //   /[\w-]+\.(pdf)/g);
        //   console.log("in pdf")
        //   this.index = studymaterial[k].imagepath.lastIndexOf('/');
        //   let name = studymaterial[k].imagepath.substring(
        //     this.index + 1
        //   );

        //   // alert(fileName)
        //   // console.log("name",name[0])
        //   let path = studymaterial[k].imagepath;
        //   // this.imagename_path.push({name:name,path:path})

        //   this.pdfdocs_studymaterial.push({ name: name, path: path });
        //   console.log('pdf', this.pdfdocs_studymaterial);
        // } else {
        //   console.log("not pdf")
        //   // let name=this.student.studentDocuments.otherdocuments[k].match(
        //   //   /[\w-]+\.(jpg|png|)/g
        //   // );
        //   this.index = studymaterial[k].imagepath.lastIndexOf('/');
        //   let name = studymaterial[k].imagepath.substring(
        //     this.index + 1
        //   );

        //   // console.log("name",name[0])
        //   let path = studymaterial[k].imagepath;
        //   this.imagedocs_studymaterial.push({ name: name, path: path });
        //   console.log('not pdf', this.imagedocs_studymaterial);

        // }
        if(this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'jpg' || this.extension == 'gif'){
          console.log("not pdf")
          // let name=this.student.studentDocuments.otherdocuments[k].match(
          //   /[\w-]+\.(jpg|png|)/g
          // );
          // this.index = studymaterial[k].imagepath.lastIndexOf('/');
          // let name = studymaterial[k].imagepath.substring(
          //   this.index + 1
          // );
          let [names, ext] = studymaterial[k].imagepath.split('/').pop().split('.').slice(0, 2);
          let name = `${names}.${ext}`;
          // console.log("name",name[0])
          let path = studymaterial[k].imagepath;
          let date = studymaterial[k].uploadDate;
            let sdate = this.datePipe.transform(date, 'medium');
            this.imagedocs_studymaterial.push({ name: name, path: path,uploaddate :sdate });
          // this.imagedocs_studymaterial.push({ name: name, path: path });
        
        }else{
// alert(this.student.studentDocuments.otherdocuments[k])
          // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
          // console.log("pdf",this.pdfdocs)
          // let name=(this.student.studentDocuments.otherdocuments[k]).match(
          //   /[\w-]+\.(pdf)/g);
          console.log("in pdf")
          // this.index = studymaterial[k].imagepath.lastIndexOf('/');
          // let name = studymaterial[k].imagepath.substring(
          //   this.index + 1
          // );
          let fileName = studymaterial[k].imagepath.split('/').pop().split('.').slice(0, -1).join('.');
          let parts = fileName.split("-");
          let name = parts[0]; 
          // alert(fileName)
          // console.log("name",name[0])
          let path = studymaterial[k].imagepath;
          // this.imagename_path.push({name:name,path:path})
          let date = studymaterial[k].uploadDate;
            let sdate = this.datePipe.transform(date, 'medium');
          this.pdfdocs_studymaterial.push({ name: name, path: path,uploaddate :sdate  });
          // this.pdfdocs_studymaterial.push({ name: name, path: path });
          console.log('pdf', this.pdfdocs_studymaterial);
        
        }
        // alert("hi")
        // this.otherdocslength =
        //   this.student.studentDocuments.otherdocuments.length;
      }
      this.pdfdocs_studymaterial.forEach(obj => {
        obj.dateObj = new Date(obj.uploaddate);
      });
      
      // Sort the array based on the "dateObj" field
      this.pdfdocs_studymaterial.sort((a, b) => b.dateObj - a.dateObj);
      
      // Remove the "dateObj" field from the objects
      this.pdfdocs_studymaterial.forEach(obj => {
        delete obj.dateObj;
      });

      this.imagedocs_studymaterial.forEach(obj => {
        obj.dateObj = new Date(obj.uploaddate);
      });
      
      // Sort the array based on the "dateObj" field
      this.imagedocs_studymaterial.sort((a, b) => b.dateObj - a.dateObj);
      
      // Remove the "dateObj" field from the objects
      this.imagedocs_studymaterial.forEach(obj => {
        delete obj.dateObj;
      });
      this.pdf_length = this.pdfdocs_studymaterial.length;
      this.img_length = this.imagedocs_studymaterial.length;
      console.log(this.pdfdocs_studymaterial,"his.pdfdocs_studymaterial")
      console.log(this.imagedocs_studymaterial,"image study")
    }
  }
  downloadAllStudyMaterials() {
    // this.ngOnInit();
    for (
      let k = 0;
      k < this.studymaterial_download.length;
      k++
    ) {
      this.imgUrl = this.studymaterial_download[k].imagepath;
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

  showPdf(url) {
    console.log(url,"view url")
    window.open(url, '_blank');
  }
  downloadsingleFile(imgpath) {
    // this.ngOnInit();
    
      this.imgUrl = imgpath;
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
  onstudymaterialbackClick(){
    this.showMaterials = false;
    this.showSubjects = true;
  }
  onfilesbackClick(){
    this.showFiles = false;
    this.showMaterials = true;
  }
}
