import * as mongoose from 'mongoose';

const feeflowSchema = new mongoose.Schema({
  // paidAmount: String,
  paymentMode: String,
  remarks: String,
  lastPaidDate: Date,
  // feeStructure: {},
  // fee_per_year: {},
  studentId:{ type: String, ref: 'Student' },
  ispaid:Boolean,

  total_fee:Number,
  balance_fee:Number,
  paid_fee:Number,
 

  });
const Feeflow = mongoose.model('Feeflow', feeflowSchema);

export default Feeflow;
