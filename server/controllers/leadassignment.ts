import BaseCtrl from './base';
import Leadassignment from '../models/leadassignment';


export default class LeadAssignmentCtrl extends BaseCtrl {
  model = Leadassignment;


  getLeadassignmentsById= async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('leadId').populate('assignedBy');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}