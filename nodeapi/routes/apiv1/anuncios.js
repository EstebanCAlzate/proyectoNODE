'use strict';

const express = require('express');
const  router = express.Router();

const  mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');


//GET /apiv1/anuncios?<parametros>
//http://localhost:3000/apiv1/anuncios?sort=age&skip=2
//http://localhost:3000/apiv1/anuncios?venta=false&name=s&precio=100-
router.get('/',(req, res, next)=>{ 

    const name = req.query.name;    
    const venta = req.query.venta;
    const tags = req.query.tags;
    const precio = req.query.precio;

    const criterios = {};

    if(venta){
        criterios.venta = venta;
    }
    if(name){
        criterios.name = {$regex:name}; 
    }
    if(tags){
        criterios.tags = tags; 
    }

    if(precio){
        const precioArr = precio.split("-");
        if(precioArr.length === 1){
            criterios.precio = { precioArr };
            console.log('un elem',precioArr);
        }else if (precioArr[0]!=='' && precioArr[1]!=='' ){
            criterios.precio = { '$gte': precioArr[0], '$lte': precioArr[1] }  ;
            console.log('dos elem',precioArr);
        }else if(precioArr[0]!==''){
            criterios.precio = { '$gte': precioArr[0] }  ;        
            console.log('elm izq',precioArr);
        }else{
            criterios.precio = { '$lte': precioArr[1] }  ;        
            console.log('elm drc',precioArr);
        }
    }


 
    Anuncio.list(criterios,(err, agentes)=>{
       if(err){
           next(err);
           return;
       }
       res.json({ success: true, result: agentes });
   });
});


router.get('/tags',(req, res, next)=>{ 
       Anuncio.find({tags:{$exists:true}},(err,anuncioGuardado)=>{
       if(err){
           next(err);
           return;
       }
       const anuncioTags = [];
       //pasamos los tags a un array.
       anuncioGuardado.forEach((element,index,array)=>{
           anuncioTags[index]=element.tags;
       }, this);
       //hacemos join para separar el array y split para juntarlo y despues filtro.
        var unique = anuncioTags.join().split(",").filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })

        console.log(unique);
       res.json({ success: true, result: unique});    
    });
});


//POST /apiv1/anuncios
router.post('/', function(req, res, next){
//recogemos los datos y creamos el objeto
    const datosAnuncios = req.body;
    const anuncio = new Anuncio (datosAnuncios);

    anuncio.save((err,anuncioGuardado)=>{
        if(err){    
            next(err);
            return;
        }
        res.json({success: true, result: anuncioGuardado});
    });
});

module.exports=router;  