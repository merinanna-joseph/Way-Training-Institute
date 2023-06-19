import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import BaseCtrl from './base';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';


export default class UserCtrl extends BaseCtrl {
  model = User;
  user = async (req:any,res:any) => {
    req.body.email = req.body.email.toLowerCase();
    this.model.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (!user) { 
        this.insert(req,res); 
      }else{
        return res.status(400).json({ message: "Email already exists" });
      }
    }); 
  }

  login = async (req,res) => {
    this.model.findOne({ email: req.body.email }, (err: any, user: { comparePassword: any }) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user}, "SECRETforSECRETEASE2020",{expiresIn: "10h"}); 
        res.status(200).json({ token: token });
      });
    });
  }
  updatePassword = async (req:any, res:any) => {
    try {
      let hash = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hash;
      const obj = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);      
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  updateNewPassword = async (req:any, res:any) => {
    try {      
      let hash = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hash;
      const obj = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  validateCredentials = (req:any,res:any) => {
    this.model.findOne({ email: req.body.email},(err:any,user:any) => {
      if (!user) { 
        return res.sendStatus(403); 
      }else{
        user.comparePassword(req.body.password, (error: any, isMatch: any) => {
          if (!isMatch) { 
            return res.sendStatus(403); 
          }else{
            let hash = bcrypt.hashSync(req.body.newPassword, 10);
            user.password = hash;
            req.body = user;
            this.update(req,res);
          }
        });
      }    
    });
  }

  
  getByUserId = async(userId:string) => {
    try {
      const obj = await this.model.findOne({ _id: userId });
      return obj;
    } catch (err) {
      return "Error";
    }
  }
  // Get by Email
  getByEmail = async (req:any,res:any) => {
    try {
      const obj = await this.model.findOne({ email: req.params.email });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  getUserById = async (req:any,res:any) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.id });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  deletebyusername = async (req:any,res:any) => {
    try {
      await this.model.findOneAndDelete({ email: req.params.email });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
 
  getStaffs = async (req, res) => {
    try {
      const docs = await this.model.find({roles: {$in : 'staff'}});
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  updateStudentCredentials = async (req:any, res:any) => {
    try {      
      let hash = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hash;
      const obj = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.sendStatus(200).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
