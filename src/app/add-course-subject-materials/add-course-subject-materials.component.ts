import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { BookLibraryService } from '../services/booklibrary.service';
import { Booklibrary } from '../shared/models/booklibrary.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseSubjectService } from '../services/coursesubject.service';
import { Coursesubject } from '../shared/models/coursesubject.model';
import { Studymaterial } from '../shared/models/studymaterial.model';
import { StudymaterialService } from '../services/studymaterial.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-course-subject-materials',
  templateUrl: './add-course-subject-materials.component.html',
  styleUrls: ['./add-course-subject-materials.component.css']
})
export class AddCourseSubjectMaterialsComponent implements OnInit {

  singleBookLibrary :Booklibrary = {};
  
  yearLength = Array;
  yrlen;
  selectYear;
  semLength = Array;
  semlen;
  showYearwiseTable:boolean = false;

  addmaterials:Studymaterial = {};

  // courses:any = [];
  // courseDuration;
  // CID;
  // Cname;
  // cUniversity;
  // cType;
  // cBranch;
  // cDuration;
  // expandContent = true;
  // isCollapsed: boolean[] = [];
  delete_course_id;
  // delete_fee_id: any;
  // countOfStudentswithCourse=0;
  selectedYear;
  selectSemester;
  indexofYear;
  actualindexofYear;
  // feeStructure;
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
  // center;

  // course_year = [];

