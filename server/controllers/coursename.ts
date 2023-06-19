import Coursename from '../models/coursename';
import BaseCtrl from './base';

export default class CoursenameCtrl extends BaseCtrl {
  model = Coursename;

  getCoursenameById = async (req, res) => {
    try {
      const obj = await this.model.find({ _id: req.params.courseID });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

}
