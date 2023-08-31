import Center from '../models/center';
import BaseCtrl from './base';

export default class CenterCtrl extends BaseCtrl {
  model = Center;

//   getCoursenameById = async (req, res) => {
//     try {
//       const obj = await this.model.find({ _id: req.params.courseID });
//       res.status(200).json(obj);
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   }

}
