import * as mongoose from 'mongoose';

const collectionflowSchema = new mongoose.Schema({
  year: String,
  collectedOn: Date,
  // totAmount: String,
  // paidAmount: String,
  collectionType: String,
  remarks: String,
  isCertificateCollected: Boolean,
  isBookCollected: Boolean,
  isTransportationNeeded: Boolean,
  month_list : [],
  studentId:{ type: String, ref: 'Student' },
  });
const Collectionflow = mongoose.model('Collectionflow', collectionflowSchema);

export default Collectionflow;
