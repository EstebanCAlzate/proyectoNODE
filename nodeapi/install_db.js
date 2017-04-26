'use strict';


const  mongoose = require('mongoose');
require('./models/Usuario');
//le pedimos a mongoose el model del agente
const Usuario = mongoose.model('Usuario');

mongoose.Promise = global.Promise;

console.log('ok');

const usuario = new Usuario({    
    name: "frey",
    email: "emialejemplo",
    passwd: "contraseñaeje"
});

usuario.save((err, usuarioCreado)=>{    
    if (err) {
        console.log('ERROR DE CARGAR');
        return;
    }    
    console.log('Usuario ' + usuarioCreado.name + ' creado'); 
});

//db.nodepop.insert({name:'ramsy',email:'ejmplo4',contraseña:'psswd4'})