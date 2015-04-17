var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport')
var async = require('async')

router.get('/', function(req,res){
  if (req.isAuthenticated()){
    var totalLanguages = [];
     db.user.find(
      {where:{id:req.user.id},
      include:[db.language]
    }).then(function(user){
        db.sequelize.query('SELECT * from users, languagesusers, languages where users.id=languagesusers."userId" and languagesusers."languageId"=languages.id and "languageId" in (SELECT "languageId" FROM languagesusers JOIN users ON users.id=languagesusers."userId" AND "userId"='+req.user.id+'  JOIN languages on languagesusers."languageId"=languages.id)')
          .spread(function(userData,created){
            res.render('home/',{userData:userData,language:user.languages,thisUser:req.user.id})
          })
      })
  }else{
    res.redirect('/')
  }
})

module.exports = router;