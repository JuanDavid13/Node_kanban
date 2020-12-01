const socket = io();

const cl = document.getElementById('cl');
const l1 = document.getElementById('sortable1');
const form = document.getElementById('form');
const formb = document.getElementById('formb');


cl.addEventListener('click',()=>{
    //socket.emit('clicked','nose');
    let e = new evento('tarea algo','algo');
    console.log(e.getNombre());
    e.setNombre('tarea 6');
    console.log(e.getNombre());
});

socket.on('list',(list)=>{
    $('#sortable1').empty();
    let i;
    for(i = 0; i< list.length ; i++){
        const task = document.createElement('div');
        const taskTitle = document.createElement('span');
        const taskDesc = document.createElement('span');
        const taskFech = document.createElement('span');

        
        e.innerHTML = `${list[i][1]}`;
        e.classList.add('ui-state-default');

        l1.appendChild(e);
    }
});

$( function() {
    
    /*$('#formb').click((event)=>{
        event.preventDefault();
    });*/

    $('task').sortable({
        connectWith: '.sortable',
        cursor: 'grabbing',
        update: (event,ui)=>{
            let arr = [];

        }
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


    $( "#sortable1, #sortable2, #sortable3" ).disableSelection();
  } );