  // selectedIndex: number;
  // showNext:boolean;
  showSemesters:boolean= false;
  showSubjects:boolean = false;
  showFiles:boolean = false;
  showMaterials:boolean = false;
  courseId;
  studentCoursesubjects = [];
  material_length = 0;
  studymaterialfile_length = 0;
  studymaterialname;
 pdf_length = 0;
 img_length =0;
  constructor(
    public auth:AuthService,
    private aroute: ActivatedRoute,
    public toast: ToastComponent,
     public route: Router,
     public booklibraryService:BookLibraryService,
     private formBuilder: FormBuilder,
     private coursesubjectService: CourseSubjectService,
     public studymaterialService:StudymaterialService,
     private httpClient: HttpClient,
     private datePipe: DatePipe,

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
    this.aroute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.coursesubjectModel.courseId = id;
      this.courseId = id;
      this.booklibraryService.getBooklibraryWithId(id).subscribe(
        data=>{
          
          this.singleBookLibrary = data[0];
          this.yrlen = Number(this.singleBookLibrary.numberofyears);
          this.semlen = Number(this.singleBookLibrary.semperyear);

          console.log(this.singleBookLibrary,"hhh");
        }
      );
    });
    
  }
  onYearClick(year){
    this.selectYear = year;
    this.showSemesters = true;
    this.showYearwiseTable = false;
    this.showSubjects = false;
    this.showMaterials = false;
    this.showFiles = false;
    // this.getSubjectsinYears(this.courseId,this.selectYear)

  }
  onSemesterClick(sem){
    this.selectSemester = sem;
    this.showYearwiseTable = true;
    this.showSemesters = true;
    this.showSubjects = true;
    this.showMaterials = false;
    this.showFiles = false;
    this.getSubjectsinYears(this.courseId,this.selectYear,this.selectSemester)

  }
  reload() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['./'], { relativeTo: this.aroute });
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
  this.coursesubjectModel.yearIndex=this.selectYear;
  this.coursesubjectModel.semIndex = this.selectSemester;

  this.coursesubjectModel.subject=this.coursesubject.subject.value;
  // console.log(this.coursesubjectModel,"modelllll")
  this.coursesubjectService.addCoursesubject(this.coursesubjectModel).subscribe(
    data => {
      this.subjectId=data._id;
      console.log(this.subjectId,"subiddddd");
      this.toast.setMessage('Subject added successfully !!!', 'success');
      this.ngOnInit();
      this.showSubjects =  false;
      document.getElementById('addsubjectModal').click();
      this.addsubjectNameForm.reset();

      
      
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


           this.ngOnInit();
    })
 

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
      console.log(this.studymaterials,"materials",this.showMaterials)
    }
  );
}

 count=0;
    uploadOtherDocument(event,id)
    {
      this.notespath = [];
      this.addmaterials = {};
      // this.addmaterials._id = id;
      
      let type = 'studymaterials';
      if(event.target.files.length>0){
        this.noteimages=event.target.files;
        console.log(id,"subid   ggg",this.noteimages,"ll")
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
          console.log(res.imageUrl.length,"count")
          let objwithdate={};
          for(let k=0;k<res.imageUrl.length;k++){
            // let path = 'server/public/images/'+type+'/'+id+'/'+res.imageUrl[k].filename;
            let path = 'http://206.189.140.241:4200/' +type+'/'+id+'/'+ res.imageUrl[k].filename;
            // let path = 'https://admintimes.com/' +type+'/'+id+'/'+ res.imageUrl[k].filename;
            objwithdate = {
              uploadDate : this.uploadDate,
              imagepath : path,
  
            };
            this.notespath.push(objwithdate)
            // this.notespath.push('server/public/images/'+type+'/'+id+'/'+res.imageUrl[k].filename);

            // this.notespath.push(
            //   'http://206.189.140.241:4200/' +type+'/'+id+'/'+ res.imageUrl[k].filename
            // );
            // this.notespath.push(
            //   'https://admintimes.com/' +type+'/'+id+'/'+ res.imageUrl[k].filename
            // );
          }
          // let objwithdate = {
          //   uploadDate : this.uploadDate,
          //   imagepath : this.notespath[0]

          // };
          for(let m=0;m<this.notespath.length;m++){
            if(this.addmaterials.materials.length > 0){
              console.log("fist if")
              this.addmaterials.materials.push(this.notespath[m]);
                
              
              
              
            }else{
              console.log("else")
              this.addmaterials.materials = [];
              this.addmaterials.materials.push(this.notespath[m]);
  
              
             
  
              console.log(this.addmaterials.materials);
            }
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
            // this.index = studymaterial[k].imagepath.lastIndexOf('/');
            // let name = studymaterial[k].imagepath.substring(
            //   this.index + 1
            // );
            

            let [names, ext] = studymaterial[k].imagepath.split('/').pop().split('.').slice(0, 2);
            let name = `${names}.${ext}`;
            // console.log(name,"pp");


            let path = studymaterial[k].imagepath;
            let date = studymaterial[k].uploadDate;
            let sdate = this.datePipe.transform(date, 'medium');
            this.imagedocs_studymaterial.push({ name: name, path: path,uploaddate :sdate });
            console.log('not pdf', this.imagedocs_studymaterial,sdate);

          }else{
             // alert(this.student.studentDocuments.otherdocuments[k])
            // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
            // let name=(this.student.studentDocuments.otherdocuments[k]).match(
            //   /[\w-]+\.(pdf)/g);
            console.log("in pdf")
            // this.index = studymaterial[k].imagepath.lastIndexOf('/');
            // let name = studymaterial[k].imagepath.substring(
            //   this.index + 1
            // );
  
            // alert(fileName)
            // const [names, ext] = ;
            let fileName = studymaterial[k].imagepath.split('/').pop().split('.').slice(0, -1).join('.');
            let parts = fileName.split("-");
            let name = parts[0]; 
            // console.log(name,"pp");
            let path = studymaterial[k].imagepath;
            // this.imagename_path.push({name:name,path:path})
            let date = studymaterial[k].uploadDate;
            let sdate = this.datePipe.transform(date, 'medium');
            this.pdfdocs_studymaterial.push({ name: name, path: path,uploaddate :sdate  });
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
        // console.log(this.pdfdocs_studymaterial);
        // this.pdfdocs_studymaterial.sort((a:any, b:any) => b.uploaddate - a.uploaddate);
        this.pdf_length = this.pdfdocs_studymaterial.length;
      this.img_length = this.imagedocs_studymaterial.length;
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
  getSubjectsinYears(courseId,yearIndex,semIndex){
    this.coursesubjectService.getCoursesubjectsByCourse(courseId,yearIndex,semIndex).subscribe(
      subdata=>{
        this.studentCoursesubjects = [];
        this.studymaterials = [];
  
        for(var i=0;i<subdata.length;i++){
          this.studentCoursesubjects.push(subdata[i]);
  
        }
        console.log(this.studentCoursesubjects,"course subj")
      }
    );
   }
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
   
   
  }
  
  updateSubject()
  {
    this.editsubmittedSubjectName = true;
    if (this.editsubjectNameForm.invalid) {
      return;
    }
    this.editSubject.subject = this.editcoursesubject.subject.value;
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
  displaybookLibrary(){
    if(this.auth.isAdmin){
      this.route.navigate(['display-booklibrary/']);
    }else if(this.auth.isTeacher){
      this.route.navigate(['teacher-display-booklibrary/']);
    }
  }
}
