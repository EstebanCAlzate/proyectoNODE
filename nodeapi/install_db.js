'use strict';

require('./models/Anuncio');
require('./models/Usuario');

//require('./lib/connectMongoose');
const  mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const conn = mongoose.connection;

//le pedimos a mongoose el model del agente
const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario');

console.log('ok');
const fs = require("fs"); 
console.log("\n *STARTING* \n"); 

conn.once('open', () => {
        fs.readFile("datos.json",(err,data)=>{  
            if(err) return;
            const obj = JSON.parse(data);

            for(var i=0;i<5; i++){
                if(i===0){
                    const usuario = new Usuario(obj[0]);
                    usuario.save((err, usuarioCreado)=>{    
                        if (err) {
                            console.log('ERROR DE CARGAR');
                            return;
                        }    
                        console.log('Usuario ' + usuarioCreado.name + ' creado');
                        conn.close(); 
                    });
                }else {
                    const anuncio = new Anuncio(obj[i]);
                    anuncio.save((err, anuncioCreado)=>{    
                        if (err) {
                            console.log('ERROR DE CARGAR');
                            return;
                        }    
                        console.log('Anuncio ' + anuncioCreado.name + ' creado');
                    });
                }    
            }
            console.log('finalFOr');
        });//promesa
});

mongoose.connect('mongodb://localhost/nodepop');