// const multer=require('multer')
// const MIME_TYPE_MAP={
//   'image/png':'png',
//   'image/jpeg':'jpg',
//   'image/jpg':'jpg'
// }
// var storage = multer.diskStorage({
//   destination:function(req,file,cb)
//   {
//     cb(null,'server/public/images')
//   },
//   filename:function(req,file,cb){
//     // cb(null,file.fieldname + '-' + Date.now() + '.png')
//     const name=file.originalname.toLowerCase();
//     const ext=MIME_TYPE_MAP[file.mimetype];
//     cb(null,name);

//   }
// })

// var upload = multer({ storage })

// module.exports = upload;
// // export default upload;
