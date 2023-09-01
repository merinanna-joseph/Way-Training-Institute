import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {​​​​​​​​formatDate }​​​​​​​​ from'@angular/common';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { FeeflowService } from '../services/feeflow.service';
import { Feeflow } from '../shared/models/feeflow.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { CollectionflowService } from '../services/collectionflow.service';
import { Collectionflow } from '../shared/models/collectionflow.model';
import { COLLECTION_FLOW_TYPE } from '../../app/globals';
import { Invoice } from '../shared/models/invoice.model';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-candidate-singleview',
  templateUrl: './candidate-singleview.component.html',
  styleUrls: ['./candidate-singleview.component.css']
})
export class CandidateSingleviewComponent implements OnInit {

  name = '!!!';
  viewMode = 'tab1';
  submitted = false;
  transportCollectionFlow:Collectionflow = {};

  array_index;
  student:Student = {};
  closeStudent:Student = {};

  invoiced_student:Student = {};
  feeFlow:Feeflow = {};
  feeFlow_calc:Feeflow = {};
  allIntakeMonth = [];
  allIntakeYear = [];
  student_id;
  tenMonths = [];
  transportcollection_tmparray = [];

  currentDate = new Date();
  currentmonth_index;
  currentmonth;
  lastDayOfMonth :Date;
  firstDayOfMonth :Date;
  allYears = [];
  invoice : Invoice = {};
  invoiced_fee : Invoice = {};
  feecollection : Feeflow = {};
  transportcollection : Collectionflow = {};
  collection_flow_type = COLLECTION_FLOW_TYPE;
  transportation_required: boolean = false;
  transportation_already_exists: boolean = false;
  total_fees;
  total_fees_per_month;
  previous_year_arrear = 0;
  payment_mode: string[];

  feeFlow_collection_array = [];
  remitted_month;
  remitted_month_index;
  remitted_month_plus_one;
  last_paid_month;
  last_paid_month_index;

  remitted_year_plus_one;
  tenth_month;
  tenth_month_index;
  remitted_year;
  changed_year_index;
  miscellaneous_total = 0;
  transport_total = 0;
  total_paid_fees:number = 0;
  total_course_fees:number = 0;

  








    total_balance_fees:number = 0;
    total_fee_bind = 0;
    
    admiss_reg;
    admiss_coach;
    admiss_exam;
    admiss_conv;
    admiss_attes;
    admiss_equal;
    admiss_others;
    allMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    monthFullNames = [
      {
      value: 'JANUARY',
      },
      {
        value: 'FEBRUARY',
      },
      {
        value: "MARCH",
      },
      {
        value: "APRIL",
      },
      {
        value: "MAY",
      },
      {
        value: "JUNE",
      },
      {
        value: "JULY",
      },
      {
        value: "AUGUST",
      },
      {
        value: "SEPTEMBER",
      },
      {
        value: "OCTOBER",
      },
      {
        value: "NOVEMBER",
      },
      {
      value: "DECEMBER"
    },
    ];
    invoice_studentname = ' ';
    invoice_date:Date;
    invoice_address;
    invoice_contact;
    invoice_regno;
    invoice_tallyid;
    invoice_university;
    invoice_course;
    invoice_staff;

    checked_Transport_Month_list = [];
    checked_Transport_Month_List_edit = [];
    allMonthIndex = [];
    collectionFlow_transport_display :Collectionflow = {};
    collectionFlows = [];
    collectionFlow_transport_display_month_list = [];

    studentTotalDiscount = 0;
    studentTotalPaidBalance = 0;
    closingType = ['Course Completed','Transferred','Dropped Out'];
    admissionClosingType;
    admissionClosingYear;
    admissionClosingTransferdate;
    transfermonth_index;
    transfermonth;
    admissionClosingDropoutdate;
    dropoutmonth_index;
    dropoutmonth;
    admissionClosingDropoutConfirmdate;
    dropoutConfirmmonth_index;
    dropoutConfirmmonth;
    dropout_confirmYES;
    dropout_confirmNO;
    studentTotalBalance = 0;
    studentfee_peryear = [];
    individualYears = [];
    one_year_month = [];
    all_year_month = [];
    xyz = [];
    paidValidationTransport = [];
    closingAdmission:boolean = false;
    clicked:boolean = false;
  constructor(
              public auth:AuthService,
              private formBuilder: FormBuilder,
              private aRoute:ActivatedRoute,
              public route: Router,
              public studentService: StudentService,
              public courseService:CourseService,
              public feeflowService:FeeflowService,
              public toast: ToastComponent,
              public collectionFlowService:CollectionflowService,
              public invoiceService:InvoiceService,

  ) {
  }

  addCollectFeeForm: FormGroup = this.formBuilder.group({

    // fee_year: [''],
    remitted_date: ['',Validators.required],
    cooursetotalAmount: [''],
    remittedtotalAmount: [''],
    // registrationAmount: [0],
    // coachingAmount: [0],
    // examAmount: [0],
    // convocationAmount: [0],
    // attestationAmount: [0],
    // equalencyAmount: [0],
    // otherAmount:[0],
    miscellaneousAmount: [0],
    // transportAmount: [0],
    // previous_year_arrearAmount:[0],
    remarks: ['',Validators.required],
    payment_mode:['',Validators.required],
    // transportMonth:[''],
    balanceAmount:[0],
    totalAmount:[0],

  });
  closeAdmissionForm: FormGroup = this.formBuilder.group({

    // collectedOn: ['',Validators.required],
    year: [''],
    closingremark: [''],
    balanceAmount:[0],
    discountAmount:[0],
    closingType:[''],
    transfer_date:[''],
    drop_out_date:[''],
    drop_out_confirm_date:[''],
    drop_out_confirm:[''],

      });

