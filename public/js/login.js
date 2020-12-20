//the porpuse of this file is to manage the login system

//get from the dom the needed elements
const logbut = document.getElementById('change');
const login = document.getElementById('login');
const signup = document.getElementById('signup');

//if the logbut is clicked change the content of the page
logbut.addEventListener('click',()=>{
	if(login.style.left == '-100%'){
		signup.style.left ='0%';
		login.style.left  ='0%';
		logbut.innerText  ='Sign In';
	}else{
		signup.style.left ='-100%';
		login.style.left  ='-100%';
		logbut.innerText  ='Back';
	}
});
