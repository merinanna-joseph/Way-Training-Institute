import Booklibrary from '../models/booklibrary';
import BaseCtrl from './base';

export default class BooklibraryCtrl extends BaseCtrl {
  model = Booklibrary;

  getBooklibraryWithId = async (req, res) => {
    try {
      const obj = await this.model.find({ _id: req.params.id }).populate('boardOrUniversity').populate('coursenameId').populate('coursebranchId');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getAllBooklibraryWithALLDetails = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('boardOrUniversity').populate('coursenameId').populate('coursebranchId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getBooklibraryWithNameBranchType =  async (req, res) => {
    try {
      var docs = [];
      var obj = [];
      docs = await this.model.find({ boardOrUniversity:req.params.university
        }).populate('boardOrUniversity').populate('coursenameId').populate('coursebranchId');
       console.log(docs,"dddd")
      for (var i = 0; i < docs.length; i++) {
        if (docs[i].coursenameId.coursename == req.params.name &&
          docs[i].coursebranchId.branch == req.params.branch && 
          docs[i].courseType == req.params.ctype
        ) {
          console.log(docs[i],"doc")
          obj.push(docs[i]);
        }
      }
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getBooklibraryWithNameType =  async (req, res) => {
    try {
      var docs = [];
      var obj = [];
      docs = await this.model.find({ boardOrUniversity:req.params.university
        }).populate('boardOrUniversity').populate('coursenameId').populate('coursebranchId');
      //  console.log(docs,"dddd")
      for (var i = 0; i < docs.length; i++) {
        if (docs[i].coursenameId.coursename == req.params.name &&
          
          docs[i].courseType == req.params.ctype
        ) {
          // console.log(docs[i],"doc")
          obj.push(docs[i]);
        }
      }
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
