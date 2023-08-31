import * as mongoose from 'mongoose';

const couresesubjectSchema = new mongoose.Schema({
  courseId:{ type: String, ref: 'Booklibrary' },
  feeId:{ type: String, ref: 'Fee' },
  subject:String,
  yearIndex:String,
  semIndex:String,

  // studyMaterials : [],

  });
const Coursesubject = mongoose.model('Coursesubject', couresesubjectSchema);

export default Coursesubject;
