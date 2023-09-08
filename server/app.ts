import * as dotenv from 'dotenv'
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';
import setRoutes from './routes';



const app = express();
app.use(compression());

dotenv.config({ path: '.env' });
app.set('port', (process.env.PORT || 4100));
//change to 4100 for adding in 206 and local 3000 and 4000 prod

app.use(cors({
  origin: '*'
}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit:1024*1024*20,type:'application/x-www-form-urlencoded'
}));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();

});

app.use('/', express.static(path.join(__dirname, '../client')));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static('server/public'))
//use below codes
app.use(express.static('thewaydocument'));
// app.use(express.static('studentdocuments'));

// app.use("/images",  express.static(path.join("server/public/")));


let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

(mongoose as any).Promise = global.Promise;
mongoose.connect(mongodbURI,{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(db => {
    console.log('Connected to MongoDB');
    setRoutes(app);
    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`App listening on port ${app.get('port')}`));
    }
  })
  .catch(err => console.error(err));

export { app };
