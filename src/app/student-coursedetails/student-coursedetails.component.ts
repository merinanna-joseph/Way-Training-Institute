import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Student } from '../shared/models/student.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseSubjectService } from '../services/coursesubject.service';
import { StudymaterialService } from '../services/studymaterial.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-coursedetails',
  templateUrl: './student-coursedetails.component.html',
  styleUrls: ['./student-coursedetails.component.css']
})
export class StudentCoursedetailsComponent implements OnInit {

  student: Student = {};
  studentCoursesubjects = [];
  pdfdocs_studymaterial = [];
  imagedocs_studymaterial = [];
  name_of_image_studymaterial;
  studymaterialOf_singlesubject = [];
  studymaterial_download = [];
  subjectname;
  studymaterialname;
  whenclicked:Boolean = false;
  imgUrl;
  index: any;
  extension: any;
  material_length = 0;
  studymaterialfile_length = 0;
  subject_length = [];
  course_year = [];
  selectedIndex: number;
  showNext:boolean;
  showPrevious:boolean;
  showSubjects:boolean = false;
  showFiles:boolean = false;
  showMaterials:boolean = false;

  constructor(
    public auth: AuthService,
    public route: Router,
    public studentService: StudentService,
    public coursesubjectService:CourseSubjectService,
    public studymaterialService:StudymaterialService,
    public toast: ToastComponent,
    private httpClient: HttpClient,
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
          // this.id_student = data._id;
          // for(var j=0;j< data.feeID.feeStructure.length;j++){
          //   // console.log( data.feeID.feeStructure[j],"   hhhh");
          //   if(this.course_year.length <= 0){
          //     this.course_year.push(data.feeID.feeStructure[j].year);
          //   }else{
          //     for(let l = 0;l < this.course_year.length; l++){
          //       if(this.course_year.indexOf(data.feeID.feeStructure[j].year) <= -1){
          //         this.course_year.push(data.feeID.feeStructure[j].year);
          //       }
          //     }
          //   }
          //   // if(data.feeID.feeStructure[j].subjectList){
          //   //   for(var i=0;i<data.feeID.feeStructure[j].subjectList.length;i++){
          //   //     console.log(data.feeID.feeStructure[j].subjectList[i].id,"   sub id")
                
               
                
          //   //   }
          //   // }
            
          // }
          this.selectedIndex = 0;
          this.showNext = true;
          this.showPrevious = true;
          this.course_year.sort();
          this.student = data;
          let year_index = this.selectedIndex + 1;
          let semIndex = 1;
          // let student_data = data;
          //start
                 //course subjects getting start
        this.coursesubjectService.getCoursesubjectsByCourse(this.student.courseID._idx).subscribe(
          subdata=>{
            this.studentCoursesubjects = [];
            for(var i=0;i<subdata.length;i++){
              this.showSubjects = true;
              this.studentCoursesubjects.push(subdata[i]);

            }
            console.log(this.studentCoursesubjects,"course subj")
          }
        );
         //course subjects getting end

          // this.student = data;
          console.log(this.student,"   student lll")
         




          //end
        }
      );


      }

      
      
 
    // console.log('student ID' + this.student._id);
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
          this.index = studymaterial[k].imagepath.lastIndexOf('/');
          let name = studymaterial[k].imagepath.substring(
            this.index + 1
          );

          // console.log("name",name[0])
          let path = studymaterial[k].imagepath;
          this.imagedocs_studymaterial.push({ name: name, path: path });
        
        }else{
// alert(this.student.studentDocuments.otherdocuments[k])
          // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
          // console.log("pdf",this.pdfdocs)
          // let name=(this.student.studentDocuments.otherdocuments[k]).match(
          //   /[\w-]+\.(pdf)/g);
          console.log("in pdf")
          this.index = studymaterial[k].imagepath.lastIndexOf('/');
          let name = studymaterial[k].imagepath.substring(
            this.index + 1
          );

          // alert(fileName)
          // console.log("name",name[0])
          let path = studymaterial[k].imagepath;
          // this.imagename_path.push({name:name,path:path})

          this.pdfdocs_studymaterial.push({ name: name, path: path });
          console.log('pdf', this.pdfdocs_studymaterial);
        
        }
        // alert("hi")
        // this.otherdocslength =
        //   this.student.studentDocuments.otherdocuments.length;
      }
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

  next() {
    this.showPrevious = true;
    this.showMaterials = false;
    this.showSubjects = true;
  this.showFiles = false;

    this.selectedIndex++;
    if(this.selectedIndex >= this.course_year.length){
      this.selectedIndex = this.course_year.length-1;
      this.showNext = false;
     }
    console.log(this.course_year[this.selectedIndex],"        yearssss next" )
        //course subjects getting start
        let year_index = this.selectedIndex + 1;
        let semIndex = 2
        this.coursesubjectService.getCoursesubjectsByCourse(this.student.courseID._id).subscribe(
          subdata=>{
            this.studentCoursesubjects = [];
            this.studymaterialOf_singlesubject = [];
            for(var i=0;i<subdata.length;i++){
              this.studentCoursesubjects.push(subdata[i]);

            }
            console.log(this.studentCoursesubjects,"course subj")
          }
        );
         //course subjects getting end


 }

 previous() {
  this.showNext = true;
  this.showMaterials = false;
  this.showSubjects = true;
  this.showFiles = false;

  this.selectedIndex--;
     if(this.selectedIndex <= 0){
      this.selectedIndex = 0;
      this.showPrevious = false;
     }
   
     console.log(this.course_year[this.selectedIndex],"        yearssss pre" );
     //course subjects getting start

     let year_index = this.selectedIndex + 1;
     let semIndex = 1;
     this.coursesubjectService.getCoursesubjectsByCourse(this.student.courseID._id).subscribe(
       subdata=>{
         this.studentCoursesubjects = [];
         this.studymaterialOf_singlesubject = [];

         for(var i=0;i<subdata.length;i++){
           this.studentCoursesubjects.push(subdata[i]);

         }
         console.log(this.studentCoursesubjects,"course subj")
       }
     );
   //course subjects getting end

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
