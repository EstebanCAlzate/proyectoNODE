'use strict';


const express = require('express');
const  router = express.Router();

const  mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

const jwt = require('jsonwebtoken');

const config = require('../../config');

router.post('/login',(req,res,next)=>{
    //recibimos credenciales
    const email = req.body.email;
    const clave = req.body.clave;
    
    //buscamos el usuario en la BD
    Usuario.findOne({ email:email }).exec((err,usuario)=>{
        if(err){
            next(err);
            return;
        }
        //si no esta el usuario no sale como error
        if(!usuario){
            res.json({ success:false, error:'credenciales incorrectas' });
            return;

        }
    //si exist comprobamos su clave
        if(clave!== usuario.clave){
            res.json({ success:false, error:'credenciales incorrectas' });
            return;
        }
    //si la clave coincide, creamos un token JWT con el id
    //            aqui tener cuidado de no meter objetos grandes
        jwt.sign({ usuario_id: usuario._id }, config.jwtSecret, config.jwtConfig , (err, token)=>{
        if(err){
            next(err);
            return;
        }
    //se lo devolvemos
        res.json({ success:true, token:token  });
        }); 
    });
});

module.exports=router;  