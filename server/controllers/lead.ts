import BaseCtrl from './base';
import Lead from '../models/lead';


export default class LeadCtrl extends BaseCtrl {
  model = Lead;

  getbyassignedToId = async (req, res) => {
    try {
      const obj = await this.model.find({ assignedTo: req.params.id }).populate('assignedBy').populate('assignedTo').populate('createdBy');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getLeadById = async (req, res) => {
    try {
      const obj = await this.model.find({ _id: req.params.id }).populate('assignedBy').populate('assignedTo').populate('createdBy');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  getLeadswithUser = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('assignedBy').populate('assignedTo').populate('createdBy');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getLeadByUserWithAssignedTo = async (req, res) => {
    try {
      const obj = await this.model.find({ assignedTo: req.params.assigned_to });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}