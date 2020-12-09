const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const engine = require('ejs-mate');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.urlencoded({extended: false}));

//settings
app.engine('ejs', engine);
app.set('views',path.join(__dirname,'public'));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

//Routes middlewares
app.use('/' ,require('./routes/index'));
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/login' ,require('./routes/index'));
app.use('/login',express.static(path.join(__dirname,'public')));

//lists
let user = [
    ['juanito','algo']
]

let list1 = [
    [0,'tarea 0'],
    [1,'tarea 1'],
    [2,'tarea 2'],
    [3,'tarea 3'],
];

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
    //console.clear();
    console.log(lists[0][0][0]);
    io.emit('list',lists);

    socket.on('change',(li)=>{
        console.log(li.length);
    });

    socket.on('change',(arr)=>{
        console.log('algo');
        lists = arr;
        console.log(lists[0][0][0]);
        io.emit('list',lists);
    });

    socket.on('new',(arr)=>{
        lists[0].push(arr);
        console.log(arr[0]);
        io.emit('list',lists);
    });
    /*
    io.emit('list',list1);
    socket.on('clicked',(text)=>{
        list1.push(text);
        io.emit('list',list1);
    });
    
    socket.on('change',(arr)=>{
        //console.log(array.length);
        console.log('///////////////////');
        for(let i = 0; i < arr.length ; i++){
            //console.log(i,'[',arr[i][1],']');

            //list1[i][0] = arr[i][0];
            //list1[i][1] = arr[i][1];

            list1 = arr;

            //console.log(i,'[',list1[i][1],']');
            io.emit('list',list1);
        }
        
    });
    */
});


//listener
server.listen(PORT,'localhost',()=>{
    console.log(`Server running at port: ${PORT}`);
});