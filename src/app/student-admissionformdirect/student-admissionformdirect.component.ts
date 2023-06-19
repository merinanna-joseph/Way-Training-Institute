import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../services/student.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';



import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Fee } from '../shared/models/fee.model';
import { FeeService } from '../services/fee.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CourseService } from '../services/course.service';
import { Course } from '../shared/models/course.model';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { FeeflowService } from '../services/feeflow.service';
import { CollectionflowService } from '../services/collectionflow.service';
import { COLLECTION_FLOW_TYPE } from '../globals';
import { InvoiceService } from '../services/invoice.service';
import { Feeflow } from '../shared/models/feeflow.model';
import { Invoice } from '../shared/models/invoice.model';

@Component({
  selector: 'app-student-admissionformdirect',
  templateUrl: './student-admissionformdirect.component.html',
  styleUrls: ['./student-admissionformdirect.component.css']
})
export class StudentAdmissionformdirectComponent implements OnInit {

  student: Student = {};
  personalDetails: Boolean = false;
  addressDetails: Boolean = false;
  educationqualificationDetails: Boolean = false;
  courseDetails: Boolean = false;
  intakedate;
  tomonth;
  intakedisplay;
  submitted = false;
  coursesubmitted = false;
  student_secondory_certificate: any;
  student_secondory_certificate_image: string;
  student_higher_secondory_certificate: RegExpMatchArray;
  student_passport_front_page: RegExpMatchArray;
  student_passport_back_page: RegExpMatchArray;
  student_visa_page: RegExpMatchArray;
  student_emirated_id: RegExpMatchArray;
  student_other_docs: RegExpMatchArray;
  physical_status: string[];
  imageOfSecondaryCertificate: any;
  isShown: boolean = false; // hidden by default
  multipleimages: any;
  otherspath: string[];
  studentotherdoc: any;
  extension: any;
  imageofprofilePhoto: any;
  index: any;
  locations = [];
  secondary: string;
  name_image: any;
  name_pdf: string;
  name_img: string;
  passportfrontpagestatus: boolean;
  passportbackpagestatus: boolean;
  emiratesidstatus: boolean;
  visapagestatus: boolean;
  // highersecondorystatus: boolean;
  previousyearCourses = [];
  feeFlow: Feeflow;
  fee_details = [];
  tmparray_book = [];
  tmparray_book_new = [];
  tmparray_certificate = [];
  tmparray_certificate_new = [];
  tmparray_transport = [];
  tmparray_transport_new = [];
  monthList: any = [];
  groupList: any = [];
  transportamount_total: number = 0;
  tmparray_month: any = [];
  year1:any = [];
  year2:any = [];
  year3:any = [];
  year4:any = [];
  year5:any = [];

