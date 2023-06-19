import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { FeeService } from '../services/fee.service';
import { StudentService } from '../services/student.service';
import { CourseSubjectService } from '../services/coursesubject.service';
import { Course } from '../shared/models/course.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coursesubject } from '../shared/models/coursesubject.model';
import { Studymaterial } from '../shared/models/studymaterial.model';
import { StudymaterialService } from '../services/studymaterial.service';
import { HttpClient } from '@angular/common/http';
import { Fee } from '../shared/models/fee.model';

@Component({
  selector: 'app-courseform-singleview',
  templateUrl: './courseform-singleview.component.html',
  styleUrls: ['./courseform-singleview.component.css']
})
export class CourseformSingleviewComponent implements OnInit {
  addmaterials:Studymaterial = {};

  courses:any = [];
  singleCourse:Course = {};
  courseDuration;
  CID;
  Cname;
  cUniversity;
  cType;
  cBranch;
  cDuration;
  expandContent = true;
  isCollapsed: boolean[] = [];
  delete_course_id;
  delete_fee_id: any;
  countOfStudentswithCourse=0;
  selectedYear;
  indexofYear;
  actualindexofYear;
  feeStructure;
  subjectId:any;
  submittedSubjectName: boolean = false;
  submittedStudymaterialName: boolean = false;
  editsubmittedStudymaterialName :boolean = false;
  editsubmittedSubjectName: boolean = false;

  coursesubjectModel : Coursesubject= {
    courseId: '',
    feeId: '',
    subject: '',
    yearIndex: ''
  };
  studymaterial_save : Studymaterial = {};
  editStudyMaterial : Studymaterial = {};
  editSubject : Coursesubject = {};
  editSubjectfee : Fee = {};
  deleteSubjectfee : Fee = {};
  //imae uploads
  noteimages =[];
  notespath=[];
  uploadDate = Date.now();
  whenclicked:Boolean = false;
  studymaterials = [];
  subjectIndex = [];
  subjectname;
  studymaterial_download = [];
  imgUrl;
  index: any;
  extension: any;
  pdfdocs_studymaterial = [];
  imagedocs_studymaterial = [];
  name_of_image_studymaterial;

  delete_type:string;
  viewanduploadfiles:Boolean = false;
  deletefiles:Boolean = false;
  student_to_delete_images: string;
  imagedelete_studymaterial;
  image_img_name;
  center;

  course_year = [];

  selectedIndex: number;
  showNext:boolean;
  showPrevious:boolean;
  showSubjects:boolean = false;
  showFiles:boolean = false;
  showMaterials:boolean = false;
  courseId;
  studentCoursesubjects = [];
  material_length = 0;
  studymaterialfile_length = 0;
  studymaterialname;

