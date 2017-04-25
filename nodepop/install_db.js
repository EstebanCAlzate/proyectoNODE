'use strict'

console.log('ok');

db.nodepop.insert({name:'may' , email:'ejemplo', contraseña:'ejemploc'})

/*
require('./models/Usuario')

const  mongoose = require('mongoose');
//le pedimos a mongoose el model del agente
const Usuario = mongoose.model('Usuario');

const usuario = new Usuario({    
    name: "jonh",
    email: "emialejemplo",
    contraseña: "contraseñaeje"
});

usuario.save(function (err, usuarioCreado){    
    if (err) throw err;    
    console.log('Usuario ' + usuarioCreado.name + ' creado'); 
});*/