import Invoice from '../models/invoice';
import BaseCtrl from './base';

export default class InvoiceCtrl extends BaseCtrl {
  model = Invoice;
  getinvoicesWithStudentId = async (req, res) => {
    try {
      const obj = await this.model
        .find({ studentId: req.params.studentID })
        .populate('studentId');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  getInvoiceByStudentID = async (req, res) => {
    try {
      const obj = await this.model
        .find({ _id: req.params.id })
        .populate('studentId');
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  getinvoicesWithAllStudents = async (req: any, res: any) => {
    try {
      const docs = await this.model.find({year:req.params.year}).populate('studentId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  getinvoicesWithAllStudents_last2years = async (req: any, res: any) => {
    try {
      var datetime = new Date().getFullYear();
      var datetimeminusone = datetime - 1;
      var docs = [];
      var obj = [];
      docs = await this.model.find({}).populate('studentId');
      for (var i = 0; i < docs.length; i++) {
        if (
          docs[i].remittedDate.getFullYear() == datetime ||
          docs[i].remittedDate.getFullYear() == datetimeminusone
        ) {
          obj.push(docs[i]);
        }
      }
      res.status(200).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  getAllInvoicesBtwDateswithStudents = async (req: any, res: any) => {
    try {
      let sDate = new Date(req.params.sDate);
      let eDate = new Date(req.params.eDate);

      const docs = await this.model
        .find({
          remittedDate: {
            $gte: `${sDate}`,
            $lte: `${eDate}`,
          },
        })
        .populate('studentId');

      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  getAllInvoicesBtwDateswithStudentsdemo = async (req: any, res: any) => {
    try {
      let sDate = new Date(req.params.sDate);
      let eDate = new Date(req.params.eDate);
      let docs = [];
      let a = [];
      let university = req.params.university;
      let intake = req.params.intake;
      let paymentmode = req.params.paymentmode;
      let coursename = req.params.coursename;
      let coursebranch = req.params.coursebranch;
      let coursetype = req.params.coursetype;

      docs = await this.model
        .find({
          remittedDate: {
            $gte: `${sDate}`,
            $lte: `${eDate}`,
          },
        })
        .populate('studentId');

      if (
        sDate &&
        eDate &&
        paymentmode == 'null' &&
        university == 'null' &&
        intake == 'null' &&
        coursename == 'undefined'
      ) {
        let total = 0;
        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].total_remitted_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      }else if(
        sDate &&
        eDate &&
        paymentmode == 'ALL' &&
        university == 'ALL' &&
        intake == 'null' &&
        coursename == 'ALL'
      ){
        let total = 0;
        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].total_remitted_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      }else {
        a = [];
        for (let k = 0; k < docs.length; k++) {
          let date1 = new Date(docs[k].studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');
         


          if(paymentmode != 'null' && intake != 'null' && university != 'null' && coursename != 'undefined'){

            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (
            
                intake == convertedintake 
                
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
              
                intake == convertedintake &&
              
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
              
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
                
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake 
                
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
                if (
                  paymentmode == docs[k].paymentMode &&
                  intake == convertedintake &&
                  university ==
                    docs[k].studentId.studentCourse[0].boardOrUniversity &&
                  coursename == docs[k].studentId.studentCourse[0].course_name &&
                  coursetype == docs[k].studentId.studentCourse[0].course_type &&
                  docs[k].studentId.studentCourse[0].course_branch == coursebranch
                ) {
                  a.push(docs[k]);
                }
            }




           
          }else if(paymentmode != 'null' && intake != 'null' && university != 'null'){
            if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                intake == convertedintake
                
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
                
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }
          }else if(paymentmode != 'null' && intake != 'null' && coursename != 'undefined'){
            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
                
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake 
                
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }
            
          }else if(paymentmode != 'null' && university != 'null' && coursename != 'undefined'){

            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
             
                a.push(docs[k]);
              
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
                
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
                
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }
            
          }else if(intake != 'null' && university != 'null' && coursename != 'undefined'){

            if(university == 'ALL' && coursename == 'ALL'){
              if (
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          }else if(paymentmode != 'null' && intake != 'null'){

            if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }

            
          }else if(paymentmode != 'null' && university != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'){
              
                a.push(docs[k]);
              
            }else if(paymentmode == 'ALL'){
              if (
                
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }
            
          } else if (paymentmode != 'null' && coursename != 'undefined') {

            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              
                a.push(docs[k]);
              
            }else if(paymentmode == 'ALL'){
              if (
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (intake != 'null' && university != 'null') {

            if(university == 'ALL'){
              if (
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (intake != 'null' && coursename != 'undefined') {

            if(coursename == 'ALL'){
              if (
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (university != 'null' && coursename != 'undefined') {

            if(university == 'ALL' && coursename == 'ALL'){
              
                a.push(docs[k]);
              
            }else if(university == 'ALL'){
              if (
               
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (paymentmode != 'null') {
            if(paymentmode == 'ALL'){
              
                a.push(docs[k]);
              
            }else{
              if (paymentmode == docs[k].paymentMode) {
                a.push(docs[k]);
              }
            }
            
          } else if (university != 'null') {
            if(university == 'ALL'){
              
                a.push(docs[k]);
              
            }else{
              if (
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }
            
          } else if (intake != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else{
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }
            
          } else if (coursename != 'undefined') {

            if(coursename == 'ALL'){
             
                a.push(docs[k]);
              
            }else{
              if (
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }
            
          }
        }
        // res.status(200).json(a);
        let totalamount = 0;
        for (let p = 0; p < a.length; p++) {
          totalamount = totalamount + a[p].total_remitted_fee;
        }
        // a[a.length] = totalamount;
        a.push({'totalremittedamount':totalamount});

        res.status(200).json(a);
      }

      // res.status(200).json(a);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  getAllInvoicesBtwDateswithStudentsdemoWithCourseonly = async (
    req: any,
    res: any
  ) => {
    try {
      let sDate = new Date(req.params.sDate);
      let eDate = new Date(req.params.eDate);
      let docs = [];
      let a = [];
      let university = req.params.university;
      let intake = req.params.intake;
      let paymentmode = req.params.paymentmode;
      let coursename = req.params.coursename;
      let coursetype = req.params.coursetype;

      docs = await this.model
        .find({
          remittedDate: {
            $gte: `${sDate}`,
            $lte: `${eDate}`,
          },
        })
        .populate('studentId');

      if (
        sDate &&
        eDate &&
        paymentmode == 'null' &&
        university == 'null' &&
        intake == 'null' &&
        coursename == 'undefined'
      ) {
        let total = 0;

        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].total_remitted_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      }else if(
        sDate &&
        eDate &&
        paymentmode == 'ALL' &&
        university == 'ALL' &&
        intake == 'null' &&
        coursename == 'ALL'
      ){
        let total = 0;

        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].total_remitted_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      } else {
        a = [];
        for (let k = 0; k < docs.length; k++) {
          let date1 = new Date(docs[k].studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');

          if (paymentmode != 'null' && intake != 'null' && university != 'null' && coursename != 'undefined'){
            
           
            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (
                
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                intake == convertedintake &&
               
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
               
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          }else if(paymentmode != 'null' && intake != 'null' && university != 'null'){

            if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }
            
          }else if(paymentmode != 'null' && intake != 'null' && coursename != 'undefined'){

            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
                
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          }else if(paymentmode != 'null' && university != 'null' && coursename != 'undefined'){


            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
             
              
                a.push(docs[k]);
              
            
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
              
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          }else if(intake != 'null' && university != 'null' && coursename != 'undefined'){

            if(university == 'ALL' && coursename == 'ALL'){
              if (
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }

            
          }else if(paymentmode != 'null' && intake != 'null') {

            if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }

            
          }else if(paymentmode != 'null' && university != 'null') {


            if(paymentmode == 'ALL' && university == 'ALL'){
              
              a.push(docs[k]);
            
            }else if(paymentmode == 'ALL'){
              if (
                
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }
            
          }else if(paymentmode != 'null' && coursename != 'undefined') {


            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              
              a.push(docs[k]);
            
            }else if(paymentmode == 'ALL'){
              if (
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }



            
          }else if(intake != 'null' && university != 'null') {

            if(university == 'ALL'){
              if (
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }


            
          }else if(intake != 'null' && coursename != 'undefined') {

            if(coursename == 'ALL'){
              if (
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          }else if(university != 'null' && coursename != 'undefined') {

            if(university == 'ALL' && coursename == 'ALL'){
              
              a.push(docs[k]);
            
            }else if(university == 'ALL'){
              if (
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }

            
          }else if(paymentmode != 'null') {

            if(paymentmode == 'ALL'){
              
              a.push(docs[k]);
            
            }else{
              if (paymentmode == docs[k].paymentMode) {
                a.push(docs[k]);
              }
            }

            
          }else if(university != 'null') {

            if(university == 'ALL'){
              
              a.push(docs[k]);
            
            }else{
              if (
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }

            
          }else if(intake != 'null') {
            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else{
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }
            
          }else if(coursename != 'undefined') {
            if(coursename == 'ALL'){
             
              a.push(docs[k]);
            
            }else{
              if (
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }
            
          }
        }
        let totalamount = 0;
        for (let p = 0; p < a.length; p++) {
          totalamount = totalamount + a[p].total_remitted_fee;
        }
        a.push({'totalremittedamount':totalamount});

        res.status(200).json(a);
      }

      // res.status(200).json(a);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  getAllInvoicesBtwDateswithStudentsdemots = async (req: any, res: any) => {
    try {
      let sDate = new Date(req.params.sDate);
      let eDate = new Date(req.params.eDate);
      let docs = [];
      let a = [];
      let university = req.params.university;
      let intake = req.params.intake;
      let paymentmode = req.params.paymentmode;
      let coursename = req.params.coursename;
      let coursebranch = req.params.coursebranch;
      let coursetype = req.params.coursetype;

      docs = await this.model
        .find({
          remittedDate: {
            $gte: `${sDate}`,
            $lte: `${eDate}`,
          },
          transport_fee: {
            $gt: 0,
          },
        })
        .populate('studentId');
      if (
        sDate &&
        eDate &&
        paymentmode == 'null' &&
        university == 'null' &&
        intake == 'null' &&
        coursename == 'undefined'
      ) {
        let total = 0;
        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].transport_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      }else if(
        sDate &&
        eDate &&
        paymentmode == 'ALL' &&
        university == 'ALL' &&
        intake == 'null' &&
        coursename == 'ALL'
      ){
        let total = 0;

        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].transport_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      } else {
        a = [];
        for (let k = 0; k < docs.length; k++) {
          let date1 = new Date(docs[k].studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');

          if (paymentmode != 'null' && intake != 'null' && university != 'null' && coursename != 'undefined'){
            
            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (
                
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
                
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
                
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake 
                
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }
            
            
            
          } else if (paymentmode != 'null' && intake != 'null' && university != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (paymentmode != 'null' && intake != 'null' && coursename != 'undefined') {

            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
                
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (paymentmode != 'null' && university != 'null' && coursename != 'undefined') {

            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
             
              
                a.push(docs[k]);
              
            
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
                
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
              
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }
            
          } else if (intake != 'null' && university != 'null' && coursename != 'undefined') {

            if(university == 'ALL' && coursename == 'ALL'){
              if (
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (paymentmode != 'null' && intake != 'null') {

            if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }
            
          } else if (paymentmode != 'null' && university != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'){
              
            
                a.push(docs[k]);
              
            
            }else if(paymentmode == 'ALL'){
              if (
              
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (paymentmode != 'null' && coursename != 'undefined') {


            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              
              
                a.push(docs[k]);
              
            
            }else if(paymentmode == 'ALL'){
              if (
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (intake != 'null' && university != 'null') {


            if(university == 'ALL'){
              if (
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }
            
          } else if (intake != 'null' && coursename != 'undefined') {

            if(coursename == 'ALL'){
              if (
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (university != 'null' && coursename != 'undefined') {

            if(university == 'ALL' && coursename == 'ALL'){
           
                a.push(docs[k]);
              
            
            }else if(university == 'ALL'){
              if (
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (paymentmode != 'null') {

            if(paymentmode == 'ALL'){
              
              a.push(docs[k]);
            
            }else{
              if (paymentmode == docs[k].paymentMode) {
                a.push(docs[k]);
              }
            }
           
          } else if (university != 'null') {

            if(university == 'ALL'){
              
              a.push(docs[k]);
            
            }else{
              if (
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (intake != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else{
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }


            
          } else if (coursename != 'undefined') {

            if(coursename == 'ALL'){
             
            
                a.push(docs[k]);
              
            
            }else{
              if (
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type &&
                docs[k].studentId.studentCourse[0].course_branch == coursebranch
              ) {
                a.push(docs[k]);
              }
            }

            
          }
        }
        let totalamountts = 0;
        for (let p = 0; p < a.length; p++) {
          totalamountts = totalamountts + a[p].transport_fee;
        }
        a.push({'totalremittedamount':totalamountts});

        res.status(200).json(a);
      }

      // res.status(200).json(a);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  getAllInvoicesBtwDateswithStudentswithonlycoursenamets = async (
    req: any,
    res: any
  ) => {
    try {
      let sDate = new Date(req.params.sDate);
      let eDate = new Date(req.params.eDate);
      let docs = [];
      let a = [];
      let university = req.params.university;
      let intake = req.params.intake;
      let paymentmode = req.params.paymentmode;
      let coursename = req.params.coursename;
      let coursetype = req.params.coursetype;

      docs = await this.model
        .find({
          remittedDate: {
            $gte: `${sDate}`,
            $lte: `${eDate}`,
          },
          transport_fee: {
            $gt: 0,
          },
        })
        .populate('studentId');
      if (
        sDate &&
        eDate &&
        paymentmode == 'null' &&
        university == 'null' &&
        intake == 'null' &&
        coursename == 'undefined'
      ) {
        let total = 0;

        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].transport_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      }else if(
        sDate &&
        eDate &&
        paymentmode == 'ALL' &&
        university == 'ALL' &&
        intake == 'null' &&
        coursename == 'ALL'
      ){
        let total = 0;

        for (let k = 0; k < docs.length; k++) {
          total = total + docs[k].transport_fee;
        }
        docs.push({'totalremittedamount':total});
        res.status(200).json(docs);
      } else {
        a = [];
        for (let k = 0; k < docs.length; k++) {
          let date1 = new Date(docs[k].studentId.intake);
          date1.setMonth(date1.getMonth() + 1);
          var d = new Date(date1),
            month = '' + d.getMonth(),
            year = '' + d.getFullYear();

          if (month.length < 2) month = '0' + month;

          let convertedintake = [year, month].join('-');

          if (paymentmode != 'null' && intake != 'null' && university != 'null' && coursename != 'undefined') {
            
            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (
               
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
               
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
               
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }
            
            
            
          } else if (paymentmode != 'null' && intake != 'null' && university != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'){
              if (
                
                intake == convertedintake               ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
              
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (paymentmode != 'null' && intake != 'null' && coursename != 'undefined') {

            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
               
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (paymentmode != 'null' && university != 'null' && coursename != 'undefined') {

            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
             
              
              
                a.push(docs[k]);
              
            
          
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (
              
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (
              
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
                
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode 
              ) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (
                
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
              
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }



            
          } else if (intake != 'null' && university != 'null' && coursename != 'undefined') {

            if(university == 'ALL' && coursename == 'ALL'){
              if (
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                intake == convertedintake &&
                
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (paymentmode != 'null' && intake != 'null') {

            if(paymentmode == 'ALL'){
              if (
               
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (paymentmode != 'null' && university != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'){
              
              
                a.push(docs[k]);
              
            
            }else if(paymentmode == 'ALL'){
              if (
               
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }
            
          } else if (paymentmode != 'null' && coursename != 'undefined') {

            if(paymentmode == 'ALL'&& coursename == 'ALL'){
              
              
                a.push(docs[k]);
              
            
            }else if(paymentmode == 'ALL'){
              if (
               
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                paymentmode == docs[k].paymentMode 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                paymentmode == docs[k].paymentMode &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (intake != 'null' && university != 'null') {

            if(university == 'ALL'){
              if (
                intake == convertedintake 
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (intake != 'null' && coursename != 'undefined') {

            if(coursename == 'ALL'){
              if (
                intake == convertedintake
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                intake == convertedintake &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (university != 'null' && coursename != 'undefined') {

            if(university == 'ALL' && coursename == 'ALL'){
              
              
                a.push(docs[k]);
              
            
            }else if(university == 'ALL'){
              if (
               
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }else{
              if (
                university ==
                  docs[k].studentId.studentCourse[0].boardOrUniversity &&
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }


            
          } else if (paymentmode != 'null') {

            if(paymentmode == 'ALL'){
              
              a.push(docs[k]);
            
            }else{
              if (paymentmode == docs[k].paymentMode) {
                a.push(docs[k]);
              }
            }
            
          } else if (university != 'null') {

            if(university == 'ALL'){
              
              a.push(docs[k]);
            
            }else{
              if (
                university == docs[k].studentId.studentCourse[0].boardOrUniversity
              ) {
                a.push(docs[k]);
              }
            }

            
          } else if (intake != 'null') {

            if(paymentmode == 'ALL' && university == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL' && university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'&& coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL' && coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(paymentmode == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(university == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else if(coursename == 'ALL'){
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }else{
              if (intake == convertedintake) {
                a.push(docs[k]);
              }
            }

            
          } else if (coursename != 'undefined') {

            if(coursename == 'ALL'){
             
              a.push(docs[k]);
            
            }else{
              if (
                coursename == docs[k].studentId.studentCourse[0].course_name &&
                coursetype == docs[k].studentId.studentCourse[0].course_type
              ) {
                a.push(docs[k]);
              }
            }

            
          }
        }
        let totalamount = 0;
        for (let p = 0; p < a.length; p++) {
          totalamount = totalamount + a[p].transport_fee;
        }
        a.push({'totalremittedamount':totalamount});


        res.status(200).json(a);
      }

      // res.status(200).json(a);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  getinvoicesWithAllStudentswithcommutation = async (req: any, res: any) => {
    try {
      let sDate = new Date(req.params.sDate);
      let eDate = new Date(req.params.eDate);
      const docs = await this.model
        .find({
          remittedDate: {
            $gte: `${sDate}`,
            $lte: `${eDate}`,
          },
          transport_fee: {
            $gt: 0,
          },
        })
        .populate('studentId');
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };


 
}
