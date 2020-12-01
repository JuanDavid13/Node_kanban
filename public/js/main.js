const socket = io();

const cl = document.getElementById('cl');
const l1 = document.getElementById('sortable1');
const form = document.getElementById('form');
const formb = document.getElementById('formb');


const todo = document.getElementById('todoWrap');
const progress = document.getElementById('progressWrap');
const testing = document.getElementById('testingWrap');
const done = document.getElementById('doneWrap');

/*
cl.addEventListener('click',()=>{
    //socket.emit('clicked','nose');
    let e = new evento('tarea algo','algo');
    console.log(e.getNombre());
    e.setNombre('tarea 6');
    console.log(e.getNombre());
});
*/

socket.on('list',(lists)=>{
    $('.sortable').empty();
    console.log('lista:');
    console.log(lists);
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
    
    $('.plus').click((event)=>{
        event.preventDefault();
    });


    //Quizas es mejor hacerlo con un arrray y un foreach
    $('#tsPlus').click(()=>{
        if($('#tPlus').css('height') == '215px'){
            $('#tsPlus').css('transform','rotate(0deg)');
            $('#tPlus').css('height','35px');
            //hay que hacer desaparecer a los otros elementos
            //.css('display','none');
        }else{
            $('#tPlus').css('height','215px');
            $('#tsPlus').css('transform','rotate(45deg)');
        }        
    })

    $('#psPlus').click(()=>{
        if($('#pPlus').css('height') == '215px'){
            $('#pPlus').css('height','40px');
            //hay que hacer desaparecer a los otros elementos
            //.css('display','none');
        }else{$('#pPlus').css('height','215px');}        
    })

    $('#tesPlus').click(()=>{
        if($('#tePlus').css('height') == '215px'){
            $('#tePlus').css('height','40px');
            //hay que hacer desaparecer a los otros elementos
            //.css('display','none');
        }else{$('#tePlus').css('height','215px');}        
    })

    $('#dsPlus').click(()=>{
        if($('#dPlus').css('height') == '215px'){
            $('#dPlus').css('height','40px');
            //hay que hacer desaparecer a los otros elementos
            //.css('display','none');
        }else{$('#dPlus').css('height','215px');}        
    })


    $('.sortable').sortable({
        connectWith: '.sortable',
        dropOnEmpty: true,
        cursor: 'grabbing',
        placeholder: "plholder",
        items:'div:not(.plus)',
        revert:200,
        update: (event,ui)=>{
            let arr = [];
            let todo = [];
            let progress = [];
            let testing = [];
            let done = [];
            //console.log($('#todoWrap div').length);
            //console.log($('#grid').toArray()[0]['childNodes'][15]['childNodes'][1]['childNodes'][0]['childNodes']);
            //console.log($('#todoWrap div').toArray()[0]['childNodes'][0].innerHTML);


            //const tam = $('#grid').toArray()[0]['childNodes'][15]['childNodes'][1]['childNodes'].length;
            //console.log($('#grid').toArray()[0]['childNodes'][15]['childNodes'][1]['childNodes'][1]);

            for(let i = 15; i < 23; i+=2){
                let tam = $('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'].length;
                for(let j = 0; j< tam; j++){
                    let tam2 = $('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'].length;
                    //console.log($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'].length);
                    let aux = [];
                    for(let k = 0; k < tam2; k++){
                        //console.log($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'][k].innerHTML)
                        
                        switch(i){
                            case 15:{
                                //console.log('todo');                                
                                aux.push($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'][k].innerHTML);     
                            };break;
                            case 17:{
                                //console.log('progress')
                                aux.push($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'][k].innerHTML);
                            };break;
                            case 17:{
                                //console.log('progress')
                                aux.push($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'][k].innerHTML);
                            };break;
                            case 19:{
                                //console.log('testing')
                                aux.push($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'][k].innerHTML);
                            };break;
                            case 21:{
                                //console.log('done')
                                aux.push($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'][k].innerHTML);
                            };break;
                            default:{console.log('An error has occurred')};break;
                        }
                        
                    }
                    switch(i){
                        case 15:{todo.push(aux);};break;
                        case 17:{progress.push(aux);};break;
                        case 19:{testing.push(aux);};break;
                        case 21:{done.push(aux);};break;
                        default:{};break;
                    }
                        
                   //console.log($('#grid').toArray()[0]['childNodes'][i]['childNodes'][1]['childNodes'][j]['childNodes'][0].innerHTML);
                }
            }

            arr.push(todo);
            arr.push(progress);
            arr.push(testing);
            arr.push(done);
            console.log(arr);

            socket.emit('change',arr);
        },
        start: (event,ui)=>{
            ui.item.css('transform','rotate(10deg)');
        },
        stop: (event,ui)=>{
            ui.item.css('transform','rotate(0deg)'); 
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

    $('#todo','#progress','testing','#done').disableSelection();
  } );