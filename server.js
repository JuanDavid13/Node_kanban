const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const engine = require('ejs-mate');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.urlencoded({extended: false}));

const router = require('./routes/index.js');

//settings
app.engine('ejs', engine);
app.set('views',path.join(__dirname,'public'));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

//Routes middlewares
app.use('/' ,router.router);
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/login' ,router.router);
app.use('/login',express.static(path.join(__dirname,'public')));

let todo = [
    [
        'Terminar Frontend',
        'Alguna descripción aquí',
        '11-12-2020'
    ],
    [
        'Terminar Backend',
        'Alguna descripción aquí',
        '11-12-2020'  
    ],
    [
        'Terminar Despliegue',
        'Alguna descripción aquí',
        '11-12-2020' 
    ]
];

let progress = [
    [
        'Terminar Frontend',
        'Alguna descripción aquí',
        '11-12-2020'
    ],
    [
        'Terminar Backend',
        'Alguna descripción aquí',
        '11-12-2020'
    ]
];

let testing = [
    [
        'Terminar Backend',
        'Alguna descripción aquí',
        '11-12-2020'
    ]
];

let done = [
    [
        'Terminar Frontend',
        'Alguna descripción aquí',
        '11-12-2020'
    ]
];

let lists = [todo,progress,testing,done];



//socket io
io.on('connection', (socket) =>{

    io.emit('list',lists);

    socket.on('change',(arr)=>{
        lists = arr;
        io.emit('list',lists);
    });
    
	socket.on('delete',(arr)=>{
		switch(arr[0]){
			case '0':{lists[0].splice(arr[1],1);};break;
			case '1':{lists[1].splice(arr[1],1);};break;
			case '2':{lists[2].splice(arr[1],1);};break;
			case '3':{lists[3].splice(arr[1],1);};break;
			default:{console.log('no ha entrado en ninguno');};break;
		}
		io.emit('list',lists);
	});

	socket.on('add',(arr)=>{
		let aux = [];
		aux.push(arr[1],arr[2],arr[3]);
		switch(arr[0]){
			case '0':{lists[0].unshift(aux);};break;
			case '1':{lists[1].unshift(aux);};break;
			case '2':{lists[2].unshift(aux);};break;
			case '3':{lists[3].unshift(aux);};break;
			default:{console.log('no ha entrado en ninguno');};break;
		}
		io.emit('list',lists);
	});

});



//listener
server.listen(PORT,'localhost',()=>{
    console.log(`Server running at port: ${PORT}`);
});

module.exports = {
	lists
};
