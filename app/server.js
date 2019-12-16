'use strict';

var express = require('express');
var app = express()
var cors = require('cors');

const bodyParser = require('body-parser')

//const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://djisu:Timbuk2tudjesu@cluster0-nlxec.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true 
}); 
  const Schema = mongoose.Schema
  var fileSchema =  new Schema({
    filename:  {
      type: String
    },
    size: {
      type: Number
    }
  })


//app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// require and use "multer"...
//var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


app.post('/api/fileanalyse', (req, res) => {
    let fileName = req.params.filename
    let fileSize = req.params.size
    
    const File = mongoose.model("File", fileSchema); 
      var user = new File({
        filename: fileName,
        size: fileSize
      })
     user.save(function(err, data) {
        if (err){
          res.json({'message': err.toString()})
        } else {
          res.json({'filename': fileName, 'size': fileSize})
        }
      })
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
