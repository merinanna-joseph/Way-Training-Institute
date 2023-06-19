import * as mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  courseId:{ type: String, ref: 'Course' },
  createdOn: Date,
  createdBy: { type: String, ref: 'User' },
  status: String,
  assignedBy:{ type: String, ref: 'User' },
  assignedTo:{ type: String, ref: 'User' },
  assignedStatus:String,
  firstName:String,
  lastName:String,
  mobile:String,
  email:String,
  closedOn:Date,
  discount:String,
  finalAmount:String,
  remarks:String,
  source:String,
  priorityStatus:String
  });
const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