  constructor(
    private aRoute:ActivatedRoute,
    public router:Router,
    public studentService:StudentService,
    public courseService:CourseService,
    public auth:AuthService,
    public feeService:FeeService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    private coursesubjectService: CourseSubjectService,
    public studymaterialService:StudymaterialService,
    private httpClient: HttpClient,

  ) { }
  addsubjectNameForm: FormGroup = this.formBuilder.group({
    subject: ['',Validators.required],
  });
  editsubjectNameForm: FormGroup = this.formBuilder.group({
    subject: ['',Validators.required],
  });
  addstudymaterialForm: FormGroup = this.formBuilder.group({
    name: ['',Validators.required],
  });
  editstudymaterialForm:FormGroup = this.formBuilder.group({
    name: ['',Validators.required],

  })
  ngOnInit(): void {
    console.log(this.auth.currentUser.roles[0],"role");
    this.selectedIndex = 0;
          this.showNext = true;
          this.showPrevious = true;
    this.getcoursedetailsbyId();
    // this.coursesubjectService.getSubjectById('62bd3d62c7774149f06c587a').subscribe(
    //   data=>{
        
    //   }
    // )

    // this.getfeebycourseId()

  }
  getcoursedetailsbyId(){
    this.aRoute.paramMap.subscribe((params:ParamMap) =>
    {
      if(!this.CID){
        this.CID = params.get('id');
      }
      this.center = params.get('center');
      this.courseService.getCourseById(this.CID).subscribe(
        data=>{
          this.singleCourse = data;
          console.log("hlo",this.CID,this.singleCourse);
          this.Cname = this.singleCourse.name;
          this.cUniversity = this.singleCourse.boardOrUniversity;
          this.cType = this.singleCourse.courseType;
          this.cBranch = this.singleCourse.branch;
          this.cDuration = this.singleCourse.durationInYear + 'Y' + this.singleCourse.durationInMonths + 'M';
          this.courses = [];
          if(this.singleCourse.branch){
            this.isCollapsed = [];
            this.courses = [];
            this.isCollapsed[0]= true;
            this.courseService.getCoursesWithNamewithBranch({name :this.singleCourse.name,boardOrUniversity:this.singleCourse.boardOrUniversity,
              courseType: this.singleCourse.courseType,branch: this.singleCourse.branch,centers:this.center}).subscribe(
              data => {

                for(var i in data){

                  this.courses.push(data[i]);
                  this.course_year = [];
                  for(var j in data[i].feeId.feeStructure){
                    this.course_year.push(data[i].feeId.feeStructure[j].year)

                  }
                  this.isCollapsed.push(false);
                }
                // console.log("hi",this.isCollapsed,"jjj")
                // this.courses = data;

                this.courses.reverse();
                let year_index = this.selectedIndex + 1;
                
                // this.getSubjectsinYears(this.courses[this.selectedIndex]._id,year_index);
                this.showSubjects = true;
                console.log(this.courses,"courses with branch")



              }
            );
          }else{
            this.isCollapsed = [];
            this.courses = [];
            this.isCollapsed[0]= true;
            this.courseService.getCoursesWithNamewithoutBranch({name :this.singleCourse.name,boardOrUniversity:this.singleCourse.boardOrUniversity,
              courseType: this.singleCourse.courseType,centers:this.center}).subscribe(
              data => {
                // this.isCollapsed[0]= true;
                for(var i in data){

                  this.courses.push(data[i]);
                  this.course_year = [];
                  for(var j in data[i].feeId.feeStructure){
                    this.course_year.push(data[i].feeId.feeStructure[j].year)

                  }
                  this.isCollapsed.push(false);
                }
                // this.courses = data;
                // this.isCollapsed.push(false);

                this.courses.reverse();
                let year_index = this.selectedIndex + 1;
                
                // this.getSubjectsinYears(this.courses[this.selectedIndex]._id,year_index);
                this.showSubjects = true;

                console.log(this.courses,"courses without branch")


              }
            );
          }

        }
      );


    });
    // this.coursesubjectService.getSubjectById('62bd3d62c7774149f06c587a').subscribe(
    //   data=>{
    //     // console.log("sub",data);
    //   }
    // )


}
onExpandClick(index,data){
  // alert("hi")
  console.log(data,"diet")
  this.studymaterials = [];
  this.studentCoursesubjects = [];
  for(var x in this.isCollapsed){
    if(x == index){
      this.isCollapsed[x] = true;


    }else{
      this.isCollapsed[x] = false;
    }
  }
  this.selectedIndex = 0;
  this.showNext = true;
  this.showPrevious = true;
  this.course_year = [];
  for(var j in data.feeId.feeStructure){
      // this.selectedIndex = 0;

    this.course_year.push(data.feeId.feeStructure[j].year)

  }
  let year_index = this.selectedIndex + 1;
                
  // this.getSubjectsinYears(data._id,year_index);
  this.showSubjects = true;
}
findDetails(data) {
  this.subjectIndex = [];
  // console.log("details",data);
  for(let k=0;k<data.feeId.feeStructure.length;k++)
  {
    if(this.selectedYear==data.feeId.feeStructure[k].year)
    {
      this.indexofYear=k+1;
      this.actualindexofYear=k;
    }
  }

  this.coursesubjectModel.feeId=data.feeId._id;
  this.coursesubjectModel.courseId=data._id;
  this.coursesubjectModel.yearIndex=this.indexofYear;
 
    // for(var i=0;i<data.feeId.feeStructure.length;i++){
     
    //   if(data.feeId.feeStructure[i].subjectList){
    //     for(var j=0;j< (data.feeId.feeStructure[i].subjectList.length);j++){
          
    //       this.subjectIndex.push({year_index:i,array_index:j,val:false});

    //     }
    //   }
      
      

    // }
  return this.courses.filter(x => x._id == data._id && x.name == data.name);
}
feeYear(x){
this.selectedYear=x;
}
gotoCourseEdit(){
  if(this.auth.isAdmin){
    this.router.navigate(['courseform-edit/' + this.CID]);  
  }else if(this.auth.isTeacher){
    this.router.navigate(['teacher-courseform-edit/' + this.CID]);  }
  

}
deleteCourse(id: any,feeid:any) {
  this.delete_course_id = id;
  this.delete_fee_id = feeid._id;
  console.log(this.delete_course_id,"c id",this.delete_fee_id)
  this.studentService.getCountOfStudentswithCourse({courseID:this.delete_course_id,feeID:this.delete_fee_id}).subscribe(
    datacount=>{
    console.log(datacount,"   countttttt");
    this.countOfStudentswithCourse = datacount;
    }
  );
}
onCourseDelete() {
  if(this.countOfStudentswithCourse <= 0){
    this.courseService
    .deleteCourse({_id:this.delete_course_id})
    .subscribe((data) => {
      this.feeService.deleteFee({_id:this.delete_fee_id}).subscribe(
        datas => {
          this.toast.setMessage(
            'Course deleted successfully !!!',
            'success'
          );
          let len = this.courses.length;
          if(len == 1){
            if(this.auth.isAdmin){
              this.router.navigate(['course/']);
            }else if(this.auth.isTeacher){
              this.router.navigate(['teacher-course/']);
            }
            // this.router.navigate(['course']);
          }else{

              if(this.cBranch){
                this.courses = [];
                this.courseService.getCoursesWithNamewithBranch({name :this.Cname,boardOrUniversity:this.cUniversity,
                  courseType:this.cType,branch:this.cBranch,centers:this.center}).subscribe(
                  data => {
                    this.courses = data;
                    console.log("hell yes")
                    console.log(this.courses,"courses with branch")


                    this.courses.reverse();
                    // this.isCollapsed[0]= true;
                    this.Cname = this.courses[0].name;
                    this.CID = this.courses[0]._id;
                    // this.isCollapsed.push(false);

                // this.courses.reverse();
                // this.isCollapsed[0]= true;
                    this.getcoursedetailsbyId();
                  });
              }else{
                this.courses = [];
                this.courseService.getCoursesWithNamewithoutBranch({name :this.Cname,boardOrUniversity:this.cUniversity,
                  courseType:this.cType,centers:this.center}).subscribe(
                  data => {
                    this.courses = data;
                    console.log("hell yes")
                    console.log(this.courses,"courses without branch")

                    this.courses.reverse();
                    this.Cname = this.courses[0].name;
                    this.CID = this.courses[0]._id;
                    // this.isCollapsed.push(false);

                    // this.isCollapsed[0]= true;
                    this.getcoursedetailsbyId();
                  });
              }
          }
          document.getElementById('submittedCourseDeleteModalCloseBtn').click();


        }
      );

      // this.reload();


    });

  }else{
    document.getElementById('submittedCourseDeleteModalCloseBtn').click();
    this.toast.setMessage(
      'Cannot delete since candidates are available in this course !!!',
      'danger'
    );
  }



}

reload() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['./'], { relativeTo: this.aRoute });
}
get coursesubject() { return this.addsubjectNameForm.controls; }
get editcoursesubject() { return this.editsubjectNameForm.controls; }

