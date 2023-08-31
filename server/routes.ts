import * as express from 'express';
import UserCtrl from './controllers/user';
import JwtHelper from './config/jwtHelper';
import CourseCtrl from './controllers/course';

import LeadCtrl from './controllers/lead';
import CallEventCtrl from './controllers/callevent';
import LeadAssignmentCtrl from './controllers/leadassignment';
import FeeCtrl from './controllers/fee';
import StudentCtrl from './controllers/student';
import FeeflowCtrl from './controllers/feeflow';
import BoardOrUniversityCtrl from './controllers/boardoruniversity';
import CollectionflowCtrl from './controllers/collectionflow';
import TestCtrl from './controllers/test';
import InvoiceCtrl from './controllers/invoice';
const upload = require('./middlewares/uploads');
import CoursenameCtrl from './controllers/coursename';
import BranchCtrl from './controllers/branch';
import CoursesubjectCtrl from './controllers/coursesubject';

import StudymaterialCtrl from './controllers/studymaterials';
import CenterCtrl from './controllers/center';
import BooklibraryCtrl from './controllers/booklibrary';

// const upload= require('./middlewares/testupload');

export default function setRoutes(app:any) {

  const router = express.Router();
  const userCtrl = new UserCtrl();
  const courseCtrl = new CourseCtrl();
  const feeflowCrl = new FeeflowCtrl();
  const leadCtrl = new LeadCtrl();
  const calleventCtrl = new CallEventCtrl();
  const leadAssignmentCtrl = new LeadAssignmentCtrl();
  const studentCtrl = new StudentCtrl();
  const boardOrUniveristyCtrl = new BoardOrUniversityCtrl();
  const collectionflowCtrl = new CollectionflowCtrl();
  const jwtHelper = new JwtHelper();
  const feeCtrl = new FeeCtrl();
  const testCtrl = new TestCtrl();
  const invoiceCtrl = new InvoiceCtrl();
  const coursenameCtrl = new CoursenameCtrl();
  const branchCtrl = new BranchCtrl();
  const coursesubjectCtrl = new CoursesubjectCtrl();
  const studymaterialCtrl = new StudymaterialCtrl();
  const centerCtrl = new CenterCtrl();
  const booklibraryCtrl = new BooklibraryCtrl();



  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/user/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.user);
  router.route('/user/validate/:id').put(userCtrl.validateCredentials);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/byEmail/:email').get(userCtrl.getByEmail);
  router.route('/user/:id').put(jwtHelper.verifyJwtToken,userCtrl.update);
  router.route('/user/:id').put(userCtrl.updatePassword);
  router.route('/user/usersnewpassword/:id').put(userCtrl.updateNewPassword);
  router.route('/user/:id').delete(userCtrl.delete);
  router.route('/users/getbyroles').get(userCtrl.getStaffs);
  router.route('/users/getbyrolesteacher').get(userCtrl.getTeachers);
  router.route('/user/updateStudentCredentials/:id').put(userCtrl.updateStudentCredentials);


  //Course
  router.route('/course').post(courseCtrl.insert);
  router.route('/courses').get(courseCtrl.getAll);
  router.route('/course/getAllCourseWithBoardname').get(courseCtrl.getAllCourseWithBoardName);
  router.route('/course/count').get(courseCtrl.count);
  router.route('/course/:id').get(courseCtrl.get);
  router.route('/course/:id').put(jwtHelper.verifyJwtToken,courseCtrl.update);
  router.route('/course/:id').delete(courseCtrl.delete);
  router.route('/course/getSingleCourseandFee/:id').get(courseCtrl.getSingleCourseandFee);
  router.route('/courses/getCoursesByUniversityId/:boardoruniversityID').get(courseCtrl.getCoursesByUniversityId);
  router.route('/courses/getAllCourseandFee/').get(courseCtrl.getAllCourseandFee);
  // router.route('/courses/getCoursesWithName/:name').get(courseCtrl.getCoursesWithName);
  router.route('/courses/getCountOfCourseswithCourseId/:coursenameId').get(courseCtrl.getCountOfCourseswithCourseId);
  router.route('/courses/getCountOfCourseswithBranchId/:coursebranchId').get(courseCtrl.getCountOfCourseswithBranchId);

  router.route('/courses/getCoursesWithNamewithBranch/:name/:university/:ctype/:branch/:center').get(courseCtrl.getCoursesWithNamewithBranch);
  router.route('/courses/getCoursesWithNamewithoutBranch/:name/:university/:ctype/:center').get(courseCtrl.getCoursesWithNamewithoutBranch);
  router.route('/courses/getAllCourseandFeeByCenter/:center').get(courseCtrl.getAllCourseandFeeByCenter);

  router.route('/courses/getCoursesByUniversityIdandCenter/:boardoruniversityID/:centername').get(courseCtrl.getCoursesByUniversityIdandCenter);

    //Fee Flow
    router.route('/feeflow').post(feeflowCrl.insert);
    router.route('/feeflows').get(feeflowCrl.getAll);
    router.route('/feeflow/count').get(feeflowCrl.count);
    router.route('/feeflow/:id').get(feeflowCrl.get);
    router.route('/feeflow/:id').put(jwtHelper.verifyJwtToken,feeflowCrl.update);
    router.route('/feeflow/:id').delete(feeflowCrl.delete);
    router.route('/feeflow/getFeeflowsWithStudentId/:studentID').get(feeflowCrl.getFeeflowsWithStudentId);
    router.route('/feeflows/getFeeflowsWithAllStudents').get(feeflowCrl.getFeeflowsWithAllStudents);
    router.route('/feeflows/getFeeflowsWithAllGroupedStudents').get(feeflowCrl.getFeeflowsWithAllGroupedStudents);
    router.route('/feeflows/getFeeflowsWithAllGroupedStudentsByYear/:year1/:year2/:year3').get(feeflowCrl.
      getFeeflowsWithAllGroupedStudentsByYear);


    //collection flow

     router.route('/collectionFlow').post(collectionflowCtrl.insert);
     router.route('/collectionFlows').get(collectionflowCtrl.getAll);
     router.route('/collectionFlow/count').get(collectionflowCtrl.count);
     router.route('/collectionFlow/:id').get(collectionflowCtrl.get);
     router.route('/collectionFlow/:id').put(jwtHelper.verifyJwtToken,collectionflowCtrl.update);
     router.route('/collectionFlow/:id').delete(collectionflowCtrl.delete);
     router.route('/collectionFlows/getcollectionFlowsWithStudentId/:studentID').get(collectionflowCtrl.getcollectionFlowsWithStudentId);
     router.route('/collectionFlow/deleteCollectionflowByStudent/:id').delete(collectionflowCtrl.
      deleteCollectionflowByStudent);
     router.route('/collectionFlows/getallbookswithstudentdetails/').get(collectionflowCtrl.getallbookswithstudentdetails);
     router.route('/collectionFlows/getallcertificateswithstudentdetails/').get(collectionflowCtrl.getallcertificateswithstudentdetails);
     router.route('/collectionFlows/getalltransportwithstudentdetails/').get(collectionflowCtrl.getalltransportwithstudentdetails);

    //  router.route('/feeflow/getFeeflowsWithStudentId/:studentID').get(collectionflowCtrl.getFeeflowsWithStudentId);

  //Lead
  router.route('/lead').post(leadCtrl.insert);
  router.route('/leads').get(leadCtrl.getAll);
  router.route('/lead/count').get(leadCtrl.count);
  router.route('/lead/:id').get(leadCtrl.get);
  router.route('/lead/:id').put(jwtHelper.verifyJwtToken,leadCtrl.update);
  router.route('/lead/:id').delete(leadCtrl.delete);
  router.route('/lead/getbyassignedToId/:id').get(leadCtrl.getbyassignedToId);
  router.route('/lead/getLeadById/:id').get(leadCtrl.getLeadById);
  router.route('/leads/getLeadswithUser').get(leadCtrl.getLeadswithUser);
  router.route('/leads/getLeadByUserWithAssignedTo/:assigned_to').get(leadCtrl.getLeadByUserWithAssignedTo);

  //Call Event
  router.route('/callevent').post(calleventCtrl.insert);
  router.route('/callevents').get(calleventCtrl.getAll);
  router.route('/callevent/count').get(calleventCtrl.count);
  router.route('/callevent/:id').get(calleventCtrl.get);
  router.route('/callevents/byLead/:id').get(calleventCtrl.getByLead);
  router.route('/callevents/byUser/:id').get(calleventCtrl.getByUser);
  router.route('/callevents/byUserandLead/:userId/:leadId').get(calleventCtrl.getcalleventByUserIdAndLeadId);

  router.route('/callevent/:id').put(jwtHelper.verifyJwtToken,calleventCtrl.update);
  router.route('/callevent/:id').delete(calleventCtrl.delete);
  router.route('/callevent/calleventByUserId/:id').get(calleventCtrl.getcalleventByUserId);
  router.route('/callevents/allCalleventsByLead').get(calleventCtrl.allCalleventsByLead);


  //Lead Assignment
  router.route('/leadassignment').post(leadAssignmentCtrl.insert);
  router.route('/leadassignments').get(leadAssignmentCtrl.getAll);
  router.route('/leadassignment/count').get(leadAssignmentCtrl.count);
  router.route('/leadassignment/:id').get(leadAssignmentCtrl.get);
  router.route('/leadassignments/getLeadassignmentsById').get(leadAssignmentCtrl.getLeadassignmentsById);

  router.route('/leadassignment/:id').put(jwtHelper.verifyJwtToken,leadAssignmentCtrl.update);
  router.route('/leadassignment/:id').delete(leadAssignmentCtrl.delete);


   //Fee
   router.route('/fee').post(feeCtrl.insert);
   router.route('/fees').get(feeCtrl.getAll);
   router.route('/fee/count').get(feeCtrl.count);
   router.route('/fee/:id').get(feeCtrl.get);
   router.route('/fee/:id').put(jwtHelper.verifyJwtToken,feeCtrl.update);
   router.route('/fee/:id').delete(feeCtrl.delete);
   router.route('/fees/getFeesByCourse').get(feeCtrl.getFeesByCourse);

  //Student
  router.route('/student').post(studentCtrl.student);
  router.route('/students').get(studentCtrl.getAll);
  router.route('/student/count').get(studentCtrl.count);
  router.route('/student/:id').get(studentCtrl.get);
  router.route('/student/:id').put(jwtHelper.verifyJwtToken,studentCtrl.update);

  router.route('/student/editStudentByTallyReg/:id').put(jwtHelper.verifyJwtToken,studentCtrl.studentupdate);
  router.route('/student/:id').delete(studentCtrl.delete);
  router.route('/student/getStudentByCourseandFees/:id').get(studentCtrl.getStudentByCourseandFees);
  router.route('/student/upload/:studentid/:type').post([upload.single('image'),studentCtrl.uploadFile]);
  router.route('/student/uploads/:studentid/:type').post([upload.array('files'),studentCtrl.uploadsFile]);
  router.route('/student/getStudentByFeeId/:id').get(studentCtrl.getStudentByFeeId);
  router.route('/student/getCountOfStudentswithCourse/:cid').get(studentCtrl.getCountOfStudentswithCourse);

  router.route('/students/countSubmittedStudent').get(studentCtrl.countSubmittedStudent);

  router.route('/student/studentbyusername/:username').get(studentCtrl.getStudentByUsername);
  router.route('/student/deleteImagepathfromdirectory').post(studentCtrl.deleteImagepathfromdirectory);

  

  // router.route('/uploadtestimage').post([upload.single('image'),testCtrl.uploadtestFile]);
  router.route('/getuploadtestimage').get(testCtrl.getAlldata);
  router.route('/students/getStudentsWithALLDetails').get(studentCtrl.getStudentsWithALLDetails);
  router.route('/students/getSubmittedStudentsWithALLDetails').get(studentCtrl.getSubmittedStudentsWithALLDetails);
  router.route('/students/getSavedStudentsWithALLDetails').get(studentCtrl.getSavedStudentsWithALLDetails);
  router.route('/students/getClosedStudentsWithALLDetails').get(studentCtrl.getClosedStudentsWithALLDetails);

  router.route('/students/countStudentbyCenters').get(studentCtrl.countStudentbyCenters);


    //boardOrUniversity
    router.route('/boardOrUniversity').post(boardOrUniveristyCtrl.insert);
    router.route('/boardOrUniversitys').get(boardOrUniveristyCtrl.getAll);
    router.route('/boardOrUniversity/count').get(boardOrUniveristyCtrl.count);
    router.route('/boardOrUniversity/:id').get(boardOrUniveristyCtrl.get);
    router.route('/boardOrUniversity/:id').put(jwtHelper.verifyJwtToken,boardOrUniveristyCtrl.update);
    router.route('/boardOrUniversity/:id').delete(boardOrUniveristyCtrl.delete);

    //invoices

    router.route('/invoice').post(invoiceCtrl.insert);
    router.route('/invoices').get(invoiceCtrl.getAll);
    router.route('/invoice/count').get(invoiceCtrl.count);
    router.route('/invoice/:id').get(invoiceCtrl.get);
    router.route('/invoice/:id').put(jwtHelper.verifyJwtToken,invoiceCtrl.update);
    router.route('/invoice/:id').delete(invoiceCtrl.delete);
    router.route('/invoices/getinvoicesWithStudentId/:studentID').get(invoiceCtrl.getinvoicesWithStudentId);
    router.route('/invoice/getInvoiceByStudentID/:id').get(invoiceCtrl.getInvoiceByStudentID);
    router.route('/invoices/getinvoicesWithAllStudents/:year').get(invoiceCtrl.getinvoicesWithAllStudents);
    router.route('/invoices/getinvoicesWithAllStudents_last2years').get(invoiceCtrl.getinvoicesWithAllStudents_last2years);
    router.route('/invoices/getAllInvoicesBtwDateswithStudents/:sDate/:eDate').get(invoiceCtrl.getAllInvoicesBtwDateswithStudents);
    router.route('/invoices/getinvoicesWithAllStudentswithcommutation/:sDate/:eDate').get(invoiceCtrl.getinvoicesWithAllStudentswithcommutation);
    router.route('/invoices/getAllInvoicesBtwDateswithStudentsdemo/:sDate/:eDate/:paymentmode/:university/:intake/:coursename/:coursebranch/:coursetype').
    get(invoiceCtrl.getAllInvoicesBtwDateswithStudentsdemo);
    router.route('/invoices/getAllInvoicesBtwDateswithStudentsdemo/:sDate/:eDate/:paymentmode/:university/:intake/:coursename/:coursetype').
    get(invoiceCtrl.getAllInvoicesBtwDateswithStudentsdemoWithCourseonly);
    router.route('/invoices/getAllInvoicesBtwDateswithStudentsdemots/:sDate/:eDate/:paymentmode/:university/:intake/:coursename/:coursebranch/:coursetype').
    get(invoiceCtrl.getAllInvoicesBtwDateswithStudentsdemots);
    router.route('/invoices/getAllInvoicesBtwDateswithStudentsdemots/:sDate/:eDate/:paymentmode/:university/:intake/:coursename/:coursetype').
    get(invoiceCtrl.getAllInvoicesBtwDateswithStudentswithonlycoursenamets);





  //Coursename
  router.route('/coursename/:id').delete(coursenameCtrl.delete);
  router.route('/coursename').post(coursenameCtrl.insert);
  router.route('/coursenames').get(coursenameCtrl.getAll);
  router.route('/coursename/:id').get(coursenameCtrl.get);


  //Branch
  router.route('/branch').post(branchCtrl.insert);
  router.route('/branchs').get(branchCtrl.getAll);
  router.route('/branch/:id').get(branchCtrl.get);
  router.route('/branchs/getBranchByCourseId/:courseID').get(branchCtrl.getBrancheByCourseId);
  router.route('/branch/:id').delete(branchCtrl.delete);
  router.route('/branchs/getCountofBranchsbyCourseID/:coursenameId').
  get(branchCtrl.getCountofBranchsbyCourseID);



