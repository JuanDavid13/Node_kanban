const logbut = document.getElementById('change');
const login = document.getElementById('login');
const signup = document.getElementById('signup');
logbut.addEventListener('click',()=>{
	if(login.style.left == '-100%'){
		signup.style.left ='0%';
		login.style.left  ='0%';
		logbut.innerText  ='Registrate';
	}else{
		signup.style.left ='-100%';
		login.style.left  ='-100%';
		logbut.innerText  ='Atrás';
	}
});
