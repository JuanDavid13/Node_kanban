
/*
 *
 * SOCKET IO STARTER
 *
 */

const socket = io();

/*
 *
 * DOM ELEMENTS AND COLORS
 *
 */
const action = document.getElementById('actions');
const add = document.getElementById('addbutton');
const del = document.getElementById('deletebutton');
const addForm = document.getElementById('addForm');
const delForm = document.getElementById('deleteForm');

const col1 = "rgb(97, 61, 193)";
const col2 = "rgb(171, 146, 191)";

const grid = document.getElementById('grid');
const todo     = document.getElementById('todo');
const progress = document.getElementById('progress');
const testing  = document.getElementById('testing');
const done     = document.getElementById('done');


/*
 *
 * SOCKET IO
 *
 */
socket.on('list',(list)=>{
    $('.sortable').empty();
     render(list);   
});


/*
 *
 *	FUNCTIONS
 *
 */
function getColor(element){
	return $(element).css('backgroundColor');
}

function changeColor(element,color1,color2){
	$(element).css('backgroundColor',color1);
	$(element).css('color',color2);
}

function setDefaultColor(element){
	$(element).css('backgroundColor',col2);
	$(element).css('color',col1);
}


function render(list){
	
  for(let i = 0; i< list.length ; i++){
    for(let j = 0; j < list[i].length;j++){
      const task = document.createElement('div');
      task.innerHTML = `<div class="top"><span class="title">${list[i][j][0]}</span><span>#${j+1}</span></div><div class="description">${list[i][j][1]}</div><span class="date">${list[i][j][2]}</span>`;
       task.classList.add('task');
            
       switch(i){
         case 0:{todo.appendChild(task);};    break;
         case 1:{progress.appendChild(task);};break;
         case 2:{testing.appendChild(task);}; break;
         case 3:{done.appendChild(task);};    break;
         default:{};break;
        }
     }
  }
  console.log('render',list);
}


  //variables needed
  let cols;
  let aux   = [];
  let lists = [[],[],[],[]];
  
function getLists(){
  for(let a = 0; a < lists.length; a++){ lists[a] = []; }
  cols = grid.children;
  for(let i =0; i<cols.length;i++){
    for(let j =0;j < cols[i].children.length;j++){
      aux = [];
      for(let k = 0; k< cols[i].children[j].children.length; k++){
        if(k == 0){
	  aux.push(cols[i].children[j].children[k].children[0].innerText);
	}else
	  aux.push(cols[i].children[j].children[k].innerText);
      }
      switch(i){
        case 0:{lists[i].push(aux)};break;
	case 1:{lists[i].push(aux)};break;
	case 2:{lists[i].push(aux)};break;
	case 3:{lists[i].push(aux)};break;
	default:{};	            break;
      }
    }
  }
  return lists;
}  
/*
 *
 * JQUERY
 *
 */
$( function() {	


	$(add).click(()=>{
		setDefaultColor(del);
		if(getColor(add) == col1){ 
		       changeColor(add,col2,col1);
			$('#addForm input').val('');	
		}else{ changeColor(add,col1,col2); }
		$('#addForm input').val('');
	});
	

	$(del).click(()=>{
		setDefaultColor(add);
		if(getColor(del) == col1){ 
		       changeColor(del,col2,col1);
		}else{ changeColor(del,col1,col2); }
		$('#deleteForm input').val('');
	});

	$(add).click(()=>{
		if(getColor(add) == col1){
			$(grid).css('marginTop','100px');
			$(action).css('height','100px');
			$(addForm).css('display','flex');
			$(deleteForm).css('display','none');
		}else{
			$(grid).css('marginTop','0px');
			$(action).css('height','0px');
			setTimeout(()=>{ $(addForm).css('display','none'); },500);
		}
	});

	$(del).click(()=>{
		if(getColor(del) == col1){
			$(grid).css('marginTop','100px');
			$(action).css('height','100px');
			$(deleteForm).css('display','flex');
			$(addForm).css('display','none');
		}else{
			$(grid).css('marginTop','0px');
			$(action).css('height','0px');
			setTimeout(()=>{ $(deleteForm).css('display','none'); },500);
		}
	});
	
	$('#add').click(()=>{
		setTimeout(()=>{$('#addForm input').val('');},250);
	});


	/*
	 *
	 * ACTIONS
	 *
	 */
	$('#add').click(()=>{
		let aux = [];
		aux.push($('input[type=radio]:checked').val(),$('#name').val(),$('#desc').val(),$('#date').val());
		socket.emit('add',aux);
		console.log('a�adir');
		console.log(aux);
	});	
	
	$('#delete').click(()=>{
		let task = parseInt($('#number').val()-1);
		let aux = [];
		aux.push($('input[type=radio]:checked').val(),task);
		socket.emit('delete',aux);
		console.log('eliminar');
		console.log(aux);
	});


	/*
	 *
	 * SORTABLE
	 *
	 */
	$('.sortable').sortable({
        	connectWith: '.sortable',
        	dropOnEmpty: true,
        	cursor: 'grabbing',
        	placeholder: "holder",
        	revert:200,
        	stop: (event,ui)=>{
			socket.emit('change',getLists());
			ui.item.css('transform','rotate(0deg)');
		},
        	start: (event,ui)=>{
        	    ui.item.css('transform','rotate(10deg)');
        	}
    	});
	$('#todo','#progress','testing','#done').disableSelection();
  

});