// coursesubject
  // router.route('/coursename/:id').delete(coursenameCtrl.delete);
  router.route('/coursesubject').post(coursesubjectCtrl.insert);
  router.route('/coursesubject/:id').get(coursesubjectCtrl.get);
  router.route('/coursesubject/:id').put(jwtHelper.verifyJwtToken,coursesubjectCtrl.update);
  router.route('/coursesubject/:id').delete(coursesubjectCtrl.delete);

  router.route('/coursesubject/studymaterialsuploads').post([upload.array('files'),coursesubjectCtrl.uploadsFile]);
  router.route('/coursesubjects/getCoursesubjectsByCourse/:courseId/:yearIndex/:semIndex').get(coursesubjectCtrl.getCoursesubjectsByCourse);

// subject_study materials
  // router.route('/coursename/:id').delete(coursenameCtrl.delete);
  router.route('/studymaterial').post(studymaterialCtrl.insert);
  router.route('/studymaterial/:id').get(studymaterialCtrl.get);
  router.route('/studymaterial/:id').put(jwtHelper.verifyJwtToken,studymaterialCtrl.update);
  router.route('/studymaterial/:id').delete(studymaterialCtrl.delete);

  router.route('/studymaterial/studymaterialsuploads/:studymaterialid/:type').post([upload.array('files'),studymaterialCtrl.uploadsFile]);
  router.route('/studymaterials/getStudymaterialsBySubject/:subjectId').get(studymaterialCtrl.getStudymaterialsBySubject);

  router.route('/studymaterial/deleteImagepathfromdirectory').post(studymaterialCtrl.deleteImagepathfromdirectory);
  router.route('/studymaterial/getCountofStudymaterialBysubjectid/:subjectId/').get(studymaterialCtrl.getCountofStudymaterialBysubjectid);

