import * as mongoose from 'mongoose';
const boardoruniversitySchema = new mongoose.Schema({
  boardoruniveristy:String,
  courseDetails:{},
  });
const BoardOrUniversity = mongoose.model('BoardOrUniversity', boardoruniversitySchema);

export default BoardOrUniversity;
