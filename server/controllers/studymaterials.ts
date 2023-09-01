import Studymaterial from '../models/studymaterials';
import BaseCtrl from './base';
var fs = require('fs');

export default class StudymaterialCtrl extends BaseCtrl {
  model =Studymaterial;

  getStudymaterialsBySubject = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({ subject : req.params.subjectId }).populate('subject');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  deleteImagepathfromdirectory = async (req:any,res:any)=>{
    try {

      // const path = req.body.path;
      const path = 'thewaydocument/studymaterials/'+req.body.id+'/' + req.body.name;

      // const path ='server/public/images/studentdocuments/630f1859b53bdc4278e0c2e3/tree-736885__480.jpg-1662145055440.png'
    console.log(path,"   imgpath");
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          // console.log("not removed");
          const objj = {message:err};
          res.status(200).json(objj);


          // return
        }else{
          // console.log("removed");
          const objj = {message:'File successfully deleted'};
          res.status(200).json(objj);

        //file removed

        }
      
      });


    } catch (err) {
      // return res.status(400).json({ message: "Student not found" });

      // return res.status(500).json({ error: err.message });
    }
  }
  getCountofStudymaterialBysubjectid  = async (req:any,res:any) => {
    try {
      // console.log(req.params.subjectId,"id")
      const docs = await this.model.find({ subject: req.params.subjectId}).count();
      // console.log(docs,'docs')
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
 
}
