'use strict';

//vamos a cargar mongose y hace run modelo      
const mongoose =  require('mongoose');

//le damos a lib de promesas

mongoose.Promise = global.Promise;

const conn = mongoose.connection;

conn.on('err',( err )=>{
    console.log('error de conexion', err);
    process.exit(1);
});

conn.once('open', ()=>{
    console.log('conectado a mongoDB');
});

//realizamos la conexion. No es necesario exportar la conexion ya que mongoose la gestiona por nosotros

mongoose.connect('mongodb://localhost/cursonode');
