
import * as mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName : String,
  lastName : String,
  contact : {},
  email : String,
  gender : String,
  DOB : Date,
  address : {},
  fatherName : String,
  motherName : String,
  passportNumber : String,
  education_qualification : {},
  intake : Date,
  academic_Year : Number,
  admission_Date : Date,
  joining_Date : Date,
  disablitity_status : String,
  tally_ID : String,
  // tally_ID : {
  //   type: String,
  //   index:true,
  //   unique:true,
  //   sparse:true
  // },
  original_course_amount : Number,
  total_payable_fee_with_or_without_discount : Number,
  discount :Number,
  isBook_collected : Boolean,
  isCertificate_collected : Boolean,
  university_register_number : String,
  // university_register_number : {
  //   type: String,
  //   index:true,
  //   unique:true,
  //   sparse:true
  // },
  centers : String,
  studentDocuments : {},
  otherDocuments:[],
  studentCourse : {},
  studentFees : {},

  lead_officer: { type: String, ref: 'User' },
  Trainer:{ type: String, ref: 'User' },
  lead_source: String,
  subject_list : [],

  remarks : String,
  istemporarysaved : Boolean,


  courseID:{ type: String, ref: 'Course' },
  feeID:{ type: String, ref: 'Fee' },
  boardOrUniversityID:{ type: String, ref:'BoardOrUniversity'},
  branch:String,

  closingOn : Date,
  transferredOn : Date,
  dropedoutOn : Date,
  dropedoutconfirmOn : Date,
  closingRemark : String,
  closingType : String,
  balance_amount_to_pay : Number,
  username:{ type: String, unique: true, lowercase: true, trim: true },
  password: String,
  });

const Student = mongoose.model('Student', studentSchema);


export default Student;




