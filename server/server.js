const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const keys = require('./config');
var session = require('express-session');
const PORT = process.env.PORT || 5000;

let user = {
  username: 'x',
  password: 'x',
  type: 'x',
  id: 0,
}

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
  database : keys.DB_DATABASE,
  multipleStatements: true
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
  user.username = req.body.username;
  user.password = req.body.password;
  if (user.username && user.password) {
    db.query('SELECT * FROM user WHERE username = ? AND password = ?',[user.username,user.password], (error, results, fields) => {
      if (results.length>0) {
        req.session.loggedin = true;
        req.session.username = user.username;
        userTypeSetter(null, results[0].user_type);
        res.redirect('/portal');
      } else {
        res.redirect('/');
        res.end();
        // res.send('Invalid Credentials');
      }
      res.end();
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


// set the user.id to the id of the user logging in 
function userIdSetter(err, id) {
  if (err) {
    console.log("ERROR: ", err);
  } else {
    user.id = id;    
  }
}

// set the user.type to the role of the user logging in 
function userTypeSetter(err, type) {
  if (err) {
    console.log("ERROR: ", err);
  } else {
    user.type = type;    
  }
}

// EXPERIMENTAL send last recorded username and user type
app.get('/info', (req, res) => {
  if (user.username === 'x') {
    res.json({
      'status' : 300,
      'error' : 'Not logged in!'
    });
  } else {
    res.json({
      'status' : 200,
      'error' : null,
      'response' : user,
    });
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

//unapply from a scholarship
app.post('/api/scholarships/unapply/:student_id/:scholarship_id', (req, res) => {
  let sql = `DELETE FROM scholarships.apply WHERE student_id=${req.params.student_id} AND scholarship_id=${req.params.scholarship_id}`
  sendQuery(sql, res);
})

//get user id by username
app.get('/api/users/:usertype/:username', (req, res) => {
  let idString;
  switch (req.params.usertype) {
    case 'student':
       idString= 'student_id';
      break;
    case 'faculty':
      idString = 'faculty_id';
      break;
    case 'administrator':
      idString = 'ID';
      break;
  }
  let sql = `SELECT ${idString} FROM ${req.params.usertype} WHERE username = '${req.params.username}'`
  sendQuery(sql, res);
});

//get information about student
app.get('/api/students/:student_id', (req,res) => {
  let sql = `SELECT * from student WHERE student_id = ${req.params.student_id}`
  sendQuery(sql, res);
});

// nominate student for a scholarship
app.post('/api/nominate/:faculty_id/:student_id/:scholarship_id', (req, res) => {
  let sql = 'INSERT into scholarships.nominate (faculty_id, student_id, scholarship_id)' +
            `VALUES (${req.params.faculty_id},${req.params.student_id},${req.params.scholarship_id})`;
  sendQuery(sql, res);
});

// award scholarship to student
app.put('/api/award/:student_id/:scholarship_id', (req,res) => {
  let sql = 'INSERT into scholarships.award (student_id, scholarship_id) ' +
            `VALUES (${req.params.student_id},${req.params.scholarship_id}); ` +        
            'UPDATE scholarships.scholarship ' +
            'SET awarded=1 ' +
            `WHERE (scholarship_id=${req.params.scholarship_id});`;
  sendQuery(sql, res);
});

// accept awarded scholarship
app.put('/api/accept/:student_id/:scholarship_id', (req, res) => {
  let sql = `UPDATE scholarships.award SET accepted=1 ` + 
            `WHERE (student_id=${req.params.student_id} AND scholarship_id=${req.params.scholarship_id});`;
  sendQuery(sql, res);        
});

// reject awarded scholarship
app.post('/api/reject/:student_id/:scholarship_id', (req, res) => {
  let sql = `DELETE FROM scholarships.award` + 
            `WHERE student_id=${req.params.student_id} AND scholarship_id=${req.params.scholarship_id}; ` + 
            `DELETE FROM scholarships.apply WHERE student_id=${req.params.student_id} AND scholarship_id=${req.params,s.scholarship_id}`;
  sendQuery(sql, res);        
});

//get student_id for all applicants for a scholarship
app.get('/api/applicants/:scholarship_id', (req,res) => {
  let sql = `SELECT DISTINCT student_id FROM scholarships.apply WHERE scholarship_id=${req.params.scholarship_id}`;
  sendQuery(sql, res);        
});

//add scholarship to database
app.post('/api/addScholarship',(req,res) => {
  let sql = 'INSERT INTO scholarships.scholarship (scholarship_id, scholarship_name, awarded, ' +       
            'offering_faculty, offering_status, deadline, min_gpa,scholarship_description) VALUES ' +
            `(${req.body.scholarshipId}, \'${req.body.scholarshipName}\', 0, \'${req.body.faculty}\',` +
            `\'${req.body.status}\', \'${req.body.deadline}\',\'${req.body.mingpa}\', \'${req.body.description}\');`;
  sendQuery(sql,res);          
});

// get a list of all scholarships and the average gpa for applying
app.get('/api/getAvgGpa', (req,res) => {
  let sql = 'SELECT scholarship_ID, AVG(gpa) AS average_gpa ' +
            'FROM apply JOIN student USING (student_id) ' +
            'GROUP BY scholarship_id;'
  sendQuery(sql,res);          
});

// get a list of gpa's of scholarships by id
app.get('/api/getGpa/:scholarship_id',(req, res) => {
  let sql = `SELECT gpa FROM apply JOIN student USING (student_id) WHERE scholarship_id=${req.params.scholarship_id}`
  sendQuery(sql,res);
});

// delete a scholarship
app.delete('/api/deleteScholarship/:scholarship_id', (req, res) => {
  let sql = `DELETE FROM scholarships.scholarship WHERE (scholarship_id = ${req.params.scholarship_id});`
  sendQuery(sql,res);
});

//get a number of applicants and average gpa for scholarship
app.get('/api/getCountAndAvgGpa/:scholarship_id', (req,res) =>{
  let sql = `SELECT scholarship_id, COUNT(*) AS num_applied, AVG(gpa) as avg_gpa ` +
            `FROM apply JOIN student USING(student_id) ` +
            `WHERE scholarship_id = ${req.params.scholarship_id} ` +
            `GROUP BY scholarship_id;`;
  sendQuery(sql,res);           
});

/*
TODO: 
edit scholarship? edit what part?
get all applicants for a scholarship

*/
app.listen(PORT, () => {
  console.log(`API server started on port ${PORT}`);
})

