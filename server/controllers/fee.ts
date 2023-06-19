import BaseCtrl from './base';
import Fee from '../models/fee';


export default class FeeCtrl extends BaseCtrl {
  model = Fee;


  getFeesByCourse = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('courseId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }




}