  ngOnInit(): void {
    // alert("ngon")
    this.dropout_confirmNO = false;
    this.dropout_confirmYES = true;
    // this.lastDayOfMonth  = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0);
    // this.firstDayOfMonth = new Date(this.currentDate. getFullYear(), this.currentDate. getMonth(), 1);
    this.changed_year_index = 0;
    this.array_index = 0;
    this.payment_mode = ['Cash','Card','Wire Transfer','Others'];
    this.aRoute.paramMap.subscribe((params:ParamMap) =>
    {

      this.student_id = params.get('id');
      this.studentfee_peryear = [];
      //fee flow calculation
        this.feeflowService.getFeeflowsWithStudentId(this.student_id).subscribe(
          feeflows => {
            let size = 12;
            // console.log(feeflows,"   before")
            feeflows.reverse();
            // feeflows.sort((a, b) => new Date(b.lastPaidDate).getTime() - new Date(a.lastPaidDate).getTime());
            // console.log(feeflows,"   feeeflowsssssss")

            this.feeFlow = feeflows[0];
            // console.log(this.feeFlow,"   feeeflow")
            // let x = this.feeFlow.lastPaidDate;
            this.feeFlow_calc = feeflows[0];
            

            //   for(let j = 0;j<  this.feeFlow.studentId.studentFees.length;j++){

            //     this.allYears.push(this.feeFlow.studentId.studentFees[j].year)

            // }

            // transportation required
            // this.getTransportCollectionValues(this.allYears[this.array_index]);
            this.total_fees = this.feeFlow.total_fee;

            this.total_balance_fees = this.feeFlow.balance_fee;
            this.total_fee_bind = this.feeFlow.balance_fee;
            // this.feeFlow_collection_array.push(this.feeFlow.fee_per_year[this.changed_year_index]);
            // this.registration_form_bind = this.feeFlow_collection_array[this.array_index].registration_fee_balance;
            // this.coaching_form_bind = this.feeFlow_collection_array[this.array_index].coaching_fee_balance;
            // this.exam_form_bind = this.feeFlow_collection_array[this.array_index].exam_fee_balance;
            // this.convocation_form_bind = this.feeFlow_collection_array[this.array_index].convocation_balance;
            // this.attestation_form_bind = this.feeFlow_collection_array[this.array_index].attestation_balance;
            // this.equalency_form_bind = this.feeFlow_collection_array[this.array_index].equalency_balance;
            // this.others_form_bind = this.feeFlow_collection_array[this.array_index].other_balance;

            // this.previous_year_arrear_form_bind = this.feeFlow_collection_array[this.array_index].previous_year_arrear_balance;
            // this.previous_year_arrear_form_date_bind = this.feeFlow_collection_array[this.array_index].previous_year_arrear_paid_date;
            // this.getintakeMonthYear();
            // this.getTenMonths();

            this.invoice_studentname = this.feeFlow.studentId.firstName + " " + this.feeFlow.studentId.lastName;
            this.invoice_address = this.feeFlow.studentId.address.permanent_address;
            this.invoice_contact = this.feeFlow.studentId.contact.mobilenumber;
            this.invoice_regno = this.feeFlow.studentId.university_register_number;
            this.invoice_tallyid = this.feeFlow.studentId.tally_ID;
            this.invoice_university = this.feeFlow.studentId.studentCourse[0].boardOrUniversity;
            if(this.feeFlow.studentId.studentCourse[0].course_branch){
              this.invoice_course  = this.feeFlow.studentId.studentCourse[0].course_name + " - " + this.feeFlow.studentId.studentCourse[0].course_branch + " (" + this.feeFlow.studentId.studentCourse[0].course_type + ") ";
            }else{
              this.invoice_course  = this.feeFlow.studentId.studentCourse[0].course_name  + " (" + this.feeFlow.studentId.studentCourse[0].course_type + ") ";

            }
            this.invoice_staff = this.auth.currentUser.firstName + " " + this.auth.currentUser.lastName;
          },
          error => {

          }

        );




    }
  );



  }
  // getTransportCollectionValues(year){
  //   this.collectionFlowService.getcollectionFlowsWithStudentId(this.student_id).subscribe(
  //     data=>{
  //       this.collectionFlows = data;
  //       let tmparray = [];
  //       this.allMonthIndex = [];
  //       for(var i in this.collectionFlows){
  //         if(this.collectionFlows[i].collectionType == COLLECTION_FLOW_TYPE.transport && this.collectionFlows[i].year == year){
  //         tmparray.push(this.collectionFlows[i]);
  //         }
  //       }
  //       tmparray.reverse();
  //       this.xyz = [];
  //       this.paidValidationTransport = [];
  //       this.collectionFlow_transport_display = tmparray[0];
  //       if(this.collectionFlow_transport_display){
  //         this.collectionFlow_transport_display_month_list = this.collectionFlow_transport_display.month_list;
  //         for(let y = 0;y < this.collectionFlow_transport_display.month_list.length; y++){
  //           this.allMonthIndex.push(this.collectionFlow_transport_display.month_list[y].month);
  //           if(this.collectionFlow_transport_display.month_list[y].isRequired && this.collectionFlow_transport_display.month_list[y].isPaid){
  //             this.xyz.push(false);
  //             this.paidValidationTransport.push(false);

  //           }else if(this.collectionFlow_transport_display.month_list[y].isRequired || this.collectionFlow_transport_display.month_list[y].isPaid){
  //             this.xyz.push(true);
  //             this.paidValidationTransport.push(false);

  //           }else{
  //             this.xyz.push(false);
  //             this.paidValidationTransport.push(false);

  //           }

  //         }
  //         for(let x = 0; x < this.collectionFlow_transport_display.month_list.length; x++){
  //           if(this.collectionFlow_transport_display.month_list[x].isRequired){
  //             this.transportation_required = true;
  //             break;
  //           }else{
  //             this.transportation_required = false;
  //           }
  //                  }
  //       }


  //       this.transportCollectionFlow.month_list = this.collectionFlow_transport_display_month_list;

  //     });

  // }
  // onTransportMonthSelection(option, event) {

  //   for(let x = 0; x < this.collectionFlow_transport_display_month_list.length; x++){
  //     if(this.collectionFlow_transport_display.month_list[x].month == option){

  //       this.transportCollectionFlow.month_list[x].month = option;
  //       this.transportCollectionFlow.month_list[x].isRequired = this.collectionFlow_transport_display_month_list[x].isRequired;
  //       this.transportCollectionFlow.month_list[x].isPaid = event.target.checked;
  //       this.transportCollectionFlow.month_list[x].paid_fee = this.collectionFlow_transport_display_month_list[x].paid_fee;
  //       this.paidValidationTransport[x] = event.target.checked;

  //     }else{

  //       this.transportCollectionFlow.month_list[x].month = this.collectionFlow_transport_display_month_list[x].month;
  //       this.transportCollectionFlow.month_list[x].isRequired = this.collectionFlow_transport_display_month_list[x].isRequired;
  //       this.transportCollectionFlow.month_list[x].isPaid = this.collectionFlow_transport_display_month_list[x].isPaid;
  //       this.transportCollectionFlow.month_list[x].paid_fee = this.collectionFlow_transport_display_month_list[x].paid_fee;
  //       this.paidValidationTransport[x] = this.paidValidationTransport[x];

  //     }

  //     this.collectionFlow_transport_display_month_list = this.collectionFlow_transport_display.month_list;

  //   }