  year_single_array:any=[];
  yearslist:any =[];
  showpreview: boolean;
  collectionFlows: any;
  statusofbookcollected:boolean=false;
  statusofcertificatecollected:boolean=false;
  statusoftransportcollected:boolean=false;
  currentDate = new Date();
  invoices: Invoice[] =[];
  

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public route: Router,
    public studentService: StudentService,
    public courseService: CourseService,
    public toast: ToastComponent,
    public feeService: FeeService,
    private aRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private confirmationDialogService: ConfirmationDialogService,
    public feeflowService: FeeflowService,
    public collectionFlowService: CollectionflowService,
    public invoiceService: InvoiceService,
  ) {}
  // editpersonalDetailsForm: FormGroup = this.formBuilder.group({
  //   firstname: ['', Validators.required],
  //   lastname: ['', Validators.required],
  //   email: [''],
  //   gender: [''],
  //   dob: [''],
  //   mobilenumber: [''],
  //   residencenumber: [''],
  //   passportnumber: [''],
  //   fathername: [''],
  //   mothername: [''],
  //   disablitity_status: [''],
  // });
  // editaddressDetailsForm: FormGroup = this.formBuilder.group({
  //   location: [''],
  //   nationality: [''],
  //   permanentaddress: [''],
  //   temporaryaddress: [''],
  // });
  // editeducationqualificationDetailsForm: FormGroup = this.formBuilder.group({
  //   lastcompletedcourse: [''],
  //   university: [''],
  //   institute: [''],
  //   passout_year: [''],
  // });
  // editcourseDetailsForm: FormGroup = this.formBuilder.group({
  //   academicyear: [''],
  //   tallyID: [''],
  //   admissiondate: ['', Validators.required],
  //   university_register_number: [''],
  //   intakedisplay: [''],
  //   studentdiscount: [''],
  //   courseId: [''],
  //   branch: [''],

  //   durationInYear: [''],
  //   totalfeeswithdiscount: [''],
  //   centers: [''],
  // });
  ngOnInit(): void {
    console.log(this.auth.currentUser,"curuser");
    
 
    this.getForm();
    // this.physical_status = ['Differently Abled', 'Normal'];
    // this.locations = [
    //   'Abu Dhabi',
    //   'Ajman',
    //   'Dubai',
    //   'Fujairah',
    //   'Ras Al Khaimah',
    //   'Sharjah',
    //   'Umm Al Quwain',
    // ];
    // this.previousyearCourses = [
    //   'Schooling',
    //   '12th or Equivalent',
    //   'Graduation or Equivalent',
    //   'Post Graduation or Equivalent',
    // ];
  }
 
  showPreview() {
    this.showpreview = true;
  }
  showMain() {
    this.showpreview = false;
  }
  // get p() {
  //   return this.editpersonalDetailsForm.controls;
  // }
  // get a() {
  //   return this.editaddressDetailsForm.controls;
  // }
  // get eq() {
  //   return this.editeducationqualificationDetailsForm.controls;
  // }
  // get c() {
  //   return this.editcourseDetailsForm.controls;
  // }
  sc;
  hs;
  otherstatus;
  otherdocslength;
  secondorystatus;
  highersecondorystatus;
  id_student;
  // subjectIndex: boolean[] = [];

  // groupList:any = [];

  getForm() {
    if(this.auth.currentUser.roles[0] == "student"){
      this.studentService.getStudentByUsername({username:this.auth.currentUser.email}).subscribe(
        data=>{
          console.log(data,"userdataa");
          this.id_student = data._id;
          this.student = data;


          //start

          this.studentotherdoc = data.studentDocuments.otherdocuments;
          this.otherdocslength =
            this.student.studentDocuments.otherdocuments.length;
          this.feeflowService
            .getFeeflowsWithStudentId(this.student._id)
            .subscribe(
              (feeflows) => {
                let size = 12;
                let feeflows_firstarray=feeflows[0]

                // console.log(feeflows_firstarray, '   before');
                feeflows.reverse();
                for(let c=0;c<feeflows_firstarray.fee_per_year.length;c++)
                {
                this.year_single_array.push(feeflows_firstarray.fee_per_year[c])
                 }
                for(let p=0;p<this.year_single_array.length;p++){
                  this.yearslist.push(this.year_single_array[p].year)
                }
                console.log("yearlist",this.yearslist);
                // feeflows.sort((a, b) => new Date(b.lastPaidDate).getTime() - new Date(a.lastPaidDate).getTime());
                console.log(feeflows, 'list of fee flows');
                this.feeFlow = feeflows[0];
                console.log(this.feeFlow, 'last invoice');
                console.log(this.feeFlow.fee_per_year, 'fee per year');
                this.fee_details = this.feeFlow.fee_per_year;
                console.log('fee details', this.fee_details);
                console.log('reg', this.fee_details[0].year);
                for (let x = 0; x < this.fee_details.length; x++) {
                  this.groupList.push({
                    year: this.fee_details[x].year,
                    reg_total: this.fee_details[x].registration_fee_total,
                    reg_bal: this.fee_details[x].registration_fee_balance,
                    reg_paid:
                      this.fee_details[x].registration_fee_total -
                      this.fee_details[x].registration_fee_balance,
                    attestation_total:
                      this.fee_details[x].attestation_fee_total,
                    attestation_bal: this.fee_details[x].attestation_balance,
                    attestation_paid:
                      this.fee_details[x].attestation_fee_total -
                      this.fee_details[x].attestation_balance,
                    coaching_total: this.fee_details[x].coaching_fee_total,
                    coaching_bal: this.fee_details[x].coaching_fee_balance,
                    coaching_paid:
                      this.fee_details[x].coaching_fee_total -
                      this.fee_details[x].coaching_fee_balance,
                    convocation_total:
                      this.fee_details[x].convocation_fee_total,
                    convocation_bal: this.fee_details[x].convocation_balance,
                    convocation_paid:
                      this.fee_details[x].convocation_fee_total -
                      this.fee_details[x].convocation_balance,
                    equalency_total: this.fee_details[x].equalency_fee_total,
                    equalency_bal: this.fee_details[x].equalency_balance,
                    equalency_paid:
                      this.fee_details[x].equalency_fee_total -
                      this.fee_details[x].equalency_balance,
                    exam_total: this.fee_details[x].exam_fee_total,
                    exam_bal: this.fee_details[x].exam_fee_balance,
                    exam_paid:
                      this.fee_details[x].exam_fee_total -
                      this.fee_details[x].exam_fee_balance,
                    other_total: this.fee_details[x].other_fee_total,
                    other_bal: this.fee_details[x].other_balance,
                    other_paid:
                      this.fee_details[x].other_fee_total -
                      this.fee_details[x].other_balance,
                    miscellaneous_total:
                      this.fee_details[x].miscellaneous_fees_total,
                    transport_total: this.fee_details[x].transport_fees_total,
                    total_fee: this.fee_details[x].total_fee,
                    balance_fee: this.fee_details[x].balance_fee,
                    total_paid:
                      this.fee_details[x].total_fee -
                      this.fee_details[x].balance_fee,
                  });
                }
                console.log('grouplist', this.groupList);
              },
              (error) => {}
            );
          this.invoiceService
            .getinvoicesWithStudentId(this.student._id)
            .subscribe((data) => {
              this.invoices = data;
              console.log("INVOICES",this.invoices);
              for(let c=0;c<this.invoices.length;c++)
              {
                if(this.invoices[c].year==this.yearslist[0])
                {
                  this.year1.push(this.invoices[c])
                }
                if(this.invoices[c].year==this.yearslist[1])
                {
                  this.year2.push(this.invoices[c])
                }
                if(this.invoices[c].year==this.yearslist[2])
                {
                  this.year3.push(this.invoices[c])
                }
                if(this.invoices[c].year==this.yearslist[4])
                {
                  this.year4.push(this.invoices[c])
                }
                if(this.invoices[c].year==this.yearslist[5])
                {
                  this.year5.push(this.invoices[c])
                }


              }

console.log("year1",this.year1)
console.log("year2",this.year2)
console.log("year3",this.year3)


              for (let h = 0; h < this.invoices.length; h++) {
                if (this.invoices[h].transport_fee > 0) {
                  this.tmparray_transport.push(this.invoices[h]);
                }
              }
              console.log("LENG",this.tmparray_transport.length)
              this.tmparray_transport.reverse();
              for (let a = 0; a < 4; a++) {
                if (this.tmparray_transport[a] != undefined) {
                  this.tmparray_transport_new.push(this.tmparray_transport[a]);
                }
                else{
                  this.tmparray_transport_new.push('nill');

                }
              }
              console.log('transport array', this.tmparray_transport_new);
            });

          this.collectionFlowService
            .getcollectionFlowsWithStudentId(this.student._id)
            .subscribe((data) => {
              this.collectionFlows = data;
              for (var i in this.collectionFlows) {
                if (this.collectionFlows[i].collectionType == 'BOOK') {
                  console.log('book', this.collectionFlows[i]);
                  this.tmparray_book.push(this.collectionFlows[i]);
                } else if (
                  this.collectionFlows[i].collectionType == 'CERTIFICATE'
                ) {
                  this.tmparray_certificate.push(this.collectionFlows[i]);
                }
              }
              this.tmparray_book.reverse();
              this.tmparray_certificate.reverse();

              for (let m = 0; m < 4; m++) {
                if (this.tmparray_book[m] != undefined) {
                  this.tmparray_book_new.push(this.tmparray_book[m]);
                }
                else{
                  this.tmparray_book_new.push('nill');

                }
              }
              console.log('bookarray', this.tmparray_book_new);
              for (let n = 0; n < 4; n++) {
                if (this.tmparray_certificate[n] != undefined) {
                  {
                    this.tmparray_certificate_new.push(
                      this.tmparray_certificate[n]
                    );
                  }
                }
                else{
                  this.tmparray_certificate_new.push('nill');

                }

              }
              if(this.tmparray_book_new.length>0)
              {
                this.statusofbookcollected=true;
              }
              if(this.tmparray_certificate_new.length>0)
              {
                this.statusofcertificatecollected=true;
              }
              if(this.tmparray_transport_new.length>0)
              {
                this.statusoftransportcollected=true;
              }

              console.log('certificatearray', this.tmparray_certificate_new.length);
            });
          if (this.student.studentDocuments.otherdocuments.length != 0) {
            this.otherstatus = true;
          } else {
            this.otherstatus = false;
          }
          if (this.student.studentDocuments.secondarycertificate) {
            // alert(this.student.studentDocuments.secondarycertificate)
            this.secondorystatus = true;
            // alert(this.student.studentDocuments.otherdocuments.length)
          } else {
            this.secondorystatus = false;
            // alert("No secondary certificate")
          }
          if (this.student.studentDocuments.highersecondarycertificate) {
            // alert(this.student.studentDocuments.secondarycertificate)
            this.highersecondorystatus = true;
            // alert(this.student.studentDocuments.otherdocuments.length)
          } else {
            this.highersecondorystatus = false;
            // alert("No secondary certificate")
          }
          if (this.student.studentDocuments.passportfrontpage) {
            // alert(this.student.studentDocuments.secondarycertificate)
            this.passportfrontpagestatus = true;
            // alert(this.student.studentDocuments.otherdocuments.length)
          } else {
            this.passportfrontpagestatus = false;
            // alert("No secondary certificate")
          }
          if (this.student.studentDocuments.passportbackpage) {
            // alert(this.student.studentDocuments.secondarycertificate)
            this.passportbackpagestatus = true;
            // alert(this.student.studentDocuments.otherdocuments.length)
          } else {
            this.passportbackpagestatus = false;
            // alert("No secondary certificate")
          }
          if (this.student.studentDocuments.emirateaid) {
            // alert(this.student.studentDocuments.secondarycertificate)
            this.emiratesidstatus = true;
            // alert(this.student.studentDocuments.otherdocuments.length)
          } else {
            this.emiratesidstatus = false;
            // alert("No secondary certificate")
          }
          if (this.student.studentDocuments.visapage) {
            // alert(this.student.studentDocuments.secondarycertificate)
            this.visapagestatus = true;
            // alert(this.student.studentDocuments.otherdocuments.length)
          } else {
            this.visapagestatus = false;
            // alert("No secondary certificate")
          }

          if (this.student.studentDocuments.secondarycertificate) {
            this.index =
              this.student.studentDocuments.secondarycertificate.lastIndexOf(
                '/'
              );
            this.secondary_name =
              this.student.studentDocuments.secondarycertificate.substring(
                this.index + 1
              );
          }
       


          //course subjects getting start
          console.log(this.student.courseID,"ccc id")
        


           //course subjects getting end


          //end
        }
      );


      }

      
      
 
    console.log('student ID' + this.student._id);
  }

  getDisabilityStatus(event) {
    this.student.disablitity_status = event.value;
  }

  name_of_image;
  secondary_name;
  getImageofstudentsecondarycertificate() {
    let pos =
      this.student.studentDocuments.secondarycertificate.lastIndexOf('.'); // get last position of `.`
    this.extension = this.student.studentDocuments.secondarycertificate.slice(
      pos + 1
    ); // extract extension ignoring `.`
    if (this.extension == 'pdf') {
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.secondarycertificate.lastIndexOf('/');
      this.name_pdf =
        this.student.studentDocuments.secondarycertificate.substring(
          this.index + 1
        );
    } else {
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.secondarycertificate.lastIndexOf('/');
      this.name_img =
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
    if (this.extension == 'pdf') {
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.highersecondarycertificate.lastIndexOf(
          '/'
        );
      this.name_pdf =
        this.student.studentDocuments.highersecondarycertificate.substring(
          this.index + 1
        );
      // alert(this.name_pdf)
    } else {
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.highersecondarycertificate.lastIndexOf(
          '/'
        );
      this.name_img =
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
    if (this.extension == 'pdf') {
      this.statusofextension = true;
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.passportfrontpage.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.passportfrontpage.substring(
        this.index + 1
      );
    } else {
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.passportfrontpage.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.passportfrontpage.substring(
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
    if (this.extension == 'pdf') {
      this.statusofextension = true;
      this.statusofextension = true;
      this.index =
        this.student.studentDocuments.passportbackpage.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.passportbackpage.substring(
        this.index + 1
      );
    } else {
      this.statusofextension = false;
      this.index =
        this.student.studentDocuments.passportbackpage.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.passportbackpage.substring(
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
    if (this.extension == 'pdf') {
      this.statusofextension = true;
      this.statusofextension = true;
      this.index = this.student.studentDocuments.visapage.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.visapage.substring(
        this.index + 1
      );
    } else {
      this.statusofextension = false;
      this.index = this.student.studentDocuments.visapage.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.visapage.substring(
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
    if (this.extension == 'pdf') {
      this.statusofextension = true;
      this.statusofextension = true;
      this.index = this.student.studentDocuments.emirateaid.lastIndexOf('/');
      this.name_pdf = this.student.studentDocuments.emirateaid.substring(
        this.index + 1
      );
    } else {
      this.statusofextension = false;
      this.index = this.student.studentDocuments.emirateaid.lastIndexOf('/');
      this.name_img = this.student.studentDocuments.emirateaid.substring(
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
    // alert('other'+ this.student.studentDocuments.otherdocuments);
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
        if (this.extension == 'pdf') {
          // alert(this.student.studentDocuments.otherdocuments[k])
          // this.pdfdocs.push(this.student.studentDocuments.otherdocuments[k])
          // console.log("pdf",this.pdfdocs)
          // let name=(this.student.studentDocuments.otherdocuments[k]).match(
          //   /[\w-]+\.(pdf)/g);

          this.index =
            this.student.studentDocuments.otherdocuments[k].lastIndexOf('/');
          let name = this.student.studentDocuments.otherdocuments[k].substring(
            this.index + 1
          );

          // alert(fileName)
          // console.log("name",name[0])
          let path = this.student.studentDocuments.otherdocuments[k];
          // this.imagename_path.push({name:name,path:path})

          this.pdfdocs.push({ name: name, path: path });
          console.log('pdf', this.pdfdocs);
        } else {
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
        }
        // alert("hi")
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
    // alert(imagepdf)
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
    // alert(imageimg)
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
    // alert(imageimg)
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
    // alert(imgname);
    // alert(this.student.studentDocuments.secondarycertificate);

    if (this.student.studentDocuments.secondarycertificate == imgname) {
      // alert(this.student.studentDocuments.secondarycertificate);
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
      // alert(this.student.studentDocuments.secondarycertificate);
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
      // alert(this.student.studentDocuments.secondarycertificate);
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
      // alert(this.student.studentDocuments.secondarycertificate);
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
      // alert(this.student.studentDocuments.secondarycertificate);
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
      // alert(this.student.studentDocuments.secondarycertificate);
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
    console.log(url,"view url")
    window.open(url, '_blank');
  }
  // onPersonalDetailsClick() {
  //   this.personalDetails = true;
  //   this.addressDetails = false;
  //   this.educationqualificationDetails = false;
  //   this.courseDetails = false;
  // }
  // onAddressDetailsClick() {
  //   this.personalDetails = false;
  //   this.addressDetails = true;
  //   this.educationqualificationDetails = false;
  //   this.courseDetails = false;
  // }
  // onEducationQualificationDetailsClick() {
  //   this.personalDetails = false;
  //   this.addressDetails = false;
  //   this.educationqualificationDetails = true;
  //   this.courseDetails = false;
  // }
  // onCourseDetailsClick() {
  //   this.personalDetails = false;
  //   this.addressDetails = false;
  //   this.educationqualificationDetails = false;
  //   this.courseDetails = true;
  // }
  //Personal details updation
  // onpersonalDetailsUpdate() {
  //   this.submitted = true;
  //   if (this.editpersonalDetailsForm.invalid) {
  //     return;
  //   }

  //   this.student.firstName = this.p.firstname.value;
  //   this.student.lastName = this.p.lastname.value;
  //   this.student.email = this.p.email.value;
  //   this.student.gender = this.p.gender.value;
  //   this.student.DOB = this.p.dob.value;
  //   this.student.contact = {
  //     mobilenumber: this.p.mobilenumber.value,
  //     residencenumber: this.p.residencenumber.value,
  //   };
  //   this.student.passportNumber = this.p.passportnumber.value;
  //   this.student.fatherName = this.p.fathername.value;
  //   this.student.motherName = this.p.mothername.value;
  //   console.log(this.student + 'Personal deta');
  //   this.studentService.editStudent(this.student).subscribe((data) => {
  //     this.personalDetails = false;
  //   });
  // }

  //Address details updation
  // onaddressDetailsUpdate() {
  //   this.student.address = {
  //     location: this.a.location.value,
  //     nationality: this.a.nationality.value,
  //     permanent_address: this.a.permanentaddress.value,
  //     temporary_address: this.a.temporaryaddress.value,
  //   };
  //   this.studentService.editStudent(this.student).subscribe((data) => {
  //     this.addressDetails = false;
  //   });
  // }

  //Education Qualification details updation
  // oneducationqualificationDetailsUpdate() {
  //   this.student.education_qualification = {
  //     last_Completed_Course: this.eq.lastcompletedcourse.value,
  //     university: this.eq.university.value,
  //     institute: this.eq.institute.value,
  //     passout_year: this.eq.passout_year.value,
  //   };
  //   this.studentService.editStudent(this.student).subscribe((data) => {
  //     this.educationqualificationDetails = false;
  //   });
  // }

  //Course details updation
  // oncourseDetailsUpdate() {
  //   this.coursesubmitted = true;
  //   if (this.editcourseDetailsForm.invalid) {
  //     return;
  //   }
  //   let tID = this.c.tallyID.value;

  //   if (tID.length > 0) {
  //     this.student.tally_ID = this.c.tallyID.value;
  //   } else {
  //     this.student.tally_ID = undefined;
  //   }
  //   let rID = this.c.university_register_number.value;
  //   if (rID.length > 0) {
  //     this.student.university_register_number =
  //       this.c.university_register_number.value;
  //   } else {
  //     this.student.university_register_number = undefined;
  //   }
  //   this.student.admission_Date = this.c.admissiondate.value;
   
  //   this.studentService.editStudentByTallyReg(this.student).subscribe(
  //     (data) => {
  //       this.courseDetails = false;
  //     },
  //     (error) => {
  //       console.log(error.error, '  kkk');

  //       this.toast.setMessage(error.error.message, 'danger');
  //     }
  //   );
  // }

  // cancelClick() {
  //   if (this.auth.isAdmin) {
  //     this.route.navigate(['candidate-management']);
  //   } else {
  //     this.route.navigate(['staff-candidate-management']);
  //   }
  // }
  preview: boolean = true;

  printDiv() {
    this.print();
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
  <html>
    <head>
      <style>
      body{  width: 99%;}
        label { font-weight: 400;
                font-size: 13px;
                padding: 2px;
                margin-bottom: 5px;
              }
        table, td, th {
               border: 1px solid silver;
                }
                table td {
               font-size: 13px;
                }

                 table th {
               font-size: 13px;
                }
          table {
                border-collapse: collapse;
                width: 98%;
                }
            th {
                height: 26px;
                }
      </style>
    </head>
<body onload="window.print();window.close()">${printContents}</body>
  </html>`);
    popupWin.document.close();
  }
 
}


