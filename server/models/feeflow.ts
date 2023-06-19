import * as mongoose from 'mongoose';

const feeflowSchema = new mongoose.Schema({
  // paidAmount: String,
  paymentMode: String,
  remarks: String,
  lastPaidDate: Date,
  // feeStructure: {},
  fee_per_year: {},
  studentId:{ type: String, ref: 'Student' },
  ispaid:Boolean,

  
 

  });
const Feeflow = mongoose.model('Feeflow', feeflowSchema);

export default Feeflow;
