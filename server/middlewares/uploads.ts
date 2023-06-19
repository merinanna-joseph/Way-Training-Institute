const multer=require('multer');

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg',
  'image/pdf':'pdf',

}
const maxSize=1 * 1024;
var fs = require('fs');
var storage = multer.diskStorage({
   destination:function(req,file,cb)
  {
    
    if(req.params.type == 'studymaterials'){
      // const directory = `server/public/images/studymaterials/${req.params.studymaterialid}`
      const directory = `timesdocument/studymaterials/${req.params.studymaterialid}`
      // const directory = `server/public/images/studymaterials/${req.params.studymaterialid}`

      console.log(directory,"direct",req.params.type);

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
      }
      cb(null, directory)
    }else if(req.params.type == 'studentdocuments'){
      // const directory = `server/public/images/studentdocuments/${req.params.studentid}`
      const directory = `timesdocument/studentdocuments/${req.params.studentid}`

      console.log(directory,"direct",req.params.type);

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
      }
      cb(null, directory)
    }
    
    // cb(null,'server/public/images')
    // cb(null, 'timesdocument');

  },
  filename:function(req,file,cb){
    const ext=MIME_TYPE_MAP[file.mimetype];
    
    let pos = file.originalname.lastIndexOf('.'); // get last position of `.`
    let extension = file.originalname.slice(pos + 1); 
    console.log(file.originalname,"filename",pos," ",extension);
    // if(extension == 'pdf'){
    //   cb(null,file.originalname + '-' + Date.now() + '.pdf')

    // }else if(extension == 'txt'){
    //   cb(null,file.originalname + '-' + Date.now() + '.txt')

    // }else if(extension == 'xlsx'){
    //   cb(null,file.originalname + '-' + Date.now() + '.xlsx')

    // }else if(extension == 'xls'){
    //   cb(null,file.originalname + '-' + Date.now() + '.xls')

    // }else if(extension == 'doc'){
    //   cb(null,file.originalname + '-' + Date.now() + '.doc')

    // }else if(extension == 'docx'){
    //   cb(null,file.originalname + '-' + Date.now() + '.docx')

    // }else{
    //   cb(null,file.originalname + '-' + Date.now() + '.png')

    // }
    cb(null,file.originalname + '-' + Date.now() + '.'+extension)

    // const name= file.originalname
    // .toLowerCase();
    // cb(null,name);

  },




})

// var upload = multer({ storage },
  var upload = multer({ storage ,limits:{fileSize:20 * 1024 *1024}},

  )

module.exports = upload;
// export default upload;
