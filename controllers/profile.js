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
      include:[db.language,db.profile]
    })
  .then(function(user){
    var img = user.profile.picture;
    console.log(user.profile)
    var imgUrl = cloudinary.url(img, { width: 150, height: 150, crop: 'fill'});
    res.render('profile/index', {userData:user,languageData:user.languages,profileData:user.profile,imgUrl:imgUrl});
  })
})

router.get('/create', function(req,res){
  res.render('profile/create')
})

router.get('/:id', function(req,res){
  db.user.find(
    {where:
      {id:req.params.id},
      include:[db.language,db.profile]
    })
  .then(function(user){
    var img = user.profile.picture;
    console.log(user.profile)
    var imgUrl = cloudinary.url(img, { width: 150, height: 150, crop: 'fill'});
    res.render('profile/user', {userData:user,languageData:user.languages,profileData:user.profile,imgUrl:imgUrl,img:img});
  })
})

router.post('/create', function(req,res){
var uploadedFile
if(req.files.picture){
  uploadedFile = __dirname+'/../'+req.files.picture.path;
  cloudinary.uploader.upload(uploadedFile,function(result){
    db.user.find({where:{id:req.user.id}})
      .then(function(user){
        db.profile.findOrCreate({where:{
        userId:req.user.id,
        picture:result.public_id,
        bio:req.body.bio,
        hobbies:req.body.hobbies,
        phone:req.body.telephone
    }}).then(function(profile){
        res.redirect('/home')
      });
    });
  });
}else{
  uploadedFile = './public/profile-icon.png'
  cloudinary.uploader.upload(uploadedFile,function(result){
  db.user.find({where:{id:req.user.id}})
    .then(function(user){
      db.profile.findOrCreate({where:{
      userId:req.user.id,
      picture:result.public_id,
      bio:req.body.bio,
      hobbies:req.body.hobbies,
      phone:req.body.telephone
  }}).then(function(profile){
      res.redirect('/home')
    });
  });
});
}
});

router.get('/update', function(req,res){
  res.render('profile/update')
})

router.post('/update', function(req,res){
  var uploadedFile = __dirname+'/../'+req.files.picture.path;
  cloudinary.uploader.upload(uploadedFile,function(result){
        db.profile.update({
        picture:result.public_id,
        bio:req.body.bio,
        hobbies:req.body.hobbies,
        phone:req.body.telephone
      },{where:
         {
          userId:req.user.id
      }}).then(function(profile){
        res.redirect('/home')
      });
  });
});

// router.get('/:username')

module.exports = router;