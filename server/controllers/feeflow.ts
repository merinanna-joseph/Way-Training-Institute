import Feeflow from '../models/feeflow';
import BaseCtrl from './base';

export default class FeeflowCtrl extends BaseCtrl {
  model = Feeflow;


  getFeeflowsWithStudentId = async (req, res) => {
    try {
      const obj = await this.model.find({ studentId: req.params.studentID }).populate('studentId');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  getFeeflowsWithAllStudents = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('studentId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  getFeeflowsWithAllGroupedStudents = async (req:any,res:any) => {
    try {
      const docs = await this.model.find({}).populate('studentId');
      var grouped = this.groupBy("studentId", docs);
      res.status(200).json(grouped);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  groupBy(key, array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      if(!array[i].studentId.istemporarysaved){
        if(!array[i].studentId.closingType){
          var added = false;
          for (var j = 0; j < result.length; j++) {
            if (result[j][key] == array[i][key]) {
              result[j].items = [];
              result[j].items.push(array[i]);
              added = true;
              break;
            }
          }
          if (!added) {
            var entry = {items: []};
            entry[key] = array[i][key];
            entry.items.push(array[i]);
            result.push(entry);
          }
        }

      }

    }
    return result;
}
getFeeflowsWithAllGroupedStudentsByYear = async (req:any,res:any) => {
  try {
    let y1,y2,y3;
    y1=req.params.year1;
    y2=req.params.year2;
    y3=req.params.year3;

    const docs = await this.model.find({}).populate('studentId');
    var grouped = this.groupByYear("studentId", docs,y1,y2,y3);
    console.log("students",grouped);
    res.status(200).json(grouped);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
groupByYear(key, array,year1,year2,year3) {

  var result = [];
  for (var i = 0; i < array.length; i++) {
    if(!array[i].studentId.istemporarysaved){
      if(!array[i].studentId.closingType){
        // console.log(array[i].fee_per_year[0]);
        if(array[i].fee_per_year[0].year==year1||array[i].fee_per_year[0].year==year2||array[i].fee_per_year[0].year==year3)
        {

          var added = false;
          for (var j = 0; j < result.length; j++) {
            if (result[j][key] == array[i][key]) {
              result[j].items = [];
              result[j].items.push(array[i]);
              added = true;
              break;
            }
          }
          if (!added) {
            var entry = {items: []};
            entry[key] = array[i][key];
            entry.items.push(array[i]);
            result.push(entry);
          }
        }

      }

    }

  }
  return result;
}

}
