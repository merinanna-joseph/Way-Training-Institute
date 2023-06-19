import Collectionflow from '../models/collectionflow';
import BaseCtrl from './base';

export default class CollectionflowCtrl extends BaseCtrl {
  model = Collectionflow;
  getcollectionFlowsWithStudentId = async (req, res) => {
    try {
      const obj = await this.model.find({ studentId: req.params.studentID }).populate('studentId');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  deleteCollectionflowByStudent= async (req:any,res:any) => {
    try {
      await this.model.findOneAndRemove({ studentId: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getallbookswithstudentdetails = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ collectionType:'BOOK'}).populate('studentId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getallcertificateswithstudentdetails = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ collectionType:'CERTIFICATE'}).populate('studentId');
      console.log(docs)
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getalltransportwithstudentdetails = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ collectionType:'TRANSPORT'}).populate('studentId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }


}
