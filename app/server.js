const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://djisu:Timbuk2tudjesu@cluster0-nlxec.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true 
}); 
  const Schema = mongoose.Schema
  var userSchema =  new Schema({
    username:  {
      type: String
    }
  })


app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

// create our schema
app.post('/api/exercise/new-user', (req, res) => {



  const User = mongoose.model("User", userSchema); 
  var user = new User({
    username: 'kofi'
  })
 user.save(function(err, data) {
    if (err){
      res.json({'message': err.toString()})
    } else {
      res.json({'user': data})
    }
  })
  })
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
