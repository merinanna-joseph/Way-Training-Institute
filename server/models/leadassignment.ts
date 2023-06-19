import * as mongoose from 'mongoose';
const leadassignmentSchema = new mongoose.Schema({
  leadId:{ type: String, ref: 'Lead' },
  assignedBy:{ type: String, ref: 'User' },
  assignedTo:String,
  assignedOn:Date,
  status:String,
  respondedon:Date,
  });
const Leadassignment = mongoose.model('Leadassignment', leadassignmentSchema);

export default Leadassignment;
