import Coursesubject from '../models/coursesubject';
import BaseCtrl from './base';

export default class CoursesubjectCtrl extends BaseCtrl {
  model =Coursesubject;

  getCoursesubjectsByCourse = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ courseId : req.params.courseId }).populate('courseId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getCoursesubjectsByBooklibrary = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ courseId : req.params.courseId ,yearIndex : req.params.yearIndex }).populate('courseId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
