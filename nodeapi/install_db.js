'use strict';


const  mongoose = require('mongoose');

require('./models/Anuncio');
require('./models/Usuario');

//le pedimos a mongoose el model del agente
const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario');

mongoose.Promise = global.Promise;

console.log('ok');

// Reading Synchrously 
const fs = require("fs"); 

console.log("\n *STARTING* \n"); 
fs.readFile("datos.json",(err,data)=>{
    if(err) return;
    const obj = JSON.parse(data);
    console.log(obj);

    const usuario = new Usuario(obj);
    usuario.save((err, usuarioCreado)=>{    
        console.log('save');
            if (err) {
                console.log('ERROR DE CARGAR');
                return;
            }    
            console.log('Usuario ' + usarioCreado.name + ' creado'); 
    });
}); 


console.log('ok');