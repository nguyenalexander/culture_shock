var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
var multer = require('multer');
var cloudinary = require('cloudinary')

router.get('/', function(req,res){
  db.user.find(
    {where:
      {id:req.user.id},
      include:[db.language]
    })
    .then(function(user){
      res.render('profile/index', {userData:user,languageData:user.languages});
    })
})

router.get('/update', function(req,res){
  res.render('profile/update')
})

router.post('/update', function(req,res){
  var uploadedFile = __dirname+'/../'+req.files.picture.path;
  cloudinary.uploader.upload(uploadedFile,function(result){
    db.profile.findOrCreate(
      {where:{userId:req.user.id},defaults:{picture:result.public_id,bio:req.body.bio,hobbies:req.body.hobbies,phone:req.body.telephone}
    }).then(function(profile){
      console.log(profile)
      req.flash('success', 'Congrats! You are now a member of speaktome!');
      res.redirect('/home')
    })
  })
})

// router.get('/:username')

module.exports = router;