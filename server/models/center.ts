import * as mongoose from 'mongoose';

const centerSchema = new mongoose.Schema({
    center: String
  });
const Center = mongoose.model('Center', centerSchema);

export default Center;