get studymaterial() { return this.addstudymaterialForm.controls; }
get editstudymaterial() { return this.editstudymaterialForm.controls; }

saveSubject()
{
  this.submittedSubjectName = true;
  if (this.addsubjectNameForm.invalid) {
    return;
  }
  this.coursesubjectModel.subject=this.coursesubject.subject.value;
  // console.log(this.coursesubjectModel,"modelllll")
  this.coursesubjectService.addCoursesubject(this.coursesubjectModel).subscribe(
    data => {
      this.subjectId=data._id;
      console.log(this.subjectId,"subiddddd");
      this.feeService.getFeeById(this.coursesubjectModel.feeId).subscribe(
        data=>{
          if( !data.feeStructure[this.actualindexofYear].subjectList)
          {
            data.feeStructure[this.actualindexofYear].subjectList=[];
            data.feeStructure[this.actualindexofYear].subjectList.push({'id':this.subjectId,'name':this.coursesubjectModel.subject})
            // console.log("fee structure",data);
          }
          else
          {
            data.feeStructure[this.actualindexofYear].subjectList.push({'id':this.subjectId,'name':this.coursesubjectModel.subject})
  
          }
    this.feeService.editFee(data,this.auth.authToken).subscribe(
      data=>{
             this.toast.setMessage('Subject added successfully !!!', 'success');
             document.getElementById('addsubjectModal').click();
             this.addsubjectNameForm.reset();

             this.ngOnInit();
          }
    )
  
  
        }
  
      );
    });
    

}

