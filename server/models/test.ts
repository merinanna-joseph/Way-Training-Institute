import * as mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  title: String,
  imagePath:String,
  });
const Test = mongoose.model('Test', testSchema);

export default Test;