  // }
//   getintakeMonthYear(){
//     this.allIntakeYear = [];
//     this.allIntakeMonth = [];
//     this.individualYears = [];
//     this.all_year_month = [];
//     this.one_year_month = [];

//     let d = new Date(this.feeFlow.studentId.intake);
//     let y = new Date(this.feeFlow.studentId.intake);
//     for(var k in this.feeFlow.studentId.studentFees){

//       let year1 = y.getFullYear();
//       let mon = new Date(y.setMonth(y.getMonth() + 12));

//       let year2 = mon.getFullYear();
//       y = mon;
//       this.allIntakeYear[k] = year1 + "-" +year2;
//       if(!this.individualYears.includes(year1)){
//         this.individualYears.push(year1);
//       }
//       if(!this.individualYears.includes(year2)){
//         this.individualYears.push(year2);

//       }
//     }
//     let xmonth;
//     for(var m = 1; m <= 12; m++){
//       let month = d.getMonth() + m;
//       if(month > 12){

//         month = month - 12;
//         if(month.toString().length < 2){
//           xmonth = '0' + month.toString();
//           this.allIntakeMonth.push(xmonth);
//           this.tenMonths.push(Number(xmonth));
//         }else{
//           this.allIntakeMonth.push(month.toString());
//           this.tenMonths.push(Number(month));


//         }
//       }else{

//         if(month.toString().length < 2){
//           xmonth = '0' + month.toString();
//           this.allIntakeMonth.push(xmonth);
//           this.tenMonths.push(Number(xmonth));
//         }else{
//           this.allIntakeMonth.push(month.toString());
//           this.tenMonths.push(Number(month));

//         }
//       }

//     }
//     let ymonth;
//     let zyear;
//     for(var i=0; i<this.allIntakeYear.length;i++){
//       this.one_year_month = [];
//       if(i == this.allIntakeYear.length-1){
//         for(var m = 1; m <= 9; m++){

//           let month = d.getMonth() + m;
//           if(month > 12){
//             month = month - 12;
//             if(month.toString().length < 2){
//               ymonth = '0' + month.toString();
//               zyear = ymonth + '-' + this.individualYears[i+1];
//               this.one_year_month.push(zyear);
//             }else{
//               ymonth = month.toString();
//               zyear = ymonth + '-' + this.individualYears[i+1];
//               this.one_year_month.push(zyear);
//             }
//           }else{
//             if(month.toString().length < 2){
//               ymonth = '0' + month.toString();
//               zyear = ymonth + '-' + this.individualYears[i];
//               this.one_year_month.push(zyear);
//             }else{
//               ymonth = month.toString();
//               zyear = ymonth + '-' + this.individualYears[i];
//               this.one_year_month.push(zyear);

//             }
//           }
//         }
//         this.all_year_month.push(this.one_year_month);
//       }

//  console.log(this.one_year_month,"     allyear month")
//     }
//     for(let i = 0; i < this.allIntakeMonth.length; i++){
//       if(i == 9){
//         this.tenth_month = this.allIntakeMonth[i];
//         this.tenth_month_index = i;
//       }
//     }

//     let lmonth = new Date(this.feeFlow.lastPaidDate).getMonth()+1;
//     if(lmonth.toString().length < 2){
//       this.last_paid_month = '0' + lmonth.toString();
//     }
//     else{
//       this.last_paid_month = lmonth.toString();

//     }
//     for(var l in this.allIntakeMonth){
//       if(this.allIntakeMonth[l] == this.last_paid_month){
//         this.last_paid_month_index = l;
//       }

//     }
//   }

  // getTenMonths(){
  //   this.currentmonth = this.currentDate.getMonth() + 1;
  //   let curMonth;

  //   if(this.currentmonth.toString().length < 2){
  //     curMonth = '0' + this.currentmonth.toString();
  //     this.currentmonth = curMonth;
  //     this.transfermonth = curMonth;

  //   }else{
  //     this.currentmonth = curMonth;
  //     this.transfermonth = curMonth;

  //   }
  //   for(var q in this.allIntakeMonth){
  //     if(this.allIntakeMonth[q] == this.currentmonth){
  //       this.currentmonth_index = q;
  //       this.transfermonth_index = q;
  //     }

  //   }
  //   for(let x = 0; x <  (this.allIntakeMonth.length - 2); x++){
  //     if(x > this.currentmonth_index){
  //       this.coaching_fee_div_value += 1;

  //     }
  //   }
  //   this.total_paid_fees = 0;
  //   this.total_course_fees = 0;
  // }

  // onTableYearChange(event){
  //   for(var year in this.allYears){
  //     if(this.allYears[year] == event.value){
  //       this.changed_year_index = year;
  //       this.array_index = year;

  //     }
  //    }
  // }

 // fee collection
 get f() { return this.addCollectFeeForm.controls; }

