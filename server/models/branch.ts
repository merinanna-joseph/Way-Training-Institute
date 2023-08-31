import * as mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  branch: String,
  courseId:{ type: String, ref: 'Coursename' }

  });
const Branch= mongoose.model('Branch', branchSchema);

export default Branch;
