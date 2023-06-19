import * as mongoose from 'mongoose';

const coursenameSchema = new mongoose.Schema({
  coursename: String
  });
const Coursename = mongoose.model('Coursename', coursenameSchema);

export default Coursename;
