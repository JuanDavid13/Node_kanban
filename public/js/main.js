const socket = io();

const cl = document.getElementById('cl');
const l1 = document.getElementById('sortable1');
const form = document.getElementById('form');
const formb = document.getElementById('formb');


const todo = document.getElementById('todoWrap');
const progress = document.getElementById('progressWrap');
const testing = document.getElementById('testingWrap');
const done = document.getElementById('doneWrap');


cl.addEventListener('click',()=>{
    //socket.emit('clicked','nose');
    let e = new evento('tarea algo','algo');
    console.log(e.getNombre());
    e.setNombre('tarea 6');
    console.log(e.getNombre());
});

socket.on('list',(lists)=>{
    $('.sortable').empty();

    for(let i = 0; i< lists.length ; i++){
        for(let j = 0; j < lists[i].length;j++){

            //console.log(lists[i].length);        
            //console.log(lists[i][j][2]);

            const task = document.createElement('div');

            const taskTitle = document.createElement('span');
            const taskDesc = document.createElement('span');
            const taskFech = document.createElement('span');

            taskTitle.innerText = lists[i][j][0];
            taskDesc.innerText = lists[i][j][1];
            taskFech.innerText = lists[i][j][2];

            taskTitle.classList.add('task-title');
            taskDesc.classList.add('des');
            taskFech.classList.add('fet');

            task.appendChild(taskTitle);
            task.appendChild(taskDesc);
            task.appendChild(taskFech);

            task.classList.add('task');
            
            switch(i){
                case 0:{todo.appendChild(task);};break;
                case 1:{progress.appendChild(task);};break;
                case 2:{testing.appendChild(task);};break;
                case 3:{done.appendChild(task);};break;
                default:{};break;
            }
        }
    }
});

$( function() {
    
    /*$('#formb').click((event)=>{
        event.preventDefault();
    });*/


    $('.sortable').sortable({
        connectWith: '.sortable',
        cursor: 'grabbing',
        placeholder: "plholder",
        items:'div:not(.plus)',
        revert:200,
        update: (event,ui)=>{
            let arr = [];

        },
        start: (event,ui)=>{
            ui.item.css('transform','rotate(10deg)');
        },
        stop: (event,ui)=>{
            ui.item.css('transform','rotate(0deg)'); 
        }
    });

    $('.plus').click(()=>{
        console.log('hola');
    });

    /*
    $( "ul.droptrue" ).sortable({
      connectWith: "ul",
      cursor: "grabbing",
      update: function( event, ui ) {
        //console.log('change');
        //socket.emit('change');
        let arr = [];
        console.log($('#sortable1 li').length);
        const tam = $('#sortable1 li').length;
        //console.log($('#sortable1 li').toArray()[1].innerHTML);
        for(let i = 0; i < tam ; i++){
            //console.log(i,'[',$('#sortable1 li').toArray()[i].innerHTML,']');
            let text = $('#sortable1 li').toArray()[i].innerHTML;
            arr.push([i,text]);
        }
        console.log($('#sortable1').attr('id'));
        console.log(arr);

        socket.emit('change',arr);

        /*
        const arr = $('ul.droptrue').sortable('toArray');
        let i;
        for(i=0;i<arr.length;i++){
            console.log(arr[i].innerHTML);
        }
        */

        //socket.emit('change',($('ul.droptrue').sortable('toArray')));
/*
    }
    });
*/
    /*$( "ul.dropfalse" ).sortable({
      connectWith: "ul",
      dropOnEmpty: false
    });*/

    $('#todo','#progress','testing','#done').disableSelection();
  } );