// coursesubject
  // router.route('/coursename/:id').delete(coursenameCtrl.delete);
  router.route('/center').post(centerCtrl.insert);
  router.route('/center/:id').get(centerCtrl.get);
  router.route('/center/:id').put(jwtHelper.verifyJwtToken,centerCtrl.update);
  router.route('/centers').get(centerCtrl.getAll);



// coursesubject
  // router.route('/coursename/:id').delete(coursenameCtrl.delete);
  router.route('/BookLibrary').post(booklibraryCtrl.insert);
  router.route('/BookLibrary/:id').get(booklibraryCtrl.get);
  router.route('/BookLibrary/:id').put(jwtHelper.verifyJwtToken,booklibraryCtrl.update);
  router.route('/BookLibrarys').get(booklibraryCtrl.getAll);

  router.route('/BookLibrarys/getAllBooklibraryWithALLDetails').get(booklibraryCtrl.getAllBooklibraryWithALLDetails);
  router.route('/BookLibrary/getBooklibraryWithId/:id').get(booklibraryCtrl.getBooklibraryWithId);
  router.route('/BookLibrarys/getBooklibraryWithNameBranchType/:name/:ctype/:branch/:university').get(booklibraryCtrl.getBooklibraryWithNameBranchType);
  router.route('/BookLibrarys/getBooklibraryWithNameType/:name/:ctype/:university').get(booklibraryCtrl.getBooklibraryWithNameType);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
