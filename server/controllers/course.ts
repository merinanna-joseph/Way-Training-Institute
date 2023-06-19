import BaseCtrl from './base';
import Course from '../models/course';


export default class CourseCtrl extends BaseCtrl {
  model = Course;
  getAllCourseWithBoardName = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('boardOrUniversity');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  getSingleCourseandFee = async (req, res) => {
    try {
      const obj = await this.model.find({ _id: req.params.id }).populate('feeId').populate('boardOrUniversity');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getAllCourseandFee = async (req, res) => {
    try {
      const obj = await this.model.find({}).populate('feeId').populate('boardOrUniversity');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getCoursesWithNamewithBranch =  async (req, res) => {
    try {
      const obj = await this.model.find({ name: req.params.name,boardOrUniversity:req.params.university,
        courseType:req.params.ctype,branch: req.params.branch,centers:req.params.center }).populate('feeId').populate('boardOrUniversity');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getCoursesWithNamewithoutBranch =  async (req, res) => {
    try {
      const obj = await this.model.find({ name: req.params.name,boardOrUniversity:req.params.university,
        courseType:req.params.ctype,centers:req.params.center }).populate('feeId').populate('boardOrUniversity');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getCoursesByUniversityId = async (req, res) => {
    try {
      const obj = await this.model.find({ boardOrUniversity: req.params.boardoruniversityID });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getCountOfCourseswithCourseId  = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ coursenameId: req.params.coursenameId}).count();
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getCountOfCourseswithBranchId  = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ coursebranchId: req.params.coursebranchId}).count();
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  getAllCourseandFeeByCenter = async (req, res) => {
    try {
      const obj = await this.model.find({centers: req.params.center}).populate('feeId').populate('boardOrUniversity');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }


  getCoursesByUniversityIdandCenter = async (req, res) => {
    try {
      const obj = await this.model.find({ boardOrUniversity: req.params.boardoruniversityID,centers:req.params.centername });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
