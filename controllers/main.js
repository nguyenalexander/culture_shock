var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport')

router.get('/', function(req,res){
  if (req.isAuthenticated()) {
    console.log('user is logged in, redirecting')
    res.redirect('home');
  }
  else {
    console.log('user is not logged in, redirecting.')
    res.render('main/index');
  }
})

module.exports = router;