getSingleSubjectId(subID){
  // alert("action")
  this.studymaterial_save.subject = subID;
  // console.log(this.studymaterial_save.subject,"sub idd in mater")
}

saveStudymaterial()
{
  this.submittedStudymaterialName = true;
  if (this.addstudymaterialForm.invalid) {
    return;
  }
  this.studymaterial_save.name=this.studymaterial.name.value;
 
  this.studymaterialService.addStudymaterial(this.studymaterial_save).subscribe(
    data => {
      // this.subjectId=data._id;
      console.log(data,"study material");
      this.toast.setMessage('Study material added successfully !!!', 'success');
      document.getElementById('singleSubjectModal').click();
      this.addstudymaterialForm.reset();

      // this.addstudymaterialForm ={
      //   name: ['',Validators.required],
      // };
           this.ngOnInit();
    })
  //   this.feeService.getFeeById(this.coursesubjectModel.feeId).subscribe(
  //     data=>{
  //       if( !data.feeStructure[this.actualindexofYear].subjectList)
  //       {
  //         data.feeStructure[this.actualindexofYear].subjectList=[];
  //         data.feeStructure[this.actualindexofYear].subjectList.push({'id':this.subjectId,'name':this.coursesubjectModel.subject})
  //       }
  //       else
  //       {
  //         data.feeStructure[this.actualindexofYear].subjectList.push({'id':this.subjectId,'name':this.coursesubjectModel.subject})

  //       }
  // this.feeService.editFee(data,this.auth.authToken).subscribe(
  //   data=>{
  //          this.toast.setMessage('Subject added successfully !!!', 'success');
  //          this.ngOnInit();
  //       }
  // )


  //     }

  //   )

}
getStudymaterials(subjectid,subjectname){
  this.showMaterials = true;
  this.showSubjects = false;
  this.showFiles = false;
  this.subjectname = subjectname;
 
  console.log(this.subjectIndex,"subindex",subjectid)
  this.studymaterialService.getStudymaterialsBySubject(subjectid).subscribe(
    data=>{
      this.whenclicked = true;
      this.studymaterials = data;
      this.material_length = data.length;

      if(this.material_length > 0){
        this.showMaterials = true;
        this.showSubjects = false;

      }else{
        this.showMaterials = false;
        this.showSubjects = true;

      }
      console.log(this.studymaterials,"materials")
    }
  );
}

 count=0;
    uploadOtherDocument(event,id)
    {
      this.notespath = [];
      this.addmaterials = {};
      // this.addmaterials._id = id;
      console.log(id,"subid")
      let type = 'studymaterials';
      if(event.target.files.length>0){
        this.noteimages=event.target.files;
        this.studymaterialService.getStudymaterialById(id).subscribe(
          subdata=>{
            this.addmaterials =  subdata;
          //save image in folder

        this.studymaterialService.uploadOtherCertificate(this.noteimages,id,type).
        subscribe((res:any)=>{
          //save image path in db
          if(res.imageUrl)
          {
            this.count=this.count+res.imageUrl.length
          }

          for(let k=0;k<res.imageUrl.length;k++){
            // this.notespath.push('server/public/images/'+type+'/'+id+'/'+res.imageUrl[k].filename);

            // this.notespath.push(
            //   'http://206.189.140.241:4200/' +type+'/'+id+'/'+ res.imageUrl[k].filename
            // );
            this.notespath.push(
              'https://admintimes.com/' +type+'/'+id+'/'+ res.imageUrl[k].filename
            );
          }
          let objwithdate = {
            uploadDate : this.uploadDate,
            imagepath : this.notespath[0]

          };
          if(this.addmaterials.materials.length > 0){
            console.log("fist if")
            this.addmaterials.materials.push(objwithdate);
              
            
            
            
          }else{
            console.log("else")
            this.addmaterials.materials = [];
            this.addmaterials.materials.push(objwithdate);

            
           

            console.log(this.addmaterials.materials);
          }
          console.log(this.addmaterials,"csub")
            this.studymaterialService.editStudymaterial(this.addmaterials).subscribe(
              data=>{
                this.toast.setMessage("File upload successfully !!!", "success");
                this.getStudymaterials(this.addmaterials.subject,this.subjectname);
                           
              }
            );
          // alert(this.otherspath+"images")

          // console.log("all files",res.imageUrl)
          
        });
            
          }
        );
        
      
      }


      
    
     

    }

    getImageofstudymaterials(studymaterial_details,studymaterial,material_name) {
      // alert(material)
      console.log(studymaterial,"   maria   ",material_name)
      this.showFiles = true;
      this.showMaterials = false;
      this.showSubjects = false;
      this.studymaterial_download = [];
      // this.imagedelete_studymaterial = [];
      this.studymaterial_download = studymaterial;
      this.imagedelete_studymaterial = studymaterial_details;
      this.imagedocs_studymaterial = [];
      this.pdfdocs_studymaterial = [];
      this.name_of_image_studymaterial = 'others';
      this.studymaterialname = material_name;

      this.studymaterialfile_length = studymaterial.length;
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
            console.log('not pdf', this.imagedocs_studymaterial);

          }else{
             // alert(this.student.studentDocuments.otherdocuments[k])
            // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
            // let name=(this.student.studentDocuments.otherdocuments[k]).match(
            //   /[\w-]+\.(pdf)/g);
            console.log("in pdf")
            this.index = studymaterial[k].imagepath.lastIndexOf('/');
            let name = studymaterial[k].imagepath.substring(
              this.index + 1
            );
  
            // alert(fileName)
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
      }else{
        this.showFiles = false;
        this.showMaterials = true;
        // alert(this.showFiles+""+this.studymaterialfile_length)
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
      window.open(url, '_blank');
    } 
 
  getImagestoDelete(image_img_path,image_img_name,delete_type){

    this.delete_type = delete_type;
    this.student_to_delete_images= image_img_path;
    this.image_img_name =image_img_name
    // alert(delete_type+this.student_to_delete_images);
    document.getElementById('filesModalCloseBtn').click();
  }
  deleteImages(){
    if(this.delete_type == 'otherfiles'){
      // alert("ihh")
      this.studymaterialService.deleteImagepathfromdirectory(this.student_to_delete_images,this.image_img_name,this.imagedelete_studymaterial._id).subscribe(
        imgdata=>{
         
          for(var i =0; i< this.imagedelete_studymaterial.materials.length;i++){
            if (this.imagedelete_studymaterial.materials[i].imagepath == this.student_to_delete_images){
              // alert("yes")
              this.imagedelete_studymaterial.materials.splice(i, 1);
              console.log(this.imagedelete_studymaterial,"     lll")
              this.studymaterialService.editStudymaterial(this.imagedelete_studymaterial).subscribe(
                (data) => {
                  this.toast.setMessage('Document Deleted', 'success');
                  // this.otherdocslength = this.student.studentDocuments.otherdocuments.length;
                  document.getElementById('imagesDeleteModalCloseBtn').click();
                  this.getImageofstudymaterials(this.imagedelete_studymaterial,this.imagedelete_studymaterial.materials,this.imagedelete_studymaterial.name);
                  // this.ngOnInit();
                });
            }
          }
         
         
      
         
    
        }
      );
    }
    if(this.delete_type == 'images'){
      this.studymaterialService.deleteImagepathfromdirectory(this.student_to_delete_images,this.image_img_name,this.imagedelete_studymaterial._id).subscribe(
        imgdata=>{
       
          console.log(this.imagedelete_studymaterial,"merin")
          for(var i =0; i< this.imagedelete_studymaterial.materials.length;i++){
            if (this.imagedelete_studymaterial.materials[i].imagepath == this.student_to_delete_images){
              // alert("yes")
              this.imagedelete_studymaterial.materials.splice(i, 1);
              console.log(this.imagedelete_studymaterial,"     kk")
  
              this.studymaterialService.editStudymaterial(this.imagedelete_studymaterial).subscribe(
                (data) => {
                  // this.otherdocslength = this.student.studentDocuments.otherdocuments.length;
                  this.toast.setMessage('Document Deleted', 'success');
                  // this.filesUpload_flag = false;
    
                  document.getElementById('imagesDeleteModalCloseBtn').click();
                  this.getImageofstudymaterials(this.imagedelete_studymaterial,this.imagedelete_studymaterial.materials,this.imagedelete_studymaterial.name);

                  // this.ngOnInit();
              });
  
            }
           }
       
        }
      );
      
     
    }
   
   
  }
  next(courseId) {
    this.showPrevious = true;
    this.showMaterials = false;
    this.showSubjects = true;
  this.showFiles = false;
    this.courseId = courseId;
    this.selectedIndex++;
    if(this.selectedIndex >= this.course_year.length){
      this.selectedIndex = this.course_year.length-1;
      this.showNext = false;
     }
        //course subjects getting start
        let year_index = this.selectedIndex + 1;
        // this.getSubjectsinYears(this.courseId,year_index);

         //course subjects getting end


 }

 previous(courseId) {
  this.showNext = true;
  this.showMaterials = false;
  this.showSubjects = true;
  this.showFiles = false;
  this.courseId = courseId;

  this.selectedIndex--;
     if(this.selectedIndex <= 0){
      this.selectedIndex = 0;
      this.showPrevious = false;
     }
   
    //  console.log(this.course_year[this.selectedIndex],"        yearssss pre" );
     //course subjects getting start

     let year_index = this.selectedIndex + 1;
    //  this.getSubjectsinYears(this.courseId,year_index);
   //course subjects getting end

 }
