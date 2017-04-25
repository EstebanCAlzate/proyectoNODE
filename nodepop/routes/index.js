const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//POST /apv1/usuarios
router.get('/usuario/name/:name', (req, res, next)=>{
//recogemos los datos y creamos el objeto
  const name = req.params.name;
  console.log(name);
  res.send('ok');
  /*const usuarios = new Usuario ({
        name: "jonh",
        email: "emialejemplo",
        contraseña: "contraseñaeje"
    });
    usuarios.save((err,usuarioGuardado)=>{
        if(err){
            next(err);
            return;
        }
        res.send('ok');
    });*/
});


module.exports = router;
