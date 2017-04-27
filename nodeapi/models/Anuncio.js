'use strict'

const moongose = require('mongoose');


//Creamos schema de anuncio
const anuncioSchema = moongose.Schema({
    name: String,
    precio: Number,
    venta: Boolean,
    foto: String,
    tags: {
        type: [String],
        enum: ["work","lifestyle","motor","mobile"]
    }
}); 

anuncioSchema.statics.list = function(criterios,callback) {
  const query = Anuncio.find(criterios,{_if:false});
  
  /*/ añado limites
  query.limit(limit);
  query.skip(skip);
  query.select(select);
  query.sort(sort);
  */

  // ejecuto la query
  query.exec(callback);
}


var Anuncio = moongose.model ('Anuncio', anuncioSchema);