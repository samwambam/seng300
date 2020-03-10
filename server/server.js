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

// CREATE SESSION 
app.use(session({
	secret: 'seng300',
	resave: true,
	saveUninitialized: true
}));


//CREATE CONNECTION
const db = mysql.createConnection({
  host     : keys.DB_HOST,
  user     : keys.DB_USER,
  port     : keys.DB_PORT,
  password : keys.DB_PASSWORD,
  database : keys.DB_DATABASE
});

//CONNECT
db.connect( (err) => {
  if(err) throw err;
  console.log('MySQL Connected...');
});

//CHECK LOGIN CREDENTIALS
app.post('/auth', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    db.query('SELECT * FROM student WHERE student_id = ? AND password = ?',[username,password], (error, results, fields) => {
      if (results.length>0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/portal');
      } else {
        res.redirect('/');
        // res.send('Invalid Credentials');
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password');
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

