const express = require('express');
const router = express.Router();

let user = [
    ['juanito','algo'],
    ['maria','nose']
]

router.get('/', (req,res,next)=>{
    res.render('index');
});


let todo = [];
let progress = [];
let testing = [];
let done = [];
let lists = [];
router.post('/', (req,res,next)=>{
    res.render('index');

    //console.log(req.body);
    /*
    const server = require('../server.js');
    if(req.body.action == 'add'){
    	let aux = [];
    	aux.push(req.body.nombre,req.body.desc,req.body.date);
    	todo = server.todo;
	progress = server.progress;
	testing = server.testing;
	done = server.done;
	switch (req.body.col){
		case 0:{ todo.push(aux); };    break;
		case 1:{ progress.push(aux); };break;
		case 2:{ testing.push(aux); }; break;
		case 3:{ done.push(aux); };    break;
		default:{};		       break;	
	}
	lists = [todo,progress,testing,done];
    	
    }else if(req.body.action == 'delete'){
	console.log('not implemented yet');
    }
	*/
    /*
    if(req.body.action == 'delete'){
	socket.emit('delete',req.body.col,req.body.number);	
    }else{
	socket.emit('add',req.body.col,req.body.nombre,req.body.desc,req.body,date);
    }
    */
});

router.get('/login', (req,res,next)=>{
    res.render('login');
});

router.post('/login', (req,res,next)=>{
    if(req.body.action == 'login'){
	if(req.body.nombre != '' || req.body.pass != ''){
	  let i = 0;
	  while(i<user.length){
	    if(req.body.nombre == user[i][0] && req.body.pass == user[i][1]){
	    	res.redirect('./');
	    }else
		i++;
	  }
	  res.redirect('./');
	}
    }else if(req.body.action == 'signup'){
	if(req.body.nombre != '' || req.body.pass != ''){
	  let aux = [];
	  aux.push(req.body.nombre,req.body.pass);
	  user.push(aux);
 	  res.redirect('./');
	}
    }
    	res.redirect('./login');
    //console.log(user);
    //console.log(req.body);
});


module.exports = {router,lists};
