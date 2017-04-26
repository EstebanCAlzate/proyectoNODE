'use strict ';

const jwt = require('jsonwebtoken');
const config = require('../config');

//exportamos un midleware de autentificacion
module.exports = function(req,res,next){

    //recoger el token JWT
    const token = req.body.token || req.query.token || req.get('x-access-token');

    //si no me llega token, responder no autorizado
    if(!token){
        const error = new Error('necesitas un token auth');
        error.status = 401;
        return next(error);
    }

    //si llega un token se valida
    jwt.verify(token,config.jwtSecret, (err,tokenDecodf)=>{
        //si el token a sido modificado o expirado nos dara err
        if(err){
             const error = new Error('el token no es valido');
            error.status = 401;
            return next(error);
        }
        //el token es correcto
        req.usuario_id = tokenDecodf.usuario_id;
        next();
    });
};