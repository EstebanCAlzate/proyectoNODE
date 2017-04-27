var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  
  const segundoActual= (new Date()).getSeconds();
  res.render('index', { title: 'NodePOP' });   
});

module.exports = router;