  getCourseTotal(){

    this.total_fee_bind = this.feeFlow.balance_fee - Number(this.f.totalAmount.value);

    // this.registration_form_bind = this.feeFlow_collection_array[this.array_index].registration_fee_balance - Number(this.f.registrationAmount.value);
    // this.coaching_form_bind = this.feeFlow_collection_array[this.array_index].coaching_fee_balance - Number(this.f.coachingAmount.value);
    // this.exam_form_bind = this.feeFlow_collection_array[this.array_index].exam_fee_balance - Number(this.f.examAmount.value);
    // this.convocation_form_bind = this.feeFlow_collection_array[this.array_index].convocation_balance - Number(this.f.convocationAmount.value);
    // this.attestation_form_bind = this.feeFlow_collection_array[this.array_index].attestation_balance - Number(this.f.attestationAmount.value);
    // this.equalency_form_bind = this.feeFlow_collection_array[this.array_index].equalency_balance - Number(this.f.equalencyAmount.value);
    // this.others_form_bind = this.feeFlow_collection_array[this.array_index].other_balance - Number(this.f.otherAmount.value);





    this.total_course_fees = Number(this.f.totalAmount.value) ;
    // +
    // Number(this.f.coachingAmount.value) +
    // Number(this.f.examAmount.value) +
    // Number(this.f.convocationAmount.value) +
    // Number(this.f.attestationAmount.value) +
    // Number(this.f.equalencyAmount.value) +
    // Number(this.f.otherAmount.value);

    this.getBalanceTotal();
    this.getRemittedTotal();
this.feecollection.balance_fee = this.total_fee_bind;
this.feecollection.paid_fee = this.total_course_fees;
  }
  getRemittedTotal(){
    // this.previous_year_arrear_form_bind = this.feeFlow_collection_array[this.array_index].previous_year_arrear_balance - Number(this.f.previous_year_arrearAmount.value);
    this.total_paid_fees = this.total_course_fees +
    Number(this.f.miscellaneousAmount.value) 
    // + Number(this.f.transportAmount.value) + Number(this.f.previous_year_arrearAmount.value)
    ;
   
  }
//  onYearChange(event){
//   this.feeFlow_collection_array = [];

//   this.array_index = 0;
//   this.admissionClosingYear = event.value;

//    for(var j in this.allYears){
//     if(this.allYears[j] == event.value){
//       this.changed_year_index = j;
//       this.array_index = 0;

//     }
//    }

//   //  for(var i=0;i<  this.feeFlow.fee_per_year.length;i++){
//   //    if(i == this.changed_year_index){
//   //     this.total_fees_per_year = this.feeFlow.fee_per_year[i].total_fee + this.feeFlow.fee_per_year[i].previous_year_arrear;
//   //     this.total_balance_fees_per_year = this.feeFlow.fee_per_year[i].balance_fee + this.feeFlow.fee_per_year[i].previous_year_arrear_balance;
//   //     }
//   //  }

//   //  this.feeFlow_collection_array.push(this.feeFlow.fee_per_year[this.changed_year_index]);
//   this.course_fee_bind = 
//    this.registration_form_bind = this.feeFlow_collection_array[this.array_index].registration_fee_balance;
//    this.coaching_form_bind = this.feeFlow_collection_array[this.array_index].coaching_fee_balance;
//    this.exam_form_bind = this.feeFlow_collection_array[this.array_index].exam_fee_balance;
//    this.convocation_form_bind = this.feeFlow_collection_array[this.array_index].convocation_balance;
//    this.attestation_form_bind = this.feeFlow_collection_array[this.array_index].attestation_balance;
//    this.equalency_form_bind = this.feeFlow_collection_array[this.array_index].equalency_balance;
//    this.others_form_bind = this.feeFlow_collection_array[this.array_index].other_balance;

//    this.previous_year_arrear_form_bind = this.feeFlow_collection_array[this.array_index].previous_year_arrear_balance;
//    this.previous_year_arrear_form_date_bind = this.feeFlow_collection_array[this.array_index].previous_year_arrear_paid_date;
//    this.getintakeMonthYear();
//    this.getTenMonths();

//    if(this.admissionClosingType){
//    this.onClosingTypeChange();
//    }
//  }
 getPaymentMode(event){
       this.feecollection.paymentMode = this.f.payment_mode.value;
       this.invoice.paymentMode = this.f.payment_mode.value;

 }
 onFeeCollectSave(){

  this.submitted = true;
  if(!this.dropout_confirmNO){
    if (this.addCollectFeeForm.invalid) {
      
      document.getElementById('admissioncloseModalCloseBtn').click();
      this.clicked = false;
      
      return;
      
    }
  }

  // fee exceeds toast alert start this.f.fee_year.value
  // for(var i=0;i<  this.allYears.length;i++){
  //   if(this.allYears[i] == this.f.fee_year.value){
  //     for(var c=0; c <  i; c++){
  //       if(this.feeFlow.balance_fee > 0){
  //         this.changed_year_index = c;
  //         this.array_index = 0;
  //         this.clicked = false;
  //         document.getElementById('admissioncloseModalCloseBtn').click();
  //         this.toast.setMessage("Previous year fees not paid !!!", "danger");
  //         return;
          
  //       }
  //     }
  //   }
  // }
  // if transport paid is ticked alert

    // if(this.paidValidationTransport.includes(true) && this.f.transportAmount.value <= 0){
    //   this.clicked = false;
    //   document.getElementById('admissioncloseModalCloseBtn').click();
    //   this.toast.setMessage("Pay if transportation is checked !!!", "danger");
    //   return;
    // }

 // total remitted fees < 0
 if(this.admissionClosingType == 'Dropped Out'){
// alert("drop")
    if(this.cA.drop_out_date.value.length <= 0 || this.cA.drop_out_confirm_date.value.length <= 0
       || this.cA.closingremark.value.length <= 0){
        this.clicked = false;
        document.getElementById('admissioncloseModalCloseBtn').click();
        this.toast.setMessage("Enter droping date and remarks !!!", "danger");
        return;
    }
    this.getCourseTotal();
    // alert(this.studentTotalDiscount)
    this.clicked = false;
    document.getElementById('admissioncloseModalCloseBtn').click();
    // if(this.studentTotalDiscount != 0){
    //   if(this.f.remittedtotalAmount.value  <= 0 && this.dropout_confirmYES){
    //     this.clicked = false;
    //     document.getElementById('admissioncloseModalCloseBtn').click();
    //     this.toast.setMessage("Cannot pay without amount !!!", "danger");
    //     return;
    //   }
    // }
   
  }else if(this.admissionClosingType == 'Transferred'){
    if(this.cA.transfer_date.value.length <= 0 || this.cA.closingremark.value.length <= 0){
      this.clicked = false;
       document.getElementById('admissioncloseModalCloseBtn').click();
       this.toast.setMessage("Enter transfer date and remarks !!!", "danger");
       return;
   }
   this.getCourseTotal();
  //  alert(this.studentTotalDiscount)
   this.clicked = false;
   document.getElementById('admissioncloseModalCloseBtn').click();
  //  if(this.studentTotalDiscount != 0){
  //   alert("yes")
  //   if(this.f.remittedtotalAmount.value  <= 0){
  //     this.clicked = false;
  //     document.getElementById('admissioncloseModalCloseBtn').click();
  //     this.toast.setMessage("Cannot pay without amount !!!", "danger");
  //     return;
  //   }
  //         }
    
  }else if(this.admissionClosingType != 'Course Completed'){
    
      if(this.f.remittedtotalAmount.value  <= 0){
        // alert("nthing")
        this.clicked = false;
        // alert(this.clicked)
        document.getElementById('admissioncloseModalCloseBtn').click();
        this.toast.setMessage("Cannot pay without amount !!!", "danger");
        return;
      }

  }
  if(Number(this.f.totalAmount.value) > this.feeFlow.balance_fee){

    this.clicked = false;
    
    document.getElementById('admissioncloseModalCloseBtn').click();
    this.toast.setMessage("Fee exceeds the limit !!!", "danger");
    return;
  }
  // if(Number(this.f.registrationAmount.value) > this.feeFlow_collection_array[this.array_index].registration_fee_balance){

  //   this.clicked = false;
    
  //   document.getElementById('admissioncloseModalCloseBtn').click();
  //   this.toast.setMessage("Registration fee exceeds the limit !!!", "danger");
  //   return;
  // }
  // if(Number(this.f.coachingAmount.value) > this.feeFlow_collection_array[this.array_index].coaching_fee_balance){
  //   this.clicked = false;
  //   document.getElementById('admissioncloseModalCloseBtn').click();
  //   this.toast.setMessage("Coaching fee exceeds the limit !!!", "danger");
  //   return;
  // }
  // if(Number(this.f.examAmount.value) > this.feeFlow_collection_array[this.array_index].exam_fee_balance){
  //   this.clicked = false;
  //   document.getElementById('admissioncloseModalCloseBtn').click();
  //   this.toast.setMessage("Exam fee exceeds the limit !!!", "danger");
  //   return;
  // }
  // if(Number(this.f.convocationAmount.value) > this.feeFlow_collection_array[this.array_index].convocation_balance){
  //   this.clicked = false;
  //   document.getElementById('admissioncloseModalCloseBtn').click();
  //   this.toast.setMessage("Convocation fee exceeds the limit !!!", "danger");
  //   return;
  // }
  // if(Number(this.f.attestationAmount.value) > this.feeFlow_collection_array[this.array_index].attestation_balance){
  //   this.clicked = false;
  //   document.getElementById('admissioncloseModalCloseBtn').click();
  //   this.toast.setMessage("Attestation fee exceeds the limit !!!", "danger");
  //   return;
  // }
  // if(Number(this.f.equalencyAmount.value) > this.feeFlow_collection_array[this.array_index].equalency_balance){
  //   this.clicked = false;
  //   document.getElementById('admissioncloseModalCloseBtn').click();
  //   this.toast.setMessage("Equalency fee exceeds the limit !!!", "danger");
  //   return;
  // }
  // if(Number(this.f.otherAmount.value) > this.feeFlow_collection_array[this.array_index].other_balance){
  //   this.clicked = false;
  //   document.getElementById('admissioncloseModalCloseBtn').click();
  //   this.toast.setMessage("Other fee exceeds the limit !!!", "danger");
  //   return;
  // }

    // fee exceeds toast alert end

  //  this.remitted_year = this.f.fee_year.value;
   let remitted_year_month;
  //  for(let n = 0; n < this.allIntakeYear.length; n++){
  //   if(this.allIntakeYear[n] == this.remitted_year){
  //     this.remitted_year_plus_one = this.allIntakeYear[n+1];
  //   }
  //  }
   let remitted_date = new Date(this.f.remitted_date.value);
   let month = remitted_date.getMonth() + 1;
   let year = remitted_date.getFullYear();
   let month_plus_one = remitted_date.getMonth() + 2;
   let remitted_year;
   let remitted_month_index;
    if(month.toString().length < 2){
      this.remitted_month = '0' + month.toString();
      remitted_year_month = this.remitted_month + "-" + year;
      remitted_year = year;
    }
    else{
      this.remitted_month = month.toString();
      remitted_year_month = this.remitted_month + "-" + year;
      remitted_year = year;

    }


    if(this.admissionClosingType){
      let last_year = this.admissionClosingYear.split('-', 3);
      for(var q=0;q< this.all_year_month.length;q++){
        if(remitted_year_month == this.all_year_month[q]){
          remitted_month_index = q;
        }else if(remitted_year >= last_year[1]){
          remitted_month_index = 11;
        }else{
          remitted_month_index = 0;

        }

      }
      if(this.admissionClosingType == 'Course Completed'){
        for(let i=0; i< this.allIntakeYear.length;i++){
          let len = this.allIntakeYear.length;
          console.log(remitted_year ," in bet  ",last_year[1],"   nmn  ",remitted_year_month,"  mmm  ", this.one_year_month.indexOf(remitted_year_month))
          if((this.admissionClosingYear == this.allIntakeYear[len-1]) && this.one_year_month.indexOf(remitted_year_month) == -1 && remitted_year >= last_year[1]){
            console.log("can close")
            // this.getCourseTotal();
          }
          else{
            this.clicked = false;
            document.getElementById('admissioncloseModalCloseBtn').click();
            this.toast.setMessage(" Cannot pay and close since course is not completed !!!", "danger");
           return;
          }
        }
      }

    }

    if(month_plus_one.toString().length < 2){
      this.remitted_month_plus_one = '0' + month_plus_one.toString();
    }else{
      this.remitted_month_plus_one = month_plus_one.toString();

    }

    for(var p in this.allIntakeMonth){
      if(this.allIntakeMonth[p] == this.remitted_month){
        this.remitted_month_index = p;
      }

    }

      // this.feecollection.fee_per_year = [];


  // for(var j in this.allYears){
  //   if(this.changed_year_index == j){
  //     this.total_paid_fees_peryear = this.feeFlow.fee_per_year[j].paid_fee + Number(this.f.registrationAmount.value) + Number(this.f.coachingAmount.value) +
  //     Number(this.f.examAmount.value) + Number(this.f.convocationAmount.value) + Number(this.f.attestationAmount.value) +
  //     Number(this.f.equalencyAmount.value) + Number(this.f.otherAmount.value);
  //     this.previous_year_arrear = this.feeFlow.fee_per_year[j].total_fee - this.total_paid_fees_peryear;
  //     if(Number(this.f.registrationAmount.value) >= 0){
  //       this.registration_fee_arrears = Number(this.feeFlow.fee_per_year[j].registration_fee_balance) - Number(this.f.registrationAmount.value);
  //       this.registration_fee_paid_date = this.f.remitted_date.value;
  //       this.registration_fee_balance = this.feeFlow.fee_per_year[j].registration_fee_total - Number(this.f.registrationAmount.value);
  //       this.registration_fee_total = this.feeFlow.fee_per_year[j].registration_fee_total;
  //     }

  //     if(Number(this.f.coachingAmount.value) > 0){
  //       this.coaching_fee_arrears = Number(this.feeFlow.fee_per_year[j].coaching_fee_balance) - Number(this.f.coachingAmount.value);
  //       this.coaching_fee_paid = this.coaching_fee_arrears / (this.coaching_fee_div_value);
  //       this.coaching_fee_paid_date = this.f.remitted_date.value;
  //       this.coaching_fee_balance = this.feeFlow.fee_per_year[j].coaching_fee_total - Number(this.f.coachingAmount.value);
  //       this.coaching_fee_total = this.feeFlow.fee_per_year[j].coaching_fee_total;
  //     }else if((this.f.coachingAmount.value) == 0){
  //       this.coaching_fee_arrears = Number(this.feeFlow.fee_per_year[j].coaching_fee_balance) - Number(this.f.coachingAmount.value);
  //       this.coaching_fee_paid = this.coaching_fee_arrears / (this.coaching_fee_div_value);
  //       this.coaching_fee_paid_date = this.f.remitted_date.value;
  //       this.coaching_fee_balance = this.feeFlow.fee_per_year[j].coaching_fee_total - Number(this.f.coachingAmount.value);
  //       this.coaching_fee_total = this.feeFlow.fee_per_year[j].coaching_fee_total;
  //     }

  //     if(Number(this.f.examAmount.value) >= 0){
  //       this.exam_fee_arrears = Number(this.feeFlow.fee_per_year[j].exam_fee_balance) - Number(this.f.examAmount.value);
  //       this.exam_fee_paid_date = this.f.remitted_date.value;
  //       this.exam_fee_balance = this.feeFlow.fee_per_year[j].exam_fee_total - Number(this.f.examAmount.value);
  //       this.exam_fee_total = this.feeFlow.fee_per_year[j].exam_fee_total;

  //     }

  //     // if(Number(this.f.convocationAmount.value) >= 0){
  //     //    this.convocation_fee_arrears = Number(this.feeFlow.fee_per_year[j].convocation_balance) - Number(this.f.convocationAmount.value);
  //     //    this.convocation_fee_paid_date = this.f.remitted_date.value;
  //     //    this.convocation_balance = this.feeFlow.fee_per_year[j].convocation_fee_total - Number(this.f.convocationAmount.value);
  //     //    this.convocation_fee_total = this.feeFlow.fee_per_year[j].convocation_fee_total;
  //     // }

  //     // if(Number(this.f.attestationAmount.value) >= 0){
  //     //   this.attestation_fee_arrears = Number(this.feeFlow.fee_per_year[j].attestation_balance) - Number(this.f.attestationAmount.value);
  //     //   this.attestation_fee_paid_date = this.f.remitted_date.value;
  //     //   this.attestation_balance = this.feeFlow.fee_per_year[j].attestation_fee_total - Number(this.f.attestationAmount.value);
  //     //   this.attestation_fee_total = this.feeFlow.fee_per_year[j].attestation_fee_total;
  //     // }

  //     // if(Number(this.f.equalencyAmount.value) >= 0){
  //     //   this.equalency_fee_arrears = Number(this.feeFlow.fee_per_year[j].equalency_balance) - Number(this.f.equalencyAmount.value);
  //     //   this.equalency_fee_paid_date = this.f.remitted_date.value;
  //     //   this.equalency_balance = this.feeFlow.fee_per_year[j].equalency_fee_total - Number(this.f.equalencyAmount.value);
  //     //   this.equalency_fee_total = this.feeFlow.fee_per_year[j].equalency_fee_total;
  //     // }

  //     // if(Number(this.f.otherAmount.value) >= 0){
  //     //   this.other_fee_arrears = Number(this.feeFlow.fee_per_year[j].other_balance) - Number(this.f.otherAmount.value);
  //     //   this.other_fee_paid_date = this.f.remitted_date.value;
  //     //   this.other_balance = this.feeFlow.fee_per_year[j].other_fee_total - Number(this.f.otherAmount.value);
  //     //   this.other_fee_total = this.feeFlow.fee_per_year[j].other_fee_total;
  //     // }
  //     // if(Number(this.f.miscellaneousAmount.value) >= 0){
  //     //   this.miscellaneous_total = this.feeFlow.fee_per_year[j].miscellaneous_fees_total + Number(this.f.miscellaneousAmount.value);
  //     // }
  //     // if(Number(this.f.transportAmount.value) >= 0){
  //     //   this.transport_total = this.feeFlow.fee_per_year[j].transport_fees_total + Number(this.f.transportAmount.value);
  //     // }

     
  //     this.feecollection.fee_per_year.push(
  //       {
  //         year : this.feeFlow.fee_per_year[j].year,
  //         total_fee : this.feeFlow.fee_per_year[j].total_fee,
  //         balance_fee : this.feeFlow.fee_per_year[j].total_fee - this.total_paid_fees_peryear,
  //         paid_fee : this.total_paid_fees_peryear,
  //         registration_fee_total : this.feeFlow.fee_per_year[j].registration_fee_total,
  //         coaching_fee_total  : this.feeFlow.fee_per_year[j].coaching_fee_total,
  //         exam_fee_total : this.feeFlow.fee_per_year[j].exam_fee_total,
  //         convocation_fee_total: this.feeFlow.fee_per_year[j].convocation_fee_total,
  //         attestation_fee_total: this.feeFlow.fee_per_year[j].attestation_fee_total,
  //         equalency_fee_total: this.feeFlow.fee_per_year[j].equalency_fee_total,
  //         other_fee_total: this.feeFlow.fee_per_year[j].other_fee_total,

  //         registration_fee_balance : this.registration_fee_arrears,
  //         coaching_fee_balance  : this.coaching_fee_arrears,
  //         exam_fee_balance : this.exam_fee_arrears,
  //         convocation_balance: this.convocation_fee_arrears,
  //         attestation_balance: this.attestation_fee_arrears,
  //         equalency_balance: this.equalency_fee_arrears,
  //         other_balance: this.other_fee_arrears,
  //         miscellaneous_fees_total: this.miscellaneous_total,
  //         miscellaneous_fees_paid_date: this.f.remitted_date.value,
  //         transport_fees_total: this.transport_total,
  //         transport_fees_paid_date: this.f.remitted_date.value,
  //         previous_year_arrear: this.feeFlow.fee_per_year[j].previous_year_arrear,
  //         previous_year_arrear_balance: this.feeFlow.fee_per_year[j].previous_year_arrear - this.previous_year_arrear_total,
  //         previous_year_arrear_paid: this.previous_year_arrear_total,
  //         previous_year_arrear_paid_date: this.f.remitted_date.value,
  //       }
  //       );
  //   }else{

  //     this.feecollection.fee_per_year.push(
  //       {
  //         year : this.feeFlow.fee_per_year[j].year,
  //         total_fee : this.feeFlow.fee_per_year[j].total_fee,
  //         balance_fee : this.feeFlow.fee_per_year[j].balance_fee,
  //         paid_fee : this.feeFlow.fee_per_year[j].paid_fee,
  //         registration_fee_total : this.feeFlow.fee_per_year[j].registration_fee_total,
  //         coaching_fee_total  : this.feeFlow.fee_per_year[j].coaching_fee_total,
  //         exam_fee_total : this.feeFlow.fee_per_year[j].exam_fee_total,
  //         convocation_fee_total: this.feeFlow.fee_per_year[j].convocation_fee_total,
  //         attestation_fee_total: this.feeFlow.fee_per_year[j].attestation_fee_total,
  //         equalency_fee_total: this.feeFlow.fee_per_year[j].equalency_fee_total,
  //         other_fee_total: this.feeFlow.fee_per_year[j].other_fee_total,

  //         registration_fee_balance : this.feeFlow.fee_per_year[j].registration_fee_balance,
  //         coaching_fee_balance  : this.feeFlow.fee_per_year[j].coaching_fee_balance,
  //         exam_fee_balance : this.feeFlow.fee_per_year[j].exam_fee_balance,
  //         convocation_balance: this.feeFlow.fee_per_year[j].convocation_balance,
  //         attestation_balance: this.feeFlow.fee_per_year[j].attestation_balance,
  //         equalency_balance: this.feeFlow.fee_per_year[j].equalency_balance,
  //         other_balance: this.feeFlow.fee_per_year[j].other_balance,
  //         miscellaneous_fees_total: this.feeFlow.fee_per_year[j].miscellaneous_fees_total,
  //         miscellaneous_fees_paid_date: this.feeFlow.fee_per_year[j].miscellaneous_fees_paid_date,
  //         transport_fees_total: this.feeFlow.fee_per_year[j].transport_fees_total,
  //         transport_fees_paid_date: this.feeFlow.fee_per_year[j].transport_fees_paid_date,
  //         previous_year_arrear: this.feeFlow.fee_per_year[j].previous_year_arrear,
  //         previous_year_arrear_balance: this.feeFlow.fee_per_year[j].previous_year_arrear_balance,
  //         previous_year_arrear_paid: this.feeFlow.fee_per_year[j].previous_year_arrear_paid,
  //         previous_year_arrear_paid_date: this.feeFlow.fee_per_year[j].previous_year_arrear_paid_date,

  //       }
  //       );
     

  //   }
  //   // end of outer if
  // }
  // end of main for
  //per year fee calculation


  //invoice add
  //  this.invoice.year = this.f.fee_year.value;
   this.invoice.studentId = this.student_id;
   this.invoice.remarks = this.f.remarks.value;
   this.invoice.remittedDate = this.f.remitted_date.value;
  //  this.invoice.registration_fee = Number(this.f.registrationAmount.value);
  //  this.invoice.registration_fee = Number(this.f.registrationAmount.value);
  //  this.invoice.coaching_fee = Number(this.f.coachingAmount.value);
  //  this.invoice.exam_fee = Number(this.f.examAmount.value);
  //  this.invoice.convocation_fee = Number(this.f.convocationAmount.value);
  //  this.invoice.attestation_fee = Number(this.f.attestationAmount.value);
  //  this.invoice.equalency_fee = Number(this.f.equalencyAmount.value);
  //  this.invoice.other_fee = Number(this.f.otherAmount.value);
   this.invoice.miscellaneous_fee = Number(this.f.miscellaneousAmount.value);
  //  this.invoice.transport_fee = Number(this.f.transportAmount.value);
  //  this.invoice.previousyear_arrear = Number(this.f.previous_year_arrearAmount.value);
   this.invoice.total_course_fee = Number(this.f.cooursetotalAmount.value);
   this.invoice.total_remitted_fee = Number(this.f.remittedtotalAmount.value);
   this.invoice.total_fee = this.feeFlow.total_fee;
       this.invoice.balance_fee =  this.feecollection.balance_fee;
   //   
  //  for(var j in this.allYears){
  //    if(this.invoice.year == this.allYears[j]){
  //     this.invoice.total_fee_per_year = this.feeFlow.fee_per_year[j].total_fee;
  //     this.invoice.balance_fee_per_year =  this.feeFlow.fee_per_year[j].total_fee - this.total_paid_fees_peryear;
  //    }
  //  }
  //  this.invoice.balance_fee_per_year =  total_fee : this.feeFlow.fee_per_year[j].total_fee,
          // balance_fee : this.feeFlow.fee_per_year[j].balance_fee,
          this.feecollection.total_fee = this.feeFlow.total_fee;
console.log(this.invoice,this.feecollection,"meri")

   this.invoiceService.addInvoice(this.invoice).subscribe(
    data =>{

          this.invoiced_fee  = data;

    }
   );
  //  this.transportCollectionFlow.year = this.f.fee_year.value;
    this.transportCollectionFlow.isTransportationNeeded = this.collectionFlow_transport_display.isTransportationNeeded;
    this.transportCollectionFlow.collectionType = COLLECTION_FLOW_TYPE.transport;
    this.transportCollectionFlow.collectedOn = this.f.remitted_date.value;
    this.transportCollectionFlow.studentId = this.student_id;
    this.collectionFlowService.addcollectionFlow(this.transportCollectionFlow).subscribe(
      data=>{

      }
    );
   this.feecollection.remarks = this.f.remarks.value;
   this.feecollection.studentId = this.student_id;
   this.feecollection.ispaid = true;
   this.feecollection.lastPaidDate = this.f.remitted_date.value;
  // student close start
  if(this.closingAdmission){
    if(this.admissionClosingType == 'Transferred'){
      this.closeStudent.transferredOn = this.admissionClosingTransferdate;

    }else if(this.admissionClosingType == 'Dropped Out'){
      this.closeStudent.dropedoutOn = this.admissionClosingDropoutdate;
      this.closeStudent.dropedoutconfirmOn = this.admissionClosingDropoutConfirmdate

    }

    this.closeStudent._id = this.student_id;
    this.closeStudent.closingOn = this.f.remitted_date.value;
    this.closeStudent.balance_amount_to_pay = this.studentTotalDiscount;
    this.closeStudent.closingType = this.admissionClosingType;
    this.closeStudent.closingRemark = this.cA.closingremark.value;
    if(this.closeStudent._id){
      this.studentService.editStudent(this.closeStudent).subscribe(
        data =>{

          document.getElementById('admissioncloseModalCloseBtn').click();

        }
      );
    }

  }

         // student close end
   this.feeflowService.addFeeflow(this.feecollection).subscribe(
     data =>{
      if(!this.dropout_confirmNO){
        this.print();

      }
      if(this.auth.isAdmin){
        document.getElementById('admissioncloseModalCloseBtn').click();
        if(this.admissionClosingType == 'Course Completed'){
          if(this.studentTotalDiscount == 0){
            this.toast.setMessage("Candidate's course completed !!!", "success",'candidate-management');
          }else{
            this.clicked = false;
            this.reload();
            this.toast.setMessage("Candidate's course completed and fees collected!!!", "success");
            // this.route.navigate(['candidate-singleview/' + this.student_id]);
          }
          
        }else if(this.admissionClosingType == 'Transferred'){
          // alert("trans")
          if(this.studentTotalDiscount == 0){
            this.toast.setMessage("Candidate transferred successfully !!!", "success",'candidate-management');

          }else if(this.studentTotalDiscount != 0 && this.f.remittedtotalAmount.value  == 0){
            // alert("yes")
            this.toast.setMessage("Candidate transferred successfully without fee collection!!!", "success",'candidate-management');

          }else if(this.studentTotalDiscount != 0 && this.f.remittedtotalAmount.value  != 0){
            this.clicked = false;
            this.reload();
            this.toast.setMessage("Candidate transferred successfully and fee collected!!!", "success");
            // this.route.navigate(['candidate-singleview/' + this.student_id]);

          }
        }else if(this.admissionClosingType == 'Dropped Out'){
          if(this.studentTotalDiscount != 0 && this.dropout_confirmYES){
            this.clicked = false;
            this.reload();
            this.toast.setMessage("Candidate dropped out and fees collected!!!", "success");
            // this.route.navigate(['candidate-singleview/' + this.student_id]);

          }else{
            
            this.toast.setMessage("Candidate dropped out !!!", "success",'candidate-management');

          }
        }else{
   

          this.clicked = false;
          this.reload();
          this.toast.setMessage("Fees collected !!!", "success");
          

        }
       

        }else{
          document.getElementById('admissioncloseModalCloseBtn').click();
          if(this.admissionClosingType == 'Course Completed'){
            if(this.studentTotalDiscount == 0){
              this.toast.setMessage("Candidate's course completed !!!", "success",'staff-candidate-management');
            }else{
              this.clicked = false;
              this.reload();
              this.toast.setMessage("Candidate's course completed and fees collected!!!", "success");
              // this.route.navigate(['staff-candidate-singleview/' + this.student_id]);
            }
            
          }else if(this.admissionClosingType == 'Transferred'){
            if(this.studentTotalDiscount == 0){
              this.toast.setMessage("Candidate transferred successfully !!!", "success",'staff-candidate-management');
  
            }else if(this.studentTotalDiscount != 0 && this.f.remittedtotalAmount.value  == 0){
              // alert("yes")
              this.toast.setMessage("Candidate transferred successfully without fee collection!!!", "success",'staff-candidate-management');
  
            }else if(this.studentTotalDiscount != 0 && this.f.remittedtotalAmount.value  != 0){
              this.clicked = false;
              this.reload();
              this.toast.setMessage("Candidate transferred successfully and fee collected!!!", "success");
              // this.route.navigate(['staff-candidate-singleview/' + this.student_id]);
  
            }
          }else if(this.admissionClosingType == 'Dropped Out'){
            if(this.studentTotalDiscount != 0 && this.dropout_confirmYES){
              this.clicked = false;
              this.reload();
              this.toast.setMessage("Candidate dropped out and fees collected!!!", "success");
              // this.route.navigate(['staff-candidate-singleview/' + this.student_id]);
  
            }else{
              this.toast.setMessage("Candidate dropped out !!!", "success",'staff-candidate-management');
  
            }
          }else{
            // alert("else sels")
            this.clicked = false;
            this.reload();
            this.toast.setMessage("Fees collected !!!", "success");
            // this.route.navigate(['staff-candidate-singleview/' + this.student_id]);
  
          }

        }


     }
   );


 }
 reload() {
  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  this.route.onSameUrlNavigation = 'reload';
  this.route.navigate(['./'], { relativeTo: this.aRoute });
}
 print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <style>
        // #trid{
        //   background-color:yellow !important;
        // }
        // tr {
        //   background-color: aqua;
        // }
        //........Customized style.......
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
}


