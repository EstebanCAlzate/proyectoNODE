'use strict'

const moongose = require('mongoose');


//Creamos schema de usuario
const usuarioSchema = moongose.Schema({
    name: String,
    email: String,
    passwd: String
}); 

var Usuario = moongose.model('Usuario', usuarioSchema);