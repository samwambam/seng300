const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const keys = require('./config');
var session = require('express-session');
const PORT = process.env.PORT || 5000;

const app = express();

//STATIC FOLDER
app.use(express.static(path.join(__dirname,'../client/build')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//CREATE CONNECTION
const db = mysql.createConnection({
  host     : keys.DB_HOST,
  user     : keys.DB_USER,
  port     : keys.DB_PORT,
  password : keys.DB_PASSWORD,
  database : keys.DB_DATABASE
});

// connect to database
db.connect( (err) => {
  if(err) throw err;
  console.log('Connection established with MySQL database');
});

// function to query database and send response
function sendQuery(sql, res) {
  let query = db.query(sql, (err,results) => {
    if (err) {
      res.json({
        'status' : 300,
        'error': err 
      });
    } else {
      res.json({
          'status' : 200,
          'error': null,
          'response' : results
      });
    }
  });
}

// check login credentials
app.post('/auth', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    db.query('SELECT * FROM user WHERE username = ? AND password = ?',[username,password], (error, results, fields) => {
      if (results.length>0) {
        res.redirect('/portal');
      } else {
        res.redirect('/');
        res.end();
        // res.send('Invalid Credentials');
      }
    });
  } else {
    res.redirect('/');
    res.end();
  }
});

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    res.send('Welcome back' + req.session.username);
  } else {
    res.send('Please Login to View this page');
  }
})


// get all scholarships
app.get('/api/scholarships', (req,res) => {
  let sql = 'SELECT * from scholarship';
  sendQuery(sql, res);
});

// get single scholarship
app.get('/api/scholarships/:id', (req,res) => {
  let sql = `SELECT * from scholarship WHERE scholarship_id=${req.params.id}`;
  sendQuery(sql, res);
});

//get all scholarships applied to by a certain person
app.get('/api/scholarships/applied/:user_id', (req,res) => {
  let sql = 'SELECT scholarship.* ' +
            'FROM scholarship ' + 
            'INNER JOIN apply ON (scholarship.scholarship_id = apply.scholarship_id) ' +
            `WHERE student_id = ${req.params.user_id};`
  sendQuery(sql, res);
});

//apply to a scholarship
app.post('/api/scholarships/apply/:student_id/:scholarship_id', (req,res) => {
  let sql = 'INSERT INTO scholarships.apply (student_id, scholarship_id)' + 
            `VALUES (${req.params.student_id}, ${req.params.scholarship_id})`;
  sendQuery(sql, res);
});

//get information about student
app.get('/api/students/:student_id', (req,res) => {
  let sql = `SELECT * from student WHERE student_id = ${student_id}`
  sendQuery(sql, res);
});

app.listen(PORT, () => {
  console.log(`API server started on port ${PORT}`);
})

