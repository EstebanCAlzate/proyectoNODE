'use strict';

const express = require('express');
const  router = express.Router();

const  mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

//auth JWT  
const jwt = require('jsonwebtoken');
const config = require('../../config');

//POST /apiv1/usuarios/--------- REGISTRO
router.post('/', function(req, res, next){
//recogemos los datos y creamos el objeto
    const datosUsuario = req.body;
    const usuario = new Usuario (datosUsuario);

    usuario.save((err,usuarioGuardado)=>{
        if(err){
            next(err);
            return;
        }
        res.json({success: true, result: usuarioGuardado});
    });
});

//POST /apiv1/usuarios/login ----- AUTENTICACION
router.post('/login',(req,res,next)=>{
    //recibimos credenciales
    const email = req.body.email;
    const passwd = req.body.passwd;
    
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
        //si exist comprobamos su passwd
        if(passwd!== usuario.passwd){
            res.json({ success:false, error:'credenciales incorrectas' });
            return;
        }
    //si la passwd coincide, creamos un token JWT con el id
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


module.exports = router;