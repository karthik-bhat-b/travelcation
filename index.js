var express = require('express');
var bodyParser=require('body-parser');
var session = require('express-session');

var connection = require('./config');
var app = express();
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var insertPackage=require('./controllers/add-package');
var adduser=require('./controllers/adduser');
var pview = require('./controllers/pview');
var reserve= require('./controllers/reserve');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'ssshhhhh'}));

var sess;
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    
    res.render('pages/login');
});
// render login page
app.get('/login', function(req, res) {
    res.render('pages/login');
});
//render reg page
app.get('/reg', function(req, res) {
    res.render('pages/reg');
});
//render admin page
app.get('/admin', function(req, res) {
    res.render('pages/adminmain');
});
//
app.get('/packageinsert', function(req, res) {
    res.render('pages/packageinsert');
});
//
app.get('/main', function(req, res) {  
    connection.query("SELECT * from packages",function(error,rows,fields){
        if(error){

        }
        else{
            res.render('pages/main',{user:req.session.name,rows});
        }
    })  

});
app.get('/packdetails', function(req, res) {
    pid=Number(req.session.pid);
    // res.json({
    //     status:false,
    //     message:"Email and password does not match  "+req.session.pid
    //    });
connection.query("SELECT * FROM packages WHERE p_id = ?",[pid],function(err,rows,fields){
    if(err){
              res.render('pages/reg');
    }else{
        res.render('pages/packdetails',{rows:rows});
    }
})
    
  
});

//for adding new user through admin account
app.get('/adduser', function(req, res) {

    
    res.render('pages/adduser');
});
app.get('/reservation', function(req, res) {
    res.render('pages/reservation',{n:req.session.n});
});

//
app.get('/logout', function(req, res) {
    if (req.session.name) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
    
});
//
app.get('/viewuser', function(req, res) {
    connection.query("SELECT * FROM users",function(error,rows,fields){
        if(error){

        }
        else{
            // var obj=JSON.stringify(rows);
            res.render('pages/viewuser',{user:rows});
        }
    });
    
});

app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

app.post('/api/insert',insertPackage.insert);
app.post('/controllers/add-package',insertPackage.insert);

app.post('/api/adduser',adduser.useradd);
app.post('/controllers/adduser',adduser.useradd);

app.post('/api/pview',pview.viewthat);
app.post('/controllers/pview',pview.viewthat);

app.post('/api/reserve',reserve.continue);
app.post('/controllers/reserve',reserve.continue);

app.listen(8080);
console.log('8080 is the magic port');
