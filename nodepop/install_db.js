'use strict';

require('./models/Usuario');

const  mongoose = require('mongoose');
//le pedimos a mongoose el model del agente
const Usuario = mongoose.model('Usuario');

console.log('ok');

const usuario = new Usuario({    
    name: "may",
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