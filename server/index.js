import express from 'express';
const app = express()

import cors from 'cors';

import { body, validationResult } from 'express-validator';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/studentDB', () => { console.log('Connected with datase') });

import { StudentRout } from './module/student.modal.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send('Hello World from express server')
})


app.post('/addstudent', [
  body('email', 'Please enter valid email format').isEmail(),
  body('name', 'Please enter atleast 5 character for name').isLength({ min: 5 }),
  body('fname', 'Please enter atleast 5 character, father name').isLength({ min: 5 }),
  body('mobile', 'Please enter atleast 5 character for mobile').isLength({ min: 5 }),
  body('address', 'Please enter atleast 5 character for address').isLength({ min: 5 }),
  body('cnic', 'Please enter atleast 5 character for cnic').isLength({ min: 5 }),
  body('password', 'Please enter atleast 5 character for password').isLength({ min: 5 }),

], function (req, res) { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  StudentRout.create({
    sname: req.body.name,
    fname: req.body.fname,
    mobile: req.body.mobile,
    address: req.body.address,
    cnic: req.body.cnic,
    email: req.body.email,
    password: req.body.password
  }).then(student => res.json(student));
 
})

// --------------------------------------------------------------------
app.get('/allstudent', function (req, res) {

  StudentRout.find({}, (err, item) => {
    if (err) {
      consolo.log('Error from student route:', err);
      res.send(err);
    }
    res.json(item);
  });
})

app.delete('/allstudent/:sid', function (req, res) {

  console.log('sid ', req.params.sid);

  StudentRout.deleteOne({ _id: req.params.sid }, function (err) {
    if (err) {
      consolo.log('Error from student route:', err);
      res.send(err);
    }
    res.send('record deleted');
  });
  
})

// GET SINGLE TODO
app.get('/onestudent/:sid', function (req, res) {

  var query = mongoose.Types.ObjectId(req.params.sid); 

  StudentRout.findById({ _id: query }, (err, item) => {
    if (err) {
      console.log('Error from one student route:', err);
      res.send(err);
    }
    res.json(item);
  });
})

app.put('/onestudent/:sid', function (req, res) {
    
  var query = mongoose.Types.ObjectId(req.params.sid); 

  StudentRout.findByIdAndUpdate({_id: query}, 
    {$set: {
    sname: req.body.sname,
    fname: req.body.fname,
    address: req.body.address,
    email: req.body.email,
    pasword: req.body.password,
    mobile: req.body.mobile,   
    cnic: req.body.cnic,
}})
    .exec()
    .then(
    doc => {
        res.json(doc);            
        console.log('Update :', doc)
        res.send('Record has been updated');
    }).catch(err => console.log(err));  
})


app.listen(5000, () => { console.log('server is running on port 5000') })