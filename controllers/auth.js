var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
var async = require('async');

var languageArr = ["Afrikaans","Akan","Albanian",
"Amharic","Arabic","Armenian",
"Azerbaijani","Basque","Belarusian",
"Bemba","Bengali","Bihari",
"Bosnian","Breton","Bulgarian",
"Cambodian","Catalan","Cherokee",
"Chichewa","Chinese (Simplified)","Chinese (Traditional)",
"Corsican","Croatian","Czech",
"Danish","Dutch","English",
"Esperanto","Estonian","Ewe",
"Faroese","Filipino","Finnish",
"French","Frisian","Ga",
"Galician","Georgian","German",
"Greek","Guarani","Gujarati",
"Haitian Creole","Hausa",
"Hawaiian","Hebrew","Hindi",
"Hungarian","Icelandic","Igbo",
"Indonesian","Interlingua","Irish",
"Italian","Japanese","Javanese",
"Kannada","Kazakh","Kinyarwanda",
"Kirundi","Kongo","Korean",
"Krio (Sierra Leone)","Kurdish","Kurdish (Soranî)",
"Kyrgyz","Laothian",
"Latin","Latvian","Lingala",
"Lithuanian","Lozi","Luganda",
"Luo","Macedonian","Malagasy",
"Malay","Malayalam","Maltese",
"Maori","Marathi","Mauritian Creole",
"Moldavian","Mongolian","Montenegrin",
"Nepali","Nigerian Pidgin","Northern Sotho",
"Norwegian","Norwegian (Nynorsk)","Occitan",
"Oriya","Oromo","Pashto",
"Persian","Polish",
"Portuguese (Brazil)","Portuguese (Portugal)","Punjabi",
"Quechua","Romanian","Romansh",
"Runyakitara","Russian","Scots Gaelic",
"Serbian","Serbo-Croatian","Sesotho",
"Setswana","Seychellois Creole","Shona",
"Sindhi","Sinhalese","Slovak",
"Slovenian","Somali","Spanish",
"Spanish (Latin American)","Sundanese","Swahili",
"Swedish","Tajik","Tamil",
"Tatar","Telugu","Thai",
"Tigrinya","Tonga","Tshiluba",
"Tumbuka","Turkish","Turkmen",
"Twi","Uighur","Ukrainian",
"Urdu","Uzbek","Vietnamese",
"Welsh","Wolof","Xhosa",
"Yiddish","Yoruba","Zulu"];

router.get('/signup', function(req,res){
  res.render('auth/signup');
})

router.post('/signup', function(req,res){
  db.user.findOrCreate({where:{email: req.body.email, name: req.body.name, password: req.body.password, username: req.body.username, location: req.body.location}})
  .spread(function(user,created){
    if(created){
      req.login(user,function(err){
        if(err) throw err;
        res.redirect('/auth/signup/1')
      })
    }
  })
})

router.get('/signup/1', function(req,res){
  res.render('auth/signup_1', {languageArr:languageArr});
})

router.post('/signup/1', function(req,res){
  var selectedLanguageArr = req.body.language;
  if (selectedLanguageArr instanceof Array) {
    async.reduce(selectedLanguageArr, {}, function(memo, item, callback){
      callback(null,memo+item)
      db.user.find({where:{id:req.user.id}})
      .then(function(user){
        db.language.findOrCreate({where:{name:item}})
        .spread(function(language,created){
          language.addUser(user)
          .then(function(){
              res.redirect('/auth/signup/2')
            })
        })
      })

    }, function(err, result){
      if (err) throw err;
    })
  }else{
    db.user.find({where:{id:req.user.id}})
      .then(function(user){
        db.language.findOrCreate({where:{name:req.body.language}})
          .spread(function(language,created){
            language.addUser(user)
              .then(function(){
                res.redirect('/auth/signup/2')
              })
          })
      })
    }
  })

router.get('/signup/2', function(req,res){
  if (req.user){
    db.user.find({
      where:{id:req.user.id},
      include:[db.language]
    }).then(function(user){
      res.render('auth/signup_2',{languages:user.languages});
    })
  }else{
    res.send('you must be logged in to access this page!')
  }
})

router.post('/signup/2', function(req,res){
  db.user.find({where:{id:req.user.id},
    include: [db.language]})
  .then(function(user){
    async.each(req.body.language,function(lang,callback){
      var wr_fluency = req.body["wr_fluency_"+lang];
      var sp_fluency = req.body["sp_fluency_"+lang];
      db.languagesusers.update(
      {
        wr_fluency:wr_fluency,
        sp_fluency:sp_fluency
      },
      {where:
        {
          userId:user.id,
          languageId:lang
        }}).then(function(){
          callback();
        })
    },function(err){
      if (err) throw err;
      res.redirect('/profile/update')
    })
  })
})
//login routes