//  getSubjectsinYears(courseId,yearIndex){
//   this.coursesubjectService.getCoursesubjectsByCourse(courseId,yearIndex).subscribe(
//     subdata=>{
//       this.studentCoursesubjects = [];
//       this.studymaterials = [];

//       for(var i=0;i<subdata.length;i++){
//         this.studentCoursesubjects.push(subdata[i]);

//       }
//       console.log(this.studentCoursesubjects,"course subj")
//     }
//   );
//  }
 onstudymaterialbackClick(){
  this.showMaterials = false;
  this.showSubjects = true;
}
onfilesbackClick(){
  this.showFiles = false;
  this.showMaterials = true;
}
downloadsingleFile(imgpath) {
  // this.ngOnInit();
    alert(imgpath)
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


deleteStudyMaterial(material) {
  if(material.materials.length){
    this.toast.setMessage(
      ' Cannot delete since  material have files in it !!!',
      'danger'
    );  
  }else{
    // alert("no");
    this.studymaterialService.deleteStudymaterial(material).subscribe(
      (datacount) => {
        this.toast.setMessage(
          'Study material deleted !!!',
          'danger'
        );  
          this.reload();

    }
    );
  }
 

}
editStudyMaterialname(material){
  this.editStudyMaterial = material;
 
}
updateStudymaterial()
{
  // alert("hii")
  this.editsubmittedStudymaterialName = true;
  if (this.editstudymaterialForm.invalid) {
    return;
  }
  this.editStudyMaterial.name=this.editstudymaterial.name.value;
  this.studymaterialService.editStudymaterial(this.editStudyMaterial).subscribe(
    (datacount) => {
      this.toast.setMessage(
        'Study material name changed successfully  !!!',
        'success'
      ); 
            document.getElementById('editsingleStudymaterialModal').click();
 
        this.reload();

  }
  );
 

}
deleteSubject(singlesubject){
  // alert(JSON.stringify(singlesubject));
  let studymat = {subject:singlesubject._id}
  this.studymaterialService.getCountofStudymaterialBysubjectid(studymat).subscribe(
    subjectcount=>{
      if(subjectcount > 0){
        this.toast.setMessage(
          ' Cannot delete since there are material in it !!!',
          'danger'
        );  
      }else{
        // alert("no");
        this.feeService.getFeeById(singlesubject.feeId._id).subscribe(
          data=>{
            this.deleteSubjectfee = data;
            for(var i=0;i < this.deleteSubjectfee.feeStructure.length; i++){
              for(var j = 0 ;j < this.deleteSubjectfee.feeStructure[i].subjectList.length;j++){
              if(this.deleteSubjectfee.feeStructure[i].subjectList[j].id == singlesubject._id){
                this.deleteSubjectfee.feeStructure[i].subjectList.splice(j, 1);
                this.feeService.editFee(this.deleteSubjectfee,this.auth.authToken).subscribe(
                  data=>{
                    this.coursesubjectService.deleteCoursesubject(singlesubject).subscribe(
                      (datacount) => {
                        this.toast.setMessage(
                          'Subject deleted successfully  !!!',
                          'success'
                        ); 
                              // document.getElementById('editsingleSubjectModal').click();
                   
                          this.reload();
                  
                    }
                    ); 
                      }
                )
              }
            }
          }
            console.log(this.deleteSubjectfee,"dd")
          }
        );
        // this.studymaterialService.deleteStudymaterial(material).subscribe(
        //   (datacount) => {
        //     this.toast.setMessage(
        //       'Study material deleted !!!',
        //       'danger'
        //     );  
        //       this.reload();
    
        // }
        // );
      }    
    }
  )
}
editSubjectname(subject){
  // alert(JSON.stringify(subject.feeId._id));
  this.editSubject = subject;
  this.feeService.getFeeById(subject.feeId._id).subscribe(
    data=>{
      this.editSubjectfee = data;
      console.log(this.editSubjectfee,"gg")
    }
  );
 
}

updateSubject()
{
  this.editsubmittedSubjectName = true;
  if (this.editsubjectNameForm.invalid) {
    return;
  }
  this.editSubject.subject = this.editcoursesubject.subject.value;
  for(var i in this.editSubjectfee.feeStructure){
    for(var j in this.editSubjectfee.feeStructure[i].subjectList){
    if(this.editSubjectfee.feeStructure[i].subjectList[j].id == this.editSubject._id){
      this.editSubjectfee.feeStructure[i].subjectList[j].name = this.editcoursesubject.subject.value;
      console.log(this.editSubject," mer   ",this.editSubjectfee)
      this.feeService.editFee(this.editSubjectfee,this.auth.authToken).subscribe(
        data=>{
          this.coursesubjectService.editCoursesubject(this.editSubject).subscribe(
            (datacount) => {
              this.toast.setMessage(
                'Subject name changed successfully  !!!',
                'success'
              ); 
                    document.getElementById('editsingleSubjectModal').click();
         
                this.reload();
        
          }
          ); 
            }
      )
    }
    }
  }
  
 
 

}

}
