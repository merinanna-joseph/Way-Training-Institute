import * as mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: String,
  durationInYear: String,
  durationInMonths: String,
  branch: String,
  intake: String,
  boardOrUniversity: { type: String, ref: 'BoardOrUniversity' },
  courseType:String,
  startYear:String,
  endYear:String,
  // feeId:{ type: String, ref: 'Fee' },
  coursenameId:String,
  coursebranchId:String,
  centers : String,


  });
const Course = mongoose.model('Course', courseSchema);

export default Course;
