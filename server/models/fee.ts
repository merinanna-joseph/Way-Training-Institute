import * as mongoose from 'mongoose';
const feeSchema = new mongoose.Schema({
  courseId:{ type: String, ref: 'Course' },
  feeStructure:[],
  totalAmount:{ type: Number, default:0 }

 });
  const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
