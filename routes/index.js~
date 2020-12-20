
//these are requirementes
const express = require('express');
//these is the route module that epxress provide
const router = express.Router();


//Here I'm setting a bacis api for the website
//if the client send a get or post petition
//at '/' the index.ejs page will be render
router.get('/', (req,res,next)=>{
    res.render('index');
});

router.post('/', (req,res,next)=>{
    res.render('index');
});

//if the client does a get petition to the '/login' route
//the login.ejs page will be render
router.get('/login', (req,res,next)=>{
    res.render('login');
});


//here I set the initial list of registered users
let user = [
    ['juanito','algo'],
    ['maria','nose']
]

//if the client send a post petition to '/login'
//depending of the action, it will do one thing or another.
router.post('/login', (req,res,next)=>{
    
//if the user wants to login:
if(req.body.action == 'login'){
	//firstly it will check that all the fields have some content
	if(req.body.nombre != '' || req.body.pass != ''){

	//Then it will check if the user is at the user's list
	  let i = 0;
	  while(i<user.length){
	    if(req.body.nombre == user[i][0] && req.body.pass == user[i][1]){
	    	//if the user is at the user's lists, then the client will be
		//redirected to the kanban board or index.ejs page;
		res.redirect('./');
	    }else
		i++;
	  }
	}
	//if the client is not at the user's list
	//the client will be redirected back to the login page
	    res.redirect('./login');
//if the user wants to sig up
    }else if(req.body.action == 'signin'){
	//fistly it check that all the fields have some content and that both passwords are the same
	if(req.body.nombre != '' && req.body.pass != '' && (req.body.pass == req.body.checkpass)){
	//if the those requirements are ok, a new user is added to the user's list
	//with the help of an auxiliar array
	  let aux = [];
	//the data from the form is catched and pushed to the auxiliar array
	  aux.push(req.body.nombre,req.body.pass);
	//the the user is added to the user's list
	  user.push(aux);
	//and the client is redirected to the kanban board or index.ejs
 	  res.redirect('./');
	}
	    //if the inputs failed the client is sent back to the login page
	    res.redirect('./login');
    }
	//just in case something fails, the client is sent to the login page
    	res.redirect('./login');
});

//In this page the router has to be exported so it can be used at the server.js file
module.exports = { router };
