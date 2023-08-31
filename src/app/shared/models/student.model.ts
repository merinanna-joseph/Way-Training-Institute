
class Address{
  residenceNo?:number;
  permanent_address?:string;
  temporary_address?:string;
  location?:string;
  state?:string;
  nationality?:string;
}
class Education_Qualification{
  last_Completed_Course?:string;
  university?:string;
  institute?:string;
  passout_year?:number;

}
class Contact{
  mobilenumber?:string;
  residencenumber?:string;


}

class Studentdocuments{
  profilephoto?:string;
  secondarycertificate?:string;
  highersecondarycertificate?:string;
  passportfrontpage?:string;
  passportbackpage?:string;
  visapage?:string;
  emirateaid?:string;
  otherdocuments?:any[];


}
class studentCourse{
  course_name?: string;
  course_branch?: string;
  boardOrUniversity?: string;
  course_duration_year?: string;
  course_duration_month?: string;
  course_type?: string;
  course_startYear?: string;
  course_endYear?: string;


}

// class studentFees{
//   year?:any;
//   registration_fee?:number;
//   coaching_fee:number;
//   exam_fee:number;
//   convocation_fee: number;
//   attestation_fee: number;
//   equalency_fee: number;
//   other_fee: number;
//   per_year_payable_total_fee: number;
//   per_year_total_fee:number;
//   per_year_discount:number;
//   per_year_payable_coaching_fee:number;

// }
export class Student {
  _id?: string;
  firstName?:string;
  lastName?:string;
  contact?:Contact;
  email?:string;
  gender?: string;
  DOB?: Date;
  address?:Address;
  fatherName?: string;
  motherName?: string;
  passportNumber?: string;
  education_qualification?:Education_Qualification;
  intake?: Date;
  academic_Year?: number;
  admission_Date?: Date;
  joining_Date?: Date;
  university_register_number?: string;
  tally_ID?: string;
  disablitity_status?:string;

  original_course_amount?: number;
  total_payable_fee_with_or_without_discount?:number;
  discount?:number;

  isBook_collected?: boolean;
  isCertificate_collected?: boolean;
  centers?: string;
  studentDocuments?: Studentdocuments;
  studentCourse?: studentCourse[];
  // studentFees?: studentFees[];

  lead_officer?: any;
  lead_source?: string;
  Trainer?:string;
  istemporarysaved?: boolean;

  subject_list?: string[];
  remarks ?: string;

  courseID?:any;
  // feeID?:any;
  boardOrUniversityID?:any;
  branch?:string;

  closingOn?:Date;
  transferredOn?:Date;
  dropedoutOn?:Date;
  dropedoutconfirmOn?:Date;
  closingRemark?: string;
  closingType?:string;
  balance_amount_to_pay?: number;
  username?:string;
  password?: string;

}
