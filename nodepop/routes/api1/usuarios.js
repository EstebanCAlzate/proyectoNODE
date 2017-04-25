'use strict';

const express = require('express');

const  router = express.Router();

const  mongoose = require('mongoose');

//le pedimos a mongoose el model del agente
const Usuario = mongoose.model('Usuario');


/*//GET: api/usuarios
router.get('/',(req, res, next)=>{ //anidamos los midleware
    console.log('ID DE USUARIO',req.usuario_id);
    const name = req.query.name;    

   Usuario.find(name,(err, usuarios)=>{
       if(err){
           next(err); 
           return;
       }
       res.json({ success: true, result: usuarios });
   });
});*/


//GET: api1/usuario/:id
router.get('/:name', (req, res, next)=>{
//recupermos agentes
    const name = req.params.name;
    console.log(name);
    Usuario.find().exec((err, usuarios)=>{
        if(err){
           next(err); 
            return;
        }
       //tratar que todas las respuestas de la api tengan el mismo formato
    res.json({ success: true, result: usuarios });
   });
});

module.exports = router;    