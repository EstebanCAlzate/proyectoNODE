'use strict'

const moongose = require('mongoose');


//Creamos schema de anuncio
const anuncioSchema = moongose.Schema({
    name: String,
    precio: Number,
    venta: Boolean,
    foto: String,
    tags: {
        work: Boolean,
        lifestyle: Boolean,
        motor: Boolean,
        mobile: Boolean 
    }
}); 

var Anuncio = moongose.model ('Anuncio', anuncioSchema);