router.get('/login', function(req,res){
  res.render('login/index');
})

//********passport signup **************//
router.get('/signup/facebook', function(req,res){
  if (req.user.username == null || req.user.location == null){
  res.render('auth/signupfacebook');
  }else{
    res.redirect('/home')
  }
})

router.post('/signup/facebook', function(req,res){
    db.user.update({
      username: req.body.username,
      location: req.body.location
    },
    {where:
      {
        id: req.user.id,
      }})
    .spread(function(user,created){
      res.redirect('/auth/signup/facebook/1')
    })
  })

router.get('/signup/facebook/1', function(req,res){
  res.render('auth/signupfacebook_1', {languageArr:languageArr});
})

router.post('/signup/facebook/1', function(req,res){
  var selectedLanguageArr = req.body.language;
  async.reduce(selectedLanguageArr, {}, function(memo, item, callback){
    callback(null,memo+item)
    db.user.find({where:{id:req.user.id}})
    .then(function(user){
      db.language.findOrCreate({where:{name:item}})
      .spread(function(language,created){
        language.addUser(user)
        .then(function(){
            res.redirect('/auth/signup/facebook/2')
          })
      })
    })

  }, function(err, result){
    if (err) throw err;
  })
})


router.get('/signup/facebook/2', function(req,res){
  if (req.user){
    db.user.find({
      where:{id:req.user.id},
      include:[db.language]
    }).then(function(user){
      res.render('auth/signupfacebook_2',{languages:user.languages});
    })
  }else{
    res.send('you must be logged in to access this page!')
  }
})

router.post('/signup/facebook/2', function(req,res){
  db.user.find({where:{id:req.user.id},
    include: [db.language]})
  .then(function(user){
    async.each(req.body.language,function(lang,callback){
      var wr_fluency = req.body["wr_fluency_"+lang];
      var sp_fluency = req.body["sp_fluency_"+lang];
      db.languagesusers.update(
      {
        wr_fluency:wr_fluency,
        sp_fluency:sp_fluency
      },
      {where:
        {
          userId:user.id,
          languageId:lang
        }}).then(function(){
          callback();
        })
    },function(err){
      if (err) throw err;
      res.redirect('/profile/update')
    })
  })
})
//********Passport Login/Logout (LOCAL)//

router.post('/login/', function(req,res){
  passport.authenticate('local',
    {badRequestMessage:"You must enter email and password."},
    function(err,user,info){

      if (user.username == null || user.location == null || user.lat == null || user.lng == null){
      req.login(user, function(err){
        if(err) throw err;
        res.redirect('/auth/signup/facebook/')
      })
      }
      else if(user){
        req.login(user, function(err){
          if(err) throw err;
        })
        res.redirect('/home');
      }
      else{
        var errorMsg = info && info.message ? info.message : 'Unknown error.';
        req.flash('danger', errorMsg);
        res.redirect('/login')
      }
    })(req,res);
  });

router.get('/logout', function(req,res){
  if(req.isAuthenticated()){
    req.logout();
    req.flash('info','You have been logged out.');
    res.redirect('/')
  }else{
    req.flash('danger','you must be logged in to access that page.');
    res.redirect('/')
  }
})

//************************************************


// PASSPORT LOGIN (OAUTH) ********************************
var ALLOWED_PROVIDERS = ['facebook'];

router.get('/login/:provider', function(req,res){
  if (ALLOWED_PROVIDERS.indexOf(req.params.provider) === -1){
    return res.send('invalid provider url.')
  }
  passport.authenticate(
    req.params.provider,
    {scope:['public_profile','email']}
    )(req,res);
  });

router.get('/callback/:provider', function(req,res){
  if (ALLOWED_PROVIDERS.indexOf(req.params.provider) === -1){
    return res.send('invalid provider url.')
  }
  passport.authenticate(req.params.provider,
   function(err,user,info){
    console.log('this is user',req.user)
    if(user){
      req.login(user, function(err){
        if(err) throw err;
        res.redirect('/auth/signup/facebook/');
      })
    }
    else{
      var errorMsg = info && info.message ? info.message : 'Unknown error.';
      req.flash('danger', errorMsg);
      res.redirect('/auth/login')
    }
  })(req,res);
});

module.exports = router;