onCancelClick(){
  if(this.auth.isAdmin){
  this.route.navigate(['candidate-management']);
  }else{
    this.route.navigate(['staff-candidate-management']);

  }
}
transportneeded(event){
  if(event.target.checked){
    this.transportation_required = event.target.checked;
    this.transportCollectionFlow.isTransportationNeeded = event.target.checked;

  }
}

get cA() { return this.closeAdmissionForm.controls; }


  onClosingTypeChange(){

    this.closingAdmission = true;
    this.admissionClosingType = this.cA.closingType.value;
    // this.admissionClosingYear = this.f.fee_year.value

    if(this.admissionClosingType == 'Course Completed'){
      // alert("from dropdwn")
    let remitted_date = new Date(this.f.remitted_date.value);
    let month = remitted_date.getMonth() + 1;
    if(month.toString().length < 2){
      this.remitted_month = '0' + month.toString();
    }
    else{
      this.remitted_month = month.toString();
    }
      for(var p in this.allIntakeMonth){
        if(this.allIntakeMonth[p] == this.remitted_month){
          this.remitted_month_index = p;
        }

      }
      this.remitted_year = this.f.fee_year.value;
      for(let n = 0; n < this.allIntakeYear.length; n++){
       if(this.allIntakeYear[n] == this.remitted_year){
         this.remitted_year_plus_one = this.allIntakeYear[n+1];
       }
      }
      let year = remitted_date.getFullYear();
      let month_plus_one = remitted_date.getMonth() + 2;
      let remitted_year;
      let remitted_month_index;
      let remitted_year_month;
      let last_year = this.admissionClosingYear.split('-', 3);
      if(month.toString().length < 2){
        this.remitted_month = '0' + month.toString();
        remitted_year_month = this.remitted_month + "-" + year;
        remitted_year = year;
      }
      else{
        this.remitted_month = month.toString();
        remitted_year_month = this.remitted_month + "-" + year;
        remitted_year = year;
  
      }
      for(var q=0;q< this.all_year_month.length;q++){
        if(remitted_year_month == this.all_year_month[q]){
          remitted_month_index = q;
        }else if(remitted_year >= last_year[1]){
          remitted_month_index = 11;
        }else{
          remitted_month_index = 0;

        }

      }
      for(let i=0; i< this.allIntakeYear.length;i++){
        let len = this.allIntakeYear.length;
        // alert(this.admissionClosingYear + "   " + this.allIntakeYear[len-1])
        if((this.admissionClosingYear == this.allIntakeYear[len-1]) && this.one_year_month.indexOf(remitted_year_month) == -1 && remitted_year >= last_year[1]){
        // if(this.admissionClosingYear == this.allIntakeYear[len-1]){
          this.getCourseTotal();
          console.log("Can close admisssion")
          // if(this.studentTotalDiscount == 0){
          //   this.closeStudent._id = this.student_id;
          //   this.closeStudent.closingOn = this.f.remitted_date.value;
          //   this.closeStudent.balance_amount_to_pay = this.studentTotalDiscount;
          //   this.closeStudent.closingType = this.admissionClosingType;
          //   this.closeStudent.closingRemark = this.cA.closingremark.value;
          //   this.studentService.editStudent(this.closeStudent).subscribe(
          //     data =>{
          //       // alert("succs")
          //       document.getElementById('admissioncloseModalCloseBtn').click();
          //       this.toast.setMessage("Candidate's course completed!!!", "success");

          //     }
          //   );
          // }
        }
        else{
          this.getCourseTotal();
          document.getElementById('admissioncloseModalCloseBtn').click();
          this.toast.setMessage("Cannot pay! since course is not completed !!!", "danger");

        }
      }
    }else if(this.admissionClosingType == 'Transferred'){

     this.onTransferDateChange();

    }else if(this.admissionClosingType == 'Dropped Out'){
     this.onDropOutDateChange();
    }


  }
  onTransferDateChange(){
    if(this.cA.transfer_date.value){
      this.admissionClosingTransferdate = this.cA.transfer_date.value;

    }else{
      this.admissionClosingTransferdate = this.f.remitted_date.value;

    }
          // for(var i=0;i<  this.allYears.length;i++){
          //   if(this.allYears[i] == this.f.fee_year.value){
          //     for(var c=0; c <  i; c++){
          //       if(this.feeFlow.balance_fee > 0){
          //         this.changed_year_index = c;
          //         document.getElementById('admissioncloseModalCloseBtn').click();
          //         this.toast.setMessage("Previous year fees not paid !!!", "danger");
          //         return;
          //       }
          //     }
          //     this.getCourseTotal();
          //   }else{
          //     this.getCourseTotal();
          //     console.log("Can close admisssion")

          //     // if(this.studentTotalDiscount == 0){
          //     //   this.closeStudent._id = this.student_id;
          //     //   this.closeStudent.closingOn = this.f.remitted_date.value;
          //     //   this.closeStudent.transferredOn = this.admissionClosingTransferdate;
          //     //   this.closeStudent.balance_amount_to_pay = this.studentTotalDiscount;
          //     //   this.closeStudent.closingType = this.admissionClosingType;
          //     //   this.closeStudent.closingRemark = this.cA.closingremark.value;
          //     //   this.studentService.editStudent(this.closeStudent).subscribe(
          //     //     data =>{
          //     //       document.getElementById('admissioncloseModalCloseBtn').click();
          //     //       this.toast.setMessage("Candidate transferred successfully!!!", "success");

          //     //     }
          //     //   );
          //     // }
          //   }
          // }
  }
  onDropOutDateChange(){
    if(this.cA.drop_out_date.value){
      this.admissionClosingDropoutdate = this.cA.drop_out_date.value;

    }else{
      this.admissionClosingDropoutdate = this.f.remitted_date.value;

    }
    if(this.cA.drop_out_confirm_date.value){
      this.admissionClosingDropoutConfirmdate = this.cA.drop_out_confirm_date.value;

    }else{
      this.admissionClosingDropoutConfirmdate = this.f.remitted_date.value;

    }
          // for(var i=0;i<  this.allYears.length;i++){
          //   if(this.allYears[i] == this.f.fee_year.value){
          //     for(var c=0; c <  i; c++){
          //       if(this.feeFlow.balance_fee > 0){
          //         this.changed_year_index = c;
          //         document.getElementById('admissioncloseModalCloseBtn').click();
          //         this.toast.setMessage("Previous year fees not paid !!!", "danger");
          //         return;
          //       }
          //     }
          //     this.getCourseTotal();
          //   }else{
          //     this.getCourseTotal();
          //     // if(this.studentTotalDiscount == 0){
          //     //   this.closeStudent._id = this.student_id;
          //     //   this.closeStudent.closingOn = this.f.remitted_date.value;
          //     //   this.closeStudent.transferredOn = this.admissionClosingTransferdate;
          //     //   this.closeStudent.balance_amount_to_pay = this.studentTotalDiscount;
          //     //   this.closeStudent.closingType = this.admissionClosingType;
          //     //   this.closeStudent.closingRemark = this.cA.closingremark.value;
          //     //   this.studentService.editStudent(this.closeStudent).subscribe(
          //     //     data =>{
          //     //       // alert("succs")
          //     //       document.getElementById('admissioncloseModalCloseBtn').click();
          //     //       this.toast.setMessage("Candidate dropped out!!!", "success");

          //     //     }
          //     //   );
          //     // }
          //   }
          // }
  }
  onDropOutConfirmNO(event){
    this.dropout_confirmYES =  !event.target.checked;
    this.dropout_confirmNO = event.target.checked;
    if(this.dropout_confirmNO){
      this.f.remarks.setValue("Dropping out without payment");
      this.f.payment_mode.setValue("Others");
      this.invoice.remarks = "Dropping out without payment";
      this.invoice.paymentMode = "Others";
      this.feecollection.remarks = "Dropping out without payment";
      this.feecollection.paymentMode = "Others";
      this.invoice.remarks = "Dropping out without payment";
      this.invoice.paymentMode = "Others";
    }

  }
  onDropOutConfirmYES(event){
    this.dropout_confirmNO = false;
    this.dropout_confirmYES = event.target.checked;

  }
  getBalanceTotal(){
    this.studentTotalPaidBalance = this.total_course_fees;
    this.studentTotalDiscount = this.total_balance_fees - this.studentTotalPaidBalance;
  }
  onViewClick(student) {
    let link = `http://206.189.140.241:4200/admissionform-singleview/${student._id}`;
    // let link = `https://admintimes.com/admissionform-singleview/${student._id}`;

    window.open(link, "_blank");

  }












  // onPaidDateChange(event:any){
  //   this.feecollection.lastPaidDate = new Date(formatDate(event.target.value, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'));
  // }


}
