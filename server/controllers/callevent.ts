import BaseCtrl from './base';
import Callevent from '../models/callevent';


export default class CallEventCtrl extends BaseCtrl {
  model = Callevent;
  
  getByLead = async (req, res) => {
    try {
      const docs = await this.model.find({leadId: req.params.id}).populate('userId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getByUser = async (req, res) => {
    try {
      const docs = await this.model.find({userId: req.params.id}).populate('userId').populate('leadId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getcalleventByUserId = async (req, res) => {
    try {
      const docs = await this.model.find({_id: req.params.id}).populate('userId').populate('leadId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  allCalleventsByLead = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('leadId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getcalleventByUserIdAndLeadId = async (req, res) => {
    try {
      const docs = await this.model.find({userId: req.params.userId,leadId:req.params.leadId});
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}