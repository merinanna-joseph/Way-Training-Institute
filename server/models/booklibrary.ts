import * as mongoose from 'mongoose';

const booklibrarySchema = new mongoose.Schema({
  name: String,
  branch:String,
  boardOrUniversity: { type: String, ref: 'BoardOrUniversity' },
  courseType:String,
  numberofyears:String,
//   feeId:{ type: String, ref: 'Fee' },
  coursenameId:{ type: String, ref: 'Coursename' },
  coursebranchId:{ type: String, ref: 'Branch' },
  semperyear : String,


  });
const Booklibrary = mongoose.model('Booklibrary', booklibrarySchema);

export default Booklibrary;
