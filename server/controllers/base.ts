import { title } from "node:process";

abstract class BaseCtrl {

  abstract model: any;
  // Get all
  getAll = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({});
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Count all
  count = async (req:any,res:any) => {
    try {
      console.log("LLLL")
      const count = await this.model.count();
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Insert
  insert = async (req:any,res:any) => {
    try {

      const obj = await new this.model(req.body).save();
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Get by id
  get = async (req:any,res:any) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.id });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(400).json({ message: "Register number already exists" });

      // return res.status(500).json({ error: err.message });
    }
  }

  // Update by id
  update = async (req:any,res:any) => {
    try {
      // console.log(req.body)
      const obj = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.sendStatus(200).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  updatestudent = async (req:any,res:any) => {
    try {

      const obj = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      // res.sendStatus(200).json(obj);
      res.status(200).send({ status: 'OK'});
    } catch (err) {

      return res.status(400).json({ message: err.message });

    }
  }


  // Delete by id
  delete = async (req:any,res:any) => {
    try {
      await this.model.findOneAndRemove({ _id: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  uploadFile = async (req:any,res:any)=>{
    if(typeof req.file!=='undefined')
    {
      if(req.params.type == 'studymaterials'){
        res.json({
          // imageUrl: 'http://206.189.140.241:4200/'+req.params.type+'/'+req.params.studymaterialid+'/' + req.file.filename,
          imageUrl: 'https://admintimes.com/'+req.params.type+'/'+req.params.studymaterialid+'/' + req.file.filename,

          // imageUrl:'http://localhost:3000/images/'+req.params.type+'/'+req.params.studymaterialid+'/' + req.file.filename,
          imageName:req.file.filename
  
  
        })
      }else if(req.params.type == 'studentdocuments'){
        res.json({
          // imageUrl: 'http://206.189.140.241:4200/'+req.params.type+'/'+req.params.studentid+'/' + req.file.filename,
          imageUrl: 'https://admintimes.com/'+req.params.type+'/'+req.params.studentid+'/' + req.file.filename,

          // imageUrl:'server/public/images/'+req.params.type+'/'+req.params.studentid+'/' + req.file.filename,
          imageName:req.file.filename
  
  
        })
      }
     
    }
    else{
      res.status(400).json({
        msg:'please upload a valid file'
      })
    }


     }



     uploadsFile = async (req:any,res:any)=>{
      //  let images=[];
      //  for(let i=0;i<req.files.length;i++){
      //  let imageUrl='http://localhost:3000/images/'+req.files[i].filename

        //  images.push(imageUrl)

      //  }
      //  res.json({
      //   images
      // })
      // console.log(req.files,"files in back")
      if(typeof req.files!=='undefined')
      {
        res.json({

          imageUrl:req.files,



        })
      }
      else{
        res.status(400).json({
          msg:'please upload a valid file'
        })
      }

        }


























     getAlldata = async (req:any,res:any)=>{
      res.json({
        imageUrl:'http://localhost:3000/images/5001000.png'
      })
    }



}

export default BaseCtrl;
