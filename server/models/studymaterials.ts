import * as mongoose from 'mongoose';

const studymaterialSchema = new mongoose.Schema({
 
  subject:{ type: String, ref: 'Coursesubject' },
  name:String,
  materials : [],

  });
const Studymaterial = mongoose.model('Studymaterial', studymaterialSchema);

export default Studymaterial;
