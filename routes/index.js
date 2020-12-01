const express = require('express');
const router = express.Router();

let user = [
    ['juanito','algo'],
    ['maria','nose']
]

router.get('/', (req,res,next)=>{
    res.render('index');
    //console.log('hola estoy aquí, valgo para algo');
});

router.post('/', (req,res,next)=>{
    res.render('index');
    console.log(req.body.nombre);
    console.log(user[0]);
});

router.get('/login', (req,res,next)=>{
    res.render('login');
});

router.post('/login', (req,res,next)=>{
    const nombre = req.body.nombre;
    let i = 0;
    const tam = user.length;
    console.log(tam);
    while(i<tam){
        if(req.body.nombre == user[i][0] && req.body.pass == user[i][1]){
            console.log('está');
            res.redirect('./');
        }            
        i++;
    }
    res.redirect('./login');

    console.log(req.body);
});


module.exports = router;