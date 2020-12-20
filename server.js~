
//requirements
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

//require the tamplate engine
const engine = require('ejs-mate');

//creating the server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//needed to request the body of the post message of the form
app.use(express.urlencoded({extended: false}));

//requiring the router
const router = require('./routes/index.js');

//settings
app.engine('ejs', engine);
app.set('views',path.join(__dirname,'public'));
app.set('view engine', 'ejs');

//specify the port
const PORT = process.env.PORT || 80;

//Routes and middlewares
app.use('/' ,router.router);
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/login' ,router.router);
app.use('/login',express.static(path.join(__dirname,'public')));

//Set initial Tasks
let todo = [
    [
        'Finish backend proyect',
        'I have to finish the backend proyect',
        '11-12-2020'
    ],
    [
        'Learn C',
        'This weekend I want to learn a bit of C programming language',
        '18-12-2020'  
    ],
    [
        'Finish Login form',
        'Finish login form before sending to production',
        '15-12-2020' 
    ]
];

let progress = [
    [
        'Finish Landing page',
        'Finish landing page style',
        '11-12-2020'
    ]
];

let testing = [
    [
        'Complete navbar links',
        'check if all navbar links works fine',
        '09-12-2020'
    ]
];

let done = [
    [
        'Deployment proyect',
        'Finish deployment proyect',
        '11-12-2020'
    ]
];

let lists = [todo,progress,testing,done];



//socket io
io.on('connection', (socket) =>{
    //when someone enters, they emit the list event
    //this way every one see the lists
    io.emit('list',lists);
	
	//when the 'change' event happends
	//the lists are equal to the lists sended
	//by the frontend
	//and then this lists are sent back to the frontend
	socket.on('change',(arr)=>{
        	lists = arr;
        	io.emit('list',lists);
    	});
    	
	//When the 'delete' event happends
	//the frontend send what element has to be deleted
	//this way the backend delete from the lists the element
	//and then send back all the lists
	socket.on('delete',(arr)=>{
		//here the correct list is choosen
		//and then, the task is deleted form that list
		switch(arr[0]){
			case '0':{lists[0].splice(arr[1],1);};break;
			case '1':{lists[1].splice(arr[1],1);};break;
			case '2':{lists[2].splice(arr[1],1);};break;
			case '3':{lists[3].splice(arr[1],1);};break;
			//if there was no column choosen from the frontend
			//a error message is displayed
			default:{console.log('Error, no column choosen');};break;
		}
		io.emit('list',lists);
	});

	//when an element is added by the frontend
	//the backend get that element and push it
	//on the corresponding list.
	//Then all lists are sent back to the fronted
	socket.on('add',(arr)=>{
		//an auxiliar array is neede to push the new task
		let aux = [];
		//here, the arguments sent by the frontend are pushed
		//to the auxiliar array
		aux.push(arr[1],arr[2],arr[3]);
		//now the correct list is choosen
		//and the task, now at the auxiliar array, is pushed to that
		//list, at the very first position
		switch(arr[0]){
			case '0':{lists[0].unshift(aux);};break;
			case '1':{lists[1].unshift(aux);};break;
			case '2':{lists[2].unshift(aux);};break;
			case '3':{lists[3].unshift(aux);};break;
			//if there wasn't any column choosen then, an error message is displayed
			default:{console.log('Error, no column choosen');};break;
		}
		io.emit('list',lists);
	});

});



//listener
server.listen(PORT,'localhost',()=>{
    console.log(`Server running at port: ${PORT}`);
});

//for future porpuse this file export the lists
module.exports = { lists };
