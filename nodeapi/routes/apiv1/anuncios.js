'use strict';

const express = require('express');
const  router = express.Router();

const  mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');


//GET /apiv1/anuncios?<parametros>
//http://localhost:3000/apiv1/agentes?sort=age&skip=2
router.get('/',(req, res, next)=>{ 
    const name = req.query.name;    
    const venta = req.query.venta;



    const criterios = {};


   Anuncio.list(criterios,limit,skip,select,sort,(err, agentes)=>{
       if(err){
           next(err); // express se ocupa del error
           return;
       }
       //tratar que todas las respuestas de la api tengan el mismo formato
       res.json({ success: true, result: agentes });
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