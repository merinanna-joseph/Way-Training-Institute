import Branch from '../models/branch';
import BaseCtrl from './base';

export default class BranchCtrl extends BaseCtrl {
  model = Branch;
  getBrancheByCourseId = async (req, res) => {
    try {
      const obj = await this.model.find({ courseId: req.params.courseID });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }


  getCountofBranchsbyCourseID  = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ courseId: req.params.coursenameId}).count();
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }


}
